"use client";

import * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cn, type IconComponent } from "../../../lib/utils";
import { Button } from "../button";

export interface AlertDialogProps {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Called when the dialog opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Element that opens the dialog. */
  trigger?: React.ReactElement;
  /** Dialog title and accessible name. */
  title: React.ReactNode;
  /** Explanation of the consequence. */
  description?: React.ReactNode;
  children?: React.ReactNode;
  /** Confirm button label. */
  confirmLabel?: React.ReactNode;
  /** Cancel button label. */
  cancelLabel?: React.ReactNode;
  /** Called when the confirm button is pressed. */
  onConfirm?: () => void;
  /** Colors the icon well and confirm button. */
  tone?: "danger" | "default";
  /** Optional status icon. */
  icon?: IconComponent;
  /** Shows a spinner and disables the confirm button. */
  loading?: boolean;
  className?: string;
}

export function AlertDialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  tone = "danger",
  icon: Icon,
  loading = false,
  className,
}: AlertDialogProps) {
  return (
    <AlertDialogPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger ? <AlertDialogPrimitive.Trigger render={trigger} /> : null}
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-overlay backdrop-blur-[2px] transition-opacity duration-[var(--duration-ui-slow)] data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
        <AlertDialogPrimitive.Popup
          className={cn(
            "surface-curved fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-overlay bg-popover p-6 text-popover-foreground shadow-[var(--shadow-overlay)] outline-none",
            "transition-[opacity,transform] duration-[var(--duration-ui-slow)] ease-[var(--ease-out-ui)]",
            "data-[starting-style]:opacity-0 data-[starting-style]:-translate-x-1/2 data-[starting-style]:-translate-y-[47%] data-[starting-style]:scale-[0.97]",
            "data-[ending-style]:opacity-0 data-[ending-style]:-translate-x-1/2 data-[ending-style]:-translate-y-[47%] data-[ending-style]:scale-[0.97]",
            className,
          )}
        >
          <div className="flex items-start gap-3">
            {Icon ? (
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full",
                  tone === "danger"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-primary-soft text-primary-soft-foreground",
                )}
              >
                <Icon size={20} />
              </span>
            ) : null}
            <div className="grid gap-1">
              <AlertDialogPrimitive.Title className="text-lg font-semibold leading-tight tracking-[-0.02em]">
                {title}
              </AlertDialogPrimitive.Title>
              {description ? (
                <AlertDialogPrimitive.Description className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </AlertDialogPrimitive.Description>
              ) : null}
            </div>
          </div>

          {children ? <div className="min-w-0">{children}</div> : null}

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <AlertDialogPrimitive.Close
              render={<Button variant="secondary">{cancelLabel}</Button>}
            />
            <AlertDialogPrimitive.Close
              render={
                <Button
                  variant={tone === "danger" ? "danger" : "primary"}
                  loading={loading}
                  onClick={onConfirm}
                >
                  {confirmLabel}
                </Button>
              }
            />
          </div>
        </AlertDialogPrimitive.Popup>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
