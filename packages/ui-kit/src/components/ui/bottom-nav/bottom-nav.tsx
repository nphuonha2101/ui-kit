"use client";

import * as React from "react";
import { cn, type IconComponent } from "../../../lib/utils";

export interface BottomNavItem {
  value: string;
  label: React.ReactNode;
  icon: IconComponent;
  activeIcon?: IconComponent;
  href?: string;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface BottomNavProps
  extends Omit<React.ComponentPropsWithoutRef<"nav">, "onChange"> {
  items: BottomNavItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Pin the bar to the bottom of the viewport. */
  fixed?: boolean;
}

export const BottomNav = React.forwardRef<HTMLElement, BottomNavProps>(
  (
    {
      items,
      value,
      defaultValue,
      onValueChange,
      fixed = false,
      className,
      "aria-label": ariaLabel = "Bottom navigation",
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
          "surface-curved relative rounded-xl bg-card p-1.5 shadow-[var(--shadow-raised)]",
          fixed
            ? "fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-40 mx-auto max-w-md"
            : "w-full",
          className,
        )}
        {...props}
      >
        <div className="flex items-stretch gap-1">
          {items.map((item) => {
            const active = item.value === activeValue;
            const Icon = (active && item.activeIcon) || item.icon;
            const content = (
              <>
                <span
                  className={cn(
                    "relative flex h-7 min-w-12 items-center justify-center rounded-pill px-2.5 transition-[background-color,color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)]",
                    active
                      ? "surface-curved bg-primary text-primary-foreground shadow-[var(--shadow-raised)]"
                      : "text-muted-foreground group-hover:bg-surface group-hover:text-foreground",
                  )}
                >
                  <Icon size={18} />
                  {item.badge != null ? (
                    <span
                      className={cn(
                        "absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-pill px-1 text-[9px] font-semibold leading-4",
                        active
                          ? "bg-card text-foreground shadow-control"
                          : "bg-primary text-primary-foreground",
                      )}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </span>
                <span
                  className={cn(
                    "max-w-full truncate text-[10px] font-medium leading-none tracking-[-0.01em]",
                    active ? "font-semibold text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
              </>
            );

            const itemClassName = cn(
              "group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-1 py-1.5 outline-none transition-colors duration-[var(--duration-ui)]",
              "focus-visible:ring-2 focus-visible:ring-ring/40",
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
        </div>
      </nav>
    );
  },
);
BottomNav.displayName = "BottomNav";
