"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn, type IconComponent } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";

export interface AccordionItemData {
  value: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  content: React.ReactNode;
  icon?: IconComponent;
  disabled?: boolean;
}

export interface AccordionProps {
  /**
   * Panel entries: value, title, content, and optional description, icon or disabled.
   */
  items: AccordionItemData[];
  /** Controlled list of open item values. */
  value?: string[];
  /** Initial open items for an uncontrolled accordion. */
  defaultValue?: string[];
  /** Called when the open items change. */
  onValueChange?: (value: string[]) => void;
  /** Allow more than one panel to stay open. */
  multiple?: boolean;
  /** Disables every item in the accordion. */
  disabled?: boolean;
  /** Group panels in one surface or render each as its own card. */
  variant?: "joined" | "separated";
  /** Additional classes for the root element. */
  className?: string;
  "aria-label"?: string;
}

export function Accordion({
  items,
  value,
  defaultValue,
  onValueChange,
  multiple = false,
  disabled,
  variant = "joined",
  className,
  "aria-label": ariaLabel,
}: AccordionProps) {
  const ChevronDownIcon = useKitIcon("chevronDown");
  const joined = variant === "joined";

  return (
    <AccordionPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(next)}
      multiple={multiple}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "w-full",
        joined
          ? "surface-curved relative overflow-hidden rounded-card bg-card shadow-[var(--shadow-soft)]"
          : "flex flex-col gap-2",
        className,
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <AccordionPrimitive.Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={cn(
              joined
                ? "border-b border-border last:border-b-0"
                : "surface-curved relative overflow-hidden rounded-control bg-card shadow-[var(--shadow-soft)]",
            )}
          >
            <AccordionPrimitive.Header className="m-0">
              <AccordionPrimitive.Trigger
                className={cn(
                  "group/trigger flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left outline-none transition-[background-color] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] hover:bg-surface/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/35 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent",
                  !joined && "rounded-control",
                )}
              >
                {Icon ? (
                  <Icon size={17} className="shrink-0 text-muted-foreground" />
                ) : null}
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-sm font-medium leading-snug text-foreground">
                    {item.title}
                  </span>
                  {item.description ? (
                    <span className="text-xs font-normal leading-snug text-muted-foreground">
                      {item.description}
                    </span>
                  ) : null}
                </span>
                <ChevronDownIcon
                  size={16}
                  className="shrink-0 text-muted-foreground transition-transform duration-[var(--duration-ui-slow)] ease-[var(--ease-out-ui)] group-data-[panel-open]/trigger:rotate-180"
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Panel className="accordion-panel">
              <div className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                {item.content}
              </div>
            </AccordionPrimitive.Panel>
          </AccordionPrimitive.Item>
        );
      })}
    </AccordionPrimitive.Root>
  );
}
