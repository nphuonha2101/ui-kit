"use client";

import * as React from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cn, type IconComponent } from "../../../lib/utils";
import { toggleVariants, type ToggleVariants } from "./toggle-variants";

/**
 * @docs pressed Controlled pressed state.
 * @docs defaultPressed Initial pressed state for an uncontrolled toggle.
 * @docs onPressedChange Called when the pressed state changes.
 * @docs disabled Disables the toggle.
 * @docsDefault defaultPressed false
 * @docsType onPressedChange (pressed: boolean) => void
 */
export interface ToggleProps extends TogglePrimitive.Props, ToggleVariants {
  /** Icon rendered before the label. */
  startIcon?: IconComponent;
  /** Icon rendered after the label. */
  endIcon?: IconComponent;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      startIcon: StartIcon,
      endIcon: EndIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const iconOnly = size === "icon" || size === "icon-sm";

    return (
      <TogglePrimitive
        ref={ref}
        className={cn(toggleVariants({ variant, size, shape }), className)}
        {...props}
      >
        {StartIcon ? <StartIcon size={16} className="shrink-0" /> : null}
        {children != null && children !== "" ? (
          iconOnly ? (
            <span aria-hidden="true" className="inline-flex items-center justify-center">
              {children}
            </span>
          ) : (
            <span className="truncate">{children}</span>
          )
        ) : null}
        {EndIcon ? <EndIcon size={16} className="shrink-0" /> : null}
      </TogglePrimitive>
    );
  },
);
Toggle.displayName = "Toggle";
