"use client";

import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Spinner } from "../spinner";
import { buttonVariants, type ButtonVariants } from "./button-variants";
import { cn, type IconComponent } from "../../../lib/utils";

/**
 * @docs disabled Disables the button.
 */
export interface ButtonProps extends ButtonPrimitive.Props, ButtonVariants {
  /** Shows a spinner and disables interaction. */
  loading?: boolean;
  /** Icon rendered before the label. */
  startIcon?: IconComponent;
  /** Icon rendered after the label. */
  endIcon?: IconComponent;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      loading,
      startIcon: StartIcon,
      endIcon: EndIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const iconOnly = size === "icon" || size === "icon-sm";
    return (
      <ButtonPrimitive
        ref={ref}
        disabled={loading || disabled}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        className={cn(buttonVariants({ variant, size, shape }), className)}
        {...props}
      >
        {loading ? <Spinner size={16} className="shrink-0" /> : null}
        {!loading && StartIcon ? <StartIcon size={16} className="shrink-0" /> : null}
        {children != null && children !== "" && !(loading && iconOnly) ? (
          iconOnly ? (
            <span aria-hidden="true" className="inline-flex items-center justify-center">
              {children}
            </span>
          ) : (
            <span className="truncate">{children}</span>
          )
        ) : null}
        {!loading && EndIcon ? <EndIcon size={16} className="shrink-0" /> : null}
      </ButtonPrimitive>
    );
  },
);
Button.displayName = "Button";
