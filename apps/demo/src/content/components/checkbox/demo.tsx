"use client";

import { Checkbox } from "@nphuonha/ui-kit";

function CheckboxDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Checkbox label="Accept terms" description="You agree to the privacy policy." defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
    </div>
  );
}

export const demo = CheckboxDemo;
export const examples = {};
