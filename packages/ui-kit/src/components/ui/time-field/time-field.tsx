"use client";

import * as React from "react";
import { cn, hasErrorContent } from "../../../lib/utils";
import {
  formatTime,
  minutesToTime,
  normalizeStep,
  parseTime,
  parseTimeToMinutes,
  roundMinuteToStep,
  type TimeParts,
} from "../_shared/time-utils";
import { useKitIcon } from "../_shared/icon-provider";
import { Label } from "../label";

export type TimeFieldHourCycle = 12 | 24;

export interface TimeFieldProps {
  /** Controlled value in 24-hour "HH:mm" form. */
  value?: string | null;
  /** Initial value for uncontrolled usage. */
  defaultValue?: string | null;
  /** Called with "HH:mm" when the value is complete, or null when it is not. */
  onValueChange?: (value: string | null) => void;
  /**
   * Display cycle. Defaults to the locale's preferred cycle.
   * @default locale
   */
  hourCycle?: TimeFieldHourCycle;
  /**
   * Minute increment used by arrow keys and snapping.
   * @default 1
   */
  step?: number;
  /** Earliest allowed time in "HH:mm" form. */
  min?: string;
  /** Latest allowed time in "HH:mm" form. */
  max?: string;
  /** Disables the field. */
  disabled?: boolean;
  /** Prevents edits while keeping the value readable. */
  readOnly?: boolean;
  /** Marks the label and group as required. Use form rules to enforce the value. */
  required?: boolean;
  /** Name for a hidden input with an "HH:mm" value. */
  name?: string;
  id?: string;
  /** Visible label. */
  label?: React.ReactNode;
  /** Helper text. */
  description?: React.ReactNode;
  /** Error message and invalid state. */
  error?: React.ReactNode;
  /** Shows a Clear action when a value is present. */
  clearable?: boolean;
  /** Locale used for segment order, labels and digits. */
  locale?: Intl.LocalesArgument;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

type TimeSegment = "hour" | "minute" | "dayPeriod";
type DayPeriod = "am" | "pm";

interface DisplayPart {
  type: "literal" | TimeSegment;
  value?: string;
}

interface TimeDisplay {
  hourCycle: TimeFieldHourCycle;
  parts: DisplayPart[];
  numberFormatter: Intl.NumberFormat;
  dayPeriods: { am: string; pm: string };
}

interface PartialTimeParts {
  hour: number | null;
  minute: number | null;
}

const EMPTY_PARTS: PartialTimeParts = { hour: null, minute: null };

function resolveHourCycle(locale?: Intl.LocalesArgument): TimeFieldHourCycle {
  try {
    const resolved = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
    }).resolvedOptions();
    return resolved.hourCycle === "h11" || resolved.hourCycle === "h12"
      ? 12
      : 24;
  } catch {
    return 24;
  }
}

function buildTimeDisplay(
  locale: Intl.LocalesArgument | undefined,
  hourCycleProp: TimeFieldHourCycle | undefined,
): TimeDisplay {
  const hourCycle = hourCycleProp ?? resolveHourCycle(locale);
  try {
    const sample = new Date(2000, 0, 1, 13, 5);
    const formatter = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "2-digit",
      hour12: hourCycle === 12,
    });
    const parts: DisplayPart[] = [];
    for (const part of formatter.formatToParts(sample)) {
      if (part.type === "hour") parts.push({ type: "hour" });
      else if (part.type === "minute") parts.push({ type: "minute" });
      else if (part.type === "dayPeriod") parts.push({ type: "dayPeriod" });
      else if (part.type === "literal") {
        parts.push({ type: "literal", value: part.value });
      }
    }
    if (hourCycle === 12 && !parts.some((part) => part.type === "dayPeriod")) {
      parts.push({ type: "dayPeriod" });
    }
    const dayPeriodFormatter = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      hour12: true,
    });
    const dayPeriod = (hour: number) =>
      dayPeriodFormatter
        .formatToParts(new Date(2000, 0, 1, hour, 0))
        .find((part) => part.type === "dayPeriod")?.value ??
      (hour < 12 ? "AM" : "PM");
    return {
      hourCycle,
      parts,
      numberFormatter: new Intl.NumberFormat(locale, {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
      dayPeriods: { am: dayPeriod(9), pm: dayPeriod(15) },
    };
  } catch {
    return {
      hourCycle: 24,
      parts: [
        { type: "hour" },
        { type: "literal", value: ":" },
        { type: "minute" },
      ],
      numberFormatter: new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
      dayPeriods: { am: "AM", pm: "PM" },
    };
  }
}

