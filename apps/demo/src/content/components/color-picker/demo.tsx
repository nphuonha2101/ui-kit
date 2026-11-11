"use client";

import * as React from "react";
import { ColorPicker } from "@nphuonha/ui-kit";

const SWATCHES = [
  "#0d9488",
  "#2563eb",
  "#7c3aed",
  "#e11d48",
  "#ea580c",
  "#059669",
];

function ColorPickerDemo() {
  const [color, setColor] = React.useState<string | null>("#0d9488");

  return (
    <div className="mx-auto w-full max-w-xs">
      <ColorPicker
        label="Brand color"
        description="Choose the accent used across the app."
        value={color}
        onValueChange={setColor}
        swatches={SWATCHES}
        clearable
        showEyeDropper
      />
      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <span
          className="size-4 rounded-full ring-1 ring-black/10"
          style={{ background: color ?? "transparent" }}
        />
        {color ? color.toUpperCase() : "No color selected"}
      </div>
    </div>
  );
}

function ColorPickerPresetsDemo() {
  const [color, setColor] = React.useState<string | null>("#7c3aed");

  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-3">
      <ColorPicker
        label="Label color"
        value={color}
        onValueChange={setColor}
        swatches={SWATCHES}
        clearable
      />
      <div className="grid grid-cols-2 gap-2">
        {["#7c3aed", "#0d9488"].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setColor(preset)}
            className="rounded-control bg-surface px-3 py-2 text-left text-xs font-medium text-foreground transition-colors hover:bg-surface-hover"
          >
            <span
              className="mb-1.5 block h-8 rounded-xs"
              style={{ background: preset }}
            />
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}

function ColorPickerCustomDemo() {
  const [color, setColor] = React.useState<string | null>("#e11d48");

  return (
    <div className="mx-auto w-full max-w-xs">
      <ColorPicker
        label="Highlight"
        description="Use the sliders or type a hex value."
        value={color}
        onValueChange={setColor}
        showEyeDropper
      />
      <p className="mt-2 text-xs text-muted-foreground">
        {color ? `Selected ${color.toUpperCase()}` : "No color selected."}
      </p>
    </div>
  );
}

function ColorPickerStatesDemo() {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-4">
      <ColorPicker label="Disabled" defaultValue="#0d9488" disabled />
      <ColorPicker label="Invalid" error="Choose a valid color." />
    </div>
  );
}

export const demo = ColorPickerDemo;
export const examples = {
  "color-picker-presets": ColorPickerPresetsDemo,
  "color-picker-custom": ColorPickerCustomDemo,
  "color-picker-states": ColorPickerStatesDemo,
};
