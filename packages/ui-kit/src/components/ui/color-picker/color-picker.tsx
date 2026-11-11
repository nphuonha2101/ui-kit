"use client";

import * as React from "react";
import { cn, hasErrorContent } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";
import { PickerTrigger } from "../_shared/picker-trigger";
import { Input } from "../input";
import { Label } from "../label";
import { Popover } from "../popover";
import {
  clamp,
  contrastText,
  hexToHsv,
  hsvToHex,
  normalizeHex,
  type HsvColor,
} from "./color-picker-utils";

const DEFAULT_COLOR = "#0d9488";
const HUE_GRADIENT =
  "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)";

export interface ColorPickerProps {
  /** Controlled color as a hex string. */
  value?: string | null;
  /** Initial color for uncontrolled usage. */
  defaultValue?: string | null;
  /** Called with a normalized lowercase hex string, or null when cleared. */
  onValueChange?: (value: string | null) => void;
  /** Disables the trigger and popup controls. */
  disabled?: boolean;
  /** Marks the label as required. Use form rules to enforce the value. */
  required?: boolean;
  /** Adds a Clear action to the popup. */
  clearable?: boolean;
  /** Name for a hidden input with the hex value. */
  name?: string;
  id?: string;
  /** Visible label. */
  label?: React.ReactNode;
  /** Helper text. */
  description?: React.ReactNode;
  /** Error message and invalid state. */
  error?: React.ReactNode;
  /** Preset colors shown below the picker. */
  swatches?: string[];
  /** Shows the eyedropper action when the browser supports it. */
  showEyeDropper?: boolean;
  /** Text shown when no color is selected. */
  placeholder?: React.ReactNode;
  className?: string;
  popoverClassName?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

function withPreservedHue(next: HsvColor, current: HsvColor | null) {
  if (current && (next.s === 0 || next.v === 0)) {
    return { ...next, h: current.h };
  }
  return next;
}

export const ColorPicker = React.forwardRef<HTMLButtonElement, ColorPickerProps>(
  function ColorPicker(
    {
      value,
      defaultValue,
      onValueChange,
      disabled,
      required,
      clearable = false,
      name,
      id,
      label,
      description,
      error,
      swatches,
      showEyeDropper = false,
      placeholder,
      className,
      popoverClassName,
      side = "bottom",
      align = "start",
      onBlur,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
    },
    ref,
  ) {
    const autoId = React.useId();
    const triggerId = id ?? autoId;
    const descriptionId = description ? `${triggerId}-description` : undefined;
    const requiredId = required ? `${triggerId}-required` : undefined;
    const hasErrorMessage = hasErrorContent(error);
    const errorId = hasErrorMessage ? `${triggerId}-error` : undefined;
    const invalid = Boolean(error) || Boolean(ariaInvalid);
    const controlled = value !== undefined;
    const initialHex = normalizeHex(value ?? defaultValue ?? "") ?? null;
    const [internalValue, setInternalValue] = React.useState<string | null>(
      initialHex,
    );
    const [hsv, setHsv] = React.useState<HsvColor>(
      () => hexToHsv(initialHex ?? DEFAULT_COLOR) as HsvColor,
    );
    const hsvRef = React.useRef(hsv);
    const lastHexRef = React.useRef<string | null>(initialHex);
    const [hexDraft, setHexDraft] = React.useState(
      initialHex?.toUpperCase() ?? "",
    );
    const [open, setOpen] = React.useState(false);
    const [hasEyeDropper, setHasEyeDropper] = React.useState(false);

    const currentHex = controlled
      ? normalizeHex(value ?? "")
      : internalValue;
    const hasValue = Boolean(currentHex);
    const placeholderText = placeholder ?? "Pick a color";

    React.useEffect(() => {
      if (!controlled) return;
      const next = normalizeHex(value ?? "");
      if (next === lastHexRef.current) return;
      lastHexRef.current = next;
      setHexDraft(next?.toUpperCase() ?? "");
      if (!next) return;
      const nextHsv = withPreservedHue(
        hexToHsv(next) as HsvColor,
        hsvRef.current,
      );
      hsvRef.current = nextHsv;
      setHsv(nextHsv);
    }, [controlled, value]);

    React.useEffect(() => {
      setHasEyeDropper(
        typeof window !== "undefined" && "EyeDropper" in window,
      );
    }, []);

    const applyHsv = (next: HsvColor) => {
      if (disabled) return;
      const normalized: HsvColor = {
        h:
          next.h === 360
            ? 360
            : ((next.h % 360) + 360) % 360,
        s: clamp(next.s, 0, 100),
        v: clamp(next.v, 0, 100),
      };
      hsvRef.current = normalized;
      setHsv(normalized);
      const hex = hsvToHex(normalized);
      setHexDraft(hex.toUpperCase());
      if (!controlled) setInternalValue(hex);
      if (lastHexRef.current !== hex) {
        lastHexRef.current = hex;
        onValueChange?.(hex);
      }
    };

    const applyHex = (input: string, syncDraft = true) => {
      if (disabled) return false;
      const hex = normalizeHex(input);
      if (!hex) return false;
      const nextHsv = withPreservedHue(
        hexToHsv(hex) as HsvColor,
        hsvRef.current,
      );
      hsvRef.current = nextHsv;
      setHsv(nextHsv);
      if (syncDraft) setHexDraft(hex.toUpperCase());
      if (!controlled) setInternalValue(hex);
      if (lastHexRef.current !== hex) {
        lastHexRef.current = hex;
        onValueChange?.(hex);
      }
      return true;
    };

    const clear = () => {
      if (!controlled) setInternalValue(null);
      lastHexRef.current = null;
      setHexDraft("");
      onValueChange?.(null);
    };

    const updateSvFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const saturation = clamp(
        ((event.clientX - rect.left) / rect.width) * 100,
        0,
        100,
      );
      const brightness = clamp(
        (1 - (event.clientY - rect.top) / rect.height) * 100,
        0,
        100,
      );
      applyHsv({ ...hsvRef.current, s: saturation, v: brightness });
    };

    const updateHueFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (!rect.width) return;
      const hue = clamp(
        ((event.clientX - rect.left) / rect.width) * 360,
        0,
        360,
      );
      applyHsv({ ...hsvRef.current, h: hue });
    };

