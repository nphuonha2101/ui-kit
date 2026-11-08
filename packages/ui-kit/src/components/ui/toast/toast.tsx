"use client";

import type * as React from "react";
import { Toaster as SonnerToaster, toast } from "sonner";

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

export function Toaster({
  position = "bottom-right",
  theme = "light",
  richColors = false,
  closeButton = true,
  icons,
}: ToasterProps) {
  return (
    <SonnerToaster
      position={position}
      theme={theme}
      richColors={richColors}
      closeButton={closeButton}
      icons={icons}
      toastOptions={{
        classNames: {
          toast:
            "surface-curved relative group rounded-overlay bg-popover text-popover-foreground shadow-[var(--shadow-overlay)]",
          title: "text-sm font-medium",
          description: "text-sm text-muted-foreground",
          actionButton: "rounded-control bg-primary text-primary-foreground text-xs font-medium",
          cancelButton: "rounded-control bg-surface text-foreground text-xs font-medium",
          closeButton: "border-border bg-card text-muted-foreground hover:text-foreground",
          success: "!border-success/25",
          error: "!border-destructive/25",
          warning: "!border-warning/25",
          info: "!border-info/25",
        },
      }}
    />
  );
}

export { toast };
