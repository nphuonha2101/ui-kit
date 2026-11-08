"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "../../../lib/utils";

export type SliderValue = number | readonly number[];

export interface SliderMark {
  value: number;
  label?: React.ReactNode;
}

export interface SliderProps<Value extends SliderValue = number> {
  value?: Value;
  defaultValue?: Value;
  onValueChange?: (value: Value) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  name?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  showValue?: boolean;
  formatValue?: (value: number) => React.ReactNode;
  marks?: SliderMark[];
  className?: string;
  "aria-label"?: string;
}

export function Slider<Value extends SliderValue = number>({
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  orientation = "horizontal",
  name,
  label,
  description,
  error,
  showValue = false,
  formatValue,
  marks,
  className,
  "aria-label": ariaLabel,
}: SliderProps<Value>) {
  const rawValue = value ?? defaultValue;
  const thumbCount = Array.isArray(rawValue) ? rawValue.length : 1;
  const vertical = orientation === "vertical";

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <SliderPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange ? (next) => onValueChange(next as Value) : undefined}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        orientation={orientation}
        name={name}
        aria-label={ariaLabel}
        aria-invalid={error ? true : undefined}
        className="relative flex w-full select-none flex-col gap-2 data-[disabled]:opacity-45"
      >
        {label || showValue ? (
          <div className="flex items-center justify-between gap-3">
            {label ? (
              <SliderPrimitive.Label className="text-sm font-medium text-foreground">
                {label}
              </SliderPrimitive.Label>
            ) : (
              <span />
            )}
            {showValue ? (
              <SliderPrimitive.Value className="text-xs font-medium tabular-nums text-muted-foreground">
                {(formatted, values) =>
                  formatValue
                    ? values.map((current, index) => (
                        <React.Fragment key={`${current}-${index}`}>
                          {index > 0 ? " – " : null}
                          {formatValue(current)}
                        </React.Fragment>
                      ))
                    : formatted.join(" – ")
                }
              </SliderPrimitive.Value>
            ) : null}
          </div>
        ) : null}

        <SliderPrimitive.Control
          className={cn(
            "relative flex touch-none items-center",
            vertical ? "mx-auto h-44 w-5 flex-col" : "h-5 w-full",
          )}
        >
          <SliderPrimitive.Track
            className={cn(
              "surface-inset relative grow overflow-hidden rounded-pill bg-field",
              vertical ? "h-full w-1.5" : "h-1.5 w-full",
            )}
          >
            <SliderPrimitive.Indicator className="bg-primary" />
          </SliderPrimitive.Track>
          {Array.from({ length: thumbCount }, (_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              index={index}
              className="surface-curved-pill block size-4 rounded-full bg-card shadow-[var(--shadow-raised)] ring-1 ring-border/60 outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            />
          ))}
        </SliderPrimitive.Control>

        {marks && !vertical ? (
          <div className="relative mt-1 h-4 w-full">
            {marks.map((mark) => {
              const percent = ((mark.value - min) / (max - min)) * 100;
              return (
                <span
                  key={mark.value}
                  className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-[11px] text-muted-foreground"
                  style={{ left: `${percent}%` }}
                >
                  {mark.label ?? mark.value}
                </span>
              );
            })}
          </div>
        ) : null}
      </SliderPrimitive.Root>

      {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      {error ? (
        <p role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
