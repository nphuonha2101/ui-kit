"use client";

import { Switch } from "@nphuonha/ui-kit";

function SwitchDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Switch label="Notifications" description="Receive product updates." required defaultChecked />
      <Switch label="Disabled" disabled />
    </div>
  );
}

export const demo = SwitchDemo;
export const examples = {};
