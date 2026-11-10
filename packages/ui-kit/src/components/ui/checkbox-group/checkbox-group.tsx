"use client";

import * as React from "react";
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import { cn, hasErrorContent } from "../../../lib/utils";
import { Checkbox } from "../checkbox";

export interface CheckboxGroupOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** Option entries: value, label, and optional description or disabled state. */
  options: CheckboxGroupOption[];
  /** Controlled list of selected option values. */
  value?: string[];
  /** Initial selection for an uncontrolled group. */
  defaultValue?: string[];
  /** Called with the next selected values. */
  onValueChange?: (value: string[]) => void;
  /** Visible group label. */
  label?: React.ReactNode;
  /** Helper text below the options. */
  description?: React.ReactNode;
  /** Error message and invalid state for the group. */
  error?: React.ReactNode;
  /** Marks the group as required. Validation stays with your form layer. */
  required?: boolean;
  /** Disables every checkbox in the group. */
  disabled?: boolean;
  /** Stack options or lay them out in a wrapping row. */
  orientation?: "vertical" | "horizontal";
  /** Name shared by the checkbox inputs for native form submission. */
  name?: string;
  id?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

export function CheckboxGroup({
  options,
  value,
  defaultValue,
  onValueChange,
  label,
  description,
  error,
  required,
  disabled,
  orientation = "vertical",
  name,
  id,
  className,
  ref,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
}: CheckboxGroupProps) {
  const autoId = React.useId();
  const groupId = id ?? autoId;
  const labelId = label !== undefined ? `${groupId}-label` : undefined;
  const hasErrorMessage = hasErrorContent(error);
  const descriptionId = description ? `${groupId}-description` : undefined;
  const errorId = hasErrorMessage ? `${groupId}-error` : undefined;
  const describedBy =
    [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error) || Boolean(ariaInvalid);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label !== undefined ? (
        <span id={labelId} className="text-sm font-medium leading-none text-foreground">
          {label}
          {required ? (
            <span aria-hidden="true" className="ml-0.5 text-destructive">
              *
            </span>
          ) : null}
        </span>
      ) : null}
      <CheckboxGroupPrimitive
        ref={ref}
        id={groupId}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next: string[]) => onValueChange?.(next)}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={
          [ariaLabelledBy, labelId].filter(Boolean).join(" ") || undefined
        }
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={cn(
          "flex",
          orientation === "vertical"
            ? "flex-col gap-2.5"
            : "flex-row flex-wrap gap-x-5 gap-y-2.5",
        )}
      >
        {options.map((option) => (
          <Checkbox
            key={option.value}
            name={name ?? option.value}
            value={option.value}
            label={option.label}
            description={option.description}
            disabled={option.disabled || disabled}
          />
        ))}
      </CheckboxGroupPrimitive>
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
