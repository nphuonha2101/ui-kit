"use client";

import * as React from "react";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { cn } from "@nphuonha/ui-kit";
import { useThemeSettings } from "./providers";

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
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const { accent, setAccent } = useThemeSettings();

  return (
    <div
      className={cn(
        "relative -m-1 flex flex-wrap items-center gap-2 p-1",
        compact && "gap-1.5",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setAccent(null)}
        aria-label="Reset accent color"
        title="Reset accent"
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-surface text-muted-foreground transition-colors hover:text-foreground",
          compact ? "size-7" : "h-8 gap-1.5 px-2.5 text-xs font-medium",
          accent === null &&
            "relative z-10 text-foreground outline-2 outline-offset-2 outline-ring/50",
        )}
      >
        <ArrowCounterClockwiseIcon size={14} />
        {!compact ? "Default" : null}
      </button>

      {presets.map((preset) => {
        const active = accent === preset.value;
        return (
          <button
            key={preset.value}
            type="button"
            onClick={() => setAccent(preset.value)}
            aria-label={preset.name}
            title={preset.name}
            aria-pressed={active}
            className={cn(
              "inline-flex items-center rounded-full transition-[box-shadow,background-color]",
              compact ? "size-7 justify-center" : "h-8 gap-2 bg-surface px-2 text-xs font-medium text-foreground hover:bg-surface-hover",
              active && "relative z-10 outline-2 outline-offset-2 outline-ring/50",
            )}
          >
            <span
              className="size-4 shrink-0 rounded-full ring-1 ring-black/10"
              style={{ background: preset.value }}
            />
            {!compact ? preset.name : null}
          </button>
        );
      })}

      <label
        className={cn(
          "relative inline-flex cursor-pointer items-center rounded-full bg-surface text-xs font-medium text-foreground transition-colors hover:bg-surface-hover",
          compact ? "size-7 justify-center" : "h-8 gap-2 px-2",
        )}
        title="Custom accent"
      >
        <span
          aria-hidden
          className="size-4 shrink-0 rounded-full ring-1 ring-black/10"
          style={{ background: accent ?? "#4f46e5" }}
        />
        {!compact ? "Custom" : null}
        <input
          type="color"
          value={accent ?? "#4f46e5"}
          onChange={(event) => setAccent(event.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label="Custom accent color"
        />
      </label>
    </div>
  );
}
