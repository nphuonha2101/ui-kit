import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `"use client";

import * as React from "react";
import { ColorPicker } from "@nphuonha/ui-kit";

const SWATCHES = ["#0d9488", "#2563eb", "#7c3aed", "#e11d48"];

export function Example() {
  const [color, setColor] = React.useState<string | null>("#0d9488");

  return (
    <div className="w-full max-w-xs">
      <ColorPicker
        label="Brand color"
        value={color}
        onValueChange={setColor}
        swatches={SWATCHES}
        clearable
        showEyeDropper
      />
    </div>
  );
}`,
  "usage": `<ColorPicker
  label="Brand color"
  value={color}
  onValueChange={setColor}
  swatches={["#0d9488", "#e11d48"]}
  clearable
/>`,
  "examples": {
    "color-picker-presets": `"use client";

import * as React from "react";
import { ColorPicker } from "@nphuonha/ui-kit";

const SWATCHES = ["#0d9488", "#2563eb", "#7c3aed", "#e11d48"];

export function Example() {
  const [color, setColor] = React.useState<string | null>("#7c3aed");

  return (
    <ColorPicker
      label="Label color"
      value={color}
      onValueChange={setColor}
      swatches={SWATCHES}
      clearable
    />
  );
}`,
    "color-picker-custom": `"use client";

import * as React from "react";
import { ColorPicker } from "@nphuonha/ui-kit";

export function Example() {
  const [color, setColor] = React.useState<string | null>("#e11d48");

  return (
    <ColorPicker
      label="Highlight"
      description="Use the sliders or type a hex value."
      value={color}
      onValueChange={setColor}
      showEyeDropper
    />
  );
}`,
    "color-picker-states": `import { ColorPicker } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <div className="flex flex-col gap-4">
      <ColorPicker label="Disabled" defaultValue="#0d9488" disabled />
      <ColorPicker label="Invalid" error="Choose a valid color." />
    </div>
  );
}`,
  },
};
