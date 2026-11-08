"use client";

import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Spinner } from "./spinner";
import { buttonVariants, type ButtonVariants } from "./button-variants";
import { cn, type IconComponent } from "../../lib/utils";

export interface ButtonProps extends ButtonPrimitive.Props, ButtonVariants {
  loading?: boolean;
  startIcon?: IconComponent;
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
        {children != null && children !== "" ? (
          <span className={cn("truncate", iconOnly && "sr-only")}>{children}</span>
        ) : null}
        {!loading && EndIcon ? <EndIcon size={16} className="shrink-0" /> : null}
      </ButtonPrimitive>
    );
  },
);
Button.displayName = "Button";
