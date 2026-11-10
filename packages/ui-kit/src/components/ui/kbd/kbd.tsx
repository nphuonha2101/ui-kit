import * as React from "react";
import { cn } from "../../../lib/utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /** Key cap height and type scale. */
  size?: "sm" | "default";
}

export function Kbd({ size = "default", className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "surface-curved-soft relative inline-flex items-center justify-center rounded-xs bg-card font-mono font-medium text-foreground shadow-[var(--shadow-soft)]",
        size === "sm" ? "h-5 min-w-5 px-1 text-[10px]" : "h-6 min-w-6 px-1.5 text-[11px]",
        className,
      )}
      {...props}
    />
  );
}

export function KbdGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}
