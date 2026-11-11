"use client";

import type * as React from "react";
import { Toaster as SonnerToaster, toast } from "sonner";
import { cn } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";
import { kitScope } from "../_shared/scope";

export interface ToasterIcons {
  success?: React.ReactNode;
  info?: React.ReactNode;
  warning?: React.ReactNode;
  error?: React.ReactNode;
  loading?: React.ReactNode;
  close?: React.ReactNode;
}

export interface ToasterProps {
  /** Screen corner for toasts. */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
  /** Toast appearance. */
  theme?: "light" | "dark" | "system";
  /** Use semantic colors for status toasts. */
  richColors?: boolean;
  /** Show a close button. */
  closeButton?: boolean;
  /** Custom status and close icons from any icon pack. */
  icons?: ToasterIcons;
}

const statusIconTone: Record<"success" | "info" | "warning" | "error" | "loading", string> = {
  success: "[&_[data-icon]]:text-success",
  info: "[&_[data-icon]]:text-info",
  warning: "[&_[data-icon]]:text-warning",
  error: "[&_[data-icon]]:text-destructive",
  loading: "[&_[data-icon]]:text-muted-foreground",
};

export function Toaster({
  position = "bottom-right",
  theme = "light",
  richColors = false,
  closeButton = true,
  icons,
}: ToasterProps) {
  const CloseIcon = useKitIcon("close");

  return (
    // display:contents keeps layout untouched while guaranteeing kit tokens
    // resolve even if <Toaster /> is mounted outside <div data-ui="kit">.
    <div {...kitScope} className="contents">
    <SonnerToaster
      position={position}
      theme={theme}
      richColors={richColors}
      closeButton={closeButton}
      icons={{ close: <CloseIcon size={14} />, ...icons }}
      toastOptions={{
        classNames: {
          toast: cn(
            // Sonner ships unlayered CSS, so kit utilities need `!` to win.
            // Sonner controls the toast height/transform, so its <li> cannot use
            // surface-curved's absolute ::before rim. Paint the same rim directly
            // on the element so it always follows the visible toast box.
            "group relative font-sans !items-start !gap-3 !rounded-overlay !border-0 !px-4 !py-4 !text-sm",
            closeButton && "!pr-9",
            "!bg-[linear-gradient(to_bottom,var(--light-sheen-soft)_0%,transparent_28%,transparent_72%,var(--light-bottom)_100%)]",
            !richColors && "!bg-popover !text-popover-foreground",
            "!shadow-[inset_0_1px_0_0_var(--light-top),inset_0_0_0_1px_rgb(255_255_255_/_0.08),inset_0_-1px_0_0_rgb(0_0_0_/_0.06),var(--shadow-overlay)]",
            "focus-visible:!outline-none data-[removed=true]:!outline-none data-[removed=true]:!ring-0",
          ),
          title: "!text-sm !font-medium !leading-5",
          description: cn(
            "!text-sm !leading-5",
            richColors ? "!text-inherit" : "!text-muted-foreground",
          ),
          content: "!gap-0.5",
          icon: "!mx-0 !mt-0.5 !size-[18px] [&_svg]:size-[18px]",
          // 24px target: an inset ring stays compact instead of the 2px offset outline.
          closeButton:
            "!left-auto !right-3 !top-3 !size-6 !transform-none !rounded-control !border-0 !bg-transparent !p-0 !text-muted-foreground hover:!bg-surface hover:!text-foreground focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-inset focus-visible:!ring-ring/40 focus-visible:!text-foreground group-data-[removed=true]:focus-visible:!ring-0",
          actionButton:
            "!ml-auto !mr-0 !h-8 !self-center !rounded-control !border-0 !bg-primary !px-2.5 !text-xs !font-medium !text-primary-foreground transition-colors duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] hover:!bg-primary-hover",
          cancelButton:
            "!h-8 !self-center !rounded-control !border-0 !bg-surface !px-2.5 !text-xs !font-medium !text-foreground transition-colors duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] hover:!bg-surface-hover",
          success: richColors ? undefined : statusIconTone.success,
          info: richColors ? undefined : statusIconTone.info,
          warning: richColors ? undefined : statusIconTone.warning,
          error: richColors ? undefined : statusIconTone.error,
          loading: richColors ? undefined : statusIconTone.loading,
        },
      }}
    />
    </div>
  );
}

export { toast };
