"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "../../../lib/utils";

export interface TooltipProps {
  /** Tooltip text. */
  content: React.ReactNode;
  /** Trigger element. */
  children: React.ReactElement;
  /** Preferred placement. */
  side?: "top" | "bottom" | "left" | "right";
  /** Alignment along the trigger. */
  align?: "start" | "center" | "end";
  /** Open delay in milliseconds. */
  delay?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Tooltip({
  content,
  children,
  side = "top",
  align = "center",
  delay = 300,
  open,
  defaultOpen,
  onOpenChange,
}: TooltipProps) {
  if (content == null || content === "") return children;
  return (
    <TooltipPrimitive.Provider delay={delay}>
      <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger render={children} />
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Positioner side={side} align={align} sideOffset={6} className="z-50">
            <TooltipPrimitive.Popup
              role="tooltip"
              className={cn(
                "surface-curved relative z-50 max-w-xs rounded-sm bg-foreground px-2.5 py-1.5 text-xs font-medium text-background shadow-[var(--shadow-overlay)]",
                "origin-[var(--transform-origin)] transition-[opacity,transform] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)]",
                "data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
              )}
            >
              {content}
            </TooltipPrimitive.Popup>
          </TooltipPrimitive.Positioner>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
