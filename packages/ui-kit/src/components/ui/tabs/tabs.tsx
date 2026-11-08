"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "../../../lib/utils";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, "children"> {
  items: TabItem[];
  listClassName?: string;
}

export function Tabs({ items, className, listClassName, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root className={cn("w-full", className)} {...props}>
      <TabsPrimitive.List
        className={cn(
          "surface-curved-soft relative inline-flex h-10 items-center gap-0.5 rounded-pill bg-surface p-1",
          listClassName,
        )}
      >
        <TabsPrimitive.Indicator className="surface-curved pointer-events-none absolute left-0 top-0 z-0 h-[var(--active-tab-height)] w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] translate-y-[var(--active-tab-top)] rounded-pill bg-card shadow-sm transition-[translate,width] duration-[var(--duration-ui-slow)] ease-[var(--ease-out-ui)]" />
        {items.map((item) => (
          <TabsPrimitive.Tab
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className="relative z-10 inline-flex h-8 items-center justify-center whitespace-nowrap rounded-pill px-3.5 text-sm font-medium text-muted-foreground transition-[color] duration-[var(--duration-ui)] outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/35 disabled:pointer-events-none disabled:opacity-45 data-[active]:font-semibold data-[active]:text-foreground"
          >
            {item.label}
          </TabsPrimitive.Tab>
        ))}
      </TabsPrimitive.List>
      {items.map((item) => (
        <TabsPrimitive.Panel key={item.value} value={item.value} className="mt-4 rounded-control outline-none transition-opacity duration-[var(--duration-ui)] focus-visible:ring-2 focus-visible:ring-ring/20 data-[hidden]:hidden">
          {item.content}
        </TabsPrimitive.Panel>
      ))}
    </TabsPrimitive.Root>
  );
}
