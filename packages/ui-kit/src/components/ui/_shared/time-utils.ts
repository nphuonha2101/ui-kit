export interface TimeParts {
  hour: number;
  minute: number;
}

export function pad2(value: number) {
  return String(value).padStart(2, "0");
}

/** Parse a canonical "HH:mm" (or "H:mm") wall-clock string. */
export function parseTime(value?: string | null): TimeParts | null {
  if (!value) return null;
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
  return { hour, minute };
}

export function formatTime(hour: number, minute: number) {
  return `${pad2(hour)}:${pad2(minute)}`;
}

export function timeToMinutes(parts: TimeParts) {
  return parts.hour * 60 + parts.minute;
}

export function minutesToTime(total: number): TimeParts {
  const normalized = ((total % 1440) + 1440) % 1440;
  return { hour: Math.floor(normalized / 60), minute: normalized % 60 };
}

export function parseTimeToMinutes(value?: string | null) {
  const parts = parseTime(value);
  return parts ? timeToMinutes(parts) : null;
}

export function normalizeStep(step?: number) {
  if (!Number.isFinite(step)) return 1;
  return Math.min(59, Math.max(1, Math.round(step as number)));
}

export function roundMinuteToStep(minute: number, step: number) {
  return Math.max(0, Math.round(minute / step) * step);
}

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isSameDay(a?: Date | null, b?: Date | null) {
  return Boolean(
    a &&
      b &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate(),
  );
}

export function combineDateAndTime(date: Date, time?: string | null, fallback = "09:00") {
  const parts = parseTime(time) ?? parseTime(fallback) ?? { hour: 9, minute: 0 };
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    parts.hour,
    parts.minute,
    0,
    0,
  );
}

export function clampDateTime(date: Date, min?: Date | null, max?: Date | null) {
  if (min && date < min) return new Date(min);
  if (max && date > max) return new Date(max);
  return date;
}

/** Round a Date down to the nearest minute step, zeroing seconds. */
export function roundDateToStep(date: Date, step?: number) {
  const safeStep = normalizeStep(step);
  const next = new Date(date);
  next.setSeconds(0, 0);
  const snapped = roundMinuteToStep(next.getMinutes(), safeStep);
  next.setMinutes(snapped);
  return next;
}

/** Value for a native `datetime-local` hidden input. */
export function toDateTimeLocalValue(date?: Date | null) {
  if (!date || Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(
    date.getDate(),
  )}T${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}
