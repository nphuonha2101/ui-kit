"use client";

import * as React from "react";
import { Calendar, type CalendarRange } from "@nphuonha/ui-kit";

const JANUARY_2026 = new Date(2026, 0, 1);
const JANUARY_15_2026 = new Date(2026, 0, 15);
const formatMedium = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

function CalendarDemo() {
  return (
    <div className="mx-auto w-fit rounded-card bg-card p-4 shadow-soft">
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        defaultValue={JANUARY_15_2026}
        label="Start date"
        description="Choose a launch date."
      />
    </div>
  );
}

function CalendarRangeDemo() {
  const [range, setRange] = React.useState<CalendarRange>({
    from: new Date(2026, 0, 12),
    to: new Date(2026, 0, 18),
  });

  return (
    <div className="mx-auto w-fit rounded-card bg-card p-4 shadow-soft">
      <Calendar
        mode="range"
        locale="en-US"
        defaultMonth={JANUARY_2026}
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
    </div>
  );
}

function CalendarCompactDemo() {
  return (
    <div className="mx-auto w-fit rounded-card bg-card p-4 shadow-soft">
      <Calendar
        mode="single"
        size="sm"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        label="Compact calendar"
        description="Smaller day cells for tight layouts."
      />
    </div>
  );
}

function CalendarConstraintsDemo() {
  return (
    <div className="mx-auto w-fit rounded-card bg-card p-4 shadow-soft">
      <Calendar
        mode="single"
        locale="en-US"
        defaultMonth={JANUARY_2026}
        min={new Date(2026, 0, 10)}
        max={new Date(2026, 0, 24)}
        disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
        label="Business day"
        description="Weekdays between January 10 and 24."
      />
    </div>
  );
}

export const demo = CalendarDemo;
export const examples = {
  "calendar-range": CalendarRangeDemo,
  "calendar-compact": CalendarCompactDemo,
  "calendar-constraints": CalendarConstraintsDemo,
};
