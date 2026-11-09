"use client";

import * as React from "react";
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { cn, hasErrorContent } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";
import { Label } from "../label";

export interface NumberFieldProps {
  value?: number | null;
  defaultValue?: number;
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  largeStep?: number;
  smallStep?: number;
  format?: Intl.NumberFormatOptions;
  locale?: Intl.LocalesArgument;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  placeholder?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  className?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

export const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  function NumberField(
    {
      value,
      defaultValue,
      onValueChange,
      min,
      max,
      step,
      largeStep,
      smallStep,
      format,
      locale,
      disabled,
      readOnly,
      required,
      name,
      id,
      label,
      description,
      error,
      placeholder,
      onBlur,
      className,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
    },
    ref,
  ) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const hasErrorMessage = hasErrorContent(error);
  const errorId = hasErrorMessage ? `${inputId}-error` : undefined;
  const describedBy =
    [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error) || Boolean(ariaInvalid);
  const MinusIcon = useKitIcon("minus");
  const PlusIcon = useKitIcon("plus");

  const control = (
    <NumberFieldPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(next)}
      min={min}
      max={max}
      step={step}
      largeStep={largeStep}
      smallStep={smallStep}
      format={format}
      locale={locale}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      name={name}
      className="w-full"
    >
      <NumberFieldPrimitive.Group
        className={cn(
          "surface-inset flex h-10 w-full items-center gap-1 rounded-field bg-field px-1.5 text-field-foreground transition-[background-color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)]",
          "focus-within:ring-2 focus-within:ring-ring/35 focus-within:ring-offset-2 focus-within:ring-offset-background",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
          invalid && "bg-destructive/10 focus-within:ring-destructive/30",
        )}
      >
        <NumberFieldPrimitive.Decrement
          aria-label="Decrease value"
          className="flex size-7 shrink-0 items-center justify-center rounded-xs text-muted-foreground outline-none transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-40"
        >
          <MinusIcon size={14} />
        </NumberFieldPrimitive.Decrement>
        <NumberFieldPrimitive.Input
          ref={ref}
          id={inputId}
          onBlur={onBlur}
          aria-label={ariaLabel}
          aria-invalid={invalid || undefined}
          aria-describedby={
            [ariaDescribedBy, describedBy].filter(Boolean).join(" ") || undefined
          }
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-center text-sm tabular-nums text-field-foreground outline-none placeholder:text-muted-foreground/70"
        />
        <NumberFieldPrimitive.Increment
          aria-label="Increase value"
          className="flex size-7 shrink-0 items-center justify-center rounded-xs text-muted-foreground outline-none transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-40"
        >
          <PlusIcon size={14} />
        </NumberFieldPrimitive.Increment>
      </NumberFieldPrimitive.Group>
    </NumberFieldPrimitive.Root>
  );

  if (!label && !description && !hasErrorMessage) {
    return <div className={className}>{control}</div>;
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <Label htmlFor={inputId} requiredMark={required}>
          {label}
        </Label>
      ) : null}
      {control}
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
  },
);
NumberField.displayName = "NumberField";
