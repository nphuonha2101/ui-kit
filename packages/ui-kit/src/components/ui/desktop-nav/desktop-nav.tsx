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
    const listRef = React.useRef<HTMLDivElement>(null);
    const [indicator, setIndicator] = React.useState({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      visible: false,
    });
    const [ready, setReady] = React.useState(false);
    const [animate, setAnimate] = React.useState(false);
    const itemKey = items.map((item) => item.value).join("|");

    React.useEffect(() => {
      if (!ready) return;
      const frame = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(frame);
    }, [ready]);

    React.useEffect(() => {
      const container = listRef.current;
      if (!container) return;

      let observed: HTMLElement | null = null;
      const update = () => {
        const activeItem = container.querySelector<HTMLElement>("[data-active]");
        if (!activeItem) {
          setIndicator((current) => ({ ...current, visible: false }));
          return;
        }
        if (activeItem !== observed) {
          if (observed) observer?.unobserve(observed);
          observer?.observe(activeItem);
          observed = activeItem;
        }
        if (!activeItem.offsetWidth || !activeItem.offsetHeight) {
          setIndicator((current) => ({ ...current, visible: false }));
          return;
        }
        setIndicator({
          left: activeItem.offsetLeft,
          top: activeItem.offsetTop,
          width: activeItem.offsetWidth,
          height: activeItem.offsetHeight,
          visible: true,
        });
        setReady(true);
      };

      const observer =
        typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
      observer?.observe(container);
      update();
      window.addEventListener("resize", update);
      return () => {
        observer?.disconnect();
        window.removeEventListener("resize", update);
      };
    }, [activeValue, itemKey]);

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
          // which otherwise anchors to the nearest positioned ancestor. The rim
          // must stay on this element so it does not scroll with the items.
          "surface-curved-soft relative inline-flex max-w-full rounded-pill bg-surface",
          className,
        )}
        {...props}
      >
        <div
          ref={listRef}
          className="scrollbar-none relative flex min-w-0 items-center gap-0.5 overflow-x-auto rounded-pill p-1"
        >
          <span
            aria-hidden
            className={cn(
              "surface-curved pointer-events-none absolute z-0 rounded-pill bg-card shadow-control",
              animate &&
                "transition-[left,top,width,height] duration-[var(--duration-ui-slow)] ease-[var(--ease-out-ui)]",
            )}
            style={{
              left: indicator.left,
              top: indicator.top,
              width: indicator.width,
              height: indicator.height,
              opacity: indicator.visible ? 1 : 0,
            }}
          />
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
                      "ml-0.5 inline-flex min-w-4 items-center justify-center rounded-pill px-1 text-[10px] font-semibold leading-4 transition-colors duration-[var(--duration-ui)] ease-[var(--ease-out-ui)]",
                      active
                        ? "bg-primary-soft text-primary-soft-foreground delay-[80ms] duration-[var(--duration-ui)]"
                        : "bg-surface-hover text-muted-foreground",
                    )}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </>
            );

            const itemClassName = cn(
              "relative z-10 inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-pill px-3.5 text-sm font-medium outline-none transition-[background-color,color,box-shadow] duration-[var(--duration-ui)]",
              "focus-visible:ring-2 focus-visible:ring-ring/40",
              active
                ? indicator.visible
                  ? "text-foreground transition-colors delay-[80ms] duration-[var(--duration-ui)]"
                  : "surface-curved bg-card text-foreground shadow-control"
                : "text-muted-foreground hover:bg-card/60 hover:text-foreground",
              item.disabled && "pointer-events-none opacity-45",
            );

            if (item.href) {
              return (
                <a
                  key={item.value}
                  href={item.href}
                  data-active={active || undefined}
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
                data-active={active || undefined}
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
DesktopNav.displayName = "DesktopNav";
