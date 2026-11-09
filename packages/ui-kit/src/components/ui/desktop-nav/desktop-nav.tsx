"use client";

import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn, type IconComponent } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";

export interface DesktopNavItem {
  value: string;
  label: React.ReactNode;
  icon?: IconComponent;
  activeIcon?: IconComponent;
  href?: string;
  badge?: React.ReactNode;
  disabled?: boolean;
  /** Nested items rendered as a submenu. Supports multiple levels. */
  children?: DesktopNavItem[];
}

export interface DesktopNavProps
  extends Omit<React.ComponentPropsWithoutRef<"nav">, "onChange"> {
  items: DesktopNavItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const menuPopupClass =
  "surface-curved relative z-50 min-w-52 max-h-[min(70vh,360px)] origin-[var(--transform-origin)] overflow-y-auto rounded-overlay bg-popover p-1.5 text-popover-foreground shadow-[var(--shadow-overlay)] outline-none transition-[opacity,transform] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0 data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0";

const menuItemClass =
  "flex cursor-default select-none items-center gap-2 rounded-control px-2.5 py-2 text-sm text-foreground outline-none transition-colors duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] data-[highlighted]:bg-surface data-[disabled]:pointer-events-none data-[disabled]:opacity-45";

function containsValue(item: DesktopNavItem, value?: string): boolean {
  if (!value) return false;
  if (item.value === value) return true;
  return item.children?.some((child) => containsValue(child, value)) ?? false;
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

    const ChevronDownIcon = useKitIcon("chevronDown");
    const ChevronRightIcon = useKitIcon("chevronRight");

    const select = (next: string) => {
      if (value === undefined) setUncontrolledValue(next);
      onValueChange?.(next);
    };

    const renderMenuItems = (menuItems: DesktopNavItem[]): React.ReactNode =>
      menuItems.map((item) => {
        const itemActive = item.value === activeValue;
        const ItemIcon = (itemActive && item.activeIcon) || item.icon;
        const label = (
          <>
            {ItemIcon ? (
              <ItemIcon
                size={15}
                className={cn(
                  "shrink-0",
                  itemActive
                    ? "text-primary-soft-foreground"
                    : "text-muted-foreground",
                )}
              />
            ) : null}
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            {item.badge != null ? (
              <span
                className={cn(
                  "ml-auto rounded-pill px-1.5 py-0.5 text-[10px] font-semibold leading-4",
                  itemActive
                    ? "bg-card text-foreground"
                    : "bg-surface-hover text-muted-foreground",
                )}
              >
                {item.badge}
              </span>
            ) : null}
          </>
        );

        if (item.children?.length) {
          const subtreeActive = containsValue(item, activeValue);
          return (
            <MenuPrimitive.SubmenuRoot key={item.value}>
              <MenuPrimitive.SubmenuTrigger
                className={cn(
                  menuItemClass,
                  "justify-between",
                  subtreeActive && "text-foreground",
                )}
                disabled={item.disabled}
                openOnHover
                delay={100}
              >
                {label}
                <ChevronRightIcon
                  size={14}
                  className="ml-1 shrink-0 text-muted-foreground"
                />
              </MenuPrimitive.SubmenuTrigger>
              <MenuPrimitive.Portal>
                <MenuPrimitive.Positioner
                  sideOffset={6}
                  alignOffset={-4}
                  className="z-50 outline-none"
                >
                  <MenuPrimitive.Popup className={menuPopupClass}>
                    {renderMenuItems(item.children)}
                  </MenuPrimitive.Popup>
                </MenuPrimitive.Positioner>
              </MenuPrimitive.Portal>
            </MenuPrimitive.SubmenuRoot>
          );
        }

        const itemWithActive = cn(
          menuItemClass,
          itemActive && "bg-primary-soft font-medium text-primary-soft-foreground",
          item.disabled && "pointer-events-none opacity-45",
        );

        if (item.href) {
          return (
            <MenuPrimitive.LinkItem
              key={item.value}
              href={item.href}
              closeOnClick
              aria-current={itemActive ? "page" : undefined}
              aria-disabled={item.disabled || undefined}
              className={itemWithActive}
              onClick={(event) => {
                if (item.disabled) {
                  event.preventDefault();
                  return;
                }
                select(item.value);
              }}
            >
              {label}
            </MenuPrimitive.LinkItem>
          );
        }

        return (
          <MenuPrimitive.Item
            key={item.value}
            disabled={item.disabled}
            closeOnClick
            aria-current={itemActive ? "page" : undefined}
            className={itemWithActive}
            onClick={() => select(item.value)}
          >
            {label}
          </MenuPrimitive.Item>
        );
      });

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
            const active = containsValue(item, activeValue);
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
                {item.children?.length ? (
                  <ChevronDownIcon
                    size={13}
                    className="ml-0.5 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] group-data-[popup-open]:rotate-180"
                  />
                ) : null}
              </>
            );

            const itemClassName = cn(
              "group relative z-10 inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-pill px-3.5 text-sm font-medium outline-none transition-[background-color,color,box-shadow] duration-[var(--duration-ui)]",
              "focus-visible:ring-2 focus-visible:ring-ring/40",
              active
                ? indicator.visible
                  ? "text-foreground transition-colors delay-[80ms] duration-[var(--duration-ui)]"
                  : "surface-curved bg-card text-foreground shadow-control"
                : "text-muted-foreground hover:bg-card/60 hover:text-foreground",
              item.disabled && "pointer-events-none opacity-45",
            );

            if (item.children?.length) {
              return (
                <MenuPrimitive.Root key={item.value} modal={false}>
                  <MenuPrimitive.Trigger
                    data-active={active || undefined}
                    aria-current={active ? "page" : undefined}
                    className={itemClassName}
                    disabled={item.disabled}
                    openOnHover
                    delay={100}
                  >
                    {content}
                  </MenuPrimitive.Trigger>
                  <MenuPrimitive.Portal>
                    <MenuPrimitive.Positioner
                      sideOffset={6}
                      align="start"
                      className="z-50 outline-none"
                    >
                      <MenuPrimitive.Popup className={menuPopupClass}>
                        {renderMenuItems(item.children)}
                      </MenuPrimitive.Popup>
                    </MenuPrimitive.Positioner>
                  </MenuPrimitive.Portal>
                </MenuPrimitive.Root>
              );
            }

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
