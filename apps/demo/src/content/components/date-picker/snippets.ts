import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `"use client";

import * as React from "react";
import { DatePicker } from "@nphuonha/ui-kit";

export function Example() {
  const [date, setDate] = React.useState<Date | null>(new Date(2026, 0, 15));

  return (
    <div className="w-full max-w-xs">
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
}`,
  "usage": `<DatePicker
  label="Start date"
  value={date}
  onValueChange={setDate}
  clearable
/>`,
  "examples": {
    "date-picker-range": `"use client";

import * as React from "react";
import { DatePicker, type CalendarRange } from "@nphuonha/ui-kit";

const mediumDate = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

export function Example() {
  const [range, setRange] = React.useState<CalendarRange>({
    from: new Date(2026, 0, 12),
    to: new Date(2026, 0, 18),
  });

  return (
    <div className="w-full max-w-xs">
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
}`,
    "date-picker-clearable": `"use client";

import * as React from "react";
import { DatePicker } from "@nphuonha/ui-kit";

export function Example() {
  const [date, setDate] = React.useState<Date | null>(new Date(2026, 0, 15));

  return (
    <div className="w-full max-w-xs">
      <DatePicker
        label="Due date"
        locale="en-US"
        value={date}
        onValueChange={setDate}
        clearable
      />
      <p className="mt-2 text-xs text-muted-foreground">
        {date ? "A date is selected." : "No date selected."}
      </p>
    </div>
  );
}`,
    "date-picker-constraints": `"use client";

import * as React from "react";
import { DatePicker } from "@nphuonha/ui-kit";

export function Example() {
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <DatePicker
      label="Business day"
      description="Weekdays between January 10 and 24."
      locale="en-US"
      value={date}
      onValueChange={setDate}
      defaultMonth={new Date(2026, 0, 1)}
      min={new Date(2026, 0, 10)}
      max={new Date(2026, 0, 24)}
      dateDisabled={(value) => value.getDay() === 0 || value.getDay() === 6}
    />
  );
}`,
    "date-picker-states": `import { DatePicker } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <DatePicker
        label="Disabled"
        locale="en-US"
        defaultValue={new Date(2026, 0, 15)}
        disabled
      />
      <DatePicker
        label="Invalid"
        locale="en-US"
        error="Choose a valid date."
      />
    </div>
  );
}`,
  },
};
