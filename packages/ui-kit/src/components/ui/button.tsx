"use client";

import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "./spinner";
import { cn, type IconComponent } from "../../lib/utils";

const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold tracking-[-0.01em] transition-[background-color,color,box-shadow,transform] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45 data-[loading]:opacity-80 motion-safe:active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "surface-curved bg-primary text-primary-foreground shadow-[var(--shadow-raised)] hover:bg-primary-hover active:bg-primary-active",
        secondary:
          "surface-curved-soft bg-field text-field-foreground hover:bg-field-hover",
        outline:
          "bg-transparent text-foreground shadow-[inset_0_0_0_1.5px_var(--border)] hover:bg-surface",
        ghost:
          "bg-transparent text-foreground hover:bg-surface active:bg-surface-hover",
        danger:
          "surface-curved bg-destructive text-destructive-foreground shadow-[var(--shadow-raised)] hover:bg-destructive/90",
        soft:
          "surface-curved-soft bg-primary-soft text-primary-soft-foreground hover:bg-primary-soft/75",
      },
      size: {
        sm: "h-9 px-3.5 text-[13px]",
        default: "h-10 px-4",
        lg: "h-11 px-5 text-[15px]",
        icon: "size-10 p-0",
        "icon-sm": "size-9 p-0",
      },
      shape: {
        rounded: "rounded-control",
        pill: "rounded-pill",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      shape: "rounded",
    },
  },
);

export interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
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

export { buttonVariants };
