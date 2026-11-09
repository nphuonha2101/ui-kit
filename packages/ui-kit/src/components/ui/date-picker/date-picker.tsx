"use client";

import * as React from "react";
import { cn, hasErrorContent } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";
import { Button } from "../button";
import { Calendar, type CalendarWeekStartsOn } from "../calendar";
import { Label } from "../label";
import { Popover } from "../popover";

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  defaultMonth?: Date;
  onValueChange?: (value: Date | null) => void;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  min?: Date;
  max?: Date;
  dateDisabled?: (date: Date) => boolean;
  locale?: Intl.LocalesArgument;
  weekStartsOn?: CalendarWeekStartsOn;
  showOutsideDays?: boolean;
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;
  showToday?: boolean;
  id?: string;
  name?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  placeholder?: React.ReactNode;
  className?: string;
  popoverClassName?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toDay(date?: Date | null) {
  if (!date || Number.isNaN(date.getTime())) return null;
  return startOfDay(date);
}

function toInputValue(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  function DatePicker(
    {
      value,
      defaultValue,
      defaultMonth,
      onValueChange,
      onBlur,
      min,
      max,
      dateDisabled,
      locale,
      weekStartsOn,
      showOutsideDays,
      disabled,
      required,
      clearable = false,
      showToday = false,
      id,
      name,
      label,
      description,
      error,
      placeholder = "Pick a date",
      className,
      popoverClassName,
      side = "bottom",
      align = "start",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
    },
    ref,
  ) {
    const CalendarIcon = useKitIcon("calendar");
    const ChevronIcon = useKitIcon("chevronDown");
    const autoId = React.useId();
    const triggerId = id ?? autoId;
    const descriptionId = description ? `${triggerId}-description` : undefined;
    const requiredId = required ? `${triggerId}-required` : undefined;
    const hasErrorMessage = hasErrorContent(error);
    const errorId = hasErrorMessage ? `${triggerId}-error` : undefined;
    const [internalValue, setInternalValue] = React.useState<Date | null>(() =>
      toDay(defaultValue),
    );
    const [open, setOpen] = React.useState(false);
    const controlled = value !== undefined;
    const selected = controlled ? toDay(value) : internalValue;
    const invalid = Boolean(error) || Boolean(ariaInvalid);
    const localeKey = JSON.stringify(locale ?? null);
    const formatter = React.useMemo(
      () =>
        new Intl.DateTimeFormat(locale, {
          dateStyle: "medium",
        }),
      [localeKey],
    );

    const commit = (nextValue: Date | null) => {
      if (!controlled) setInternalValue(nextValue);
      onValueChange?.(nextValue);
    };

    const isUnavailable = (date: Date) => {
      const day = startOfDay(date);
      if (min && day < startOfDay(min)) return true;
      if (max && day > startOfDay(max)) return true;
      return dateDisabled?.(day) ?? false;
    };

    const describedBy =
      [ariaDescribedBy, descriptionId, errorId, requiredId]
        .filter(Boolean)
        .join(" ") || undefined;
    const displayValue = selected
      ? formatter.format(selected)
      : placeholder;

    const footer =
      clearable || showToday ? (
        <div className="flex items-center justify-between gap-2 pt-1">
          {showToday ? (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                const today = startOfDay(new Date());
                if (isUnavailable(today)) return;
                commit(today);
                setOpen(false);
              }}
            >
              Today
            </Button>
          ) : (
            <span />
          )}
          {clearable ? (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                commit(null);
                setOpen(false);
              }}
            >
              Clear
            </Button>
          ) : null}
        </div>
      ) : null;

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label ? (
          <Label htmlFor={triggerId} requiredMark={required}>
            {label}
          </Label>
        ) : null}

        {name ? (
          <input
            type="hidden"
            name={name}
            value={selected ? toInputValue(selected) : ""}
          />
        ) : null}
        {requiredId ? (
          <span id={requiredId} className="sr-only">
            Required
          </span>
        ) : null}

        <Popover
          open={open}
          onOpenChange={setOpen}
          side={side}
          align={align}
          aria-label={typeof label === "string" ? label : "Choose a date"}
          className={cn("w-auto p-2.5", popoverClassName)}
          trigger={
            <button
              ref={ref}
              id={triggerId}
              type="button"
              disabled={disabled}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              onBlur={onBlur}
              className={cn(
                "surface-inset flex h-10 w-full items-center gap-2 rounded-field bg-field px-3.5 text-sm text-field-foreground transition-[background-color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] outline-none",
                "hover:bg-field-hover focus-visible:bg-field focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "disabled:cursor-not-allowed disabled:opacity-45",
                invalid && "bg-destructive/10 focus-visible:ring-destructive/30",
              )}
            >
              <CalendarIcon
                size={16}
                className="shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <span
                className={cn(
                  "min-w-0 flex-1 truncate text-left",
                  !selected && "text-muted-foreground/70",
                )}
              >
                {displayValue}
              </span>
              <ChevronIcon
                size={14}
                className="shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
            </button>
          }
        >
          <Calendar
            mode="single"
            locale={locale}
            defaultMonth={defaultMonth}
            weekStartsOn={weekStartsOn}
            showOutsideDays={showOutsideDays}
            min={min}
            max={max}
            disabled={dateDisabled}
            value={selected}
            onValueChange={(next) => {
              commit(next);
              if (next) setOpen(false);
            }}
            footer={footer}
          />
        </Popover>

        {description ? (
          <p id={descriptionId} className="text-xs text-muted-foreground">
            {description}
          </p>
        ) : null}
        {hasErrorMessage ? (
          <p
            id={errorId}
            role="alert"
            className="text-xs font-medium text-destructive"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
DatePicker.displayName = "DatePicker";
