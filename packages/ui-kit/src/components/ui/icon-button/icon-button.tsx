"use client";

import * as React from "react";
import { Button, type ButtonProps } from "../button";
import { cn } from "../../../lib/utils";

/**
 * @docs disabled Disables the button.
 */
export interface IconButtonProps extends Omit<ButtonProps, "startIcon" | "endIcon" | "children"> {
  /** Required accessible name for the action. */
  "aria-label": string;
  children: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = "icon", shape = "rounded", children, ...props }, ref) => (
    <Button ref={ref} size={size} shape={shape} className={cn(className)} {...props}>
      {children}
    </Button>
  ),
);
IconButton.displayName = "IconButton";
