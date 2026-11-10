"use client";

import { Field, Fieldset, Input } from "@nphuonha/ui-kit";

function FieldsetDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Fieldset legend="Shipping address" description="Where should we deliver?">
        <Field label="Full name">
          <Input placeholder="Ana Duarte" />
        </Field>
        <Field label="Street">
          <Input placeholder="12 Nguyễn Huệ" />
        </Field>
      </Fieldset>
    </div>
  );
}

function FieldsetDisabledDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Fieldset legend="Account" disabled>
        <Field label="Email">
          <Input type="email" defaultValue="ana@example.com" />
        </Field>
        <Field label="Role">
          <Input defaultValue="Editor" />
        </Field>
      </Fieldset>
    </div>
  );
}

export const demo = FieldsetDemo;
export const examples = {
  "fieldset-disabled": FieldsetDisabledDemo,
};
