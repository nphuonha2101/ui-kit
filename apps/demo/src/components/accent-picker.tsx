"use client";

import * as React from "react";
import { accentStyle } from "@nphuonha/ui-kit";
import { Button } from "@nphuonha/ui-kit";

const presets = [
  { name: "Indigo", value: "#4f46e5" },
  { name: "Blue", value: "#2563eb" },
  { name: "Teal", value: "#0d9488" },
  { name: "Emerald", value: "#059669" },
  { name: "Rose", value: "#e11d48" },
  { name: "Orange", value: "#ea580c" },
  { name: "Violet", value: "#7c3aed" },
];

export function AccentPicker({
  dark,
  onChange,
}: {
  dark: boolean;
  onChange: (style: React.CSSProperties | undefined) => void;
}) {
  const [active, setActive] = React.useState<string>("default");
  const [custom, setCustom] = React.useState("#4f46e5");

  const apply = (name: string, color?: string) => {
    setActive(name);
    if (!color) onChange(undefined);
    else onChange(accentStyle(color, dark ? "dark" : "light"));
  };

  React.useEffect(() => {
    if (active === "default") return;
    const found = presets.find((p) => p.name === active);
    const color = found?.value ?? (active === "custom" ? custom : undefined);
    if (color) onChange(accentStyle(color, dark ? "dark" : "light"));
  }, [dark, active, custom, onChange]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" variant={active === "default" ? "primary" : "outline"} onClick={() => apply("default")}>
        Default
      </Button>
      {presets.map((p) => (
        <button
          key={p.name}
          type="button"
          title={p.name}
          onClick={() => apply(p.name, p.value)}
          className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface"
          aria-pressed={active === p.name}
        >
          <span className="size-3 rounded-full" style={{ background: p.value }} />
          {p.name}
        </button>
      ))}
      <label className="relative inline-flex cursor-pointer items-center gap-2 rounded-pill bg-surface px-2.5 py-1.5 text-xs font-medium text-foreground">
        <span>Custom</span>
        <span
          aria-hidden
          className="size-4 rounded-full ring-1 ring-black/10"
          style={{ background: custom }}
        />
        <input
          type="color"
          value={custom}
          onChange={(e) => {
            setCustom(e.target.value);
            apply("custom", e.target.value);
          }}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label="Custom accent color"
        />
      </label>
    </div>
  );
}
