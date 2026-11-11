"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { useKitIcon } from "./icon-provider";

export interface PickerTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: React.ReactNode;
  /** Element shown before the value. Defaults to the calendar icon. */
  startIcon?: React.ReactNode;
  /** Mutes the value to signal an empty field. */
  placeholder?: boolean;
  /** Hides the trailing chevron. */
  hideChevron?: boolean;
  /** Applies the invalid visual state. */
  invalid?: boolean;
}

/**
 * Shared trigger styling for popover-backed form fields (date, color,
 * date-time). Keeps height, surfaces, focus ring and disabled states aligned
 * with native fields.
 */
export const PickerTrigger = React.forwardRef<
  HTMLButtonElement,
  PickerTriggerProps
>(function PickerTrigger(
  {
    className,
    children,
    startIcon,
    placeholder,
    hideChevron,
    invalid,
    ...props
  },
  ref,
) {
  const ChevronIcon = useKitIcon("chevronDown");
  const CalendarIcon = useKitIcon("calendar");

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "surface-inset flex h-10 w-full items-center gap-2 rounded-field bg-field px-3.5 text-sm text-field-foreground transition-[background-color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)] outline-none",
        "hover:bg-field-hover focus-visible:bg-field focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-45",
        invalid && "bg-destructive/10 focus-visible:ring-destructive/30",
        className,
      )}
      {...props}
    >
      {startIcon ?? (
        <CalendarIcon
          size={16}
          className="shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
      )}
      <span
        className={cn(
          "min-w-0 flex-1 truncate text-left",
          placeholder && "text-muted-foreground/70",
        )}
      >
        {children}
      </span>
      {hideChevron ? null : (
        <ChevronIcon
          size={14}
          className="shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
      )}
    </button>
  );
});
PickerTrigger.displayName = "PickerTrigger";
