"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { cn } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";
import { kitScope } from "../_shared/scope";

export interface ComboboxOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

interface ComboboxBaseProps {
  /** Value/label entries with optional description and disabled state. */
  options: ComboboxOption[];
  /** Input placeholder shown before a value is selected. */
  placeholder?: string;
  /** Message shown when no option matches the query. */
  emptyMessage?: React.ReactNode;
  /** Disables the input, trigger and option list. */
  disabled?: boolean;
  /**
   * Marks the native control as required. The visible * comes from Field or FormField.
   */
  required?: boolean;
  /** Applies the invalid visual state. */
  error?: boolean;
  /** Name used when the owning form is submitted. */
  name?: string;
  id?: string;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Accessible name when no visible label is rendered. */
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

export type ComboboxProps = ComboboxBaseProps &
  (
    | {
        /**
         * Allow more than one selected value. Selected values render as removable chips.
         * @default false
         */
        multiple?: false;
        /** Controlled value: a string in single mode, an array in multiple mode. */
        value?: string | null;
        /** Uncontrolled initial value. */
        defaultValue?: string | null;
        /** Called with the next value when the selection changes. */
        onValueChange?: (value: string | null) => void;
      }
    | {
        /**
         * Allow more than one selected value. Selected values render as removable chips.
         * @default false
         */
        multiple: true;
        /** Controlled value: a string in single mode, an array in multiple mode. */
        value?: string[];
        /** Uncontrolled initial value. */
        defaultValue?: string[];
        /** Called with the next value when the selection changes. */
        onValueChange?: (value: string[]) => void;
      }
  );

export function Combobox({
  options,
  placeholder = "Search…",
  emptyMessage = "No results found.",
  disabled,
  required,
  error,
  name,
  id,
  className,
  ref,
  onBlur,
  multiple,
  value,
  defaultValue,
  onValueChange,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
}: ComboboxProps) {
  const ChevronDownIcon = useKitIcon("chevronDown");
  const CloseIcon = useKitIcon("close");
  const CheckIcon = useKitIcon("check");
  const invalid = Boolean(error) || Boolean(ariaInvalid);
  const optionMap = React.useMemo(
    () => new Map(options.map((option) => [option.value, option])),
    [options],
  );
  const optionValues = React.useMemo(
    () => options.map((option) => option.value),
    [options],
  );
  const optionLabel = React.useCallback(
    (optionValue: string) => {
      const option = optionMap.get(optionValue);
      return typeof option?.label === "string" ? option.label : optionValue;
    },
    [optionMap],
  );

  const fieldClassName = cn(
    "surface-inset relative flex w-full items-center rounded-field bg-field text-field-foreground transition-[background-color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] hover:bg-field-hover focus-within:bg-field focus-within:ring-2 focus-within:ring-ring/35 focus-within:ring-offset-2 focus-within:ring-offset-background data-[popup-open]:bg-field data-[popup-open]:ring-2 data-[popup-open]:ring-ring/35 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
    invalid && "bg-destructive/10 focus-within:ring-destructive/30",
    className,
  );

  const input = (
    <ComboboxPrimitive.Input
      ref={ref}
      id={id}
      onBlur={onBlur}
      placeholder={placeholder}
      autoComplete="off"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-invalid={invalid || ariaInvalid || undefined}
      aria-required={required || undefined}
      className={cn(
        "min-w-0 flex-1 bg-transparent text-sm text-field-foreground outline-none placeholder:text-muted-foreground/70 disabled:cursor-not-allowed",
        multiple ? "h-7 px-1" : "h-10 px-3.5",
      )}
    />
  );

  const field = multiple ? (
    <ComboboxPrimitive.Chips
      className={cn(fieldClassName, "min-h-10 flex-wrap gap-1.5 py-1.5 pl-2 pr-12")}
    >
      <ComboboxPrimitive.Value>
        {(selected) => (
          <React.Fragment>
            {(selected as string[]).map((selectedValue) => {
              const option = optionMap.get(selectedValue);
              return (
                <ComboboxPrimitive.Chip
                  key={selectedValue}
                  className="inline-flex max-w-full items-center gap-1 rounded-xs bg-surface px-2 py-0.5 text-xs font-medium text-foreground"
                >
                  <span className="truncate">
                    {option?.label ?? selectedValue}
                  </span>
                  <ComboboxPrimitive.ChipRemove
                    aria-label={`Remove ${typeof option?.label === "string" ? option.label : selectedValue}`}
                    className="inline-flex size-4 shrink-0 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
                  >
                    <CloseIcon size={10} />
                  </ComboboxPrimitive.ChipRemove>
                </ComboboxPrimitive.Chip>
              );
            })}
          </React.Fragment>
        )}
      </ComboboxPrimitive.Value>
      {input}
      <ComboboxPrimitive.Trigger
        aria-label="Show options"
        className="absolute right-1.5 top-1.5 inline-flex size-7 items-center justify-center rounded-xs text-muted-foreground outline-none transition-colors hover:bg-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 data-[disabled]:pointer-events-none data-[disabled]:opacity-45"
      >
        <ChevronDownIcon size={14} />
      </ComboboxPrimitive.Trigger>
    </ComboboxPrimitive.Chips>
  ) : (
    <ComboboxPrimitive.InputGroup className={fieldClassName}>
      {input}
      <ComboboxPrimitive.Clear
        aria-label="Clear selection"
        className="hidden shrink-0 items-center justify-center rounded-xs p-1 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 data-[visible]:inline-flex"
      >
        <CloseIcon size={14} />
      </ComboboxPrimitive.Clear>
      <ComboboxPrimitive.Trigger
        aria-label="Show options"
        className="mr-1.5 inline-flex size-7 shrink-0 items-center justify-center rounded-xs text-muted-foreground outline-none transition-colors hover:bg-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 data-[disabled]:pointer-events-none data-[disabled]:opacity-45"
      >
        <ChevronDownIcon size={14} />
      </ComboboxPrimitive.Trigger>
    </ComboboxPrimitive.InputGroup>
  );

  const popup = (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner sideOffset={6} className="z-50 outline-none">
        <ComboboxPrimitive.Popup
          {...kitScope}
          className={cn(
            "surface-curved relative max-h-[min(22rem,var(--available-height))] w-[var(--anchor-width)] min-w-[var(--anchor-width)] overflow-hidden rounded-overlay bg-popover p-1.5 text-popover-foreground shadow-[var(--shadow-overlay)] outline-none",
            "origin-[var(--transform-origin)] transition-[opacity,transform] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)]",
            "data-[starting-style]:opacity-0 data-[starting-style]:scale-[0.97] data-[ending-style]:opacity-0 data-[ending-style]:scale-[0.97]",
          )}
        >
          <ComboboxPrimitive.Empty className="text-sm text-muted-foreground">
            <div className="px-3 py-6 text-center">{emptyMessage}</div>
          </ComboboxPrimitive.Empty>
          <ComboboxPrimitive.List className="max-h-72 overflow-y-auto overscroll-contain">
            {(optionValue: string) => {
              const option = optionMap.get(optionValue);
              if (!option) return null;
              return (
                <ComboboxPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="flex cursor-default select-none items-center gap-2.5 rounded-control px-2.5 py-2 text-sm outline-none transition-colors duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] data-[highlighted]:bg-surface data-[selected]:bg-primary-soft data-[selected]:font-medium data-[selected]:text-primary-soft-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-45"
                >
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate">{option.label}</span>
                    {option.description ? (
                      <span className="truncate text-xs font-normal text-muted-foreground">
                        {option.description}
                      </span>
                    ) : null}
                  </span>
                  <ComboboxPrimitive.ItemIndicator className="inline-flex w-4 shrink-0 items-center justify-center text-primary">
                    <CheckIcon size={14} />
                  </ComboboxPrimitive.ItemIndicator>
                </ComboboxPrimitive.Item>
              );
            }}
          </ComboboxPrimitive.List>
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );

  if (multiple) {
    return (
      <ComboboxPrimitive.Root<string, true>
        multiple
        items={optionValues}
        itemToStringLabel={optionLabel}
        itemToStringValue={(optionValue) => optionValue}
        filter={(optionValue, query) => {
          const label = optionLabel(optionValue);
          return (
            label.toLowerCase().includes(query.toLowerCase()) ||
            optionValue.toLowerCase().includes(query.toLowerCase())
          );
        }}
        value={value as string[] | undefined}
        defaultValue={defaultValue as string[] | undefined}
        onValueChange={(next) => onValueChange?.(next)}
        onOpenChange={(open, details) => {
          if (!open && details.reason === "item-press") details.cancel();
        }}
        disabled={disabled}
        required={required}
        name={name}
      >
        {field}
        {popup}
      </ComboboxPrimitive.Root>
    );
  }

  return (
    <ComboboxPrimitive.Root<string, false>
      items={optionValues}
      itemToStringLabel={optionLabel}
      itemToStringValue={(optionValue) => optionValue}
      filter={(optionValue, query) => {
        const label = optionLabel(optionValue);
        return (
          label.toLowerCase().includes(query.toLowerCase()) ||
          optionValue.toLowerCase().includes(query.toLowerCase())
        );
      }}
      value={value as string | null | undefined}
      defaultValue={defaultValue as string | null | undefined}
      onValueChange={(next) => onValueChange?.(next)}
      disabled={disabled}
      required={required}
      name={name}
    >
      {field}
      {popup}
    </ComboboxPrimitive.Root>
  );
}
