"use client";

import { SpinnerIcon } from "@phosphor-icons/react";
import { cn } from "../../../lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<SVGSVGElement> {
  size?: number;
}

export function Spinner({ size = 18, className, ...props }: SpinnerProps) {
  return (
    <SpinnerIcon
      size={size}
      className={cn("animate-spin text-current", className)}
      aria-hidden="true"
      {...props}
    />
  );
}
