"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "../../../lib/utils";

export interface PopoverProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Popover({
  trigger,
  children,
  title,
  description,
  side = "bottom",
  align = "center",
  open,
  defaultOpen,
  onOpenChange,
  className,
}: PopoverProps) {
  return (
    <PopoverPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger render={trigger} />
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner side={side} align={align} sideOffset={8}>
          <PopoverPrimitive.Popup
            className={cn(
              "surface-curved relative z-50 w-72 rounded-overlay bg-popover p-4 text-popover-foreground shadow-[var(--shadow-overlay)] outline-none",
              "origin-[var(--transform-origin)] transition-[opacity,transform] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)]",
              "data-[starting-style]:opacity-0 data-[starting-style]:scale-[0.97] data-[ending-style]:opacity-0 data-[ending-style]:scale-[0.97]",
              className,
            )}
          >
            {title ? <PopoverPrimitive.Title className="text-sm font-semibold leading-none">{title}</PopoverPrimitive.Title> : null}
            {description ? <PopoverPrimitive.Description className="mt-1 text-sm text-muted-foreground">{description}</PopoverPrimitive.Description> : null}
            <div className={cn((title || description) && "mt-3")}>{children}</div>
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
