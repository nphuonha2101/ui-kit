"use client";

import * as React from "react";
import { cn, type IconComponent } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";
import { IconButton } from "../icon-button";
import { Sheet } from "../sheet";
import type { DesktopNavItem } from "../desktop-nav";

export type MobileNavItem = DesktopNavItem;

export interface MobileNavProps {
  /**
   * Navigation items. Items with children render as collapsible groups and can nest further.
   * @type MobileNavItem[]
   */
  items: MobileNavItem[];
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  /** Called when the menu opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Controlled active value. */
  value?: string;
  /** Uncontrolled initial active value. */
  defaultValue?: string;
  /** Called when a leaf item is selected. */
  onValueChange?: (value: string) => void;
  /** Custom trigger. Defaults to an IconButton with a menu icon. */
  trigger?: React.ReactElement;
  /** Brand or page mark shown above the menu. */
  logo?: React.ReactNode;
  /** Optional visible menu title. */
  title?: React.ReactNode;
  /** Optional supporting copy. */
  description?: React.ReactNode;
  /** Extra content below the navigation, such as account or theme controls. */
  children?: React.ReactNode;
  /** Actions rendered at the bottom of the menu. */
  footer?: React.ReactNode;
  /** Panel edge. */
  side?: "right" | "left" | "bottom";
  className?: string;
  /** Accessible name when no visible title is provided. */
  "aria-label"?: string;
}

function containsValue(item: MobileNavItem, value?: string): boolean {
  if (!value) return false;
  if (item.value === value) return true;
  return item.children?.some((child) => containsValue(child, value)) ?? false;
}

function NavBadge({
  badge,
  active,
}: {
  badge: React.ReactNode;
  active: boolean;
}) {
  return (
    <span
      className={cn(
        "ml-auto rounded-pill px-1.5 py-0.5 text-[10px] font-semibold leading-4",
        active
          ? "bg-card text-foreground"
          : "bg-surface-hover text-muted-foreground",
      )}
    >
      {badge}
    </span>
  );
}

function MobileNavLeaf({
  item,
  activeValue,
  onSelect,
  depth,
}: {
  item: MobileNavItem;
  activeValue?: string;
  onSelect: (value: string) => void;
  depth: number;
}) {
  const active = item.value === activeValue;
  const Icon: IconComponent | undefined =
    (active && item.activeIcon) || item.icon;
  const className = cn(
    "flex min-h-10 w-full items-center gap-2 rounded-control px-3 text-left text-sm transition-colors duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] hover:bg-surface",
    active
      ? "bg-primary-soft font-medium text-primary-soft-foreground"
      : depth === 0
        ? "text-foreground"
        : "text-muted-foreground",
    item.disabled && "pointer-events-none opacity-45",
  );
  const content = (
    <>
      {Icon ? (
        <Icon
          size={17}
          className={cn(
            "shrink-0",
            active ? "text-primary-soft-foreground" : "text-muted-foreground",
          )}
        />
      ) : null}
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {item.badge != null ? (
        <NavBadge badge={item.badge} active={active} />
      ) : null}
    </>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        aria-current={active ? "page" : undefined}
        aria-disabled={item.disabled || undefined}
        tabIndex={item.disabled ? -1 : undefined}
        className={className}
        onClick={(event) => {
          if (item.disabled) {
            event.preventDefault();
            return;
          }
          onSelect(item.value);
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={item.disabled}
      aria-current={active ? "page" : undefined}
      className={className}
      onClick={() => onSelect(item.value)}
    >
      {content}
    </button>
  );
}

function MobileNavGroup({
  item,
  activeValue,
  onSelect,
  depth,
}: {
  item: MobileNavItem;
  activeValue?: string;
  onSelect: (value: string) => void;
  depth: number;
}) {
  const [open, setOpen] = React.useState(false);
  const ChevronDownIcon = useKitIcon("chevronDown");
  const Icon = item.icon;
  const subtreeActive = containsValue(item, activeValue);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        aria-expanded={open}
        disabled={item.disabled}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "flex min-h-10 w-full items-center gap-2 rounded-control px-3 text-left text-sm font-medium transition-colors duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] hover:bg-surface disabled:pointer-events-none disabled:opacity-45",
          subtreeActive ? "text-foreground" : "text-foreground",
        )}
      >
        {Icon ? (
          <Icon size={17} className="shrink-0 text-muted-foreground" />
        ) : null}
        <span className="min-w-0 flex-1 truncate">{item.label}</span>
        {item.badge != null ? (
          <NavBadge badge={item.badge} active={subtreeActive} />
        ) : null}
        <ChevronDownIcon
          size={15}
          className={cn(
            "shrink-0 text-muted-foreground transition-transform duration-[var(--duration-ui)] ease-[var(--ease-out-ui)]",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pt-1">
            <MobileNavItems
              items={item.children ?? []}
              activeValue={activeValue}
              onSelect={onSelect}
              depth={depth + 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileNavItems({
  items,
  activeValue,
  onSelect,
  depth = 0,
}: {
  items: MobileNavItem[];
  activeValue?: string;
  onSelect: (value: string) => void;
  depth?: number;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5",
        depth > 0 && "ml-3 border-l border-border/60 pl-3",
      )}
    >
      {items.map((item) =>
        item.children?.length ? (
          <MobileNavGroup
            key={item.value}
            item={item}
            activeValue={activeValue}
            onSelect={onSelect}
            depth={depth}
          />
        ) : (
          <MobileNavLeaf
            key={item.value}
            item={item}
            activeValue={activeValue}
            onSelect={onSelect}
            depth={depth}
          />
        ),
      )}
    </div>
  );
}

export function MobileNav({
  items,
  open,
  defaultOpen,
  onOpenChange,
  value,
  defaultValue,
  onValueChange,
  trigger,
  logo,
  title,
  description,
  children,
  footer,
  side = "right",
  className,
  "aria-label": ariaLabel = "Menu",
}: MobileNavProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? false);
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const activeValue = value ?? uncontrolledValue;
  const sheetOpen = open ?? uncontrolledOpen;
  const MenuIcon = useKitIcon("menu");

  const setSheetOpen = (next: boolean) => {
    if (open === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const select = (next: string) => {
    if (value === undefined) setUncontrolledValue(next);
    onValueChange?.(next);
    setSheetOpen(false);
  };

  return (
    <Sheet
      open={sheetOpen}
      onOpenChange={setSheetOpen}
      trigger={
        trigger ?? (
          <IconButton aria-label="Open menu" variant="ghost" size="icon">
            <MenuIcon size={18} />
          </IconButton>
        )
      }
      header={logo}
      title={title}
      description={description}
      footer={footer}
      side={side}
      className={className}
      aria-label={title ? undefined : ariaLabel}
    >
      <nav aria-label="Mobile navigation">
        <MobileNavItems
          items={items}
          activeValue={activeValue}
          onSelect={select}
        />
      </nav>
      {children ? <div className="mt-6">{children}</div> : null}
    </Sheet>
  );
}
