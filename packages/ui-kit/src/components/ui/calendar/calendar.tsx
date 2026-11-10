"use client";

import * as React from "react";
import { cn, hasErrorContent } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";
import { IconButton } from "../icon-button";

export type CalendarWeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface CalendarRange {
  from: Date | null;
  to: Date | null;
}

export type CalendarSize = "sm" | "default";

interface CalendarBaseProps {
  /** Controlled visible month. */
  month?: Date;
  /** Initial visible month. Defaults to the selected date or today. */
  defaultMonth?: Date;
  /** Called when the visible month changes. */
  onMonthChange?: (month: Date) => void;
  /** Earliest selectable day. */
  min?: Date;
  /** Latest selectable day. */
  max?: Date;
  /** Disables individual days. */
  disabled?: (date: Date) => boolean;
  /** Locale used for month, weekday and day labels. */
  locale?: Intl.LocalesArgument;
  /** First day of the week. Defaults to the locale's week info. */
  weekStartsOn?: CalendarWeekStartsOn;
  /** Renders days from the previous and next months. */
  showOutsideDays?: boolean;
  /** Day cell size. */
  size?: CalendarSize;
  /** Visible label. */
  label?: React.ReactNode;
  /** Helper text. */
  description?: React.ReactNode;
  /** Error message and invalid state. */
  error?: React.ReactNode;
  /** Marks the label and grid as required. Use form rules to enforce the value. */
  required?: boolean;
  /** Slot below the grid for actions or a selection summary. */
  footer?: React.ReactNode;
  className?: string;
  id?: string;
  /** Blur handler for react-hook-form. */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

export interface CalendarSingleProps extends CalendarBaseProps {
  /**
   * Selection model.
   * @default "single"
   */
  mode?: "single";
  /** Controlled selection. Use Date for single and { from, to } for range. */
  value?: Date | null;
  /** Initial selection for uncontrolled usage. */
  defaultValue?: Date | null;
  /** Called when the selection changes. @type (value: Date | CalendarRange | null) => void */
  onValueChange?: (value: Date | null) => void;
}

export interface CalendarRangeProps extends CalendarBaseProps {
  /**
   * Selection model.
   */
  mode: "range";
  /** Controlled selection. Use Date for single and { from, to } for range. */
  value?: CalendarRange | null;
  /** Initial selection for uncontrolled usage. */
  defaultValue?: CalendarRange | null;
  /** Called when the selection changes. @type (value: Date | CalendarRange | null) => void */
  onValueChange?: (value: CalendarRange) => void;
}

export type CalendarProps = CalendarSingleProps | CalendarRangeProps;

type CalendarValue = Date | CalendarRange | null;

const EMPTY_RANGE: CalendarRange = { from: null, to: null };

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toDay(date?: Date | null) {
  if (!date || Number.isNaN(date.getTime())) return null;
  return startOfDay(date);
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addDays(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function daysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function addMonthsClamped(date: Date, amount: number) {
  const target = addMonths(date, amount);
  return new Date(
    target.getFullYear(),
    target.getMonth(),
    Math.min(date.getDate(), daysInMonth(target)),
  );
}

function startOfWeek(date: Date, weekStartsOn: CalendarWeekStartsOn) {
  const offset = (date.getDay() - weekStartsOn + 7) % 7;
  return addDays(date, -offset);
}

function isSameDay(a: Date | null, b: Date | null) {
  return Boolean(
    a &&
      b &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate(),
  );
}

function isSameMonth(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
  );
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function clampDate(
  date: Date,
  min?: Date | null,
  max?: Date | null,
) {
  const day = startOfDay(date);
  const minDay = toDay(min);
  const maxDay = toDay(max);
  if (minDay && day < minDay) return minDay;
  if (maxDay && day > maxDay) return maxDay;
  return day;
}

function resolveWeekStart(locale?: Intl.LocalesArgument): CalendarWeekStartsOn {
  try {
    const resolved = new Intl.DateTimeFormat(locale).resolvedOptions().locale;
    const resolvedLocale = new Intl.Locale(resolved) as Intl.Locale & {
      weekInfo?: { firstDay?: number };
      getWeekInfo?: () => { firstDay?: number };
    };
    const info = resolvedLocale.weekInfo ?? resolvedLocale.getWeekInfo?.();
    if (info?.firstDay) {
      return (info.firstDay % 7) as CalendarWeekStartsOn;
    }
    if (/^en(-|$)/i.test(resolved)) return 0;
  } catch {
    // Fall through to a Monday-first calendar.
  }
  return 1;
}

function normalizeRange(range?: CalendarRange | null): CalendarRange {
  if (!range) return EMPTY_RANGE;
  const from = toDay(range.from);
  const to = toDay(range.to);
  if (from && to && to < from) return { from: to, to: from };
  return { from, to };
}

export function Calendar(props: CalendarProps) {
  const {
    month,
    defaultMonth,
    onMonthChange,
    min,
    max,
    disabled: isDateDisabled,
    locale,
    weekStartsOn: weekStartsOnProp,
    showOutsideDays = true,
    size = "default",
    label,
    description,
    error,
    required,
    footer,
    className,
    id,
    onBlur,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
  } = props as CalendarBaseProps;

  const isRange = props.mode === "range";
  const [today] = React.useState(() => startOfDay(new Date()));
  const autoId = React.useId();
  const calendarId = id ?? autoId;
  const labelId = `${calendarId}-label`;
  const monthLabelId = `${calendarId}-month`;
  const descriptionId = description ? `${calendarId}-description` : undefined;
  const hasErrorMessage = hasErrorContent(error);
  const errorId = hasErrorMessage ? `${calendarId}-error` : undefined;

  const defaultRange = isRange
    ? normalizeRange(props.defaultValue as CalendarRange | null | undefined)
    : EMPTY_RANGE;
  const defaultSingle = isRange
    ? null
    : toDay(props.defaultValue as Date | null | undefined);
  const initialFocus = isRange ? defaultRange.from : defaultSingle;
  const initialMonth = startOfMonth(
    defaultMonth ?? clampDate(initialFocus ?? today, min, max),
  );

  const [internalMonth, setInternalMonth] = React.useState<Date>(initialMonth);
  const [internalValue, setInternalValue] = React.useState<CalendarValue>(() =>
    isRange ? defaultRange : defaultSingle,
  );
  const [focusedDate, setFocusedDate] = React.useState<Date>(() =>
    initialFocus && isSameMonth(initialFocus, initialMonth)
      ? initialFocus
      : startOfMonth(initialMonth),
  );
  const [hoverDate, setHoverDate] = React.useState<Date | null>(null);
  const pendingFocus = React.useRef<Date | null>(null);
  const dayRefs = React.useRef(new Map<string, HTMLButtonElement>());

  const value = props.value !== undefined ? props.value : internalValue;
  const singleValue = isRange ? null : toDay(value as Date | null);
  const rangeValue = isRange
    ? normalizeRange(value as CalendarRange | null)
    : EMPTY_RANGE;

  const displayedMonth = startOfMonth(month ?? internalMonth);
  const localeKey = JSON.stringify(locale ?? null);
  const resolvedWeekStart = React.useMemo(
    () => resolveWeekStart(locale),
    [localeKey],
  );
  const weekStartsOn = weekStartsOnProp ?? resolvedWeekStart;

  const formatters = React.useMemo(
    () => ({
      month: new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      }),
      day: new Intl.DateTimeFormat(locale, { day: "numeric" }),
      fullDate: new Intl.DateTimeFormat(locale, { dateStyle: "full" }),
      weekday: new Intl.DateTimeFormat(locale, { weekday: "short" }),
      weekdayLong: new Intl.DateTimeFormat(locale, { weekday: "long" }),
    }),
    [localeKey],
  );

  const minDay = toDay(min);
  const maxDay = toDay(max);
  const gridStart = startOfWeek(startOfMonth(displayedMonth), weekStartsOn);
  const weeks = Array.from({ length: 6 }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) =>
      addDays(gridStart, weekIndex * 7 + dayIndex),
    ),
  );

  const rangeEnd = isRange
    ? (rangeValue.to ?? (rangeValue.from && hoverDate ? hoverDate : null))
    : null;
  const rangeStart = isRange
    ? rangeEnd && rangeValue.from && rangeEnd < rangeValue.from
      ? rangeEnd
      : rangeValue.from
    : null;
  const rangeFinish = isRange
    ? rangeEnd && rangeValue.from && rangeEnd < rangeValue.from
      ? rangeValue.from
      : rangeEnd
    : null;

  const isDisabledDate = (date: Date) => {
    if (minDay && date < minDay) return true;
    if (maxDay && date > maxDay) return true;
    return isDateDisabled?.(date) ?? false;
  };

  const isInRange = (date: Date) =>
    Boolean(rangeStart && rangeFinish && date >= rangeStart && date <= rangeFinish);

  const isInSelectedRange = (date: Date) =>
    Boolean(
      rangeValue.from &&
        rangeValue.to &&
        date >= rangeValue.from &&
        date <= rangeValue.to,
    );

  const isSelected = (date: Date) =>
    isRange
      ? isSameDay(date, rangeValue.from) || isSameDay(date, rangeValue.to)
      : isSameDay(date, singleValue);

  const commit = (nextValue: CalendarValue) => {
    if (props.value === undefined) setInternalValue(nextValue);
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

  const showMonth = (nextMonth: Date, focusDate?: Date) => {
    const normalized = startOfMonth(nextMonth);
    if (month === undefined) setInternalMonth(normalized);
    onMonthChange?.(normalized);
    if (focusDate) {
      setFocusedDate(focusDate);
    } else {
      setFocusedDate((current) => {
        if (isSameMonth(current, normalized)) return current;
        return new Date(
          normalized.getFullYear(),
          normalized.getMonth(),
          Math.min(current.getDate(), daysInMonth(normalized)),
        );
      });
    }
  };

  const selectDate = (date: Date) => {
    const day = startOfDay(date);
    setFocusedDate(day);
    setHoverDate(null);

    if (isRange) {
      const current = normalizeRange(rangeValue);
      let next: CalendarRange;
      if (!current.from || current.to) {
        next = { from: day, to: null };
      } else if (day < current.from) {
        next = { from: day, to: current.from };
      } else {
        next = { from: current.from, to: day };
      }
      commit(next);
    } else {
      commit(day);
    }

    if (!isSameMonth(day, displayedMonth)) showMonth(day, day);
  };

  const moveFocus = (nextDate: Date) => {
    const day = startOfDay(nextDate);
    if (isSameDay(day, focusedDate)) return;
    pendingFocus.current = day;
    if (!isSameMonth(day, displayedMonth)) showMonth(day, day);
    else setFocusedDate(day);
  };

  React.useEffect(() => {
    const next = pendingFocus.current;
    if (!next) return;
    pendingFocus.current = null;
    dayRefs.current.get(dateKey(next))?.focus();
  }, [focusedDate]);

  React.useEffect(() => {
    const selection = isRange ? rangeValue.from : singleValue;
    if (!selection || month !== undefined) return;
    setInternalMonth((current) =>
      isSameMonth(current, selection) ? current : startOfMonth(selection),
    );
  }, [singleValue?.getTime(), rangeValue.from?.getTime()]);

  const onGridKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.getAttribute("role") !== "gridcell") return;

    let nextDate: Date;
    switch (event.key) {
      case "ArrowLeft":
        nextDate = addDays(focusedDate, -1);
        break;
      case "ArrowRight":
        nextDate = addDays(focusedDate, 1);
        break;
      case "ArrowUp":
        nextDate = addDays(focusedDate, -7);
        break;
      case "ArrowDown":
        nextDate = addDays(focusedDate, 7);
        break;
      case "Home":
        nextDate = startOfWeek(focusedDate, weekStartsOn);
        break;
      case "End":
        nextDate = addDays(startOfWeek(focusedDate, weekStartsOn), 6);
        break;
      case "PageUp":
        nextDate = addMonthsClamped(focusedDate, event.shiftKey ? -12 : -1);
        break;
      case "PageDown":
        nextDate = addMonthsClamped(focusedDate, event.shiftKey ? 12 : 1);
        break;
      default:
        return;
    }

    event.preventDefault();
    moveFocus(nextDate);
  };

  const previousMonth = addMonths(displayedMonth, -1);
  const nextMonth = addMonths(displayedMonth, 1);
  const previousDisabled = Boolean(
    minDay &&
      new Date(
        previousMonth.getFullYear(),
        previousMonth.getMonth() + 1,
        0,
      ) < minDay,
  );
  const nextDisabled = Boolean(maxDay && nextMonth > maxDay);

  const describedBy =
    [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(" ") ||
    undefined;
  const labelledBy =
    [ariaLabelledBy, label ? labelId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;
  const invalid = Boolean(error) || Boolean(ariaInvalid);
  const tabbableDate =
    focusedDate >= gridStart && focusedDate < addDays(gridStart, 42)
      ? focusedDate
      : displayedMonth;
  const sizeClasses =
    size === "sm"
      ? { cell: "h-8 w-8", day: "size-8 text-xs" }
      : { cell: "h-9 w-9", day: "size-9 text-sm" };

  const PreviousIcon = useKitIcon("chevronLeft");
  const NextIcon = useKitIcon("chevronRight");

  return (
    <div className={cn("flex w-fit flex-col gap-1.5", className)}>
      {label ? (
        <div
          id={labelId}
          className="text-sm font-medium leading-none text-foreground"
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="ml-0.5 text-destructive">
              *
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <IconButton
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Previous month"
            disabled={previousDisabled}
            onClick={() => showMonth(previousMonth)}
          >
            <PreviousIcon size={15} aria-hidden="true" />
          </IconButton>
          <div
            id={monthLabelId}
            aria-live="polite"
            className="text-sm font-semibold text-foreground"
          >
            {formatters.month.format(displayedMonth)}
          </div>
          <IconButton
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Next month"
            disabled={nextDisabled}
            onClick={() => showMonth(nextMonth)}
          >
            <NextIcon size={15} aria-hidden="true" />
          </IconButton>
        </div>

        <div
          id={calendarId}
          role="grid"
          aria-label={labelledBy ? undefined : (ariaLabel ?? "Calendar")}
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
          aria-multiselectable={isRange || undefined}
          aria-required={required || undefined}
          aria-invalid={invalid || undefined}
          className={cn(
            "w-fit select-none rounded-control",
            invalid && "bg-destructive/5",
          )}
          onBlur={onBlur}
          onKeyDown={onGridKeyDown}
          onMouseLeave={() => setHoverDate(null)}
        >
          <div role="row" className="flex">
            {Array.from({ length: 7 }, (_, index) => {
              const weekday = addDays(gridStart, index);
              return (
                <div
                  key={index}
                  role="columnheader"
                  aria-label={formatters.weekdayLong.format(weekday)}
                  className={cn(
                    "flex items-center justify-center text-xs font-medium text-muted-foreground",
                    sizeClasses.cell,
                  )}
                >
                  {formatters.weekday.format(weekday)}
                </div>
              );
            })}
          </div>

          {weeks.map((week, weekIndex) => (
            <div role="row" key={weekIndex} className="flex">
              {week.map((date) => {
                const outside = !isSameMonth(date, displayedMonth);
                const dateDisabled = isDisabledDate(date);
                const selected = isSelected(date);
                const inRange = isInRange(date);
                const todayDate = isSameDay(date, today);

                if (outside && !showOutsideDays) {
                  return (
                    <div
                      key={dateKey(date)}
                      role="gridcell"
                      aria-hidden="true"
                      className={sizeClasses.cell}
                    />
                  );
                }

                return (
                  <div
                    key={dateKey(date)}
                    role="presentation"
                    className={cn(
                      "relative flex items-center justify-center",
                      sizeClasses.cell,
                      inRange && "bg-primary-soft",
                      inRange &&
                        isSameDay(date, rangeStart) &&
                        "rounded-l-control",
                      inRange &&
                        isSameDay(date, rangeFinish) &&
                        "rounded-r-control",
                    )}
                  >
                    <button
                      ref={(node) => {
                        if (node) dayRefs.current.set(dateKey(date), node);
                        else dayRefs.current.delete(dateKey(date));
                      }}
                      type="button"
                      role="gridcell"
                      tabIndex={isSameDay(date, tabbableDate) ? 0 : -1}
                      aria-label={formatters.fullDate.format(date)}
                      aria-selected={selected || isInSelectedRange(date)}
                      aria-disabled={dateDisabled || undefined}
                      aria-current={todayDate ? "date" : undefined}
                      onClick={() => {
                        if (!dateDisabled) selectDate(date);
                      }}
                      onFocus={() => setFocusedDate(startOfDay(date))}
                      onMouseEnter={() => {
                        if (
                          isRange &&
                          rangeValue.from &&
                          !rangeValue.to &&
                          !dateDisabled
                        ) {
                          setHoverDate(startOfDay(date));
                        }
                      }}
                      className={cn(
                        "relative z-10 flex items-center justify-center rounded-control tabular-nums outline-none transition-[background-color,color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        sizeClasses.day,
                        outside && "text-muted-foreground/45",
                        todayDate && !selected && "font-semibold text-primary",
                        selected
                          ? "bg-primary text-primary-foreground shadow-[var(--shadow-control)] hover:bg-primary-hover"
                          : inRange
                            ? "text-primary-soft-foreground hover:bg-primary/10"
                            : "hover:bg-surface-hover",
                        dateDisabled &&
                          "cursor-not-allowed text-muted-foreground/40 hover:bg-transparent",
                      )}
                    >
                      {formatters.day.format(date)}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {footer ? <div className="pt-1">{footer}</div> : null}
      </div>

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
}
