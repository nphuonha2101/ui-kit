"use client";

import * as React from "react";
import { DateTimePicker, type DateTimeRange } from "@nphuonha/ui-kit";

const JANUARY_2026 = new Date(2026, 0, 1);
const fullDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

function DateTimePickerDemo() {
  const [value, setValue] = React.useState<Date | null>(
    new Date(2026, 0, 15, 9, 30),
  );

  return (
    <div className="mx-auto w-full max-w-xs">
      <DateTimePicker
        label="Publish at"
        description="Local time. Click the field to choose a day and time."
        locale="en-US"
        defaultMonth={JANUARY_2026}
        value={value}
        onValueChange={setValue}
        clearable
        showNow
      />
      <p className="mt-2 text-xs text-muted-foreground">
        {value ? fullDate.format(value) : "No date selected."}
      </p>
    </div>
  );
}

function DateTimePickerRangeDemo() {
  const [range, setRange] = React.useState<DateTimeRange>({
    from: new Date(2026, 0, 12, 9, 0),
    to: new Date(2026, 0, 18, 17, 0),
  });

  return (
    <div className="mx-auto w-full max-w-xs">
      <DateTimePicker
        mode="range"
        label="Maintenance window"
        description="Start and end times are kept in order."
        locale="en-US"
        defaultMonth={JANUARY_2026}
        value={range}
        onValueChange={setRange}
        clearable
        showNow
      />
      <p className="mt-2 text-xs text-muted-foreground">
        {range.from ? fullDate.format(range.from) : "Start"} –{" "}
        {range.to ? fullDate.format(range.to) : "End"}
      </p>
    </div>
  );
}

function DateTimePickerConstraintsDemo() {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <div className="mx-auto w-full max-w-xs">
      <DateTimePicker
        label="Business appointment"
        description="Weekdays between January 10 and 24, 08:00–18:00."
        locale="en-US"
        defaultMonth={JANUARY_2026}
        value={value}
        onValueChange={setValue}
        min={new Date(2026, 0, 10, 8, 0)}
        max={new Date(2026, 0, 24, 18, 0)}
        dateDisabled={(date) =>
          date.getDay() === 0 || date.getDay() === 6
        }
      />
    </div>
  );
}

function DateTimePickerActionsDemo() {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <div className="mx-auto w-full max-w-xs">
      <DateTimePicker
        label="Starts at"
        locale="en-US"
        value={value}
        onValueChange={setValue}
        clearable
        showNow
      />
      <p className="mt-2 text-xs text-muted-foreground">
        {value ? fullDate.format(value) : "Choose a date or press Now."}
      </p>
    </div>
  );
}

function DateTimePickerStatesDemo() {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-4">
      <DateTimePicker
        label="Disabled"
        locale="en-US"
        defaultValue={new Date(2026, 0, 15, 9, 30)}
        disabled
      />
      <DateTimePicker
        label="Invalid"
        locale="en-US"
        error="Choose a valid date and time."
      />
    </div>
  );
}

export const demo = DateTimePickerDemo;
export const examples = {
  "date-time-picker-range": DateTimePickerRangeDemo,
  "date-time-picker-constraints": DateTimePickerConstraintsDemo,
  "date-time-picker-actions": DateTimePickerActionsDemo,
  "date-time-picker-states": DateTimePickerStatesDemo,
};