function displayHour(hour: number, hourCycle: TimeFieldHourCycle) {
  return hourCycle === 12 ? hour % 12 || 12 : hour;
}

function internalHour(
  value: number,
  period: DayPeriod,
  hourCycle: TimeFieldHourCycle,
) {
  if (hourCycle === 24) return value;
  const normalized = value === 0 ? 12 : value;
  return (normalized % 12) + (period === "pm" ? 12 : 0);
}

function periodOf(hour: number | null): DayPeriod {
  return hour != null && hour >= 12 ? "pm" : "am";
}

function snapMinute(value: number, step: number) {
  const snapped = roundMinuteToStep(value, step);
  return snapped > 59 ? Math.floor(59 / step) * step : snapped;
}

export const TimeField = React.forwardRef<HTMLDivElement, TimeFieldProps>(
  function TimeField(
    {
      value,
      defaultValue,
      onValueChange,
      hourCycle: hourCycleProp,
      step,
      min,
      max,
      disabled,
      readOnly,
      required,
      name,
      id,
      label,
      description,
      error,
      clearable = false,
      locale,
      onBlur,
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
    },
    ref,
  ) {
    const autoId = React.useId();
    const fieldId = id ?? autoId;
    const labelId = `${fieldId}-label`;
    const descriptionId = description ? `${fieldId}-description` : undefined;
    const requiredId = required ? `${fieldId}-required` : undefined;
    const hasErrorMessage = hasErrorContent(error);
    const errorId = hasErrorMessage ? `${fieldId}-error` : undefined;
    const invalid = Boolean(error) || Boolean(ariaInvalid);
    const safeStep = normalizeStep(step);
    const minMinutes = parseTimeToMinutes(min);
    const maxMinutes = parseTimeToMinutes(max);
    const localeKey = JSON.stringify(locale ?? null);
    const display = React.useMemo(
      () => buildTimeDisplay(locale, hourCycleProp),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [localeKey, hourCycleProp],
    );
    const segments = React.useMemo(
      () =>
        display.parts
          .filter((part): part is DisplayPart & { type: TimeSegment } =>
            part.type !== "literal",
          )
          .map((part) => part.type),
      [display.parts],
    );

    const controlled = value !== undefined;
    const initialParts = React.useMemo(
      () => parseTime(value ?? defaultValue),
      // defaultValue is intentionally read only on mount.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );
    const [parts, setParts] = React.useState<PartialTimeParts>(
      initialParts ?? EMPTY_PARTS,
    );
    const partsRef = React.useRef<PartialTimeParts>(parts);
    const lastValueRef = React.useRef<string | null>(
      initialParts ? formatTime(initialParts.hour, initialParts.minute) : null,
    );
    const pendingRef = React.useRef<{
      segment: "hour" | "minute";
      digits: string;
    } | null>(null);
    const segmentRefs = React.useRef<
      Partial<Record<TimeSegment, HTMLInputElement | null>>
    >({});

    React.useEffect(() => {
      if (!controlled) return;
      const next = value ?? null;
      if (next === lastValueRef.current) return;
      lastValueRef.current = next;
      const parsed = parseTime(next);
      const nextParts = parsed ?? EMPTY_PARTS;
      partsRef.current = nextParts;
      setParts(nextParts);
    }, [controlled, value]);

    const setPartsState = (next: PartialTimeParts) => {
      partsRef.current = next;
      setParts(next);
    };

    const clampParts = (next: PartialTimeParts): PartialTimeParts => {
      if (next.hour == null || next.minute == null) return next;
      let total = next.hour * 60 + next.minute;
      if (minMinutes != null && total < minMinutes) total = minMinutes;
      if (maxMinutes != null && total > maxMinutes) total = maxMinutes;
      const clamped = minutesToTime(total);
      return { hour: clamped.hour, minute: clamped.minute };
    };

    const emitParts = (next: PartialTimeParts) => {
      const clamped = clampParts(next);
      setPartsState(clamped);
      const nextValue =
        clamped.hour != null && clamped.minute != null
          ? formatTime(clamped.hour, clamped.minute)
          : null;
      if (nextValue !== lastValueRef.current) {
        lastValueRef.current = nextValue;
        onValueChange?.(nextValue);
      }
    };

    const focusSegment = (segment: TimeSegment) => {
      const input = segmentRefs.current[segment];
      input?.focus();
      input?.select();
    };

    const advanceFocus = (from: TimeSegment) => {
      const index = segments.indexOf(from);
      const next = segments[index + 1];
      if (next) focusSegment(next);
    };

    const moveFocus = (from: TimeSegment, direction: -1 | 1) => {
      flushPending();
      const index = segments.indexOf(from);
      const next = segments[index + direction];
      if (next) focusSegment(next);
    };

    const setSegmentValue = (
      segment: "hour" | "minute",
      segmentValue: number,
      options: { snap?: boolean; advance?: boolean } = {},
    ) => {
      const base = partsRef.current;
      const next = { ...base };
      if (segment === "hour") {
        next.hour = internalHour(
          segmentValue,
          periodOf(base.hour),
          display.hourCycle,
        );
      } else {
        next.minute =
          options.snap === false
            ? Math.min(59, Math.max(0, segmentValue))
            : snapMinute(segmentValue, safeStep);
      }
      emitParts(next);
      if (options.advance) advanceFocus(segment);
    };

    const previewSegment = (segment: "hour" | "minute", segmentValue: number) => {
      const base = partsRef.current;
      const next = { ...base };
      if (segment === "hour") {
        next.hour = internalHour(
          segmentValue,
          periodOf(base.hour),
          display.hourCycle,
        );
      } else {
        next.minute = Math.min(59, Math.max(0, segmentValue));
      }
      setPartsState(next);
    };

    const flushPending = () => {
      const pending = pendingRef.current;
      if (!pending) return;
      pendingRef.current = null;
      setSegmentValue(pending.segment, Number(pending.digits));
    };

    const handleDigit = (segment: "hour" | "minute", digit: string) => {
      if (readOnly || disabled) return;
      const cycle = display.hourCycle;
      const segmentMin = segment === "hour" && cycle === 12 ? 1 : 0;
      const segmentMax = segment === "hour" ? (cycle === 12 ? 12 : 23) : 59;
      const pending =
        pendingRef.current?.segment === segment ? pendingRef.current : null;

      if (pending) {
        const candidate = Number(pending.digits + digit);
        if (candidate >= segmentMin && candidate <= segmentMax) {
          pendingRef.current = null;
          setSegmentValue(segment, candidate, { advance: true });
        }
        return;
      }

      const digitValue = Number(digit);
      const canExtend =
        digitValue * 10 <= segmentMax && digitValue * 10 + 9 >= segmentMin;
      if (canExtend) {
        pendingRef.current = { segment, digits: digit };
        previewSegment(segment, digitValue);
        return;
      }
      if (digitValue >= segmentMin && digitValue <= segmentMax) {
        setSegmentValue(segment, digitValue, { advance: true });
      }
    };

    const adjustHour = (direction: -1 | 1) => {
      flushPending();
      const base = partsRef.current;
      const cycle = display.hourCycle;
      const segmentMin = cycle === 12 ? 1 : 0;
      const segmentMax = cycle === 12 ? 12 : 23;
      const current =
        base.hour == null ? null : displayHour(base.hour, cycle);
      let next: number;
      if (current == null) {
        next = direction > 0 ? segmentMin : segmentMax;
      } else {
        next = current + direction;
        if (next > segmentMax) next = segmentMin;
        if (next < segmentMin) next = segmentMax;
      }
      setSegmentValue("hour", next);
    };

    const adjustMinute = (direction: -1 | 1) => {
      flushPending();
      const base = partsRef.current;
      if (base.minute == null) {
        setSegmentValue("minute", direction > 0 ? 0 : Math.floor(59 / safeStep) * safeStep, {
          snap: false,
        });
        return;
      }
      if (base.hour != null) {
        const total = base.hour * 60 + base.minute;
        const ratio = total / safeStep;
        let target =
          (direction > 0 ? Math.ceil(ratio) : Math.floor(ratio)) * safeStep;
        if (target === total) target += direction * safeStep;
        const next = minutesToTime(target);
        emitParts({ hour: next.hour, minute: next.minute });
        return;
      }
      const grid = Math.round(base.minute / safeStep) * safeStep;
      const next = (grid + direction * safeStep + 60) % 60;
      setSegmentValue("minute", next, { snap: false });
    };

    const setPeriod = (period: DayPeriod) => {
      const base = partsRef.current;
      const hour =
        base.hour == null
          ? period === "pm"
            ? 12
            : 0
          : (base.hour % 12) + (period === "pm" ? 12 : 0);
      emitParts({ ...base, hour });
    };

    const clearSegment = (segment: "hour" | "minute") => {
      pendingRef.current = null;
      emitParts({ ...partsRef.current, [segment]: null });
    };

    const clear = () => {
      pendingRef.current = null;
      emitParts(EMPTY_PARTS);
      focusSegment("hour");
    };

    const handleSegmentKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
      segment: TimeSegment,
    ) => {
      if (disabled) return;
      const key = event.key;

      if (key === "Tab") {
        flushPending();
        return;
      }
      if (readOnly) return;

      if (segment === "dayPeriod") {
        if (key === "ArrowUp" || key === "ArrowDown") {
          event.preventDefault();
          setPeriod(periodOf(partsRef.current.hour) === "am" ? "pm" : "am");
        } else if (key === "Home") {
          event.preventDefault();
          setPeriod("am");
        } else if (key === "End") {
          event.preventDefault();
          setPeriod("pm");
        } else if (/^[ap]$/i.test(key)) {
          event.preventDefault();
          setPeriod(key.toLowerCase() === "a" ? "am" : "pm");
        } else if (key === "ArrowLeft" || key === "ArrowRight") {
          event.preventDefault();
          moveFocus("dayPeriod", key === "ArrowLeft" ? -1 : 1);
        }
        return;
      }

      if (/^\d$/.test(key)) {
        event.preventDefault();
        handleDigit(segment, key);
        return;
      }

      switch (key) {
        case "ArrowUp":
          event.preventDefault();
          if (segment === "hour") adjustHour(1);
          else adjustMinute(1);
          break;
        case "ArrowDown":
          event.preventDefault();
          if (segment === "hour") adjustHour(-1);
          else adjustMinute(-1);
          break;
        case "ArrowLeft":
          event.preventDefault();
          moveFocus(segment, -1);
          break;
        case "ArrowRight":
          event.preventDefault();
          moveFocus(segment, 1);
          break;
        case "Home":
          event.preventDefault();
          if (segment === "hour") {
            setSegmentValue("hour", display.hourCycle === 12 ? 1 : 0);
          } else {
            setSegmentValue("minute", 0);
          }
          break;
        case "End":
          event.preventDefault();
          if (segment === "hour") {
            setSegmentValue("hour", display.hourCycle === 12 ? 12 : 23);
          } else {
            setSegmentValue(
              "minute",
              Math.floor(59 / safeStep) * safeStep,
              { snap: false },
            );
          }
          break;
        case "Backspace":
        case "Delete":
          event.preventDefault();
          clearSegment(segment);
          break;
        case "Enter":
          flushPending();
          break;
        default:
          break;
      }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;
      const text = event.clipboardData.getData("text").trim();
      const match =
        /^(\d{1,2})[:.](\d{2})(?:\s*(am|pm))?$/i.exec(text) ??
        /^(\d{1,2})(\d{2})(?:\s*(am|pm))?$/i.exec(text);
      if (!match) return;
      const rawHour = Number(match[1]);
      const minute = Number(match[2]);
      const suffix = match[3]?.toLowerCase() as DayPeriod | undefined;
      let hour = rawHour;
      if (suffix) {
        if (rawHour < 1 || rawHour > 12) return;
        hour = internalHour(rawHour, suffix, 12);
      } else if (rawHour < 0 || rawHour > 23) {
        return;
      }
      if (minute < 0 || minute > 59) return;
      event.preventDefault();
      pendingRef.current = null;
      emitParts({ hour, minute });
    };

    const handleGroupBlur = (event: React.FocusEvent<HTMLDivElement>) => {
      const next = event.relatedTarget as Node | null;
      if (next && event.currentTarget.contains(next)) return;
      flushPending();
      onBlur?.(event);
    };

    const describedBy =
      [ariaDescribedBy, descriptionId, errorId, requiredId]
        .filter(Boolean)
        .join(" ") || undefined;
    const labelledBy =
      [ariaLabelledBy, label ? labelId : undefined]
        .filter(Boolean)
        .join(" ") || undefined;
    const currentValue =
      parts.hour != null && parts.minute != null
        ? formatTime(parts.hour, parts.minute)
        : null;
    const period = periodOf(parts.hour);
    const dayPeriodLabel = display.dayPeriods[period];
    const hourDisplay = parts.hour == null ? null : displayHour(parts.hour, display.hourCycle);
    const minuteDisplay = parts.minute;
    const ClearIcon = useKitIcon("close");

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label ? (
          <Label
            id={labelId}
            htmlFor={`${fieldId}-hour`}
            requiredMark={required}
          >
            {label}
          </Label>
        ) : null}
        {name ? (
          <input type="hidden" name={name} value={currentValue ?? ""} />
        ) : null}
        {requiredId ? (
          <span id={requiredId} className="sr-only">
            Required
          </span>
        ) : null}

        <div
          ref={ref}
          id={fieldId}
          role="group"
          aria-label={labelledBy ? undefined : (ariaLabel ?? "Time")}
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
          aria-required={required || undefined}
          aria-invalid={invalid || undefined}
          aria-disabled={disabled || undefined}
          aria-readonly={readOnly || undefined}
          onBlur={handleGroupBlur}
          className={cn(
            "surface-inset flex h-10 w-full items-center gap-0.5 rounded-field bg-field px-3 text-sm text-field-foreground transition-[background-color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)]",
            "focus-within:ring-2 focus-within:ring-ring/35 focus-within:ring-offset-2 focus-within:ring-offset-background",
            disabled && "cursor-not-allowed opacity-45",
            invalid && "bg-destructive/10 focus-within:ring-destructive/30",
          )}
        >
          {display.parts.map((part, index) =>
            part.type === "literal" ? (
              <span
                key={`literal-${index}`}
                aria-hidden="true"
                className="whitespace-pre text-muted-foreground"
              >
                {part.value}
              </span>
            ) : part.type === "hour" ? (
              <input
                key="hour"
                ref={(node) => {
                  segmentRefs.current.hour = node;
                }}
                id={`${fieldId}-hour`}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                spellCheck={false}
                role="spinbutton"
                aria-label="Hour"
                aria-valuemin={display.hourCycle === 12 ? 1 : 0}
                aria-valuemax={display.hourCycle === 12 ? 12 : 23}
                aria-valuenow={hourDisplay ?? undefined}
                aria-valuetext={
                  hourDisplay == null
                    ? "Empty"
                    : display.hourCycle === 12
                      ? `${display.numberFormatter.format(hourDisplay)} ${dayPeriodLabel}`
                      : display.numberFormatter.format(hourDisplay)
                }
                aria-disabled={disabled || undefined}
                aria-readonly={readOnly || undefined}
                aria-required={required || undefined}
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy}
                disabled={disabled}
                readOnly={readOnly}
                value={
                  hourDisplay == null
                    ? "--"
                    : display.numberFormatter.format(hourDisplay)
                }
                onChange={() => {}}
                onFocus={(event) => event.currentTarget.select()}
                onKeyDown={(event) => handleSegmentKeyDown(event, "hour")}
                onPaste={handlePaste}
                onBlur={() => {
                  flushPending();
                }}
                className={cn(
                  "h-8 w-7 rounded-xs bg-transparent px-0.5 text-center tabular-nums text-field-foreground outline-none transition-colors focus-visible:bg-surface-hover focus-visible:ring-2 focus-visible:ring-ring/35 disabled:cursor-not-allowed",
                  hourDisplay == null && "text-muted-foreground/60",
                )}
              />
            ) : part.type === "minute" ? (
              <input
                key="minute"
                ref={(node) => {
                  segmentRefs.current.minute = node;
                }}
                id={`${fieldId}-minute`}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                spellCheck={false}
                role="spinbutton"
                aria-label="Minute"
                aria-valuemin={0}
                aria-valuemax={59}
                aria-valuenow={minuteDisplay ?? undefined}
                aria-valuetext={
                  minuteDisplay == null
                    ? "Empty"
                    : display.numberFormatter.format(minuteDisplay)
                }
                aria-disabled={disabled || undefined}
                aria-readonly={readOnly || undefined}
                aria-required={required || undefined}
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy}
                disabled={disabled}
                readOnly={readOnly}
                value={
                  minuteDisplay == null
                    ? "--"
                    : display.numberFormatter.format(minuteDisplay)
                }
                onChange={() => {}}
                onFocus={(event) => event.currentTarget.select()}
                onKeyDown={(event) => handleSegmentKeyDown(event, "minute")}
                onPaste={handlePaste}
                onBlur={() => {
                  flushPending();
                }}
                className={cn(
                  "h-8 w-7 rounded-xs bg-transparent px-0.5 text-center tabular-nums text-field-foreground outline-none transition-colors focus-visible:bg-surface-hover focus-visible:ring-2 focus-visible:ring-ring/35 disabled:cursor-not-allowed",
                  minuteDisplay == null && "text-muted-foreground/60",
                )}
              />
            ) : (
              <input
                key="dayPeriod"
                ref={(node) => {
                  segmentRefs.current.dayPeriod = node;
                }}
                id={`${fieldId}-period`}
                type="text"
                autoComplete="off"
                spellCheck={false}
                role="spinbutton"
                aria-label="AM/PM"
                aria-valuemin={0}
                aria-valuemax={1}
                aria-valuenow={period === "am" ? 0 : 1}
                aria-valuetext={dayPeriodLabel}
                aria-disabled={disabled || undefined}
                aria-readonly={readOnly || undefined}
                aria-required={required || undefined}
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy}
                disabled={disabled}
                readOnly={readOnly}
                size={Math.max(2, dayPeriodLabel.length)}
                value={dayPeriodLabel}
                onChange={() => {}}
                onFocus={(event) => event.currentTarget.select()}
                onKeyDown={(event) => handleSegmentKeyDown(event, "dayPeriod")}
                className="h-8 w-auto min-w-8 rounded-xs bg-transparent px-0.5 text-center text-xs font-medium text-field-foreground outline-none transition-colors focus-visible:bg-surface-hover focus-visible:ring-2 focus-visible:ring-ring/35 disabled:cursor-not-allowed"
              />
            ),
          )}

          {clearable && currentValue ? (
            <button
              type="button"
              aria-label="Clear time"
              disabled={disabled || readOnly}
              onClick={clear}
              className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-xs text-muted-foreground outline-none transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-40"
            >
              <ClearIcon size={12} aria-hidden="true" />
            </button>
          ) : null}
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
  },
);
TimeField.displayName = "TimeField";
