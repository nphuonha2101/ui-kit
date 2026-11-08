"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { Radio } from "@base-ui/react/radio";
import { cn } from "../../lib/utils";

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive>, "children"> {
  options?: RadioOption[];
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  orientation?: "vertical" | "horizontal";
  children?: React.ReactNode;
}

export function RadioGroup({
  className,
  options,
  label,
  description,
  error,
  orientation = "vertical",
  children,
  ...props
}: RadioGroupProps) {
  const groupId = React.useId();
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label ? <div className="text-sm font-medium text-foreground">{label}</div> : null}
      <RadioGroupPrimitive
        aria-label={typeof label === "string" ? label : undefined}
        className={cn("flex gap-3", orientation === "vertical" ? "flex-col" : "flex-row flex-wrap")}
        {...props}
      >
        {options
          ? options.map((opt) => (
              <label key={opt.value} className={cn("flex items-start gap-2.5 text-sm", opt.disabled && "opacity-45")}>
                <Radio.Root
                  value={opt.value}
                  disabled={opt.disabled}
                  className="surface-inset mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-field outline-none transition-[background-color,box-shadow] duration-[var(--duration-ui)] focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[checked]:bg-primary"
                >
                  <Radio.Indicator className="size-2 rounded-full bg-primary-foreground data-[unchecked]:hidden" />
                </Radio.Root>
                <span className="grid gap-0.5">
                  <span className="font-medium leading-none text-foreground">{opt.label}</span>
                  {opt.description ? <span className="text-xs text-muted-foreground">{opt.description}</span> : null}
                </span>
              </label>
            ))
          : children}
      </RadioGroupPrimitive>
      {description ? <p id={`${groupId}-d`} className="text-xs text-muted-foreground">{description}</p> : null}
      {error ? <p role="alert" className="text-xs font-medium text-destructive">{error}</p> : null}
    </div>
  );
}
