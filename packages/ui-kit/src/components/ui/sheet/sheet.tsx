"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "../../../lib/utils";
import { IconButton } from "../icon-button";
import { useKitIcon } from "../_shared/icon-provider";

export interface SheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactElement;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  side?: "right" | "left" | "bottom";
  className?: string;
  showClose?: boolean;
}

const sideStyles: Record<NonNullable<SheetProps["side"]>, string> = {
  right:
    "inset-y-2 right-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] max-w-md rounded-overlay data-[starting-style]:translate-x-[calc(100%+0.5rem)] data-[ending-style]:translate-x-[calc(100%+0.5rem)]",
  left:
    "inset-y-2 left-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] max-w-md rounded-overlay data-[starting-style]:-translate-x-[calc(100%+0.5rem)] data-[ending-style]:-translate-x-[calc(100%+0.5rem)]",
  bottom:
    "inset-x-2 bottom-2 max-h-[85vh] w-[calc(100%-1rem)] rounded-overlay data-[starting-style]:translate-y-[calc(100%+0.5rem)] data-[ending-style]:translate-y-[calc(100%+0.5rem)]",
};

export function Sheet({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  side = "right",
  className,
  showClose = true,
}: SheetProps) {
  const CloseIcon = useKitIcon("close");
  return (
    <DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger ? <DialogPrimitive.Trigger render={trigger} /> : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-overlay backdrop-blur-[2px] transition-opacity duration-[var(--duration-ui-slow)] data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
        <DialogPrimitive.Popup
          className={cn(
            "surface-curved fixed z-50 flex flex-col gap-5 bg-popover p-6 text-popover-foreground shadow-[var(--shadow-overlay)] outline-none",
            "transition-transform duration-[var(--duration-ui-slow)] ease-[var(--ease-out-ui)]",
            sideStyles[side],
            className,
          )}
        >
          {(title || description || showClose) && (
            <div className="flex items-start justify-between gap-4">
              <div className="grid gap-1">
                {title ? <DialogPrimitive.Title className="text-lg font-semibold tracking-[-0.02em] leading-tight">{title}</DialogPrimitive.Title> : null}
                {description ? <DialogPrimitive.Description className="text-sm leading-relaxed text-muted-foreground">{description}</DialogPrimitive.Description> : null}
              </div>
              {showClose ? (
                <DialogPrimitive.Close
                  render={<IconButton aria-label="Close" variant="ghost" size="icon-sm" className="-mr-2 -mt-2 shrink-0"><CloseIcon size={16} /></IconButton>}
                />
              ) : null}
            </div>
          )}
          <div className="-m-1 min-h-0 flex-1 overflow-auto p-1">{children}</div>
          {footer ? <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">{footer}</div> : null}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
