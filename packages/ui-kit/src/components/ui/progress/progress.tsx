"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
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

export interface ProgressProps {
  value: number | null;
  min?: number;
  max?: number;
  label?: React.ReactNode;
  showValue?: boolean;
  size?: keyof typeof trackSizes;
  tone?: keyof typeof tones;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-valuetext"?: string;
}

export function Progress({
  value,
  min = 0,
  max = 100,
  label,
  showValue = false,
  size = "default",
  tone = "primary",
  className,
  ...aria
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      value={value}
      min={min}
      max={max}
      className={cn("flex w-full flex-col gap-2", className)}
      {...aria}
    >
      {label !== undefined || showValue ? (
        <div className="flex items-baseline justify-between gap-3 text-sm">
          {label !== undefined ? (
            <ProgressPrimitive.Label className="font-medium text-foreground">
              {label}
            </ProgressPrimitive.Label>
          ) : (
            <span aria-hidden="true" />
          )}
          {showValue ? (
            <ProgressPrimitive.Value className="text-xs tabular-nums text-muted-foreground">
              {(formatted, currentValue) =>
                currentValue == null ? "…" : formatted
              }
            </ProgressPrimitive.Value>
          ) : null}
        </div>
      ) : null}
      <ProgressPrimitive.Track
        className={cn(
          "surface-inset relative w-full overflow-hidden rounded-pill bg-field",
          trackSizes[size],
        )}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full rounded-pill transition-[width] duration-[var(--duration-ui-slow)] ease-[var(--ease-out-ui)]",
            "data-[indeterminate]:absolute data-[indeterminate]:inset-y-0 data-[indeterminate]:left-0 data-[indeterminate]:w-2/5 data-[indeterminate]:animate-[kit-progress-indeterminate_1.4s_ease-in-out_infinite]",
            tones[tone],
          )}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}
