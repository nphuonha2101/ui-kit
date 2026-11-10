"use client";

import * as React from "react";
import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";
import { cn } from "../../../lib/utils";

export interface FieldsetProps
  extends Omit<React.ComponentPropsWithoutRef<typeof FieldsetPrimitive.Root>, "children"> {
  legend?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
}

/**
 * Groups related fields under a shared legend. `disabled` is inherited by every
 * input, select and checkbox inside the fieldset.
 */
export function Fieldset({
  legend,
  description,
  children,
  className,
  contentClassName,
  ...props
}: FieldsetProps) {
  const hasHeader = legend !== undefined || description !== undefined;

  return (
    <FieldsetPrimitive.Root className={cn("min-w-0", className)} {...props}>
      {hasHeader ? (
        <div className="flex flex-col gap-1">
          {legend !== undefined ? (
            <FieldsetPrimitive.Legend className="text-sm font-semibold leading-none text-foreground">
              {legend}
            </FieldsetPrimitive.Legend>
          ) : null}
          {description !== undefined ? (
            <p className="text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : null}
      <div className={cn("flex flex-col gap-4", hasHeader && "mt-4", contentClassName)}>
        {children}
      </div>
    </FieldsetPrimitive.Root>
  );
}
