"use client";

import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cn, type IconComponent } from "../../../lib/utils";

export interface ToggleGroupItem {
  value: string;
  label: React.ReactNode;
  icon?: IconComponent;
  disabled?: boolean;
  "aria-label"?: string;
}

export interface ToggleGroupProps {
  items: ToggleGroupItem[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  variant?: "segmented" | "ghost";
  className?: string;
  "aria-label"?: string;
}

export function ToggleGroup({
  items,
  value,
  defaultValue,
  onValueChange,
  multiple = false,
  disabled,
  orientation = "horizontal",
  variant = "segmented",
  className,
  "aria-label": ariaLabel,
}: ToggleGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(
    defaultValue ?? [],
  );
  const activeValue = value ?? uncontrolledValue;

  const handleValueChange = (next: string[]) => {
    if (!multiple && next.length === 0) return;
    if (value === undefined) setUncontrolledValue(next);
    onValueChange?.(next);
  };

  return (
    <ToggleGroupPrimitive
      value={activeValue}
      onValueChange={handleValueChange}
      multiple={multiple}
      disabled={disabled}
      orientation={orientation}
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex items-center",
        variant === "segmented"
          ? "surface-curved-soft gap-0.5 rounded-pill bg-surface p-1"
          : "gap-1",
        orientation === "vertical" && "flex-col items-stretch",
        className,
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <TogglePrimitive
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            aria-label={item["aria-label"]}
            className={cn(
              "relative inline-flex h-8 items-center justify-center gap-2 rounded-pill px-3.5 text-sm font-medium text-muted-foreground outline-none transition-[background-color,color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)]",
              "focus-visible:ring-2 focus-visible:ring-ring/35 disabled:pointer-events-none disabled:opacity-45",
              variant === "segmented"
                ? "data-[pressed]:surface-curved data-[pressed]:bg-card data-[pressed]:text-foreground data-[pressed]:shadow-sm"
                : "hover:bg-surface data-[pressed]:bg-surface data-[pressed]:text-foreground",
              orientation === "vertical" && "w-full justify-start",
            )}
          >
            {Icon ? <Icon size={15} className="shrink-0" /> : null}
            <span className="whitespace-nowrap">{item.label}</span>
          </TogglePrimitive>
        );
      })}
    </ToggleGroupPrimitive>
  );
}
