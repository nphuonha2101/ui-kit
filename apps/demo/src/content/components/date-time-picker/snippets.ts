import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `"use client";

import * as React from "react";
import { DateTimePicker } from "@nphuonha/ui-kit";

export function Example() {
  const [value, setValue] = React.useState<Date | null>(
    new Date(2026, 0, 15, 9, 30),
  );

  return (
    <div className="w-full max-w-xs">
      <DateTimePicker
        label="Publish at"
        description="Local time. Pick a day and a time."
        locale="en-US"
        defaultMonth={new Date(2026, 0, 1)}
        value={value}
        onValueChange={setValue}
        clearable
        showNow
      />
    </div>
  );
}`,
  "usage": `<DateTimePicker
  label="Publish at"
  value={value}
  onValueChange={setValue}
  clearable
  showNow
/>`,
  "examples": {
    "date-time-picker-range": `"use client";

import * as React from "react";
import { DateTimePicker, type DateTimeRange } from "@nphuonha/ui-kit";

export function Example() {
  const [range, setRange] = React.useState<DateTimeRange>({
    from: new Date(2026, 0, 12, 9, 0),
    to: new Date(2026, 0, 18, 17, 0),
  });

  return (
    <DateTimePicker
      mode="range"
      label="Maintenance window"
      description="Start and end times are kept in order."
      locale="en-US"
      defaultMonth={new Date(2026, 0, 1)}
      value={range}
      onValueChange={setRange}
      clearable
      showNow
    />
  );
}`,
    "date-time-picker-constraints": `"use client";

import * as React from "react";
import { DateTimePicker } from "@nphuonha/ui-kit";

export function Example() {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <DateTimePicker
      label="Business appointment"
      description="Weekdays between January 10 and 24, 08:00–18:00."
      locale="en-US"
      defaultMonth={new Date(2026, 0, 1)}
      value={value}
      onValueChange={setValue}
      min={new Date(2026, 0, 10, 8, 0)}
      max={new Date(2026, 0, 24, 18, 0)}
      dateDisabled={(date) =>
        date.getDay() === 0 || date.getDay() === 6
      }
    />
  );
}`,
    "date-time-picker-actions": `"use client";

import * as React from "react";
import { DateTimePicker } from "@nphuonha/ui-kit";

export function Example() {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <DateTimePicker
      label="Starts at"
      locale="en-US"
      value={value}
      onValueChange={setValue}
      clearable
      showNow
    />
  );
}`,
    "date-time-picker-states": `import { DateTimePicker } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <div className="flex flex-col gap-4">
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
}`,
  },
};
