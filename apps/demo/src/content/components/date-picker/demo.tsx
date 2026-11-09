"use client";

import * as React from "react";
import { DatePicker, type CalendarRange } from "@nphuonha/ui-kit";

const JANUARY_15_2026 = new Date(2026, 0, 15);
const mediumDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | null>(JANUARY_15_2026);

  return (
    <div className="mx-auto w-full max-w-xs">
      <DatePicker
        label="Start date"
        description="Click the field to open the calendar."
        locale="en-US"
        value={date}
        onValueChange={setDate}
        clearable
      />
    </div>
  );
}

function DatePickerClearableDemo() {
  const [date, setDate] = React.useState<Date | null>(JANUARY_15_2026);

  return (
    <div className="mx-auto w-full max-w-xs">
      <DatePicker
        label="Due date"
        locale="en-US"
        value={date}
        onValueChange={setDate}
        clearable
      />
      <p className="mt-2 text-xs text-muted-foreground">
        {date ? `Selected: ${mediumDate.format(date)}` : "No date selected."}
      </p>
    </div>
  );
}

function DatePickerRangeDemo() {
  const [range, setRange] = React.useState<CalendarRange>({
    from: new Date(2026, 0, 12),
    to: new Date(2026, 0, 18),
  });

  return (
    <div className="mx-auto w-full max-w-xs">
      <DatePicker
        mode="range"
        label="Trip dates"
        description="Pick a start and an end date."
        locale="en-US"
        defaultMonth={new Date(2026, 0, 1)}
        value={range}
        onValueChange={setRange}
        clearable
        showToday
      />
      <p className="mt-2 text-xs text-muted-foreground">
        {range.from ? mediumDate.format(range.from) : "Start"} –{" "}
        {range.to ? mediumDate.format(range.to) : "End"}
      </p>
    </div>
  );
}

function DatePickerConstraintsDemo() {
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <div className="mx-auto w-full max-w-xs">
      <DatePicker
        label="Business day"
        description="Weekdays between January 10 and 24."
        locale="en-US"
        value={date}
        onValueChange={setDate}
        defaultMonth={new Date(2026, 0, 1)}
        min={new Date(2026, 0, 10)}
        max={new Date(2026, 0, 24)}
        dateDisabled={(value) =>
          value.getDay() === 0 || value.getDay() === 6
        }
      />
    </div>
  );
}

function DatePickerStatesDemo() {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-4">
      <DatePicker
        label="Disabled"
        locale="en-US"
        defaultValue={JANUARY_15_2026}
        disabled
      />
      <DatePicker
        label="Invalid"
        locale="en-US"
        error="Choose a valid date."
      />
    </div>
  );
}

export const demo = DatePickerDemo;
export const examples = {
  "date-picker-range": DatePickerRangeDemo,
  "date-picker-clearable": DatePickerClearableDemo,
  "date-picker-constraints": DatePickerConstraintsDemo,
  "date-picker-states": DatePickerStatesDemo,
};
