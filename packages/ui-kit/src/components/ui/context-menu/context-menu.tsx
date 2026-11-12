"use client";

import * as React from "react";
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { cn, type IconComponent } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";
import { kitScope } from "../_shared/scope";

export interface ContextMenuItemEntry {
  type?: "item";
  value?: string;
  label: React.ReactNode;
  icon?: IconComponent;
  shortcut?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onSelect?: () => void;
}

export interface ContextMenuSeparatorEntry {
  type: "separator";
}

export interface ContextMenuLabelEntry {
  type: "label";
  label: React.ReactNode;
}

export interface ContextMenuGroupEntry {
  type: "group";
  label?: React.ReactNode;
  items: ContextMenuEntry[];
}

export interface ContextMenuSubmenuEntry {
  type: "submenu";
  label: React.ReactNode;
  icon?: IconComponent;
  disabled?: boolean;
  items: ContextMenuEntry[];
}

export type ContextMenuEntry =
  | ContextMenuItemEntry
  | ContextMenuSeparatorEntry
  | ContextMenuLabelEntry
  | ContextMenuGroupEntry
  | ContextMenuSubmenuEntry;

export interface ContextMenuProps {
  /** Area that opens the menu on right click (or long press on touch). */
  children: React.ReactNode;
  /** Menu entries: items, separators, labels, groups and submenus. */
  items: ContextMenuEntry[];
  /** Preferred side of the cursor. */
  side?: "top" | "bottom" | "left" | "right";
  /** Alignment against the cursor. */
  align?: "start" | "center" | "end";
  /** Gap between the cursor and the popup. */
  sideOffset?: number;
  /** Additional classes for the trigger wrapper. */
  triggerClassName?: string;
  /** Additional classes for the popup. */
  className?: string;
  /** Accessible name for the menu popup. */
  "aria-label"?: string;
}

const popupClassName =
  "surface-curved relative min-w-48 max-w-72 rounded-overlay bg-popover p-1.5 text-popover-foreground shadow-[var(--shadow-overlay)] outline-none origin-[var(--transform-origin)] transition-[opacity,transform] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] data-[starting-style]:opacity-0 data-[starting-style]:scale-[0.97] data-[ending-style]:opacity-0 data-[ending-style]:scale-[0.97]";

const itemClassName =
  "flex cursor-default select-none items-center gap-2.5 rounded-control px-2.5 py-2 text-sm outline-none transition-colors duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] data-[highlighted]:bg-surface data-[disabled]:pointer-events-none data-[disabled]:opacity-45";

export function ContextMenu({
  children,
  items,
  side = "bottom",
  align = "center",
  sideOffset = 6,
  triggerClassName,
  className,
  "aria-label": ariaLabel,
}: ContextMenuProps) {
  const ChevronRightIcon = useKitIcon("chevronRight");

  const renderEntries = (entries: ContextMenuEntry[]): React.ReactNode =>
    entries.map((entry, index) => {
      const key = `${entry.type ?? "item"}-${index}`;

      if (entry.type === "separator") {
        return (
          <ContextMenuPrimitive.Separator
            key={key}
            className="my-1 h-px bg-border"
          />
        );
      }

      if (entry.type === "label") {
        return (
          <ContextMenuPrimitive.Group key={key}>
            <ContextMenuPrimitive.GroupLabel className="px-2.5 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {entry.label}
            </ContextMenuPrimitive.GroupLabel>
          </ContextMenuPrimitive.Group>
        );
      }

      if (entry.type === "group") {
        return (
          <ContextMenuPrimitive.Group key={key}>
            {entry.label !== undefined ? (
              <ContextMenuPrimitive.GroupLabel className="px-2.5 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {entry.label}
              </ContextMenuPrimitive.GroupLabel>
            ) : null}
            {renderEntries(entry.items)}
          </ContextMenuPrimitive.Group>
        );
      }

      if (entry.type === "submenu") {
        const Icon = entry.icon;
        return (
          <ContextMenuPrimitive.SubmenuRoot key={key}>
            <ContextMenuPrimitive.SubmenuTrigger
              disabled={entry.disabled}
              className={cn(itemClassName, "w-full text-left")}
            >
              {Icon ? (
                <Icon size={16} className="shrink-0 text-muted-foreground" />
              ) : null}
              <span className="flex-1 truncate">{entry.label}</span>
              <ChevronRightIcon size={14} className="shrink-0 text-muted-foreground" />
            </ContextMenuPrimitive.SubmenuTrigger>
            <ContextMenuPrimitive.Portal>
              <ContextMenuPrimitive.Positioner
                side="right"
                align="start"
                sideOffset={4}
                className="z-50 outline-none"
              >
                <ContextMenuPrimitive.Popup
                  {...kitScope}
                  className={cn(popupClassName, className)}
                >
                  {renderEntries(entry.items)}
                </ContextMenuPrimitive.Popup>
              </ContextMenuPrimitive.Positioner>
            </ContextMenuPrimitive.Portal>
          </ContextMenuPrimitive.SubmenuRoot>
        );
      }

      const Icon = entry.icon;
      return (
        <ContextMenuPrimitive.Item
          key={key}
          disabled={entry.disabled}
          onClick={() => entry.onSelect?.()}
          className={cn(
            itemClassName,
            entry.danger &&
              "text-destructive data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive",
          )}
        >
          {Icon ? (
            <Icon
              size={16}
              className={cn(
                "shrink-0",
                entry.danger ? "text-destructive" : "text-muted-foreground",
              )}
            />
          ) : null}
          <span className="flex-1 truncate">{entry.label}</span>
          {entry.shortcut !== undefined ? (
            <span className="ml-4 shrink-0 text-[11px] font-medium tracking-wide text-muted-foreground">
              {entry.shortcut}
            </span>
          ) : null}
        </ContextMenuPrimitive.Item>
      );
    });

  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger className={triggerClassName}>
        {children}
      </ContextMenuPrimitive.Trigger>
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          className="z-50 outline-none"
        >
          <ContextMenuPrimitive.Popup
            {...kitScope}
            aria-label={ariaLabel}
            className={cn(popupClassName, className)}
          >
            {renderEntries(items)}
          </ContextMenuPrimitive.Popup>
        </ContextMenuPrimitive.Positioner>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  );
}
