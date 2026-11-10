"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

/**
 * @docs placeholder Hint text when empty.
 * @docs rows Native textarea rows.
 * @docs disabled Disables the field.
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Applies the invalid visual state. */
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, "aria-invalid": ariaInvalid, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={error || ariaInvalid || undefined}
      className={cn(
        "surface-inset flex min-h-[96px] w-full resize-y rounded-field bg-field px-3.5 py-2.5 text-sm text-field-foreground transition-[background-color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] placeholder:text-muted-foreground/70 hover:bg-field-hover focus-visible:bg-field focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-45",
        (error || ariaInvalid) &&
          "bg-destructive/10 focus-visible:ring-destructive/30",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
