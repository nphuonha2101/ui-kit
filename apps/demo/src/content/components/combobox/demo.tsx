"use client";

import { Combobox, Field } from "@nphuonha/ui-kit";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "vite", label: "Vite" },
  { value: "remix", label: "Remix" },
  { value: "svelte", label: "SvelteKit" },
  { value: "astro", label: "Astro" },
];

function ComboboxDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Field label="Framework" required>
        <Combobox placeholder="Search frameworks…" required options={frameworks} />
      </Field>
    </div>
  );
}

function ComboboxMultipleDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Field label="Frameworks" description="Pick every framework you use.">
        <Combobox
          multiple
          placeholder="Add a framework…"
          defaultValue={["next", "vite"]}
          options={frameworks}
        />
      </Field>
    </div>
  );
}

function ComboboxEmptyDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Field label="Assignee">
        <Combobox
          placeholder="Search people…"
          emptyMessage="No teammates match that search."
          options={[
            { value: "ana", label: "Ana Duarte", description: "Design" },
            { value: "minh", label: "Minh Tran", description: "Engineering" },
          ]}
        />
      </Field>
    </div>
  );
}

export const demo = ComboboxDemo;
export const examples = {
  "combobox-multiple": ComboboxMultipleDemo,
  "combobox-empty": ComboboxEmptyDemo,
};
