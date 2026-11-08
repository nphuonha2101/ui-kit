import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { cn, type IconComponent } from "../../../lib/utils";
import { alertVariants } from "./alert-variants";

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  icon?: IconComponent;
}

const iconTone: Record<NonNullable<AlertProps["variant"]>, string> = {
  neutral: "text-muted-foreground",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-destructive",
};

export function Alert({ className, variant = "neutral", title, icon: Icon, children, ...props }: AlertProps) {
  return (
    <div role="status" className={cn(alertVariants({ variant }), className)} {...props}>
      {Icon ? <Icon size={18} className={cn("mt-0.5 shrink-0", iconTone[variant ?? "neutral"])} /> : null}
      <div className="min-w-0 flex-1">
        {title ? <div className="font-semibold leading-5 tracking-[-0.01em]">{title}</div> : null}
        {children ? <div className={cn("text-muted-foreground", title && "mt-0.5")}>{children}</div> : null}
      </div>
    </div>
  );
}
