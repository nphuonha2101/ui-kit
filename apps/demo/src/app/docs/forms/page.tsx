import type { Metadata } from "next";
import { Badge } from "@nphuonha/ui-kit";
import { CodeBlock } from "@/components/docs/code-block";
import { PageHeader } from "@/components/docs/page-header";
import { FormsDemo } from "@/components/docs/forms-demo";
import { PropTable } from "@/components/docs/prop-table";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Forms",
  description:
    "Build accessible forms with @nphuonha/ui-kit and React Hook Form: native inputs with register, custom controls with Controller and FormField.",
  path: "/docs/forms/",
});

const formFieldProps = [
  {
    name: "control",
    type: "Control<T>",
    description: "The react-hook-form control object.",
  },
  {
    name: "name",
    type: "FieldPath<T>",
    description: "Field name registered with react-hook-form.",
  },
  {
    name: "rules",
    type: "RegisterOptions",
    description: "Validation rules passed through to Controller.",
  },
  {
    name: "label",
    type: "ReactNode",
    description: "Visible label wired to the rendered control.",
  },
  {
    name: "description",
    type: "ReactNode",
    description: "Helper text below the control.",
  },
  {
    name: "required",
    type: "boolean",
    description: "Shows the required mark on the label.",
  },
  {
    name: "render",
    type: "({ field, fieldState }) => ReactElement",
    description: "Receives the Controller field and field state.",
  },
  {
    name: "className",
    type: "string",
    description: "Extra classes for the field wrapper.",
  },
];

const nativeExample = `import { useForm } from "react-hook-form";
import { Field, Input } from "@nphuonha/ui-kit";

const { register, handleSubmit, formState: { errors } } = useForm<Values>();

<form onSubmit={handleSubmit(onSubmit)}>
  <Field label="Email" error={errors.email?.message}>
    <Input
      type="email"
      {...register("email", { required: "Email is required" })}
    />
  </Field>
</form>`;

const formFieldExample = `import { useForm } from "react-hook-form";
import { Button, Input } from "@nphuonha/ui-kit";
import { Form, FormField } from "@nphuonha/ui-kit/form";

const form = useForm<Values>();

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      label="Email"
      rules={{ required: "Email is required" }}
      render={({ field }) => <Input type="email" {...field} />}
    />
    <Button type="submit">Save</Button>
  </form>
</Form>`;

const customExample = `import { Select } from "@nphuonha/ui-kit";
import { FormField } from "@nphuonha/ui-kit/form";

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
      options={roles}
    />
  )}
/>`;

const controllerExample = `import { Controller } from "react-hook-form";
import { RadioGroup } from "@nphuonha/ui-kit";

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
      options={plans}
    />
  )}
/>`;

const datePickerExample = `import { useForm } from "react-hook-form";
import { Button, DatePicker } from "@nphuonha/ui-kit";
import { Form, FormField } from "@nphuonha/ui-kit/form";

const form = useForm<Values>({ defaultValues: { startDate: null } });

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="startDate"
      label="Start date"
      required
      rules={{ required: "Choose a start date" }}
      render={({ field }) => (
        <DatePicker
          value={field.value}
          onValueChange={field.onChange}
          onBlur={field.onBlur}
          clearable
        />
      )}
    />
    <Button type="submit">Save</Button>
  </form>
</Form>`;

const fileUploadExample = `import { useForm } from "react-hook-form";
import { FileUpload } from "@nphuonha/ui-kit";
import { FormField } from "@nphuonha/ui-kit/form";

const form = useForm<Values>({
  defaultValues: { attachments: [] as File[] },
});

<FormField
  control={form.control}
  name="attachments"
  label="Attachments"
  rules={{ validate: (files) => files.length > 0 || "Add a file" }}
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
/>`;

export default function FormsPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-3 flex items-center gap-2">
        <Badge variant="primary">Guide</Badge>
        <span className="text-xs font-medium text-muted-foreground">
          React Hook Form
        </span>
      </div>
      <PageHeader
        title="Forms"
        description="Form controls are library-agnostic. Native inputs work with register; custom Base UI controls use Controller or the FormField wrapper."
      />

      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Install</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            React Hook Form is an optional peer dependency. Install it in your app:
          </p>
          <CodeBlock
            code="npm install react-hook-form"
            language="bash"
            filename="Terminal"
          />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">
            Native inputs
          </h2>
          <p className="text-sm leading-7 text-muted-foreground">
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">Input</code>{" "}
            and{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">Textarea</code>{" "}
            forward refs to the native element, so{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">register()</code>{" "}
            works directly. Use{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">Field</code> for
            the label and error message.
          </p>
          <CodeBlock code={nativeExample} filename="Native inputs" />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">
            FormField
          </h2>
          <p className="text-sm leading-7 text-muted-foreground">
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">FormField</code>{" "}
            wraps Controller and renders the label, description and error. It also injects{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">id</code>,{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">aria-labelledby</code>,{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">aria-describedby</code>{" "}
            and{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">aria-invalid</code>{" "}
            into the rendered control.
          </p>
          <p className="text-sm leading-7 text-muted-foreground">
            Use{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">required</code>{" "}
            on FormField for the red mark, and{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">rules</code>{" "}
            for validation. Do not also pass label or required to the child; keep label
            ownership in one place.
          </p>
          <CodeBlock code={formFieldExample} filename="FormField" />
          <div className="mt-2">
            <PropTable props={formFieldProps} />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">
            Custom controls
          </h2>
          <p className="text-sm leading-7 text-muted-foreground">
            DatePicker, Checkbox, FileUpload, NumberField, Select, Slider and Switch use
            value/onValueChange or checked/onCheckedChange. Map the Controller field
            explicitly:
          </p>
          <CodeBlock code={customExample} filename="Select with FormField" />
          <p className="text-sm leading-7 text-muted-foreground">
            RadioGroup renders its own label and error message, so Controller is a
            better fit:
          </p>
          <CodeBlock code={controllerExample} filename="RadioGroup with Controller" />
          <p className="text-sm leading-7 text-muted-foreground">
            DatePicker and FileUpload work with FormField too. FormField forwards the
            field id, aria attributes and validation state to both controls.
          </p>
          <CodeBlock code={datePickerExample} filename="DatePicker with FormField" />
          <CodeBlock code={fileUploadExample} filename="FileUpload with FormField" />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">
            Live example
          </h2>
          <p className="text-sm leading-7 text-muted-foreground">
            A complete form with native inputs, a select, number field, slider,
            switch, checkbox, date picker, file upload and validation.
          </p>
          <div className="mt-2">
            <FormsDemo />
          </div>
        </section>
      </div>
    </div>
  );
}
