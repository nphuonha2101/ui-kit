"use client";

import * as React from "react";
import { TimeField } from "@nphuonha/ui-kit";

function TimeFieldDemo() {
  const [time, setTime] = React.useState<string | null>("09:30");

  return (
    <div className="mx-auto w-full max-w-xs">
      <TimeField
        label="Opening time"
        description="Type a time or use the arrow keys."
        value={time}
        onValueChange={setTime}
        locale="en-US"
        hourCycle={24}
        clearable
      />
      <p className="mt-2 text-xs text-muted-foreground">
        Value: {time ?? "none"}
      </p>
    </div>
  );
}

function TimeFieldTwelveHourDemo() {
  const [time, setTime] = React.useState<string | null>("14:30");

  return (
    <div className="mx-auto w-full max-w-xs">
      <TimeField
        label="Appointment"
        value={time}
        onValueChange={setTime}
        locale="en-US"
        hourCycle={12}
      />
      <p className="mt-2 text-xs text-muted-foreground">
        Stored as {time ?? "none"} (24-hour).
      </p>
    </div>
  );
}

function TimeFieldConstraintsDemo() {
  const [time, setTime] = React.useState<string | null>("09:00");

  return (
    <div className="mx-auto w-full max-w-xs">
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
    </div>
  );
}

function TimeFieldStatesDemo() {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-4">
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
}

export const demo = TimeFieldDemo;
export const examples = {
  "time-field-twelve-hour": TimeFieldTwelveHourDemo,
  "time-field-constraints": TimeFieldConstraintsDemo,
  "time-field-states": TimeFieldStatesDemo,
};