    const handleSvKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      const step = event.shiftKey ? 10 : 1;
      let next = hsvRef.current;
      switch (event.key) {
        case "ArrowLeft":
          next = { ...next, s: clamp(next.s - step, 0, 100) };
          break;
        case "ArrowRight":
          next = { ...next, s: clamp(next.s + step, 0, 100) };
          break;
        case "ArrowUp":
          next = { ...next, v: clamp(next.v + step, 0, 100) };
          break;
        case "ArrowDown":
          next = { ...next, v: clamp(next.v - step, 0, 100) };
          break;
        case "Home":
          next = { ...next, s: 0 };
          break;
        case "End":
          next = { ...next, s: 100 };
          break;
        default:
          return;
      }
      event.preventDefault();
      applyHsv(next);
    };

    const handleHueKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      const step = event.shiftKey ? 10 : 1;
      let hue = hsvRef.current.h;
      switch (event.key) {
        case "ArrowLeft":
          hue = (hue - step + 360) % 360;
          break;
        case "ArrowRight":
          hue = (hue + step) % 360;
          break;
        case "Home":
          hue = 0;
          break;
        case "End":
          hue = 360;
          break;
        default:
          return;
      }
      event.preventDefault();
      applyHsv({ ...hsvRef.current, h: hue });
    };

    const handleHexBlur = () => {
      if (applyHex(hexDraft)) {
        setHexDraft((normalizeHex(hexDraft) ?? "").toUpperCase());
      } else {
        setHexDraft(currentHex?.toUpperCase() ?? "");
      }
    };

    const pickFromScreen = async () => {
      try {
        const EyeDropper = (
          window as Window & {
            EyeDropper?: new () => {
              open: () => Promise<{ sRGBHex: string }>;
            };
          }
        ).EyeDropper;
        if (!EyeDropper) return;
        const result = await new EyeDropper().open();
        applyHex(result.sRGBHex);
      } catch {
        // The user dismissed the eyedropper.
      }
    };

    const describedBy =
      [ariaDescribedBy, descriptionId, errorId, requiredId]
        .filter(Boolean)
        .join(" ") || undefined;
    const CheckIcon = useKitIcon("check");
    const EyedropperIcon = useKitIcon("eyedropper");
    const normalizedSwatches = React.useMemo(
      () =>
        Array.from(
          new Set(
            (swatches ?? [])
              .map((swatch) => normalizeHex(swatch))
              .filter((swatch): swatch is string => Boolean(swatch)),
          ),
        ),
      [swatches],
    );

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label ? (
          <Label htmlFor={triggerId} requiredMark={required}>
            {label}
          </Label>
        ) : null}

        {name ? (
          <input type="hidden" name={name} value={currentHex ?? ""} />
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
            typeof label === "string" ? label : "Choose a color"
          }
          className={cn("w-72 p-3", popoverClassName)}
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
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-4 shrink-0 rounded-full ring-1 ring-black/10",
                    !currentHex &&
                      "bg-[linear-gradient(135deg,transparent_45%,var(--border)_45%,var(--border)_55%,transparent_55%)]",
                  )}
                  style={currentHex ? { background: currentHex } : undefined}
                />
              }
            >
              {currentHex ? currentHex.toUpperCase() : placeholderText}
            </PickerTrigger>
          }
        >
          <div className="flex flex-col gap-3">
            <div
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-label="Saturation and brightness"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(hsv.s)}
              aria-valuetext={`Saturation ${Math.round(
                hsv.s,
              )}%, brightness ${Math.round(hsv.v)}%, ${hsvToHex(hsv)}`}
              aria-disabled={disabled || undefined}
              onPointerDown={(event) => {
                if (disabled) return;
                event.preventDefault();
                event.currentTarget.setPointerCapture(event.pointerId);
                updateSvFromPointer(event);
              }}
              onPointerMove={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  updateSvFromPointer(event);
                }
              }}
              onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  event.currentTarget.releasePointerCapture(event.pointerId);
                }
              }}
              onPointerCancel={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  event.currentTarget.releasePointerCapture(event.pointerId);
                }
              }}
              onKeyDown={handleSvKeyDown}
              className={cn(
                "relative h-36 w-full cursor-crosshair touch-none overflow-hidden rounded-control outline-none ring-1 ring-border/50 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                disabled && "cursor-not-allowed opacity-45",
              )}
              style={{
                backgroundImage: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hsv.h} 100% 50%))`,
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)]"
                style={{
                  left: `${hsv.s}%`,
                  top: `${100 - hsv.v}%`,
                  backgroundColor: hsvToHex(hsv),
                }}
              />
            </div>

            <div
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-label="Hue"
              aria-valuemin={0}
              aria-valuemax={360}
              aria-valuenow={Math.round(hsv.h)}
              aria-valuetext={`${Math.round(hsv.h)} degrees`}
              aria-disabled={disabled || undefined}
              onPointerDown={(event) => {
                if (disabled) return;
                event.preventDefault();
                event.currentTarget.setPointerCapture(event.pointerId);
                updateHueFromPointer(event);
              }}
              onPointerMove={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  updateHueFromPointer(event);
                }
              }}
              onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  event.currentTarget.releasePointerCapture(event.pointerId);
                }
              }}
              onPointerCancel={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  event.currentTarget.releasePointerCapture(event.pointerId);
                }
              }}
              onKeyDown={handleHueKeyDown}
              className={cn(
                "relative h-2.5 w-full cursor-pointer touch-none rounded-pill outline-none ring-1 ring-border/50 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                disabled && "cursor-not-allowed opacity-45",
              )}
              style={{ backgroundImage: HUE_GRADIENT }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-transparent shadow-[0_0_0_1px_rgba(0,0,0,0.25)]"
                style={{ left: `${(hsv.h / 360) * 100}%` }}
              />
            </div>

            <div className="flex items-center gap-2">
              <Input
                aria-label="Hex color"
                value={hexDraft}
                onChange={(event) => {
                  const next = event.target.value;
                  setHexDraft(next);
                  applyHex(next, false);
                }}
                onBlur={handleHexBlur}
                onFocus={(event) => event.currentTarget.select()}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleHexBlur();
                  }
                }}
                placeholder="#0D9488"
                maxLength={7}
                autoComplete="off"
                spellCheck={false}
                disabled={disabled}
                className="h-9 font-mono text-xs uppercase tracking-wide"
              />
              {showEyeDropper && hasEyeDropper ? (
                <button
                  type="button"
                  aria-label="Pick a color from the screen"
                  disabled={disabled}
                  onClick={() => {
                    void pickFromScreen();
                  }}
                  className="flex size-9 shrink-0 items-center justify-center rounded-control bg-surface text-muted-foreground outline-none transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40"
                >
                  <EyedropperIcon size={16} aria-hidden="true" />
                </button>
              ) : null}
              {clearable && hasValue ? (
                <button
                  type="button"
                  onClick={clear}
                  className="h-9 shrink-0 rounded-control px-2 text-xs font-medium text-muted-foreground outline-none transition-colors hover:bg-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Clear
                </button>
              ) : null}
            </div>

            {normalizedSwatches.length ? (
              <div className="flex flex-wrap gap-1.5">
                {normalizedSwatches.map((swatch) => {
                  const active = swatch === currentHex;
                  return (
                    <button
                      key={swatch}
                      type="button"
                      aria-label={`Use ${swatch}`}
                      aria-pressed={active}
                      disabled={disabled}
                      onClick={() => applyHex(swatch)}
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full ring-1 ring-black/10 outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40",
                        active && "ring-2 ring-ring/50 ring-offset-2",
                      )}
                      style={{ background: swatch }}
                    >
                      {active ? (
                        <CheckIcon
                          size={11}
                          aria-hidden="true"
                          style={{ color: contrastText(swatch) }}
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
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
ColorPicker.displayName = "ColorPicker";
