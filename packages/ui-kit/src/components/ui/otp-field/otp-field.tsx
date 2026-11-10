"use client";

import * as React from "react";
import { OTPField as OTPFieldPrimitive } from "@base-ui/react/otp-field";
import { cn, hasErrorContent } from "../../../lib/utils";

const slotSizes = {
  default: "size-11 text-base",
  lg: "size-12 text-lg",
} as const;

export interface OTPFieldProps {
  /** Number of character slots. */
  length?: number;
  /** Controlled code value. */
  value?: string;
  /** Initial code for an uncontrolled field. */
  defaultValue?: string;
  /** Called with the current code on every edit. */
  onValueChange?: (value: string) => void;
  /** Called when all slots are filled or a complete code is pasted. */
  onValueComplete?: (value: string) => void;
  /** Visible label, linked to the first slot. */
  label?: React.ReactNode;
  /** Helper text below the slots. */
  description?: React.ReactNode;
  /** Error message and invalid state. */
  error?: React.ReactNode;
  /** Marks the label and native control as required. */
  required?: boolean;
  /** Disables every slot. */
  disabled?: boolean;
  /** Keeps the value visible but not editable. */
  readOnly?: boolean;
  /** Mask entered characters, useful for one-time PINs. */
  mask?: boolean;
  /** Name used when the owning form is submitted. */
  name?: string;
  /** Submit the owning form as soon as every slot is filled. */
  autoSubmit?: boolean;
  /** Slot size. */
  size?: keyof typeof slotSizes;
  id?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

export function OTPField({
  length = 6,
  value,
  defaultValue,
  onValueChange,
  onValueComplete,
  label,
  description,
  error,
  required,
  disabled,
  readOnly,
  mask,
  name,
  autoSubmit,
  size = "default",
  id,
  className,
  ref,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
}: OTPFieldProps) {
  const autoId = React.useId();
  const controlId = id ?? autoId;
  const labelId = label !== undefined ? `${controlId}-label` : undefined;
  const hasErrorMessage = hasErrorContent(error);
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = hasErrorMessage ? `${controlId}-error` : undefined;
  const describedBy =
    [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  const labelledBy =
    [ariaLabelledBy, labelId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error) || Boolean(ariaInvalid);

  return (
    <OTPFieldPrimitive.Root
      ref={ref}
      id={controlId}
      length={length}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(next)}
      onValueComplete={(next) => onValueComplete?.(next)}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      mask={mask}
      name={name}
      autoSubmit={autoSubmit}
      aria-required={required || undefined}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      className={cn("flex w-full flex-col gap-2", className)}
    >
      {label !== undefined ? (
        <label
          id={labelId}
          htmlFor={controlId}
          className="text-sm font-medium leading-none text-foreground"
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="ml-0.5 text-destructive">
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        {Array.from({ length }, (_, index) => (
          <OTPFieldPrimitive.Input
            key={index}
            aria-label={`Digit ${index + 1} of ${length}`}
            aria-invalid={invalid || undefined}
            aria-required={required || undefined}
            aria-describedby={describedBy}
            className={cn(
              "surface-inset rounded-field bg-field text-center font-semibold text-field-foreground transition-[background-color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] outline-none placeholder:text-muted-foreground/50 hover:bg-field-hover focus-visible:bg-field focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[filled]:bg-surface data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45 data-[readonly]:bg-surface",
              slotSizes[size],
              invalid && "bg-destructive/10 focus-visible:ring-destructive/30",
            )}
          />
        ))}
      </div>
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
    </OTPFieldPrimitive.Root>
  );
}
