"use client";

import { Field, Input } from "@nphuonha/ui-kit";

function InputDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Field label="Email" description="We'll never share it." required>
        <Input placeholder="you@example.com" type="email" />
      </Field>
      <Field label="With error" error="This field is required">
        <Input placeholder="Required" error />
      </Field>
    </div>
  );
}

export const demo = InputDemo;
export const examples = {};
