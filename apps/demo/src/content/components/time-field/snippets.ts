import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `"use client";

import * as React from "react";
import { TimeField } from "@nphuonha/ui-kit";

export function Example() {
  const [time, setTime] = React.useState<string | null>("09:30");

  return (
    <TimeField
      label="Opening time"
      description="Type a time or use the arrow keys."
      value={time}
      onValueChange={setTime}
      locale="en-US"
      hourCycle={24}
      clearable
    />
  );
}`,
  "usage": `<TimeField
  label="Opening time"
  value={time}
  onValueChange={setTime}
  hourCycle={24}
/>`,
  "examples": {
    "time-field-twelve-hour": `"use client";

import * as React from "react";
import { TimeField } from "@nphuonha/ui-kit";

export function Example() {
  const [time, setTime] = React.useState<string | null>("14:30");

  return (
    <TimeField
      label="Appointment"
      value={time}
      onValueChange={setTime}
      locale="en-US"
      hourCycle={12}
    />
  );
}`,
    "time-field-constraints": `"use client";

import * as React from "react";
import { TimeField } from "@nphuonha/ui-kit";

export function Example() {
  const [time, setTime] = React.useState<string | null>("09:00");

  return (
    <TimeField
      label="Business hours"
      description="Quarter-hour steps between 08:00 and 18:00."
      value={time}
      onValueChange={setTime}
      locale="en-US"
      hourCycle={24}
      step={15}
      min="08:00"
      max="18:00"
    />
  );
}`,
    "time-field-states": `import { TimeField } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <div className="flex flex-col gap-4">
      <TimeField
        label="Disabled"
        locale="en-US"
        hourCycle={24}
        defaultValue="09:30"
        disabled
      />
      <TimeField
        label="Read only"
        locale="en-US"
        hourCycle={24}
        defaultValue="09:30"
        readOnly
      />
      <TimeField
        label="Invalid"
        locale="en-US"
        hourCycle={24}
        error="Choose a time in the future."
      />
    </div>
  );
}`,
  },
};
