"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "../../../lib/utils";
import { IconButton } from "../icon-button";
import { useKitIcon } from "../_shared/icon-provider";
import { kitScope } from "../_shared/scope";

export interface DialogProps {
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial state. */
  defaultOpen?: boolean;
  /** Called when the dialog opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Element that opens the dialog. */
  trigger?: React.ReactElement;
  /** Dialog title. */
  title?: React.ReactNode;
  /** Supporting description. */
  description?: React.ReactNode;
  children: React.ReactNode;
  /** Actions rendered at the bottom. */
  footer?: React.ReactNode;
  className?: string;
  /** Shows the close icon button. */
  showClose?: boolean;
  "aria-label"?: string;
}

export function Dialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  className,
  showClose = true,
  "aria-label": ariaLabel,
}: DialogProps) {
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
            "surface-curved fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 grid-cols-1 gap-5 rounded-overlay bg-popover p-6 text-popover-foreground shadow-[var(--shadow-overlay)] outline-none",
            "transition-[opacity,transform] duration-[var(--duration-ui-slow)] ease-[var(--ease-out-ui)]",
            "data-[starting-style]:opacity-0 data-[starting-style]:-translate-x-1/2 data-[starting-style]:-translate-y-[47%] data-[starting-style]:scale-[0.97]",
            "data-[ending-style]:opacity-0 data-[ending-style]:-translate-x-1/2 data-[ending-style]:-translate-y-[47%] data-[ending-style]:scale-[0.97]",
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
          <div className="min-w-0">{children}</div>
          {footer ? <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">{footer}</div> : null}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
