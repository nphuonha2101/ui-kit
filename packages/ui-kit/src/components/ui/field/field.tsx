"use client";

import * as React from "react";
import { cn, hasErrorContent } from "../../../lib/utils";
import { Label } from "../label";

export interface FieldProps {
  /** Explicit control id. */
  id?: string;
  /** Visible label for the control. */
  label?: React.ReactNode;
  /** Helper text below the control. */
  description?: React.ReactNode;
  /** Error message; also marks the control invalid. */
  error?: React.ReactNode;
  /** Shows the required mark and forwards required to the control. */
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Field({ id, label, description, error, required, className, children }: FieldProps) {
  const autoId = React.useId();
  const controlId = id ?? autoId;
  const hasErrorMessage = hasErrorContent(error);
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = hasErrorMessage ? `${controlId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  const childId = React.isValidElement(children)
    ? ((children.props as { id?: string }).id ?? controlId)
    : controlId;
  const childRequired = React.isValidElement(children)
    ? (children.props as { required?: boolean }).required
    : undefined;
  const isRequired = required || childRequired;
  const childAriaInvalid = React.isValidElement(children)
    ? (children.props as { "aria-invalid"?: boolean })["aria-invalid"]
    : undefined;
  const resolvedAriaInvalid = error ? true : childAriaInvalid;

  const childDescribedBy = React.isValidElement(children)
    ? (children.props as { "aria-describedby"?: string })["aria-describedby"]
    : undefined;
  const mergedDescribedBy =
    [childDescribedBy, describedBy].filter(Boolean).join(" ") || undefined;

  const child = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        id: childId,
        ...(mergedDescribedBy ? { "aria-describedby": mergedDescribedBy } : {}),
        ...(resolvedAriaInvalid !== undefined
          ? { "aria-invalid": resolvedAriaInvalid }
          : {}),
        required: isRequired || undefined,
      })
    : children;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <Label htmlFor={childId} requiredMark={isRequired}>
          {label}
        </Label>
      ) : null}
      {child}
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
