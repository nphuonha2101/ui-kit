"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { Radio } from "@base-ui/react/radio";
import { cn, hasErrorContent } from "../../../lib/utils";

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive>,
    "children" | "value" | "defaultValue" | "onValueChange"
  > {
  /** Value/label/description entries. */
  options?: RadioOption[];
  /** Group label. */
  label?: React.ReactNode;
  /** Group helper text. */
  description?: React.ReactNode;
  /** Group error message. */
  error?: React.ReactNode;
  /** Marks the group label and native input as required. */
  required?: boolean;
  /** Layout direction. */
  orientation?: "vertical" | "horizontal";
  /** Controlled selected value. */
  value?: string;
  /** Initial selected value for uncontrolled usage. */
  defaultValue?: string;
  /** Called when the selected value changes. */
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export function RadioGroup({
  className,
  options,
  label,
  description,
  error,
  required,
  orientation = "vertical",
  children,
  ref,
  ...props
}: RadioGroupProps) {
  const groupId = React.useId();
  const labelId = `${groupId}-label`;
  const hasErrorMessage = hasErrorContent(error);
  const descriptionId = description ? `${groupId}-description` : undefined;
  const errorId = hasErrorMessage ? `${groupId}-error` : undefined;
  const describedBy =
    [props["aria-describedby"], descriptionId, errorId]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label ? (
        <div id={labelId} className="text-sm font-medium text-foreground">
          {label}
          {required ? (
            <span aria-hidden="true" className="ml-0.5 text-destructive">
              *
            </span>
          ) : null}
        </div>
      ) : null}
      <RadioGroupPrimitive
        {...props}
        ref={ref}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : props["aria-invalid"] || undefined}
        aria-labelledby={label ? labelId : props["aria-labelledby"]}
        aria-describedby={describedBy}
        className={cn("flex gap-3", orientation === "vertical" ? "flex-col" : "flex-row flex-wrap")}
      >
        {options
          ? options.map((opt, index) => {
              const optionId = `${groupId}-option-${index}`;
              return (
                <label key={opt.value} className={cn("flex items-start gap-2.5 text-sm", opt.disabled && "opacity-45")}>
                  <Radio.Root
                    value={opt.value}
                    disabled={opt.disabled}
                    aria-labelledby={`${optionId}-label`}
                    aria-describedby={opt.description ? `${optionId}-description` : undefined}
                    className="surface-inset mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-field outline-none transition-[background-color,box-shadow] duration-[var(--duration-ui)] focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[checked]:bg-primary"
                  >
                    <Radio.Indicator className="size-2 rounded-full bg-primary-foreground data-[unchecked]:hidden" />
                  </Radio.Root>
                  <span className="grid gap-0.5">
                    <span id={`${optionId}-label`} className="font-medium leading-none text-foreground">
                      {opt.label}
                    </span>
                    {opt.description ? (
                      <span id={`${optionId}-description`} className="text-xs text-muted-foreground">
                        {opt.description}
                      </span>
                    ) : null}
                  </span>
                </label>
              );
            })
          : children}
      </RadioGroupPrimitive>
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
