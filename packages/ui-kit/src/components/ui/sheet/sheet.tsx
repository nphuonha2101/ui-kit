"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "../../../lib/utils";
import { IconButton } from "../icon-button";
import { useKitIcon } from "../_shared/icon-provider";
import { kitScope } from "../_shared/scope";

export interface SheetProps {
  /** Controlled open state. */
  open?: boolean;
  defaultOpen?: boolean;
  /** Called when the sheet opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Element that opens the sheet. */
  trigger?: React.ReactElement;
  /** Optional content above the title, e.g. a brand logo. */
  header?: React.ReactNode;
  /** Sheet title. */
  title?: React.ReactNode;
  /** Accessible name when the sheet has no visible title. */
  "aria-label"?: string;
  /** Supporting description. */
  description?: React.ReactNode;
  children: React.ReactNode;
  /** Actions rendered at the bottom. */
  footer?: React.ReactNode;
  /** Panel edge. */
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
  header,
  title,
  description,
  children,
  footer,
  side = "right",
  className,
  showClose = true,
  "aria-label": ariaLabel,
}: SheetProps) {
  const CloseIcon = useKitIcon("close");
  return (
    <DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger ? <DialogPrimitive.Trigger render={trigger} /> : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop {...kitScope} className="fixed inset-0 z-50 bg-overlay backdrop-blur-[2px] transition-opacity duration-[var(--duration-ui-slow)] data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
        <DialogPrimitive.Popup
          {...kitScope}
          aria-label={ariaLabel}
          className={cn(
            "surface-curved fixed z-50 flex flex-col gap-5 bg-popover p-6 text-popover-foreground shadow-[var(--shadow-overlay)] outline-none",
            "transition-transform duration-[var(--duration-ui-slow)] ease-[var(--ease-out-ui)]",
            sideStyles[side],
            className,
          )}
        >
          {(header || title || description || showClose) && (
            <div className="flex items-start justify-between gap-4">
              <div className="grid min-w-0 flex-1 gap-1">
                {header ? <div>{header}</div> : null}
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
