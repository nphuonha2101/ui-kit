"use client";

import * as React from "react";
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { cn, type IconComponent } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";

export interface CollapsibleProps {
  /** Visible trigger label. */
  title: React.ReactNode;
  /** Secondary line inside the trigger. */
  description?: React.ReactNode;
  /** Optional leading icon. */
  icon?: IconComponent;
  /** Panel content. */
  children: React.ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /**
   * Initial open state for an uncontrolled panel.
   * @default false
   */
  defaultOpen?: boolean;
  /** Called when the panel opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Disables the trigger. */
  disabled?: boolean;
  /** Surface treatment: card, separate card or bare disclosure. */
  variant?: "joined" | "separated" | "plain";
  className?: string;
  /** Additional classes for the panel content. */
  contentClassName?: string;
  "aria-label"?: string;
}

const panelStyles = {
  joined: "px-4 pb-4",
  separated: "px-4 pb-4",
  plain: "pt-2",
} as const;

const triggerStyles = {
  joined: "px-4 py-3.5",
  separated: "px-4 py-3.5",
  plain: "px-2 py-1.5",
} as const;

export function Collapsible({
  title,
  description,
  icon,
  children,
  open,
  defaultOpen,
  onOpenChange,
  disabled,
  variant = "joined",
  className,
  contentClassName,
  "aria-label": ariaLabel,
}: CollapsibleProps) {
  const ChevronDownIcon = useKitIcon("chevronDown");
  const Icon = icon;
  const surface = variant !== "plain";

  return (
    <CollapsiblePrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(next) => onOpenChange?.(next)}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "w-full",
        variant === "joined" &&
          "surface-curved relative overflow-hidden rounded-card bg-card shadow-[var(--shadow-soft)]",
        variant === "separated" &&
          "surface-curved relative overflow-hidden rounded-control bg-card shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <CollapsiblePrimitive.Trigger
        className={cn(
          "group/trigger flex w-full cursor-pointer items-center gap-3 text-left outline-none transition-[background-color] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] hover:bg-surface/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/35 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent",
          surface && "rounded-[inherit]",
          triggerStyles[variant],
        )}
      >
        {Icon ? <Icon size={17} className="shrink-0 text-muted-foreground" /> : null}
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-sm font-medium leading-snug text-foreground">{title}</span>
          {description ? (
            <span className="text-xs font-normal leading-snug text-muted-foreground">
              {description}
            </span>
          ) : null}
        </span>
        <ChevronDownIcon
          size={16}
          className="shrink-0 text-muted-foreground transition-transform duration-[var(--duration-ui-slow)] ease-[var(--ease-out-ui)] group-data-[panel-open]/trigger:rotate-180"
        />
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Panel
        className={cn(
          "collapsible-panel text-sm leading-relaxed text-muted-foreground",
          panelStyles[variant],
          contentClassName,
        )}
      >
        {children}
      </CollapsiblePrimitive.Panel>
    </CollapsiblePrimitive.Root>
  );
}
