"use client";

import * as React from "react";
import { cn, type IconComponent } from "../../../lib/utils";

export interface DesktopNavItem {
  value: string;
  label: React.ReactNode;
  icon?: IconComponent;
  activeIcon?: IconComponent;
  href?: string;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface DesktopNavProps
  extends Omit<React.ComponentPropsWithoutRef<"nav">, "onChange"> {
  items: DesktopNavItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const DesktopNav = React.forwardRef<HTMLElement, DesktopNavProps>(
  (
    {
      items,
      value,
      defaultValue,
      onValueChange,
      className,
      "aria-label": ariaLabel = "Desktop navigation",
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const activeValue = value ?? uncontrolledValue;

    const select = (next: string) => {
      if (value === undefined) setUncontrolledValue(next);
      onValueChange?.(next);
    };

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          // Keep `relative`: surface-curved-soft paints an absolute ::before rim,
          // which otherwise anchors to the nearest positioned ancestor.
          "surface-curved-soft relative scrollbar-none inline-flex max-w-full items-center gap-0.5 overflow-x-auto rounded-pill bg-surface p-1",
          className,
        )}
        {...props}
      >
        {items.map((item) => {
          const active = item.value === activeValue;
          const Icon = (active && item.activeIcon) || item.icon;
          const content = (
            <>
              {Icon ? <Icon size={15} className="shrink-0" /> : null}
              <span className="whitespace-nowrap">{item.label}</span>
              {item.badge != null ? (
                <span
                  className={cn(
                    "ml-0.5 inline-flex min-w-4 items-center justify-center rounded-pill px-1 text-[10px] font-semibold leading-4",
                    active
                      ? "bg-primary-soft text-primary-soft-foreground"
                      : "bg-surface-hover text-muted-foreground",
                  )}
                >
                  {item.badge}
                </span>
              ) : null}
            </>
          );

          const itemClassName = cn(
            "relative inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-pill px-3.5 text-sm font-medium outline-none transition-[background-color,color,box-shadow] duration-[var(--duration-ui)]",
            "focus-visible:ring-2 focus-visible:ring-ring/40",
            active
              ? "surface-curved bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:bg-card/60 hover:text-foreground",
            item.disabled && "pointer-events-none opacity-45",
          );

          if (item.href) {
            return (
              <a
                key={item.value}
                href={item.href}
                aria-current={active ? "page" : undefined}
                aria-disabled={item.disabled || undefined}
                tabIndex={item.disabled ? -1 : undefined}
                className={itemClassName}
                onClick={(event) => {
                  if (item.disabled) {
                    event.preventDefault();
                    return;
                  }
                  select(item.value);
                }}
              >
                {content}
              </a>
            );
          }

          return (
            <button
              key={item.value}
              type="button"
              disabled={item.disabled}
              aria-current={active ? "page" : undefined}
              className={itemClassName}
              onClick={() => select(item.value)}
            >
              {content}
            </button>
          );
        })}
      </nav>
    );
  },
);
DesktopNav.displayName = "DesktopNav";
