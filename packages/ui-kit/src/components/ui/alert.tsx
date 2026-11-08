import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, type IconComponent } from "../../lib/utils";

const alertVariants = cva(
  "surface-curved-soft relative flex w-full items-start gap-3 rounded-card px-4 py-3.5 text-sm",
  {
    variants: {
      variant: {
        neutral: "bg-surface text-foreground",
        info: "bg-info/10 text-foreground",
        success: "bg-success/10 text-foreground",
        warning: "bg-warning/12 text-foreground",
        danger: "bg-destructive/10 text-foreground",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

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

export { alertVariants };
