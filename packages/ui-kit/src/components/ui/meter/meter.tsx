"use client";

import * as React from "react";
import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import { cn } from "../../../lib/utils";

const trackSizes = {
  sm: "h-1.5",
  default: "h-2.5",
  lg: "h-4",
} as const;

const tones = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-destructive",
} as const;

export type MeterTone = keyof typeof tones;

type Zone = "low" | "middle" | "high";

function zoneOf(value: number, low?: number, high?: number): Zone {
  if (low !== undefined && value <= low) return "low";
  if (high !== undefined && value >= high) return "high";
  return "middle";
}

/** HTML meter semantics: optimum zone is good, the adjacent zone is warning,
 * and the opposite zone is danger. */
function thresholdTone(
  value: number,
  low: number | undefined,
  high: number | undefined,
  optimum: number,
): MeterTone {
  const current = zoneOf(value, low, high);
  const optimal = zoneOf(optimum, low, high);
  if (current === optimal) return "success";
  if (optimal === "middle") return "warning";
  if (current === "middle") return "warning";
  return "danger";
}

export interface MeterProps {
  /** Current measurement. */
  value: number;
  /** Lower bound of the range. */
  min?: number;
  /** Upper bound of the range. */
  max?: number;
  /** Upper bound of the low zone, matching the native `<meter>` element. */
  low?: number;
  /** Lower bound of the high zone, matching the native `<meter>` element. */
  high?: number;
  /** Best value in the range. When set, the tone follows the three meter zones. */
  optimum?: number;
  /** Visible label, wired to the meter for assistive technology. */
  label?: React.ReactNode;
  /** Show the formatted value beside the label. */
  showValue?: boolean;
  /** Customize the visible value, for example with a unit. */
  formatValue?: (formattedValue: string, value: number) => React.ReactNode;
  /** Track height. */
  size?: keyof typeof trackSizes;
  /** Explicit indicator tone. Overrides the tone derived from optimum. */
  tone?: MeterTone;
  className?: string;
  /** Accessible name when no visible label is rendered. */
  "aria-label"?: string;
  "aria-valuetext"?: string;
}

export function Meter({
  value,
  min = 0,
  max = 100,
  low,
  high,
  optimum,
  label,
  showValue = false,
  formatValue,
  size = "default",
  tone,
  className,
  ...aria
}: MeterProps) {
  const resolvedTone =
    tone ?? (optimum !== undefined ? thresholdTone(value, low, high, optimum) : "primary");

  return (
    <MeterPrimitive.Root
      value={value}
      min={min}
      max={max}
      className={cn("flex w-full flex-col gap-2", className)}
      {...aria}
    >
      {label !== undefined || showValue ? (
        <div className="flex items-baseline justify-between gap-3 text-sm">
          {label !== undefined ? (
            <MeterPrimitive.Label className="font-medium text-foreground">
              {label}
            </MeterPrimitive.Label>
          ) : (
            <span aria-hidden="true" />
          )}
          {showValue ? (
            <MeterPrimitive.Value className="text-xs tabular-nums text-muted-foreground">
              {(formatted, currentValue) =>
                formatValue ? formatValue(formatted, currentValue) : formatted
              }
            </MeterPrimitive.Value>
          ) : null}
        </div>
      ) : null}
      <MeterPrimitive.Track
        className={cn(
          "surface-inset relative w-full overflow-hidden rounded-pill bg-field",
          trackSizes[size],
        )}
      >
        <MeterPrimitive.Indicator
          className={cn(
            "h-full rounded-pill transition-[width] duration-[var(--duration-ui-slow)] ease-[var(--ease-out-ui)]",
            tones[resolvedTone],
          )}
        />
      </MeterPrimitive.Track>
    </MeterPrimitive.Root>
  );
}
