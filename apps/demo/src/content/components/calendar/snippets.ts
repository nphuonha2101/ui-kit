import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import { Calendar } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <div className="w-fit rounded-card bg-card p-4 shadow-soft">
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={new Date(2026, 0, 1)}
        defaultValue={new Date(2026, 0, 15)}
        label="Start date"
        description="Choose a launch date."
      />
    </div>
  );
}`,
  "usage": `<Calendar mode="single" value={date} onValueChange={setDate} />`,
  "examples": {
    "calendar-range": `"use client";

import * as React from "react";
import { Calendar, type CalendarRange } from "@nphuonha/ui-kit";

const formatMedium = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

export function Example() {
  const [range, setRange] = React.useState<CalendarRange>({
    from: new Date(2026, 0, 12),
    to: new Date(2026, 0, 18),
  });

  return (
    <Calendar
      mode="range"
      locale="en-US"
      defaultMonth={new Date(2026, 0, 1)}
      value={range}
      onValueChange={setRange}
      label="Trip dates"
      footer={
        <p className="text-xs text-muted-foreground">
          {range.from ? formatMedium.format(range.from) : "Start"} –{" "}
          {range.to ? formatMedium.format(range.to) : "End"}
        </p>
      }
    />
  );
}`,
    "calendar-compact": `import { Calendar } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <Calendar
      mode="single"
      size="sm"
      locale="en-US"
      defaultMonth={new Date(2026, 0, 1)}
      label="Compact calendar"
      description="Smaller day cells for tight layouts."
    />
  );
}`,
    "calendar-constraints": `import { Calendar } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <Calendar
      mode="single"
      locale="en-US"
      defaultMonth={new Date(2026, 0, 1)}
      min={new Date(2026, 0, 10)}
      max={new Date(2026, 0, 24)}
      disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
      label="Business day"
      description="Weekdays between January 10 and 24."
    />
  );
}`,
  },
};
