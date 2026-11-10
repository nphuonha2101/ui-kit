"use client";

import * as React from "react";
import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cn } from "../../../lib/utils";

const itemClass = cn(
  "inline-flex h-8 min-w-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-control px-2.5 text-sm font-medium text-muted-foreground transition-[background-color,color,box-shadow] duration-[var(--duration-ui)] outline-none select-none",
  "hover:bg-surface-hover hover:text-foreground",
  "focus-visible:ring-2 focus-visible:ring-ring/40",
  "data-[pressed]:surface-curved-soft data-[pressed]:bg-primary-soft data-[pressed]:text-primary-soft-foreground data-[pressed]:hover:bg-primary-soft/75",
  "disabled:cursor-not-allowed disabled:opacity-45 data-[disabled]:pointer-events-none data-[disabled]:opacity-45",
);

export interface ToolbarProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>,
    "className" | "orientation" | "disabled" | "loopFocus" | "aria-label"
  > {
  /** Surface treatment. */
  variant?: "surface" | "plain";
  /** Layout direction. */
  orientation?: "horizontal" | "vertical";
  /** Disables every control in the toolbar. */
  disabled?: boolean;
  /** Wraps keyboard focus at the ends. Defaults to true. */
  loopFocus?: boolean;
  /** Accessible name for the toolbar. */
  "aria-label"?: string;
  /** Additional classes for the toolbar. */
  className?: string;
}

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, orientation = "horizontal", variant = "surface", ...props }, ref) => (
    <ToolbarPrimitive.Root
      ref={ref}
      orientation={orientation}
      className={cn(
        "inline-flex",
        orientation === "vertical" ? "flex-col items-stretch" : "items-center",
        variant === "surface"
          ? "surface-curved-soft gap-0.5 rounded-control bg-surface p-1"
          : "gap-1",
        className,
      )}
      {...props}
    />
  ),
);
Toolbar.displayName = "Toolbar";

export interface ToolbarGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Group>, "className"> {
  /** Additional classes for the group. */
  className?: string;
}

export const ToolbarGroup = React.forwardRef<HTMLDivElement, ToolbarGroupProps>(
  ({ className, ...props }, ref) => (
    <ToolbarPrimitive.Group
      ref={ref}
      className={cn(
        "flex items-center gap-0.5 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        className,
      )}
      {...props}
    />
  ),
);
ToolbarGroup.displayName = "ToolbarGroup";

export interface ToolbarButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>, "className"> {
  /** Additional classes for the button. */
  className?: string;
}

export const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, type = "button", ...props }, ref) => (
    <ToolbarPrimitive.Button
      ref={ref}
      type={type}
      className={cn(itemClass, className)}
      {...props}
    />
  ),
);
ToolbarButton.displayName = "ToolbarButton";

export interface ToolbarToggleProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TogglePrimitive>, "className" | "render"> {
  /** Additional classes for the toggle. */
  className?: string;
}

export const ToolbarToggle = React.forwardRef<HTMLButtonElement, ToolbarToggleProps>(
  ({ className, ...props }, ref) => (
    <ToolbarPrimitive.Button
      ref={ref}
      render={<TogglePrimitive {...props} className={cn(itemClass, className)} />}
    />
  ),
);
ToolbarToggle.displayName = "ToolbarToggle";

export interface ToolbarLinkProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link>, "className"> {
  /** Additional classes for the link. */
  className?: string;
}

export const ToolbarLink = React.forwardRef<HTMLAnchorElement, ToolbarLinkProps>(
  ({ className, ...props }, ref) => (
    <ToolbarPrimitive.Link
      ref={ref}
      className={cn(
        "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-control px-2.5 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors outline-none hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring/40",
        className,
      )}
      {...props}
    />
  ),
);
ToolbarLink.displayName = "ToolbarLink";

export interface ToolbarInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Input>, "className"> {
  /** Additional classes for the input. */
  className?: string;
}

export const ToolbarInput = React.forwardRef<HTMLInputElement, ToolbarInputProps>(
  ({ className, ...props }, ref) => (
    <ToolbarPrimitive.Input
      ref={ref}
      className={cn(
        "surface-inset h-8 min-w-32 rounded-control bg-field px-2.5 text-sm text-field-foreground transition-[background-color,box-shadow] duration-[var(--duration-ui)] placeholder:text-muted-foreground/70 hover:bg-field-hover focus-visible:bg-field focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35 disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    />
  ),
);
ToolbarInput.displayName = "ToolbarInput";

export interface ToolbarSeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>, "className"> {
  /** Additional classes for the separator. */
  className?: string;
}

export const ToolbarSeparator = React.forwardRef<HTMLDivElement, ToolbarSeparatorProps>(
  ({ className, ...props }, ref) => (
    <ToolbarPrimitive.Separator
      ref={ref}
      className={cn(
        "shrink-0 bg-border",
        "data-[orientation=vertical]:mx-1 data-[orientation=vertical]:h-5 data-[orientation=vertical]:w-px",
        "data-[orientation=horizontal]:my-1 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        className,
      )}
      {...props}
    />
  ),
);
ToolbarSeparator.displayName = "ToolbarSeparator";
