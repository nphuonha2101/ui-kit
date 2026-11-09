"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cn } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "children"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: boolean;
  required?: boolean;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, label, description, error, required, id, ...props }, ref) => {
    const CheckIcon = useKitIcon("check");
    const MinusIcon = useKitIcon("minus");
    const autoId = React.useId();
    const controlId = id ?? autoId;
    const descriptionId = description ? `${controlId}-description` : undefined;
    const control = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={controlId}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error || undefined}
        aria-describedby={descriptionId}
        className={cn(
          "surface-inset peer inline-flex size-5 shrink-0 items-center justify-center rounded-xs bg-field text-primary-foreground transition-[background-color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[checked]:bg-primary data-[indeterminate]:bg-primary disabled:cursor-not-allowed disabled:opacity-45",
          error && "bg-destructive/15 data-[checked]:bg-destructive",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current data-[unchecked]:hidden">
          <CheckIcon size={13} className="in-data-[indeterminate]:hidden" />
          <MinusIcon size={13} className="hidden in-data-[indeterminate]:block" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
    if (!label && !description) return control;
    return (
      <div className="flex items-start gap-2.5">
        {control}
        <div className="grid gap-0.5 pt-0.5">
          {label ? (
            <label htmlFor={controlId} className="cursor-pointer text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-45">
              {label}
              {required ? (
                <span aria-hidden="true" className="ml-0.5 text-destructive">
                  *
                </span>
              ) : null}
            </label>
          ) : null}
          {description ? <p id={descriptionId} className="text-xs text-muted-foreground">{description}</p> : null}
        </div>
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
