"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn, hasErrorContent } from "../../../lib/utils";

export type SliderValue = number | readonly number[];

export interface SliderMark {
  value: number;
  label?: React.ReactNode;
}

export interface SliderProps<Value extends SliderValue = number> {
  /** Controlled value. Pass an array for a range slider. @type number | readonly number[] */
  value?: Value;
  /** Initial value for an uncontrolled slider. @type number | readonly number[] */
  defaultValue?: Value;
  /** Called while the value changes. @type (value: number | readonly number[]) => void */
  onValueChange?: (value: Value) => void;
  /** Minimum value. */
  min?: number;
  /** Maximum value. */
  max?: number;
  /** Step increment. */
  step?: number;
  /** Disables the slider. */
  disabled?: boolean;
  /** Slider direction. */
  orientation?: "horizontal" | "vertical";
  name?: string;
  id?: string;
  /** Visible label associated with the slider. */
  label?: React.ReactNode;
  /** Helper text below the control. */
  description?: React.ReactNode;
  /** Error message and invalid state. */
  error?: React.ReactNode;
  /** Show the formatted value next to the label. */
  showValue?: boolean;
  /** Custom value formatter. */
  formatValue?: (value: number) => React.ReactNode;
  /** Optional tick labels rendered below a horizontal slider. */
  marks?: SliderMark[];
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
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
  id,
  label,
  description,
  error,
  showValue = false,
  formatValue,
  marks,
  className,
  ref,
  onBlur,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
}: SliderProps<Value>) {
  const autoId = React.useId();
  const fieldId = id ?? autoId;
  const hasErrorMessage = hasErrorContent(error);
  const descriptionId = description ? `${fieldId}-description` : undefined;
  const errorId = hasErrorMessage ? `${fieldId}-error` : undefined;
  const describedBy =
    [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(" ") ||
    undefined;
  const invalid = Boolean(error) || Boolean(ariaInvalid);
  const syncInputInvalid = React.useCallback(
    (node: HTMLInputElement | null) => {
      if (!node) return;
      if (invalid) node.setAttribute("aria-invalid", "true");
      else node.removeAttribute("aria-invalid");
    },
    [invalid],
  );
  const rawValue = value ?? defaultValue;
  const thumbCount = Array.isArray(rawValue) ? rawValue.length : 1;
  const vertical = orientation === "vertical";

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <SliderPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange ? (next) => onValueChange(next as Value) : undefined}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        orientation={orientation}
        name={name}
        id={fieldId}
        onBlur={onBlur}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
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
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              aria-describedby={describedBy}
              aria-invalid={invalid || undefined}
              inputRef={syncInputInvalid}
              className="surface-curved-pill block h-5 w-7 rounded-pill bg-card shadow-[var(--shadow-raised)] ring-1 ring-border/60 outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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

      {description ? (
        <p id={descriptionId} className="text-xs text-muted-foreground">
          {description}
        </p>
      ) : null}
      {hasErrorMessage ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
