import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { FormField } from "../form";
import type { CalendarRange } from "../calendar";
import { DatePicker } from "./date-picker";

const JANUARY_2026 = new Date(2026, 0, 1);
const fullDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(date);
const mediumDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
const dayCell = (date: Date) =>
  screen.getByRole("gridcell", { name: fullDate(date) });

describe("DatePicker", () => {
  it("shows the selected date and opens a calendar popup", async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        locale="en-US"
        defaultValue={new Date(2026, 0, 15)}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /jan 15, 2026/i }),
    );

    expect(
      await screen.findByRole("dialog", { name: "Choose a date" }),
    ).toBeInTheDocument();
    expect(dayCell(new Date(2026, 0, 15))).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("selects a date and closes the popup", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker
        locale="en-US"
        defaultMonth={JANUARY_2026}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /pick a date/i }));
    await user.click(dayCell(new Date(2026, 0, 20)));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    const value = onValueChange.mock.calls[0][0] as Date;
    expect(value.getDate()).toBe(20);
    expect(
      screen.getByRole("button", { name: /jan 20, 2026/i }),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("clears the value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker
        locale="en-US"
        defaultValue={new Date(2026, 0, 15)}
        clearable
        onValueChange={onValueChange}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /jan 15, 2026/i }),
    );
    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(onValueChange).toHaveBeenCalledWith(null);
    expect(
      screen.getByRole("button", { name: /pick a date/i }),
    ).toBeInTheDocument();
  });

  it("disables days outside min and max", async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        locale="en-US"
        defaultMonth={JANUARY_2026}
        min={new Date(2026, 0, 10)}
        max={new Date(2026, 0, 20)}
      />,
    );

    await user.click(screen.getByRole("button", { name: /pick a date/i }));

    expect(dayCell(new Date(2026, 0, 5))).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("disables the trigger", () => {
    render(<DatePicker disabled />);
    expect(
      screen.getByRole("button", { name: /pick a date/i }),
    ).toBeDisabled();
  });

  it("marks the label and trigger as required", () => {
    render(<DatePicker label="Start date" required />);

    const trigger = screen.getByRole("button", { name: "Start date" });
    const required = screen.getByText("Required");

    expect(screen.getByText("*")).toHaveClass("text-destructive");
    expect(required).toHaveClass("sr-only");
    expect(trigger.getAttribute("aria-describedby")).toContain(required.id);
  });

  it("formats the trigger label for the locale", () => {
    const date = new Date(2026, 0, 15);
    render(<DatePicker locale="vi-VN" defaultValue={date} />);

    expect(
      screen.getByRole("button", {
        name: new Intl.DateTimeFormat("vi-VN", {
          dateStyle: "medium",
        }).format(date),
      }),
    ).toBeInTheDocument();
  });

  it("renders a hidden input for native forms", () => {
    const { container } = render(
      <DatePicker
        name="start"
        locale="en-US"
        defaultValue={new Date(2026, 0, 15)}
      />,
    );

    const hidden = container.querySelector(
      'input[type="hidden"]',
    ) as HTMLInputElement;
    expect(hidden).toHaveAttribute("name", "start");
    expect(hidden).toHaveValue("2026-01-15");
  });

  it("selects today from the footer", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker
        locale="en-US"
        showToday
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /pick a date/i }));
    await user.click(screen.getByRole("button", { name: "Today" }));

    const value = onValueChange.mock.calls[0][0] as Date;
    const today = new Date();
    expect(value.getFullYear()).toBe(today.getFullYear());
    expect(value.getMonth()).toBe(today.getMonth());
    expect(value.getDate()).toBe(today.getDate());
  });

  it("selects a date range and closes after both endpoints", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const from = new Date(2026, 0, 12);
    const to = new Date(2026, 0, 18);

    render(
      <DatePicker
        mode="range"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        onValueChange={onValueChange}
      />,
    );

    const trigger = screen.getByRole("button", {
      name: /pick a date range/i,
    });
    await user.click(trigger);

    expect(
      await screen.findByRole("dialog", { name: "Choose a date range" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("grid")).toHaveAttribute(
      "aria-multiselectable",
      "true",
    );

    await user.click(dayCell(from));
    expect(onValueChange).toHaveBeenLastCalledWith({ from, to: null });
    expect(trigger).toHaveTextContent(`${mediumDate(from)} – …`);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(dayCell(to));
    expect(onValueChange).toHaveBeenLastCalledWith({ from, to });
    expect(trigger).toHaveTextContent(
      `${mediumDate(from)} – ${mediumDate(to)}`,
    );
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("selects a range across months", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const from = new Date(2026, 0, 25);
    const to = new Date(2026, 1, 10);

    render(
      <DatePicker
        mode="range"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        onValueChange={onValueChange}
      />,
    );

    const trigger = screen.getByRole("button", {
      name: /pick a date range/i,
    });
    await user.click(trigger);
    await user.click(dayCell(from));
    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("February 2026")).toBeInTheDocument();
    await user.click(dayCell(to));

    expect(onValueChange).toHaveBeenLastCalledWith({ from, to });
    expect(trigger).toHaveTextContent(
      `${mediumDate(from)} – ${mediumDate(to)}`,
    );
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("clears a range value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker
        mode="range"
        locale="en-US"
        defaultValue={{
          from: new Date(2026, 0, 12),
          to: new Date(2026, 0, 18),
        }}
        clearable
        onValueChange={onValueChange}
      />,
    );

    const expected = `${mediumDate(new Date(2026, 0, 12))} – ${mediumDate(
      new Date(2026, 0, 18),
    )}`;
    await user.click(screen.getByRole("button", { name: expected }));
    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(onValueChange).toHaveBeenCalledWith({ from: null, to: null });
    expect(
      screen.getByRole("button", { name: /pick a date range/i }),
    ).toBeInTheDocument();
  });

  it("renders hidden start and end inputs for a range", () => {
    const { container } = render(
      <DatePicker
        mode="range"
        locale="en-US"
        name="stay"
        defaultValue={{
          from: new Date(2026, 0, 12),
          to: new Date(2026, 0, 18),
        }}
      />,
    );

    expect(container.querySelector('input[name="stay"]')).toHaveValue(
      "2026-01-12",
    );
    expect(container.querySelector('input[name="stay-end"]')).toHaveValue(
      "2026-01-18",
    );
  });

  it("connects a range to react-hook-form", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    type Values = { stay: CalendarRange | null };

    function Demo() {
      const form = useForm<Values>({ defaultValues: { stay: null } });
      return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="stay"
            label="Trip dates"
            rules={{
              validate: (value) =>
                Boolean(value?.from && value?.to) || "Pick a date range",
            }}
            render={({ field }) => (
              <DatePicker
                mode="range"
                locale="en-US"
                defaultMonth={JANUARY_2026}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          <button type="submit">Submit</button>
        </form>
      );
    }

    render(<Demo />);

    await user.click(screen.getByRole("button", { name: "Trip dates" }));
    await user.click(dayCell(new Date(2026, 0, 12)));
    await user.click(dayCell(new Date(2026, 0, 18)));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledWith(
      {
        stay: {
          from: new Date(2026, 0, 12),
          to: new Date(2026, 0, 18),
        },
      },
      expect.anything(),
    );
  });

  it("connects to react-hook-form through FormField", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    type Values = { start: Date | null };

    function Demo() {
      const form = useForm<Values>({ defaultValues: { start: null } });
      return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="start"
            label="Start date"
            rules={{ validate: (value) => value !== null || "Pick a date" }}
            render={({ field }) => (
              <DatePicker
                locale="en-US"
                defaultMonth={JANUARY_2026}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          <button type="submit">Submit</button>
        </form>
      );
    }

    render(<Demo />);

    const trigger = screen.getByRole("button", { name: "Start date" });
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Pick a date");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    for (const id of (
      trigger.getAttribute("aria-describedby") ?? ""
    ).split(/\s+/)) {
      if (id) expect(document.getElementById(id)).not.toBeNull();
    }

    await user.click(trigger);
    await user.click(dayCell(new Date(2026, 0, 15)));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledWith(
      { start: expect.any(Date) },
      expect.anything(),
    );
  });
});
