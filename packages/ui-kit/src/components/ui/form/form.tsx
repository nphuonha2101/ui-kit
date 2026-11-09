"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  type Control,
  type ControllerFieldState,
  type ControllerProps,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { cn } from "../../../lib/utils";
import { Label } from "../label";

/** Context provider for react-hook-form. */
export const Form = FormProvider;

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  rules?: ControllerProps<TFieldValues, TName>["rules"];
  label?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
  className?: string;
  render: (args: {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
  }) => React.ReactElement;
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  rules,
  label,
  description,
  required,
  className,
  render,
}: FormFieldProps<TFieldValues, TName>) {
  const autoId = React.useId();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        const error =
          fieldState.error?.message ?? (fieldState.error ? "Invalid value" : undefined);
        const controlId = `${autoId}-${String(name)}`;
        const labelId = `${controlId}-label`;
        const descriptionId = description ? `${controlId}-description` : undefined;
        const errorId = error ? `${controlId}-error` : undefined;
        const element = render({ field, fieldState });
        const elementProps = element.props as {
          id?: string;
          required?: boolean;
          "aria-describedby"?: string;
          "aria-labelledby"?: string;
          "aria-invalid"?: boolean;
        };
        const childId = elementProps.id ?? controlId;
        const describedBy =
          [elementProps["aria-describedby"], descriptionId, errorId]
            .filter(Boolean)
            .join(" ") || undefined;
        const labelledBy =
          [elementProps["aria-labelledby"], label ? labelId : undefined]
            .filter(Boolean)
            .join(" ") || undefined;
        const isRequired = required || elementProps.required;
        const ariaInvalid = error ? true : elementProps["aria-invalid"];
        const child = React.cloneElement(
          element as React.ReactElement<Record<string, unknown>>,
          {
            id: childId,
            ...(describedBy ? { "aria-describedby": describedBy } : {}),
            ...(labelledBy ? { "aria-labelledby": labelledBy } : {}),
            ...(ariaInvalid !== undefined ? { "aria-invalid": ariaInvalid } : {}),
            ...(typeof element.type !== "string" && error ? { error: true } : {}),
          },
        );

        return (
          <div className={cn("flex flex-col gap-1.5", className)}>
            {label ? (
              <Label id={labelId} htmlFor={childId} requiredMark={isRequired}>
                {label}
              </Label>
            ) : null}
            {child}
            {description ? (
              <p id={descriptionId} className="text-xs text-muted-foreground">
                {description}
              </p>
            ) : null}
            {error ? (
              <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
                {error}
              </p>
            ) : null}
          </div>
        );
      }}
    />
  );
}
