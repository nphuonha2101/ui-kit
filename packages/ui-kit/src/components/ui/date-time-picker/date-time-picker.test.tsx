import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { FormField } from "../form";
import { DateTimePicker, type DateTimeRange } from "./date-time-picker";

const JANUARY_2026 = new Date(2026, 0, 1);
const fullDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(date);
const dayCell = (date: Date) =>
  screen.getByRole("gridcell", { name: fullDate(date) });

describe("DateTimePicker", () => {
  it("selects a date with the default time and stays open", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DateTimePicker
        label="Publish at"
        locale="en-US"
        hourCycle={24}
        defaultMonth={JANUARY_2026}
        onValueChange={onValueChange}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Publish at" });
    await user.click(trigger);

    expect(
      await screen.findByRole("dialog", { name: "Publish at" }),
    ).toBeInTheDocument();

    await user.click(dayCell(new Date(2026, 0, 15)));

    const value = onValueChange.mock.calls.at(-1)?.[0] as Date;
    expect(value.getFullYear()).toBe(2026);
    expect(value.getMonth()).toBe(0);
    expect(value.getDate()).toBe(15);
    expect(value.getHours()).toBe(9);
    expect(value.getMinutes()).toBe(0);
    expect(trigger).toHaveTextContent(/jan 15, 2026/i);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("edits the time without changing the selected date", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DateTimePicker
        label="Publish at"
        locale="en-US"
        hourCycle={24}
        defaultMonth={JANUARY_2026}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Publish at" }));
    await user.click(dayCell(new Date(2026, 0, 15)));

    const dialog = screen.getByRole("dialog");
    const hour = within(dialog).getByRole("spinbutton", { name: "Hour" });
    await user.click(hour);
    await user.type(hour, "14");
    await user.keyboard("30");

    const value = onValueChange.mock.calls.at(-1)?.[0] as Date;
    expect(value.getDate()).toBe(15);
    expect(value.getHours()).toBe(14);
    expect(value.getMinutes()).toBe(30);
  });

  it("selects a date and time range with default times", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { container } = render(
      <DateTimePicker
        mode="range"
        label="Window"
        locale="en-US"
        hourCycle={24}
        defaultMonth={JANUARY_2026}
        name="window"
        onValueChange={onValueChange}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Window" });
    await user.click(trigger);

    await user.click(dayCell(new Date(2026, 0, 12)));
    await user.click(dayCell(new Date(2026, 0, 18)));

    const range = onValueChange.mock.calls.at(-1)?.[0] as DateTimeRange;
    expect(range.from?.getDate()).toBe(12);
    expect(range.from?.getHours()).toBe(9);
    expect(range.to?.getDate()).toBe(18);
    expect(range.to?.getHours()).toBe(17);
    expect(trigger).toHaveTextContent(/jan 12, 2026/i);
    expect(trigger).toHaveTextContent(/jan 18, 2026/i);
    expect(
      container.querySelector('input[name="window"]'),
    ).toHaveValue("2026-01-12T09:00");
    expect(
      container.querySelector('input[name="window-end"]'),
    ).toHaveValue("2026-01-18T17:00");
  });

  it("keeps same-day range times in order", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DateTimePicker
        mode="range"
        label="Window"
        locale="en-US"
        hourCycle={24}
        defaultValue={{
          from: new Date(2026, 0, 15, 9, 0),
          to: new Date(2026, 0, 15, 17, 0),
        }}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Window" }));
    const dialog = screen.getByRole("dialog");
    const hours = within(dialog).getAllByRole("spinbutton", {
      name: "Hour",
    });
    await user.click(hours[0]);
    await user.type(hours[0], "18");

    const range = onValueChange.mock.calls.at(-1)?.[0] as DateTimeRange;
    expect(range.from?.getHours()).toBe(17);
    expect(range.to?.getHours()).toBe(17);
  });

  it("normalizes a range selected in reverse order", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DateTimePicker
        mode="range"
        label="Window"
        locale="en-US"
        hourCycle={24}
        defaultMonth={JANUARY_2026}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Window" }));
    await user.click(dayCell(new Date(2026, 0, 18)));
    await user.click(dayCell(new Date(2026, 0, 12)));

    const range = onValueChange.mock.calls.at(-1)?.[0] as DateTimeRange;
    expect(range.from?.getDate()).toBe(12);
    expect(range.from?.getHours()).toBe(9);
    expect(range.to?.getDate()).toBe(18);
    expect(range.to?.getHours()).toBe(17);
  });

  it("clamps an end time that would precede the start on the same day", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DateTimePicker
        mode="range"
        label="Window"
        locale="en-US"
        hourCycle={24}
        defaultValue={{
          from: new Date(2026, 0, 15, 9, 0),
          to: new Date(2026, 0, 15, 17, 0),
        }}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Window" }));
    const dialog = screen.getByRole("dialog");
    const hours = within(dialog).getAllByRole("spinbutton", {
      name: "Hour",
    });
    await user.click(hours[1]);
    await user.type(hours[1], "08");

    const range = onValueChange.mock.calls.at(-1)?.[0] as DateTimeRange;
    expect(range.from?.getHours()).toBe(9);
    expect(range.to?.getHours()).toBe(9);
  });

  it("clears a range", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DateTimePicker
        mode="range"
        label="Window"
        locale="en-US"
        hourCycle={24}
        defaultValue={{
          from: new Date(2026, 0, 12, 9, 0),
          to: new Date(2026, 0, 18, 17, 0),
        }}
        clearable
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Window" }));
    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(onValueChange).toHaveBeenLastCalledWith({
      from: null,
      to: null,
    });
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("clamps a boundary day to the max time", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DateTimePicker
        label="When"
        locale="en-US"
        hourCycle={24}
        defaultMonth={JANUARY_2026}
        defaultTime="20:00"
        min={new Date(2026, 0, 10, 8, 0)}
        max={new Date(2026, 0, 20, 18, 0)}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "When" }));
    await user.click(dayCell(new Date(2026, 0, 20)));

    const value = onValueChange.mock.calls.at(-1)?.[0] as Date;
    expect(value.getDate()).toBe(20);
    expect(value.getHours()).toBe(18);
    expect(value.getMinutes()).toBe(0);
  });

  it("respects dateDisabled", async () => {
    const user = userEvent.setup();
    render(
      <DateTimePicker
        label="When"
        locale="en-US"
        hourCycle={24}
        defaultMonth={JANUARY_2026}
        dateDisabled={(date) => date.getDay() === 0}
      />,
    );

    await user.click(screen.getByRole("button", { name: "When" }));

    expect(dayCell(new Date(2026, 0, 11))).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(dayCell(new Date(2026, 0, 12))).not.toHaveAttribute(
      "aria-disabled",
    );
  });

  it("clamps a boundary day to the min time", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DateTimePicker
        label="When"
        locale="en-US"
        hourCycle={24}
        defaultMonth={JANUARY_2026}
        defaultTime="08:00"
        min={new Date(2026, 0, 15, 9, 0)}
        max={new Date(2026, 0, 20, 18, 0)}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "When" }));

    expect(dayCell(new Date(2026, 0, 14))).toHaveAttribute(
      "aria-disabled",
      "true",
    );

    await user.click(dayCell(new Date(2026, 0, 15)));

    const value = onValueChange.mock.calls.at(-1)?.[0] as Date;
    expect(value.getDate()).toBe(15);
    expect(value.getHours()).toBe(9);
    expect(value.getMinutes()).toBe(0);
  });

  it("sets the current date and time with Now", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DateTimePicker
        label="When"
        locale="en-US"
        hourCycle={24}
        showNow
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "When" }));
    await user.click(screen.getByRole("button", { name: "Now" }));

    const value = onValueChange.mock.calls.at(-1)?.[0] as Date;
    expect(Math.abs(value.getTime() - Date.now())).toBeLessThan(2 * 60 * 1000);
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("updates when a controlled value changes", () => {
    const { rerender } = render(
      <DateTimePicker
        label="When"
        locale="en-US"
        hourCycle={24}
        value={new Date(2026, 0, 15, 9, 30)}
        onValueChange={() => {}}
      />,
    );

    rerender(
      <DateTimePicker
        label="When"
        locale="en-US"
        hourCycle={24}
        value={new Date(2026, 0, 18, 14, 45)}
        onValueChange={() => {}}
      />,
    );

    const trigger = screen.getByRole("button", { name: "When" });
    expect(trigger).toHaveTextContent(/jan 18, 2026/i);
    expect(trigger).toHaveTextContent(/14:45/i);
  });

  it("renders hidden datetime-local inputs", () => {
    const { container } = render(
      <DateTimePicker
        label="When"
        locale="en-US"
        hourCycle={24}
        defaultValue={new Date(2026, 0, 15, 9, 30)}
        name="publish"
      />,
    );

    expect(container.querySelector('input[name="publish"]')).toHaveValue(
      "2026-01-15T09:30",
    );
  });

  it("supports required and error states", () => {
    render(
      <DateTimePicker
        label="When"
        locale="en-US"
        required
        description="Pick a date and time."
        error="Choose a date and time."
      />,
    );

    expect(screen.getByText("*")).toHaveClass("text-destructive");
    expect(screen.getByText("Required")).toHaveClass("sr-only");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Choose a date and time.",
    );
    expect(screen.getByRole("button", { name: "When" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("connects to react-hook-form through FormField", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    type Values = { publish: Date | null };

    function Demo() {
      const form = useForm<Values>({ defaultValues: { publish: null } });
      return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="publish"
            label="Publish at"
            rules={{ validate: (value) => value !== null || "Pick a date" }}
            render={({ field }) => (
              <DateTimePicker
                locale="en-US"
                hourCycle={24}
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

    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Pick a date");

    await user.click(screen.getByRole("button", { name: "Publish at" }));
    await user.click(dayCell(new Date(2026, 0, 15)));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledWith(
      { publish: expect.any(Date) },
      expect.anything(),
    );
  });
});
