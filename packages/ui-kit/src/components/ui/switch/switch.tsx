"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn, hasErrorContent } from "../../../lib/utils";

/**
 * @docs checked Controlled checked state.
 * @docs defaultChecked Initial checked state.
 * @docs disabled Disables the switch.
 */
export interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, "children"> {
  /** Visible label. */
  label?: React.ReactNode;
  /** Helper text. */
  description?: React.ReactNode;
  /** Error message and invalid state. */
  error?: React.ReactNode;
  /** Marks the label and native input as required. */
  required?: boolean;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      label,
      description,
      error,
      required,
      id,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) => {
    const autoId = React.useId();
    const controlId = id ?? autoId;
    const hasErrorMessage = hasErrorContent(error);
    const descriptionId = description ? `${controlId}-description` : undefined;
    const errorId = hasErrorMessage ? `${controlId}-error` : undefined;
    const describedBy =
      [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(" ") ||
      undefined;
    const invalid = Boolean(error) || Boolean(ariaInvalid);
    const control = (
      <SwitchPrimitive.Root
        ref={ref}
        id={controlId}
        required={required}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={cn(
          "surface-curved-soft relative peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-pill bg-muted-foreground/30 p-0.5 transition-[background-color] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[checked]:bg-primary disabled:cursor-not-allowed disabled:opacity-45",
          invalid && "bg-destructive/20 data-[checked]:bg-destructive",
          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb className="surface-curved-pill relative pointer-events-none block h-5 w-7 rounded-pill bg-switch-thumb shadow-[var(--shadow-raised)] transition-[transform,width] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] data-[checked]:translate-x-3 data-[unchecked]:translate-x-0 motion-safe:active:w-8 data-[checked]:motion-safe:active:translate-x-2" />
      </SwitchPrimitive.Root>
    );
    if (!label && !description && !hasErrorMessage) return control;
    return (
      <div className="flex items-start gap-3">
        {control}
        <div className="grid gap-0.5 pt-0.5">
          {label ? (
            <label htmlFor={controlId} className="cursor-pointer text-sm font-medium leading-none text-foreground">
              {label}
              {required ? (
                <span aria-hidden="true" className="ml-0.5 text-destructive">
                  *
                </span>
              ) : null}
            </label>
          ) : null}
          {description ? <p id={descriptionId} className="text-xs text-muted-foreground">{description}</p> : null}
          {hasErrorMessage ? (
            <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    );
  },
);
Switch.displayName = "Switch";
