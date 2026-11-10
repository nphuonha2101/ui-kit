"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";

/**
 * @docs className Extra classes.
 */
export interface SpinnerProps extends React.HTMLAttributes<SVGSVGElement> {
  /** Pixel size of the icon. */
  size?: number;
}

export function Spinner({ size = 18, className, ...props }: SpinnerProps) {
  const Icon = useKitIcon("spinner");
  return (
    <Icon
      size={size}
      className={cn("animate-spin text-current", className)}
      aria-hidden="true"
      {...props}
    />
  );
}
