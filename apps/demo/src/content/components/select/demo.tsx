"use client";

import { Field, Select } from "@nphuonha/ui-kit";

function SelectDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Field label="Framework">
        <Select
          placeholder="Choose one"
          defaultValue="next"
          options={[
            { value: "next", label: "Next.js" },
            { value: "vite", label: "Vite" },
            { value: "remix", label: "Remix" },
          ]}
        />
      </Field>
    </div>
  );
}

function SelectFieldDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Field label="Framework">
        <Select
          options={[
            { value: "next", label: "Next.js" },
            { value: "vite", label: "Vite" },
            { value: "remix", label: "Remix" },
          ]}
          defaultValue="next"
        />
      </Field>
      <Field label="Package manager">
        <Select
          options={[
            { value: "npm", label: "npm" },
            { value: "pnpm", label: "pnpm" },
            { value: "yarn", label: "yarn" },
          ]}
          defaultValue="npm"
        />
      </Field>
    </div>
  );
}

export const demo = SelectDemo;
export const examples = {
  "select-field": SelectFieldDemo,
};
