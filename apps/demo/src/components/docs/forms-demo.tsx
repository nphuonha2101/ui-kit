"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  DatePicker,
  FileUpload,
  Input,
  NumberField,
  RadioGroup,
  Select,
  Slider,
  Switch,
  toast,
} from "@nphuonha/ui-kit";
import { Form, FormField } from "@nphuonha/ui-kit/form";

type FormValues = {
  name: string;
  email: string;
  role: string;
  plan: string;
  seats: number;
  volume: number;
  notifications: boolean;
  startDate: Date | null;
  attachments: File[];
  terms: boolean;
};

const roleOptions = [
  { value: "designer", label: "Designer" },
  { value: "engineer", label: "Engineer" },
  { value: "founder", label: "Founder" },
];

const planOptions = [
  { value: "starter", label: "Starter", description: "For small teams." },
  { value: "growth", label: "Growth", description: "More seats and history." },
  { value: "scale", label: "Scale", description: "Priority support." },
];

export function FormsDemo() {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      plan: "starter",
      seats: 3,
      volume: 60,
      notifications: true,
      startDate: new Date(2026, 10, 15),
      attachments: [],
      terms: false,
    },
  });
  const { control, handleSubmit, reset, formState } = form;

  const onSubmit = async (values: FormValues) => {
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    toast.success("Workspace created", {
      description: `${values.name} · ${values.seats} seats · ${
        values.attachments.length
      } files`,
    });
  };

  return (
    <div className="surface-curved relative w-full max-w-xl rounded-card bg-card p-6 shadow-soft">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={control}
              name="name"
              label="Workspace name"
              rules={{ required: "Workspace name is required" }}
              render={({ field }) => (
                <Input placeholder="Acme Studio" {...field} />
              )}
            />
            <FormField
              control={control}
              name="email"
              label="Work email"
              rules={{
                required: "Work email is required",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Enter a valid email",
                },
              }}
              render={({ field }) => (
                <Input type="email" placeholder="you@company.com" {...field} />
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={control}
              name="role"
              label="Role"
              rules={{ required: "Choose a role" }}
              render={({ field }) => (
                <Select
                  ref={field.ref}
                  value={field.value}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Choose a role"
                  options={roleOptions}
                />
              )}
            />
            <FormField
              control={control}
              name="seats"
              label="Seats"
              render={({ field }) => (
                <NumberField
                  ref={field.ref}
                  value={field.value}
                  onValueChange={(value) => field.onChange(value ?? 0)}
                  onBlur={field.onBlur}
                  min={1}
                  max={20}
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="plan"
            render={({ field, fieldState }) => (
              <RadioGroup
                ref={field.ref}
                label="Plan"
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
                options={planOptions}
              />
            )}
          />

          <FormField
            control={control}
            name="volume"
            label="Default volume"
            render={({ field }) => (
              <Slider
                ref={field.ref}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                min={0}
                max={100}
                showValue
              />
            )}
          />

          <FormField
            control={control}
            name="notifications"
            render={({ field }) => (
              <Switch
                ref={field.ref}
                checked={field.value}
                onCheckedChange={field.onChange}
                onBlur={field.onBlur}
                label="Product updates"
                description="Get a short email when new components ship."
              />
            )}
          />

          <FormField
            control={control}
            name="startDate"
            label="Start date"
            description="Pick the day the workspace should go live."
            required
            rules={{ required: "Choose a start date" }}
            render={({ field }) => (
              <DatePicker
                locale="en-US"
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                clearable
              />
            )}
          />

          <FormField
            control={control}
            name="attachments"
            label="Attachments"
            description="Optional PDF or image files, up to 5 MB each."
            render={({ field }) => (
              <FileUpload
                files={field.value}
                onFilesChange={field.onChange}
                onBlur={field.onBlur}
                accept=".pdf,image/*"
                maxFiles={3}
                maxSize={5 * 1024 * 1024}
              />
            )}
          />

          <FormField
            control={control}
            name="terms"
            rules={{ required: "Please accept the terms" }}
            render={({ field }) => (
              <Checkbox
                ref={field.ref}
                checked={field.value}
                onCheckedChange={field.onChange}
                onBlur={field.onBlur}
                label="I agree to the terms and privacy policy."
              />
            )}
          />

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button type="submit" loading={formState.isSubmitting}>
              Create workspace
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
