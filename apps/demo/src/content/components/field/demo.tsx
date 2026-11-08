"use client";

import { Field, Input } from "@nphuonha/ui-kit";

function FieldDemo() {
  return (
    <div className="mx-auto grid w-full max-w-md gap-4 sm:grid-cols-2">
      <Field label="First name">
        <Input placeholder="Avery" />
      </Field>
      <Field label="Last name">
        <Input placeholder="Quinn" />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Email" description="Used for sign-in and receipts." required>
          <Input placeholder="you@example.com" type="email" />
        </Field>
      </div>
    </div>
  );
}

export const demo = FieldDemo;
export const examples = {};
