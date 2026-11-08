"use client";

import type * as React from "react";
import { Toaster as SonnerToaster, toast } from "sonner";
import { cn } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";

export interface ToasterIcons {
  success?: React.ReactNode;
  info?: React.ReactNode;
  warning?: React.ReactNode;
  error?: React.ReactNode;
  loading?: React.ReactNode;
  close?: React.ReactNode;
}

export interface ToasterProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
  theme?: "light" | "dark" | "system";
  richColors?: boolean;
  closeButton?: boolean;
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
            "surface-curved group relative font-sans !items-start !gap-3 !rounded-overlay !border-0 !px-4 !py-4 !text-sm !shadow-[var(--shadow-overlay)]",
            closeButton && "!pr-9",
            "!bg-[linear-gradient(to_bottom,var(--light-sheen-soft)_0%,transparent_28%,transparent_72%,var(--light-bottom)_100%)]",
            !richColors && "!bg-popover !text-popover-foreground",
            "focus-visible:!outline-2 focus-visible:!outline-offset-2 focus-visible:!outline-ring/40",
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
            "!left-auto !right-3 !top-3 !size-6 !transform-none !rounded-control !border-0 !bg-transparent !p-0 !text-muted-foreground hover:!bg-surface hover:!text-foreground focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-inset focus-visible:!ring-ring/50",
          actionButton:
            "!ml-auto !mr-0 !h-8 !self-center !rounded-control !border-0 !bg-primary !px-2.5 !text-xs !font-medium !text-primary-foreground hover:!bg-primary-hover",
          cancelButton:
            "!h-8 !self-center !rounded-control !border-0 !bg-surface !px-2.5 !text-xs !font-medium !text-foreground hover:!bg-surface-hover",
          success: richColors ? undefined : statusIconTone.success,
          info: richColors ? undefined : statusIconTone.info,
          warning: richColors ? undefined : statusIconTone.warning,
          error: richColors ? undefined : statusIconTone.error,
          loading: richColors ? undefined : statusIconTone.loading,
        },
      }}
    />
  );
}

export { toast };
