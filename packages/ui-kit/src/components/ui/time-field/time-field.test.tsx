import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { FormField } from "../form";
import { TimeField } from "./time-field";

const hourInput = () => screen.getByRole("spinbutton", { name: "Hour" });
const minuteInput = () => screen.getByRole("spinbutton", { name: "Minute" });
const periodInput = () => screen.getByRole("spinbutton", { name: "AM/PM" });

describe("TimeField", () => {
  it("renders localized 12-hour segments and value", () => {
    render(
      <TimeField
        label="Start time"
        locale="en-US"
        hourCycle={12}
        defaultValue="09:30"
      />,
    );

    expect(hourInput()).toHaveValue("09");
    expect(minuteInput()).toHaveValue("30");
    expect(periodInput()).toHaveValue("AM");
    expect(screen.getByRole("group", { name: "Start time" })).toBeInTheDocument();
  });

  it("types a time and advances between segments", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <TimeField
        locale="en-US"
        hourCycle={24}
        onValueChange={onValueChange}
      />,
    );

    await user.type(hourInput(), "14");
    expect(document.activeElement).toBe(minuteInput());
    await user.keyboard("30");

    expect(onValueChange).toHaveBeenLastCalledWith("14:30");
    expect(hourInput()).toHaveValue("14");
    expect(minuteInput()).toHaveValue("30");
  });

  it("increments hours and wraps at the end of the day", async () => {
    const user = userEvent.setup();
    render(
      <TimeField locale="en-US" hourCycle={24} defaultValue="23:45" />,
    );

    await user.click(hourInput());
    await user.keyboard("{ArrowUp}");

    expect(hourInput()).toHaveValue("00");
    expect(minuteInput()).toHaveValue("45");
  });

  it("carries minute steps into the next hour", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <TimeField
        locale="en-US"
        hourCycle={24}
        defaultValue="23:55"
        step={15}
        onValueChange={onValueChange}
      />,
    );

    await user.click(minuteInput());
    await user.keyboard("{ArrowUp}");

    expect(onValueChange).toHaveBeenLastCalledWith("00:00");
    expect(hourInput()).toHaveValue("00");
    expect(minuteInput()).toHaveValue("00");
  });

  it("snaps typed minutes to the step", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <TimeField
        locale="en-US"
        hourCycle={24}
        defaultValue="09:00"
        step={15}
        onValueChange={onValueChange}
      />,
    );

    await user.click(minuteInput());
    await user.type(minuteInput(), "37");

    expect(onValueChange).toHaveBeenLastCalledWith("09:30");
    expect(minuteInput()).toHaveValue("30");
  });

  it("toggles the day period and keeps a 24-hour value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <TimeField
        locale="en-US"
        hourCycle={12}
        defaultValue="09:30"
        onValueChange={onValueChange}
      />,
    );

    await user.click(periodInput());
    await user.keyboard("{ArrowUp}");

    expect(periodInput()).toHaveValue("PM");
    expect(onValueChange).toHaveBeenLastCalledWith("21:30");
    expect(hourInput()).toHaveValue("09");
  });

  it("clamps typed values to min and max", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <TimeField
        locale="en-US"
        hourCycle={24}
        defaultValue="09:00"
        min="08:00"
        max="18:00"
        onValueChange={onValueChange}
      />,
    );

    await user.click(hourInput());
    await user.type(hourInput(), "07");
    expect(onValueChange).toHaveBeenLastCalledWith("08:00");
    expect(hourInput()).toHaveValue("08");

    await user.type(hourInput(), "19");
    expect(onValueChange).toHaveBeenLastCalledWith("18:00");
    expect(hourInput()).toHaveValue("18");
  });

  it("clears a segment and emits null", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <TimeField
        locale="en-US"
        hourCycle={24}
        defaultValue="09:30"
        onValueChange={onValueChange}
      />,
    );

    await user.click(hourInput());
    await user.keyboard("{Backspace}");

    expect(hourInput()).toHaveValue("--");
    expect(minuteInput()).toHaveValue("30");
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it("clears the whole value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { container } = render(
      <TimeField
        locale="en-US"
        hourCycle={24}
        defaultValue="09:30"
        clearable
        name="opens"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Clear time" }));

    expect(onValueChange).toHaveBeenLastCalledWith(null);
    expect(hourInput()).toHaveValue("--");
    expect(
      container.querySelector('input[name="opens"]'),
    ).toHaveValue("");
  });

  it("renders a hidden input and required description", () => {
    const { container } = render(
      <TimeField
        label="Opening time"
        locale="en-US"
        hourCycle={24}
        defaultValue="09:30"
        required
        name="opens"
      />,
    );

    expect(screen.getByText("Required")).toHaveClass("sr-only");
    expect(screen.getByRole("group")).toHaveAttribute(
      "aria-required",
      "true",
    );
    expect(container.querySelector('input[name="opens"]')).toHaveValue(
      "09:30",
    );
  });

  it("maps midnight and noon in a 12-hour clock", () => {
    const { rerender } = render(
      <TimeField
        label="Time"
        locale="en-US"
        hourCycle={12}
        value="00:30"
        onValueChange={() => {}}
      />,
    );

    expect(hourInput()).toHaveValue("12");
    expect(periodInput()).toHaveValue("AM");

    rerender(
      <TimeField
        label="Time"
        locale="en-US"
        hourCycle={12}
        value="12:30"
        onValueChange={() => {}}
      />,
    );

    expect(hourInput()).toHaveValue("12");
    expect(periodInput()).toHaveValue("PM");
  });

  it("uses the locale's 24-hour cycle without a day-period segment", () => {
    render(
      <TimeField label="Time" locale="vi-VN" defaultValue="09:30" />,
    );

    expect(
      screen.queryByRole("spinbutton", { name: "AM/PM" }),
    ).not.toBeInTheDocument();
  });

  it("ignores an invalid second digit and flushes the first on blur", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <TimeField
        locale="en-US"
        hourCycle={24}
        defaultValue="09:30"
        onValueChange={onValueChange}
      />,
    );

    await user.click(hourInput());
    await user.type(hourInput(), "25");

    expect(hourInput()).toHaveValue("02");
    expect(onValueChange).not.toHaveBeenCalled();

    await user.keyboard("{Tab}");
    expect(onValueChange).toHaveBeenLastCalledWith("02:30");
  });

  it("stops at max when stepping minutes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <TimeField
        locale="en-US"
        hourCycle={24}
        defaultValue="17:45"
        step={15}
        max="18:00"
        onValueChange={onValueChange}
      />,
    );

    await user.click(minuteInput());
    await user.keyboard("{ArrowUp}");

    expect(onValueChange).toHaveBeenLastCalledWith("18:00");
    expect(hourInput()).toHaveValue("18");
    expect(minuteInput()).toHaveValue("00");

    await user.keyboard("{ArrowUp}");
    expect(hourInput()).toHaveValue("18");
    expect(minuteInput()).toHaveValue("00");
  });

  it("accepts a pasted time", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <TimeField
        locale="en-US"
        hourCycle={24}
        defaultValue="09:30"
        onValueChange={onValueChange}
      />,
    );

    await user.click(hourInput());
    await user.paste("21:45");

    expect(onValueChange).toHaveBeenLastCalledWith("21:45");
    expect(hourInput()).toHaveValue("21");
    expect(minuteInput()).toHaveValue("45");
  });

  it("updates segments when a controlled value changes", () => {
    const { rerender } = render(
      <TimeField
        locale="en-US"
        hourCycle={24}
        value="09:30"
        onValueChange={() => {}}
      />,
    );

    rerender(
      <TimeField
        locale="en-US"
        hourCycle={24}
        value="14:45"
        onValueChange={() => {}}
      />,
    );

    expect(hourInput()).toHaveValue("14");
    expect(minuteInput()).toHaveValue("45");
  });

  it("respects readOnly and disabled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(
      <TimeField
        locale="en-US"
        hourCycle={24}
        defaultValue="09:30"
        readOnly
        onValueChange={onValueChange}
      />,
    );

    await user.click(hourInput());
    await user.type(hourInput(), "14");

    expect(onValueChange).not.toHaveBeenCalled();
    expect(hourInput()).toHaveValue("09");

    rerender(
      <TimeField
        locale="en-US"
        hourCycle={24}
        defaultValue="09:30"
        disabled
        onValueChange={onValueChange}
      />,
    );

    expect(hourInput()).toBeDisabled();
  });

  it("shows an error message and invalid state", () => {
    render(
      <TimeField
        label="Time"
        locale="en-US"
        hourCycle={24}
        error="Choose a valid time."
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Choose a valid time.",
    );
    expect(screen.getByRole("group")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("connects to react-hook-form through FormField", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    type Values = { opens: string | null };

    function Demo() {
      const form = useForm<Values>({ defaultValues: { opens: null } });
      return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="opens"
            label="Opening time"
            rules={{ validate: (value) => value !== null || "Pick a time" }}
            render={({ field }) => (
              <TimeField
                locale="en-US"
                hourCycle={24}
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
    expect(await screen.findByRole("alert")).toHaveTextContent("Pick a time");

    await user.type(hourInput(), "09");
    await user.keyboard("30");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledWith(
      { opens: "09:30" },
      expect.anything(),
    );
  });
});
