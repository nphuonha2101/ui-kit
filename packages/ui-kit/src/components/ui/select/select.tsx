"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  name?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select…",
  disabled,
  error,
  className,
  name,
  id,
  ...aria
}: SelectProps) {
  const ChevronIcon = useKitIcon("chevron");
  const CheckIcon = useKitIcon("check");
  return (
    <SelectPrimitive.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled} name={name}>
      <SelectPrimitive.Trigger
        id={id}
        aria-invalid={error || undefined}
        className={cn(
          "surface-inset inline-flex h-10 w-full items-center justify-between gap-2 rounded-field bg-field px-3.5 text-sm text-field-foreground outline-none transition-[background-color,box-shadow] duration-[var(--duration-ui)] hover:bg-field-hover focus-visible:bg-field focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
          error && "bg-destructive/10 focus-visible:ring-destructive/30",
          className,
        )}
        {...aria}
      >
        <SelectPrimitive.Value>{(val) => options.find((o) => o.value === val)?.label ?? <span className="text-muted-foreground/70">{placeholder}</span>}</SelectPrimitive.Value>
        <SelectPrimitive.Icon className="shrink-0 text-muted-foreground">
          <ChevronIcon size={14} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner sideOffset={6} className="z-50 outline-none">
          <SelectPrimitive.Popup
            className={cn(
              "surface-curved relative min-w-[var(--anchor-width)] rounded-overlay bg-popover p-1.5 text-popover-foreground shadow-[var(--shadow-overlay)] outline-none",
              "origin-[var(--transform-origin)] transition-[opacity,transform] duration-[var(--duration-ui)] data-[starting-style]:opacity-0 data-[starting-style]:scale-[0.97] data-[ending-style]:opacity-0 data-[ending-style]:scale-[0.97]",
            )}
          >
            <SelectPrimitive.List>
              {options.map((opt) => (
                <SelectPrimitive.Item
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className="flex cursor-default select-none items-center gap-2 rounded-control px-2.5 py-2 text-sm outline-none data-[highlighted]:bg-surface data-[selected]:bg-primary-soft data-[selected]:font-medium data-[selected]:text-primary-soft-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-45"
                >
                  <SelectPrimitive.ItemIndicator className="inline-flex w-4 shrink-0 items-center justify-center text-primary">
                    <CheckIcon size={14} />
                  </SelectPrimitive.ItemIndicator>
                  <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.List>
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
