"use client";

import * as React from "react";
import { cn, hasErrorContent } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";
import { Button } from "../button";
import {
  Calendar,
  type CalendarRange,
  type CalendarWeekStartsOn,
} from "../calendar";
import { Label } from "../label";
import { Popover } from "../popover";

interface DatePickerBaseProps {
  defaultMonth?: Date;
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
  endName?: string;
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

export interface DatePickerSingleProps extends DatePickerBaseProps {
  mode?: "single";
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (value: Date | null) => void;
}

export interface DatePickerRangeProps extends DatePickerBaseProps {
  mode: "range";
  value?: CalendarRange | null;
  defaultValue?: CalendarRange | null;
  onValueChange?: (value: CalendarRange) => void;
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

type DatePickerValue = Date | CalendarRange | null;

const EMPTY_RANGE: CalendarRange = { from: null, to: null };

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toDay(date?: Date | null) {
  if (!date || Number.isNaN(date.getTime())) return null;
  return startOfDay(date);
}

function normalizeRange(range?: CalendarRange | null): CalendarRange {
  if (!range) return EMPTY_RANGE;
  const from = toDay(range.from);
  const to = toDay(range.to);
  if (from && to && to < from) return { from: to, to: from };
  return { from, to };
}

function toInputValue(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  function DatePicker(props, ref) {
    const {
      defaultMonth,
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
      endName,
      label,
      description,
      error,
      placeholder,
      className,
      popoverClassName,
      side = "bottom",
      align = "start",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
    } = props as DatePickerBaseProps;

    const isRange = props.mode === "range";
    const CalendarIcon = useKitIcon("calendar");
    const ChevronIcon = useKitIcon("chevronDown");
    const autoId = React.useId();
    const triggerId = id ?? autoId;
    const descriptionId = description ? `${triggerId}-description` : undefined;
    const requiredId = required ? `${triggerId}-required` : undefined;
    const hasErrorMessage = hasErrorContent(error);
    const errorId = hasErrorMessage ? `${triggerId}-error` : undefined;
    const defaultRange = isRange
      ? normalizeRange(props.defaultValue as CalendarRange | null | undefined)
      : EMPTY_RANGE;
    const defaultSingle = isRange
      ? null
      : toDay(props.defaultValue as Date | null | undefined);
    const [internalValue, setInternalValue] = React.useState<DatePickerValue>(
      () => (isRange ? defaultRange : defaultSingle),
    );
    const [open, setOpen] = React.useState(false);
    const controlled = props.value !== undefined;
    const value = controlled ? props.value : internalValue;
    const selectedDate = isRange ? null : toDay(value as Date | null);
    const selectedRange = isRange
      ? normalizeRange(value as CalendarRange | null)
      : EMPTY_RANGE;
    const hasValue = isRange ? Boolean(selectedRange.from) : Boolean(selectedDate);
    const invalid = Boolean(error) || Boolean(ariaInvalid);
    const localeKey = JSON.stringify(locale ?? null);
    const formatter = React.useMemo(
      () =>
        new Intl.DateTimeFormat(locale, {
          dateStyle: "medium",
        }),
      [localeKey],
    );
    const placeholderText =
      placeholder ?? (isRange ? "Pick a date range" : "Pick a date");

    const commit = (nextValue: DatePickerValue) => {
      if (!controlled) setInternalValue(nextValue);
      if (isRange) {
        (
          props.onValueChange as
            | ((nextValue: CalendarRange) => void)
            | undefined
        )?.(nextValue as CalendarRange);
      } else {
        (
          props.onValueChange as
            | ((nextValue: Date | null) => void)
            | undefined
        )?.(nextValue as Date | null);
      }
    };

    const clear = () => commit(isRange ? EMPTY_RANGE : null);

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
    const displayValue = isRange
      ? selectedRange.from
        ? selectedRange.to
          ? `${formatter.format(selectedRange.from)} – ${formatter.format(selectedRange.to)}`
          : `${formatter.format(selectedRange.from)} – …`
        : placeholderText
      : selectedDate
        ? formatter.format(selectedDate)
        : placeholderText;

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
                commit(isRange ? { from: today, to: today } : today);
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
                clear();
                setOpen(false);
              }}
            >
              Clear
            </Button>
          ) : null}
        </div>
      ) : null;

    const calendarCommonProps = {
      locale,
      defaultMonth,
      weekStartsOn,
      showOutsideDays,
      min,
      max,
      disabled: dateDisabled,
      footer,
    };

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label ? (
          <Label htmlFor={triggerId} requiredMark={required}>
            {label}
          </Label>
        ) : null}

        {name && !isRange ? (
          <input
            type="hidden"
            name={name}
            value={selectedDate ? toInputValue(selectedDate) : ""}
          />
        ) : null}
        {name && isRange ? (
          <>
            <input
              type="hidden"
              name={name}
              value={
                selectedRange.from ? toInputValue(selectedRange.from) : ""
              }
            />
            <input
              type="hidden"
              name={endName ?? `${name}-end`}
              value={selectedRange.to ? toInputValue(selectedRange.to) : ""}
            />
          </>
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
          aria-label={
            typeof label === "string"
              ? label
              : isRange
                ? "Choose a date range"
                : "Choose a date"
          }
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
                  !hasValue && "text-muted-foreground/70",
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
          {isRange ? (
            <Calendar
              {...calendarCommonProps}
              mode="range"
              value={selectedRange}
              onValueChange={(next) => {
                commit(next);
                if (next.from && next.to) setOpen(false);
              }}
            />
          ) : (
            <Calendar
              {...calendarCommonProps}
              mode="single"
              value={selectedDate}
              onValueChange={(next) => {
                commit(next);
                if (next) setOpen(false);
              }}
            />
          )}
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
