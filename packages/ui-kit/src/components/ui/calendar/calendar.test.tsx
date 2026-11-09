import { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Controller, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { FormField } from "../form";
import { Calendar, type CalendarRange } from "./calendar";

const JANUARY_2026 = new Date(2026, 0, 1);
const fullDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(date);
const dayCell = (date: Date) =>
  screen.getByRole("gridcell", { name: fullDate(date) });
const focusDay = (date: Date) => act(() => dayCell(date).focus());

describe("Calendar", () => {
  it("renders a localized single-month grid", () => {
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        defaultValue={new Date(2026, 0, 15)}
      />,
    );

    expect(screen.getByText("January 2026")).toBeInTheDocument();
    expect(dayCell(new Date(2026, 0, 15))).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("marks today", () => {
    const now = new Date();
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={new Date(now.getFullYear(), now.getMonth(), 1)}
      />,
    );

    expect(dayCell(now)).toHaveAttribute("aria-current", "date");
  });

  it("selects a day", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        onValueChange={onValueChange}
      />,
    );

    const target = new Date(2026, 0, 20);
    await user.click(dayCell(target));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    const value = onValueChange.mock.calls[0][0] as Date;
    expect(value.getFullYear()).toBe(2026);
    expect(value.getMonth()).toBe(0);
    expect(value.getDate()).toBe(20);
    expect(dayCell(target)).toHaveAttribute("aria-selected", "true");
  });

  it("moves focus with the keyboard and selects with Enter", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        defaultValue={new Date(2026, 0, 15)}
        onValueChange={onValueChange}
      />,
    );

    act(() => dayCell(new Date(2026, 0, 15)).focus());
    await user.keyboard("{ArrowRight}");

    expect(document.activeElement).toBe(dayCell(new Date(2026, 0, 16)));

    await user.keyboard("{Enter}");
    const value = onValueChange.mock.calls[0][0] as Date;
    expect(value.getDate()).toBe(16);
  });

  it("navigates months from the header", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("February 2026")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText("January 2026")).toBeInTheDocument();
  });

  it("selects a range with two clicks", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        mode="range"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        onValueChange={onValueChange}
      />,
    );

    const from = new Date(2026, 0, 10);
    const to = new Date(2026, 0, 15);

    await user.click(dayCell(from));
    await user.click(dayCell(to));

    expect(onValueChange).toHaveBeenLastCalledWith({
      from,
      to,
    } satisfies CalendarRange);
    expect(dayCell(from)).toHaveAttribute("aria-selected", "true");
    expect(dayCell(new Date(2026, 0, 12))).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(dayCell(to)).toHaveAttribute("aria-selected", "true");
  });

  it("keeps keyboard focus on the selected range endpoint", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        mode="range"
        locale="en-US"
        defaultMonth={JANUARY_2026}
      />,
    );

    await user.click(dayCell(new Date(2026, 0, 10)));
    await user.click(dayCell(new Date(2026, 0, 15)));
    await user.keyboard("{ArrowRight}");

    expect(document.activeElement).toBe(dayCell(new Date(2026, 0, 16)));
  });

  it("disables days outside min and max", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        min={new Date(2026, 0, 10)}
        max={new Date(2026, 0, 20)}
        onValueChange={onValueChange}
      />,
    );

    const outside = dayCell(new Date(2026, 0, 5));
    expect(outside).toHaveAttribute("aria-disabled", "true");

    await user.click(outside);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("supports a custom disabled predicate", () => {
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        disabled={(date) => date.getDay() === 6}
      />,
    );

    expect(dayCell(new Date(2026, 0, 10))).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(dayCell(new Date(2026, 0, 11))).not.toHaveAttribute(
      "aria-disabled",
    );
  });

  it("uses the locale week start", () => {
    const { rerender } = render(
      <Calendar mode="single" locale="en-US" defaultMonth={JANUARY_2026} />,
    );
    expect(screen.getAllByRole("columnheader")[0]).toHaveTextContent("Sun");

    rerender(
      <Calendar mode="single" locale="en-GB" defaultMonth={JANUARY_2026} />,
    );
    expect(screen.getAllByRole("columnheader")[0]).toHaveTextContent("Mon");
  });

  it("connects to react-hook-form through Controller", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    type Values = { start: Date | null };

    function Demo() {
      const form = useForm<Values>({ defaultValues: { start: null } });
      return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            control={form.control}
            name="start"
            rules={{ validate: (value) => value !== null || "Pick a date" }}
            render={({ field, fieldState }) => (
              <Calendar
                mode="single"
                locale="en-US"
                defaultMonth={JANUARY_2026}
                label="Start date"
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
              />
            )}
          />
          <button type="submit">Submit</button>
        </form>
      );
    }

    render(<Demo />);

    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(await screen.findByText("Pick a date")).toBeInTheDocument();
    expect(screen.getByRole("grid")).toHaveAttribute("aria-invalid", "true");

    await user.click(dayCell(new Date(2026, 0, 15)));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledWith(
      { start: expect.any(Date) },
      expect.anything(),
    );
  });

  it("receives the FormField label and aria attributes", () => {
    type Values = { start: Date | null };

    function Demo() {
      const form = useForm<Values>({ defaultValues: { start: null } });
      return (
        <FormField
          control={form.control}
          name="start"
          label="Start date"
          description="Choose a launch date."
          render={({ field }) => (
            <Calendar
              mode="single"
              locale="en-US"
              defaultMonth={JANUARY_2026}
              value={field.value}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
      );
    }

    render(<Demo />);

    expect(screen.getByRole("grid", { name: "Start date" })).toBeInTheDocument();
    expect(screen.getByText("Choose a launch date.")).toBeInTheDocument();
  });

  it("keeps aria references valid with FormField boolean errors", async () => {
    const user = userEvent.setup();
    type Values = { start: Date | null };

    function Demo() {
      const form = useForm<Values>({ defaultValues: { start: null } });
      return (
        <form onSubmit={form.handleSubmit(() => {})}>
          <FormField
            control={form.control}
            name="start"
            label="Start date"
            rules={{ required: "Pick a date" }}
            render={({ field }) => (
              <Calendar
                mode="single"
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

    const { container } = render(<Demo />);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    const error = await screen.findByRole("alert");
    const grid = screen.getByRole("grid");
    expect(grid).toHaveAttribute("aria-invalid", "true");
    expect(grid.getAttribute("aria-describedby")).toContain(error.id);
    for (const id of (grid.getAttribute("aria-describedby") ?? "").split(/\s+/)) {
      if (id) expect(document.getElementById(id)).not.toBeNull();
    }
    expect(container.querySelectorAll('[aria-invalid="true"]').length).toBeGreaterThan(0);
  });

  it("shows label, description and error", () => {
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        label="Start date"
        description="Choose a launch date."
        error="A date is required."
        required
      />,
    );

    expect(screen.getByText("Start date")).toBeInTheDocument();
    expect(screen.getByText("*")).toHaveClass("text-destructive");
    expect(screen.getByText("Choose a launch date.")).toBeInTheDocument();
    const error = screen.getByRole("alert");
    expect(error).toHaveTextContent("A date is required.");
    expect(screen.getByRole("grid")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("grid")).toHaveAttribute("aria-required", "true");
    expect(
      screen.getByRole("grid").getAttribute("aria-describedby"),
    ).toContain(error.id);
  });

  it("formats month, weekday and day labels for the locale", () => {
    const locale = "vi-VN";
    render(
      <Calendar
        mode="single"
        locale={locale}
        defaultMonth={JANUARY_2026}
      />,
    );

    expect(
      screen.getByText(
        new Intl.DateTimeFormat(locale, {
          month: "long",
          year: "numeric",
        }).format(JANUARY_2026),
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")[0]).toHaveTextContent(
      new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
        new Date(2025, 11, 29),
      ),
    );
    expect(
      screen.getByRole("gridcell", {
        name: new Intl.DateTimeFormat(locale, { dateStyle: "full" }).format(
          new Date(2026, 0, 15),
        ),
      }),
    ).toBeInTheDocument();
  });

  it("selects February 29 in a leap year", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={new Date(2028, 1, 1)}
        onValueChange={onValueChange}
      />,
    );

    const leapDay = new Date(2028, 1, 29);
    await user.click(dayCell(leapDay));

    const value = onValueChange.mock.calls[0][0] as Date;
    expect(value.getFullYear()).toBe(2028);
    expect(value.getMonth()).toBe(1);
    expect(value.getDate()).toBe(29);
  });

  it("does not render February 29 in a non-leap year", () => {
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={new Date(2026, 1, 1)}
      />,
    );

    expect(
      screen.queryByRole("gridcell", {
        name: "Sunday, February 29, 2026",
      }),
    ).not.toBeInTheDocument();
  });

  it("moves focus across month and year boundaries", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={new Date(2026, 11, 1)}
        defaultValue={new Date(2026, 11, 31)}
      />,
    );

    focusDay(new Date(2026, 11, 31));
    await user.keyboard("{ArrowRight}");

    expect(screen.getByText("January 2027")).toBeInTheDocument();
    expect(document.activeElement).toBe(dayCell(new Date(2027, 0, 1)));
  });

  it("moves focus backwards across a year boundary", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        defaultValue={new Date(2026, 0, 1)}
      />,
    );

    focusDay(new Date(2026, 0, 1));
    await user.keyboard("{ArrowLeft}");

    expect(screen.getByText("December 2025")).toBeInTheDocument();
    expect(document.activeElement).toBe(dayCell(new Date(2025, 11, 31)));
  });

  it("clamps month keyboard jumps to the last valid day", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={new Date(2028, 0, 1)}
        defaultValue={new Date(2028, 0, 31)}
      />,
    );

    focusDay(new Date(2028, 0, 31));
    await user.keyboard("{PageDown}");

    expect(screen.getByText("February 2028")).toBeInTheDocument();
    expect(document.activeElement).toBe(dayCell(new Date(2028, 1, 29)));
  });

  it("supports Home and End with a Monday week start", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        mode="single"
        locale="en-US"
        weekStartsOn={1}
        defaultMonth={JANUARY_2026}
        defaultValue={new Date(2026, 0, 15)}
      />,
    );

    focusDay(new Date(2026, 0, 15));
    await user.keyboard("{Home}");
    expect(document.activeElement).toBe(dayCell(new Date(2026, 0, 12)));

    await user.keyboard("{End}");
    expect(document.activeElement).toBe(dayCell(new Date(2026, 0, 18)));
  });

  it("normalizes a backwards range", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        mode="range"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        onValueChange={onValueChange}
      />,
    );

    await user.click(dayCell(new Date(2026, 0, 20)));
    await user.click(dayCell(new Date(2026, 0, 10)));

    expect(onValueChange).toHaveBeenLastCalledWith({
      from: new Date(2026, 0, 10),
      to: new Date(2026, 0, 20),
    } satisfies CalendarRange);
    expect(dayCell(new Date(2026, 0, 15))).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("selects a range across months", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        mode="range"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        onValueChange={onValueChange}
      />,
    );

    const from = new Date(2026, 0, 25);
    const to = new Date(2026, 1, 10);

    await user.click(dayCell(from));
    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("February 2026")).toBeInTheDocument();
    await user.click(dayCell(to));

    expect(onValueChange).toHaveBeenLastCalledWith({ from, to });
    expect(screen.getByText("February 2026")).toBeInTheDocument();
    expect(dayCell(to)).toHaveAttribute("aria-selected", "true");

    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText("January 2026")).toBeInTheDocument();
    expect(dayCell(from)).toHaveAttribute("aria-selected", "true");
  });

  it("normalizes a range selected across months in reverse order", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        mode="range"
        locale="en-US"
        defaultMonth={new Date(2026, 1, 1)}
        onValueChange={onValueChange}
      />,
    );

    const from = new Date(2026, 0, 25);
    const to = new Date(2026, 1, 10);

    await user.click(dayCell(to));
    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText("January 2026")).toBeInTheDocument();
    await user.click(dayCell(from));

    expect(onValueChange).toHaveBeenLastCalledWith({ from, to });
    expect(dayCell(from)).toHaveAttribute("aria-selected", "true");
  });

  it("supports a single-day range", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        mode="range"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        onValueChange={onValueChange}
      />,
    );

    await user.click(dayCell(new Date(2026, 0, 15)));
    await user.click(dayCell(new Date(2026, 0, 15)));

    expect(onValueChange).toHaveBeenLastCalledWith({
      from: new Date(2026, 0, 15),
      to: new Date(2026, 0, 15),
    } satisfies CalendarRange);
  });

  it("starts a new range after a completed range", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        mode="range"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        onValueChange={onValueChange}
      />,
    );

    await user.click(dayCell(new Date(2026, 0, 10)));
    await user.click(dayCell(new Date(2026, 0, 15)));
    await user.click(dayCell(new Date(2026, 0, 20)));

    expect(onValueChange).toHaveBeenLastCalledWith({
      from: new Date(2026, 0, 20),
      to: null,
    } satisfies CalendarRange);
    expect(dayCell(new Date(2026, 0, 15))).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("does not mark a hover preview as selected", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        mode="range"
        locale="en-US"
        defaultMonth={JANUARY_2026}
      />,
    );

    await user.click(dayCell(new Date(2026, 0, 10)));
    fireEvent.mouseEnter(dayCell(new Date(2026, 0, 12)));

    expect(dayCell(new Date(2026, 0, 12))).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("navigates when an outside day is selected", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        onValueChange={onValueChange}
      />,
    );

    const outside = new Date(2025, 11, 31);
    await user.click(dayCell(outside));

    expect(screen.getByText("December 2025")).toBeInTheDocument();
    const value = onValueChange.mock.calls[0][0] as Date;
    expect(value.getMonth()).toBe(11);
    expect(value.getDate()).toBe(31);
  });

  it("hides outside days when showOutsideDays is false", () => {
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        showOutsideDays={false}
      />,
    );

    expect(
      screen.queryByRole("gridcell", {
        name: fullDate(new Date(2025, 11, 31)),
      }),
    ).not.toBeInTheDocument();
    expect(dayCell(new Date(2026, 0, 1))).toBeInTheDocument();
  });

  it("disables month navigation at min and max", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        min={new Date(2026, 1, 10)}
        max={new Date(2026, 2, 20)}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Previous month" }),
    ).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("February 2026")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("March 2026")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next month" }),
    ).toBeDisabled();
  });

  it("reports the normalized month to onMonthChange", async () => {
    const user = userEvent.setup();
    const onMonthChange = vi.fn();
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        onMonthChange={onMonthChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(onMonthChange).toHaveBeenCalledWith(new Date(2026, 1, 1));
  });

  it("keeps a controlled month fixed", async () => {
    const user = userEvent.setup();
    const onMonthChange = vi.fn();
    render(
      <Calendar
        mode="single"
        locale="en-US"
        month={JANUARY_2026}
        onMonthChange={onMonthChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Next month" }));

    expect(screen.getByText("January 2026")).toBeInTheDocument();
    expect(onMonthChange).toHaveBeenCalledWith(new Date(2026, 1, 1));
  });

  it("follows a controlled value into another month", () => {
    const { rerender } = render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        value={new Date(2026, 0, 15)}
      />,
    );

    rerender(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        value={new Date(2026, 2, 10)}
      />,
    );

    expect(screen.getByText("March 2026")).toBeInTheDocument();
  });

  it("keeps disabled days focusable but not selectable", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        min={new Date(2026, 0, 10)}
        onValueChange={onValueChange}
      />,
    );

    focusDay(new Date(2026, 0, 5));
    await user.keyboard("{Enter}");

    expect(onValueChange).not.toHaveBeenCalled();
  });
});
