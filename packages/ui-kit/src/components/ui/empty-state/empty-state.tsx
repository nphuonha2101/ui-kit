import * as React from "react";
import { cn, type IconComponent } from "../../../lib/utils";

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: IconComponent;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  size?: "sm" | "default";
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  size = "default",
  className,
  ...props
}: EmptyStateProps) {
  const compact = size === "sm";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        compact ? "gap-2 py-6" : "gap-3 py-10",
        className,
      )}
      {...props}
    >
      {Icon ? (
        <span
          className={cn(
            "flex items-center justify-center rounded-full bg-surface text-muted-foreground",
            compact ? "size-10" : "size-12",
          )}
        >
          <Icon size={compact ? 18 : 22} />
        </span>
      ) : null}
      <div className="grid gap-1">
        <h3
          className={cn(
            "font-semibold tracking-[-0.01em] text-foreground",
            compact ? "text-sm" : "text-base",
          )}
        >
          {title}
        </h3>
        {description ? (
          <p className="mx-auto max-w-sm text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  );
}
