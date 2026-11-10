"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

/**
 * @docs htmlFor Associates the label with a control.
 * @docs children Label content.
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Shows a required asterisk. */
  requiredMark?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, requiredMark, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-medium leading-none text-foreground", className)}
      {...props}
    >
      {children}
      {requiredMark ? (
        <span aria-hidden="true" className="ml-0.5 text-destructive">
          *
        </span>
      ) : null}
    </label>
  ),
);
Label.displayName = "Label";
