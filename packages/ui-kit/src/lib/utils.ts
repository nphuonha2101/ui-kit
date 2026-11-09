import type * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

/** True when an error prop should render a message (not just the invalid state). */
export function hasErrorContent(error: React.ReactNode) {
  return Boolean(error) && typeof error !== "boolean";
}
