"use client";

import * as React from "react";
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { cn } from "../../../lib/utils";

export interface PreviewCardProps {
  /** Link or button that opens the preview card. */
  trigger: React.ReactElement;
  /** Preview content. */
  children: React.ReactNode;
  /** Preferred side of the trigger. */
  side?: "top" | "bottom" | "left" | "right";
  /** Alignment against the trigger. */
  align?: "start" | "center" | "end";
  /** Gap between the trigger and the card. */
  sideOffset?: number;
  /** Delay before the card opens on hover, in milliseconds. */
  delay?: number;
  /** Delay before the card closes after the pointer leaves, in milliseconds. */
  closeDelay?: number;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state for an uncontrolled card. */
  defaultOpen?: boolean;
  /** Called when the card opens or closes. */
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function PreviewCard({
  trigger,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  delay = 400,
  closeDelay = 200,
  open,
  defaultOpen,
  onOpenChange,
  className,
}: PreviewCardProps) {
  return (
    <PreviewCardPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(next) => onOpenChange?.(next)}
    >
      <PreviewCardPrimitive.Trigger
        render={trigger}
        delay={delay}
        closeDelay={closeDelay}
      />
      <PreviewCardPrimitive.Portal>
        <PreviewCardPrimitive.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          className="z-50"
        >
          <PreviewCardPrimitive.Popup
            className={cn(
              "surface-curved relative z-50 w-80 rounded-overlay bg-popover p-4 text-popover-foreground shadow-[var(--shadow-overlay)] outline-none",
              "origin-[var(--transform-origin)] transition-[opacity,transform] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)]",
              "data-[starting-style]:opacity-0 data-[starting-style]:scale-[0.97] data-[ending-style]:opacity-0 data-[ending-style]:scale-[0.97]",
              className,
            )}
          >
            {children}
          </PreviewCardPrimitive.Popup>
        </PreviewCardPrimitive.Positioner>
      </PreviewCardPrimitive.Portal>
    </PreviewCardPrimitive.Root>
  );
}
