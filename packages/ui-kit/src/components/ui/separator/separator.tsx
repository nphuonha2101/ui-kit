import * as React from "react";
import { cn } from "../../../lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Divider direction. */
  orientation?: "horizontal" | "vertical";
  /** Removes separator semantics when decorative. */
  decorative?: boolean;
}

export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}
