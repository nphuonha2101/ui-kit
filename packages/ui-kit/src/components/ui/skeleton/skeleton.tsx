import * as React from "react";
import { cn } from "../../../lib/utils";

const variantClasses = {
  rect: "h-20 w-full rounded-control",
  text: "h-3.5 w-full rounded-pill",
  circle: "size-10 rounded-full",
} as const;

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variantClasses;
  lines?: number;
}

export function Skeleton({
  variant = "rect",
  lines = 1,
  className,
  ...props
}: SkeletonProps) {
  if (variant === "text" && lines > 1) {
    return (
      <div
        aria-hidden="true"
        className={cn("flex w-full flex-col gap-2", className)}
        {...props}
      >
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={cn(
              "h-3.5 animate-pulse rounded-pill bg-surface",
              index === lines - 1 ? "w-3/5" : "w-full",
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-surface",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
