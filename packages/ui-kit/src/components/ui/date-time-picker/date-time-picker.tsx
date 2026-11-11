"use client";

import * as React from "react";
import { cn, hasErrorContent } from "../../../lib/utils";
import {
  clampDateTime,
  combineDateAndTime,
  formatTime,
  isSameDay,
  roundDateToStep,
  startOfDay,
  toDateTimeLocalValue,
} from "../_shared/time-utils";
import { useKitIcon } from "../_shared/icon-provider";
import { PickerTrigger } from "../_shared/picker-trigger";
import { Button } from "../button";
import {
  Calendar,
  type CalendarRange,
  type CalendarWeekStartsOn,
} from "../calendar";
import { Label } from "../label";
import { Popover } from "../popover";
import { TimeField } from "../time-field";

export interface DateTimeRange {
  from: Date | null;
  to: Date | null;
}

interface DateTimePickerBaseProps {
  /** Initial month shown in the popup. */
  defaultMonth?: Date;
  /** Blur handler for react-hook-form. */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  /** Earliest allowed instant. */
  min?: Date;
  /** Latest allowed instant. */
  max?: Date;
  /** Disables individual days. */
  dateDisabled?: (date: Date) => boolean;
  /** Locale used for the trigger label, calendar and time fields. */
  locale?: Intl.LocalesArgument;
  /** First day of the week. Defaults to the locale's week info. */
  weekStartsOn?: CalendarWeekStartsOn;
  /**
   * Renders days from the previous and next months.
   * @default true
   */
  showOutsideDays?: boolean;
  /**
   * Display cycle for the time fields. Defaults to the locale.
   * @default locale
   */
  hourCycle?: 12 | 24;
  /**
   * Minute increment used by the time fields.
   * @default 1
   */
  step?: number;
  /**
   * Time used when a date is picked and no time has been chosen yet.
   * @default "09:00"
   */
  defaultTime?: string;
  /**
   * End time used in range mode before an end time is chosen.
   * @default "17:00"
   */
  defaultEndTime?: string;
  /** Disables the trigger. */
  disabled?: boolean;
  /** Marks the label as required. Use form rules to enforce the value. */
  required?: boolean;
  /** Adds a Clear action to the popup. */
  clearable?: boolean;
  /** Adds a Now action to the popup. */
  showNow?: boolean;
  id?: string;
  /** Name for a hidden input with a YYYY-MM-DDTHH:mm value. */
  name?: string;
  /**
   * Name for the range end hidden input.
   * @default name + "-end"
   */
  endName?: string;
  /** Visible label. */
  label?: React.ReactNode;
  /** Helper text. */
  description?: React.ReactNode;
  /** Error message and invalid state. */
  error?: React.ReactNode;
  /**
   * Text shown when no value is selected.
   * @default "Pick a date and time"
   */
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

export interface DateTimePickerSingleProps extends DateTimePickerBaseProps {
  /**
   * Selection model.
   * @default "single"
   */
  mode?: "single";
  /** Controlled selection. */
  value?: Date | null;
  /** Initial selection for uncontrolled usage. */
  defaultValue?: Date | null;
  /** Called when the selection changes. */
  onValueChange?: (value: Date | null) => void;
}

export interface DateTimePickerRangeProps extends DateTimePickerBaseProps {
  /**
   * Selection model. Range uses { from, to } values.
   */
  mode: "range";
  /** Controlled range selection. */
  value?: DateTimeRange | null;
  /** Initial range selection for uncontrolled usage. */
  defaultValue?: DateTimeRange | null;
  /** Called when the range changes. */
  onValueChange?: (value: DateTimeRange) => void;
}

export type DateTimePickerProps =
  | DateTimePickerSingleProps
  | DateTimePickerRangeProps;

type DateTimePickerValue = Date | DateTimeRange | null;

const EMPTY_RANGE: DateTimeRange = { from: null, to: null };

function toDate(value?: Date | null) {
  if (!value || Number.isNaN(value.getTime())) return null;
  return new Date(value.getTime());
}

function normalizeRange(range?: DateTimeRange | null): DateTimeRange {
  if (!range) return EMPTY_RANGE;
  const from = toDate(range.from);
  const to = toDate(range.to);
  if (from && to && to < from) return { from: to, to: from };
  return { from, to };
}

function toTimeValue(date?: Date | null) {
  return date ? formatTime(date.getHours(), date.getMinutes()) : null;
}

function normalizeDefaultTime(value: string | undefined, fallback: string) {
  const match = value ? /^(\d{1,2}):(\d{2})$/.exec(value.trim()) : null;
  if (!match) return fallback;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return fallback;
  return formatTime(hour, minute);
}

export const DateTimePicker = React.forwardRef<
  HTMLButtonElement,
  DateTimePickerProps
>(function DateTimePicker(props, ref) {
  const {
    defaultMonth,
    onBlur,
    min,
    max,
    dateDisabled,
    locale,
    weekStartsOn,
    showOutsideDays,
    hourCycle,
    step,
    defaultTime,
    defaultEndTime,
    disabled,
    required,
    clearable = false,
    showNow = false,
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
  } = props as DateTimePickerBaseProps;

  const isRange = props.mode === "range";
  const autoId = React.useId();
  const triggerId = id ?? autoId;
  const descriptionId = description ? `${triggerId}-description` : undefined;
  const requiredId = required ? `${triggerId}-required` : undefined;
  const hasErrorMessage = hasErrorContent(error);
  const errorId = hasErrorMessage ? `${triggerId}-error` : undefined;
  const invalid = Boolean(error) || Boolean(ariaInvalid);
  const ClockIcon = useKitIcon("clock");
  const resolvedDefaultTime = normalizeDefaultTime(defaultTime, "09:00");
  const resolvedDefaultEndTime = normalizeDefaultTime(
    defaultEndTime,
    "17:00",
  );

  const defaultSingle = isRange
    ? null
    : toDate(props.defaultValue as Date | null | undefined);
  const defaultRange = isRange
    ? normalizeRange(props.defaultValue as DateTimeRange | null | undefined)
    : EMPTY_RANGE;
  const [internalSingle, setInternalSingle] = React.useState<Date | null>(
    defaultSingle,
  );
  const [internalRange, setInternalRange] =
    React.useState<DateTimeRange>(defaultRange);
  const [open, setOpen] = React.useState(false);
  const controlled = props.value !== undefined;

  const value = controlled
    ? (props.value as DateTimePickerValue)
    : isRange
      ? internalRange
      : internalSingle;
  const selectedSingle = isRange ? null : toDate(value as Date | null);
  const selectedRange = isRange
    ? normalizeRange(value as DateTimeRange | null)
    : EMPTY_RANGE;
  const selectedFrom = isRange ? selectedRange.from : selectedSingle;
  const selectedTo = isRange ? selectedRange.to : null;

  const [fromTime, setFromTime] = React.useState<string | null>(() =>
    selectedFrom ? toTimeValue(selectedFrom) : resolvedDefaultTime,
  );
  const [toTime, setToTime] = React.useState<string | null>(() =>
    selectedTo ? toTimeValue(selectedTo) : resolvedDefaultEndTime,
  );

  React.useEffect(() => {
    setFromTime(selectedFrom ? toTimeValue(selectedFrom) : resolvedDefaultTime);
  }, [selectedFrom?.getTime(), resolvedDefaultTime]);

  React.useEffect(() => {
    setToTime(selectedTo ? toTimeValue(selectedTo) : resolvedDefaultEndTime);
  }, [selectedTo?.getTime(), resolvedDefaultEndTime]);

  React.useEffect(() => {
    if (!open) return;
    setFromTime(selectedFrom ? toTimeValue(selectedFrom) : resolvedDefaultTime);
    setToTime(selectedTo ? toTimeValue(selectedTo) : resolvedDefaultEndTime);
    // Refresh drafts each time the popup opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const commit = (nextValue: DateTimePickerValue) => {
    if (isRange) {
      const normalized = normalizeRange(nextValue as DateTimeRange);
      const clamped = normalizeRange({
        from: normalized.from ? clampDateTime(normalized.from, min, max) : null,
        to: normalized.to ? clampDateTime(normalized.to, min, max) : null,
      });
      if (!controlled) setInternalRange(clamped);
      setFromTime(clamped.from ? toTimeValue(clamped.from) : resolvedDefaultTime);
      setToTime(clamped.to ? toTimeValue(clamped.to) : resolvedDefaultEndTime);
      (
        props.onValueChange as
          | ((nextValue: DateTimeRange) => void)
          | undefined
      )?.(clamped);
    } else {
      const normalized = nextValue ? toDate(nextValue as Date) : null;
      const clamped = normalized
        ? clampDateTime(normalized, min, max)
        : null;
      if (!controlled) setInternalSingle(clamped);
      setFromTime(clamped ? toTimeValue(clamped) : resolvedDefaultTime);
      (
        props.onValueChange as
          | ((nextValue: Date | null) => void)
          | undefined
      )?.(clamped);
    }
  };

  const handleSingleDateChange = (next: Date | null) => {
    if (!next) {
      commit(null);
      return;
    }
    commit(
      combineDateAndTime(
        startOfDay(next),
        fromTime ?? resolvedDefaultTime,
        resolvedDefaultTime,
      ),
    );
  };

  const handleRangeDateChange = (next: CalendarRange) => {
    const fromDate = next.from ? startOfDay(next.from) : null;
    const toDate = next.to ? startOfDay(next.to) : null;
    let from = fromDate
      ? combineDateAndTime(
          fromDate,
          fromTime ?? resolvedDefaultTime,
          resolvedDefaultTime,
        )
      : null;
    let to = toDate
      ? combineDateAndTime(
          toDate,
          toTime ?? resolvedDefaultEndTime,
          resolvedDefaultEndTime,
        )
      : null;
    if (from && to && to < from) {
      to = new Date(from);
      setToTime(toTimeValue(to));
    }
    commit({ from, to });
  };

  const handleFromTimeChange = (next: string | null) => {
    setFromTime(next);
    if (!next) return;
    if (isRange) {
      const fromDate = selectedRange.from;
      if (!fromDate) return;
      let from = clampDateTime(
        combineDateAndTime(fromDate, next, resolvedDefaultTime),
        min,
        max,
      );
      const to = selectedRange.to;
      if (to && from > to) {
        from = new Date(to);
        setFromTime(toTimeValue(to));
      }
      commit({ from, to });
    } else if (selectedSingle) {
      commit(combineDateAndTime(selectedSingle, next, resolvedDefaultTime));
    }
  };

  const handleToTimeChange = (next: string | null) => {
    setToTime(next);
    if (!next) return;
    if (!isRange) return;
    const toDate = selectedRange.to;
    if (!toDate) return;
    let to = clampDateTime(
      combineDateAndTime(toDate, next, resolvedDefaultEndTime),
      min,
      max,
    );
    const from = selectedRange.from;
    if (from && to < from) {
      to = new Date(from);
      setToTime(toTimeValue(from));
    }
    commit({ from, to });
  };

  const handleNow = () => {
    const now = roundDateToStep(new Date(), step);
    if (isRange) {
      let from = clampDateTime(now, min, max);
      let to = clampDateTime(
        new Date(from.getTime() + 60 * 60 * 1000),
        min,
        max,
      );
      if (to < from) to = new Date(from);
      commit({ from, to });
    } else {
      commit(clampDateTime(now, min, max));
    }
    setOpen(false);
  };

  const clear = () => {
    commit(isRange ? EMPTY_RANGE : null);
    setOpen(false);
  };

  const localeKey = JSON.stringify(locale ?? null);
  const formatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
        ...(hourCycle
          ? { hourCycle: hourCycle === 12 ? "h12" : "h23" }
          : {}),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [localeKey, hourCycle],
  );

  const placeholderText =
    placeholder ??
    (isRange ? "Pick a date and time range" : "Pick a date and time");
  const displayValue = isRange
    ? selectedRange.from
      ? selectedRange.to
        ? `${formatter.format(selectedRange.from)} – ${formatter.format(
            selectedRange.to,
          )}`
        : `${formatter.format(selectedRange.from)} – …`
      : placeholderText
    : selectedSingle
      ? formatter.format(selectedSingle)
      : placeholderText;
  const hasValue = isRange
    ? Boolean(selectedRange.from)
    : Boolean(selectedSingle);

  const calendarSingleValue = selectedSingle
    ? startOfDay(selectedSingle)
    : null;
  const calendarRangeValue: CalendarRange = {
    from: selectedFrom ? startOfDay(selectedFrom) : null,
    to: selectedTo ? startOfDay(selectedTo) : null,
  };

  const singleMin =
    selectedSingle && min && isSameDay(selectedSingle, min)
      ? formatTime(min.getHours(), min.getMinutes())
      : undefined;
  const singleMax =
    selectedSingle && max && isSameDay(selectedSingle, max)
      ? formatTime(max.getHours(), max.getMinutes())
      : undefined;

  const fromMin =
    selectedFrom && min && isSameDay(selectedFrom, min)
      ? formatTime(min.getHours(), min.getMinutes())
      : undefined;
  const fromMax = selectedFrom
    ? selectedTo && isSameDay(selectedFrom, selectedTo)
      ? formatTime(selectedTo.getHours(), selectedTo.getMinutes())
      : max && isSameDay(selectedFrom, max)
        ? formatTime(max.getHours(), max.getMinutes())
        : undefined
    : undefined;
  const toMin = selectedTo
    ? selectedFrom && isSameDay(selectedFrom, selectedTo)
      ? formatTime(selectedFrom.getHours(), selectedFrom.getMinutes())
      : min && isSameDay(selectedTo, min)
        ? formatTime(min.getHours(), min.getMinutes())
        : undefined
    : undefined;
  const toMax =
    selectedTo && max && isSameDay(selectedTo, max)
      ? formatTime(max.getHours(), max.getMinutes())
      : undefined;

  const describedBy =
    [ariaDescribedBy, descriptionId, errorId, requiredId]
      .filter(Boolean)
      .join(" ") || undefined;

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
          value={toDateTimeLocalValue(selectedSingle)}
        />
      ) : null}
      {name && isRange ? (
        <>
          <input
            type="hidden"
            name={name}
            value={toDateTimeLocalValue(selectedRange.from)}
          />
          <input
            type="hidden"
            name={endName ?? `${name}-end`}
            value={toDateTimeLocalValue(selectedRange.to)}
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
              ? "Choose a date and time range"
              : "Choose a date and time"
        }
        className={cn(
          "w-auto max-w-[calc(100vw-1rem)] p-2.5",
          popoverClassName,
        )}
        trigger={
          <PickerTrigger
            ref={ref}
            id={triggerId}
            disabled={disabled}
            invalid={invalid}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
            onBlur={onBlur}
            placeholder={!hasValue}
            startIcon={
              <ClockIcon
                size={16}
                className="shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
            }
          >
            {displayValue}
          </PickerTrigger>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          {isRange ? (
            <Calendar
              mode="range"
              locale={locale}
              defaultMonth={defaultMonth}
              weekStartsOn={weekStartsOn}
              showOutsideDays={showOutsideDays}
              min={min}
              max={max}
              disabled={dateDisabled}
              value={calendarRangeValue}
              onValueChange={handleRangeDateChange}
            />
          ) : (
            <Calendar
              mode="single"
              locale={locale}
              defaultMonth={defaultMonth}
              weekStartsOn={weekStartsOn}
              showOutsideDays={showOutsideDays}
              min={min}
              max={max}
              disabled={dateDisabled}
              value={calendarSingleValue}
              onValueChange={handleSingleDateChange}
            />
          )}

          <div
            className={cn(
              "flex flex-col gap-3",
              isRange ? "sm:w-40" : "sm:w-36",
            )}
          >
            <TimeField
              label={isRange ? "Start time" : "Time"}
              value={fromTime}
              onValueChange={handleFromTimeChange}
              hourCycle={hourCycle}
              step={step}
              min={isRange ? fromMin : singleMin}
              max={isRange ? fromMax : singleMax}
              locale={locale}
            />
            {isRange ? (
              <TimeField
                label="End time"
                value={toTime}
                onValueChange={handleToTimeChange}
                hourCycle={hourCycle}
                step={step}
                min={toMin}
                max={toMax}
                locale={locale}
              />
            ) : null}
          </div>
        </div>

        {showNow || clearable ? (
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/60 pt-2">
            {showNow ? (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={handleNow}
              >
                Now
              </Button>
            ) : (
              <span />
            )}
            {clearable ? (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={clear}
              >
                Clear
              </Button>
            ) : null}
          </div>
        ) : null}
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
});
DateTimePicker.displayName = "DateTimePicker";
