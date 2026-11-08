export type ComponentCategory =
  | "Actions"
  | "Forms"
  | "Overlays"
  | "Navigation"
  | "Data Display"
  | "Feedback";

export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentExample {
  title: string;
  description?: string;
  code: string;
  demoKey?: string;
}

export interface ComponentEntry {
  slug: string;
  title: string;
  description: string;
  category: ComponentCategory;
  imports: string;
  code: string;
  usage: string;
  props: ComponentProp[];
  examples?: ComponentExample[];
}

export const categories: ComponentCategory[] = [
  "Actions",
  "Forms",
  "Overlays",
  "Navigation",
  "Data Display",
  "Feedback",
];

export const registry: ComponentEntry[] = [
  {
    slug: "button",
    title: "Button",
    category: "Actions",
    description: "Triggers an action or event. Supports variants, sizes, icons and a built-in loading state.",
    imports: `import { Button } from "@nphuonha/ui-kit";`,
    code: `import { Button } from "@nphuonha/ui-kit";

export function Example() {
  return <Button>Save changes</Button>;
}`,
    usage: `import { Button } from "@nphuonha/ui-kit";

export function Actions() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="danger">Danger</Button>
    </div>
  );
}`,
    props: [
      { name: "variant", type: `"primary" | "secondary" | "outline" | "ghost" | "soft" | "danger"`, default: `"primary"`, description: "Visual emphasis of the button." },
      { name: "size", type: `"sm" | "default" | "lg" | "icon" | "icon-sm"`, default: `"default"`, description: "Control height and padding." },
      { name: "shape", type: `"rounded" | "pill"`, default: `"rounded"`, description: "Corner treatment." },
      { name: "loading", type: "boolean", description: "Shows a spinner and disables interaction." },
      { name: "startIcon", type: "IconComponent", description: "Icon rendered before the label." },
      { name: "endIcon", type: "IconComponent", description: "Icon rendered after the label." },
      { name: "disabled", type: "boolean", description: "Disables the button." },
    ],
    examples: [
      {
        title: "Sizes and shapes",
        description: "Use size to match density and shape to soften an action.",
        demoKey: "button-sizes",
        code: `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button shape="pill">Pill</Button>`,
      },
    ],
  },
  {
    slug: "icon-button",
    title: "IconButton",
    category: "Actions",
    description: "A compact icon-only button with an accessible label.",
    imports: `import { IconButton } from "@nphuonha/ui-kit";\nimport { MagnifyingGlassIcon } from "@phosphor-icons/react";`,
    code: `import { IconButton } from "@nphuonha/ui-kit";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export function Example() {
  return (
    <IconButton aria-label="Search">
      <MagnifyingGlassIcon size={18} />
    </IconButton>
  );
}`,
    usage: `<IconButton aria-label="Search" variant="secondary">
  <MagnifyingGlassIcon size={18} />
</IconButton>`,
    props: [
      { name: "aria-label", type: "string", description: "Required accessible name for the action." },
      { name: "variant", type: `"primary" | "secondary" | "outline" | "ghost" | "soft" | "danger"`, default: `"primary"`, description: "Visual emphasis." },
      { name: "size", type: `"icon" | "icon-sm"`, default: `"icon"`, description: "Square control size." },
      { name: "shape", type: `"rounded" | "pill"`, default: `"rounded"`, description: "Corner treatment." },
      { name: "disabled", type: "boolean", description: "Disables the button." },
    ],
  },
  {
    slug: "input",
    title: "Input",
    category: "Forms",
    description: "A borderless text field with a solid fill and a soft focus ring.",
    imports: `import { Input } from "@nphuonha/ui-kit";`,
    code: `import { Input } from "@nphuonha/ui-kit";

export function Example() {
  return <Input placeholder="Email" type="email" />;
}`,
    usage: `import { Field, Input } from "@nphuonha/ui-kit";

<Field label="Email" description="We'll never share it.">
  <Input placeholder="you@example.com" type="email" />
</Field>`,
    props: [
      { name: "type", type: "string", default: `"text"`, description: "Native input type." },
      { name: "error", type: "boolean", description: "Applies the invalid visual state." },
      { name: "placeholder", type: "string", description: "Hint text when empty." },
      { name: "disabled", type: "boolean", description: "Disables the field." },
    ],
  },
  {
    slug: "textarea",
    title: "Textarea",
    category: "Forms",
    description: "A multi-line text field with the same borderless field treatment.",
    imports: `import { Textarea } from "@nphuonha/ui-kit";`,
    code: `import { Textarea } from "@nphuonha/ui-kit";

export function Example() {
  return <Textarea placeholder="Write something..." />;
}`,
    usage: `<Textarea placeholder="Write something..." rows={4} />`,
    props: [
      { name: "error", type: "boolean", description: "Applies the invalid visual state." },
      { name: "placeholder", type: "string", description: "Hint text when empty." },
      { name: "rows", type: "number", description: "Native textarea rows." },
      { name: "disabled", type: "boolean", description: "Disables the field." },
    ],
  },
  {
    slug: "field",
    title: "Field",
    category: "Forms",
    description: "Wires a label, description and error message to a control with the right ARIA relationships.",
    imports: `import { Field, Input } from "@nphuonha/ui-kit";`,
    code: `import { Field, Input } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <Field label="Email" description="We'll never share it." required>
      <Input placeholder="you@example.com" />
    </Field>
  );
}`,
    usage: `<Field label="Password" error="Password is required">
  <Input type="password" error />
</Field>`,
    props: [
      { name: "label", type: "ReactNode", description: "Visible label for the control." },
      { name: "description", type: "ReactNode", description: "Helper text below the control." },
      { name: "error", type: "ReactNode", description: "Error message; also marks the control invalid." },
      { name: "required", type: "boolean", description: "Shows the required mark." },
      { name: "id", type: "string", description: "Explicit control id." },
    ],
  },
  {
    slug: "label",
    title: "Label",
    category: "Forms",
    description: "A small, accessible label for a form control.",
    imports: `import { Label } from "@nphuonha/ui-kit";`,
    code: `import { Input, Label } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="you@example.com" />
    </div>
  );
}`,
    usage: `<Label htmlFor="email" requiredMark>Email</Label>`,
    props: [
      { name: "htmlFor", type: "string", description: "Associates the label with a control." },
      { name: "requiredMark", type: "boolean", description: "Shows a required asterisk." },
      { name: "children", type: "ReactNode", description: "Label content." },
    ],
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    category: "Forms",
    description: "A binary or indeterminate selection control with label and description support.",
    imports: `import { Checkbox } from "@nphuonha/ui-kit";`,
    code: `import { Checkbox } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <Checkbox
      label="Accept terms"
      description="You agree to the privacy policy."
    />
  );
}`,
    usage: `<Checkbox label="Email updates" defaultChecked />`,
    props: [
      { name: "label", type: "ReactNode", description: "Visible label." },
      { name: "description", type: "ReactNode", description: "Helper text." },
      { name: "checked", type: "boolean", description: "Controlled checked state." },
      { name: "defaultChecked", type: "boolean", description: "Initial unchecked state." },
      { name: "indeterminate", type: "boolean", description: "Shows the mixed state." },
      { name: "error", type: "boolean", description: "Applies the invalid visual state." },
      { name: "disabled", type: "boolean", description: "Disables the control." },
    ],
  },
  {
    slug: "radio-group",
    title: "RadioGroup",
    category: "Forms",
    description: "A single-choice group with a consistent label, description and error treatment.",
    imports: `import { RadioGroup } from "@nphuonha/ui-kit";`,
    code: `import { RadioGroup } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <RadioGroup
      label="Plan"
      defaultValue="pro"
      options={[
        { value: "free", label: "Free", description: "Basics" },
        { value: "pro", label: "Pro", description: "Most features" },
        { value: "team", label: "Team", description: "Collaboration" },
      ]}
    />
  );
}`,
    usage: `<RadioGroup label="Plan" options={plans} defaultValue="pro" />`,
    props: [
      { name: "options", type: "RadioOption[]", description: "Value/label/description entries." },
      { name: "value", type: "string", description: "Controlled value." },
      { name: "defaultValue", type: "string", description: "Uncontrolled initial value." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called when the selection changes." },
      { name: "label", type: "ReactNode", description: "Group label." },
      { name: "description", type: "ReactNode", description: "Group helper text." },
      { name: "error", type: "ReactNode", description: "Group error message." },
      { name: "orientation", type: `"vertical" | "horizontal"`, default: `"vertical"`, description: "Layout direction." },
    ],
  },
  {
    slug: "switch",
    title: "Switch",
    category: "Forms",
    description: "A pill toggle with a stretchy pill thumb and clear checked state.",
    imports: `import { Switch } from "@nphuonha/ui-kit";`,
    code: `import { Switch } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <Switch
      label="Notifications"
      description="Receive product updates."
      defaultChecked
    />
  );
}`,
    usage: `<Switch label="Notifications" defaultChecked />`,
    props: [
      { name: "label", type: "ReactNode", description: "Visible label." },
      { name: "description", type: "ReactNode", description: "Helper text." },
      { name: "checked", type: "boolean", description: "Controlled checked state." },
      { name: "defaultChecked", type: "boolean", description: "Initial checked state." },
      { name: "disabled", type: "boolean", description: "Disables the switch." },
    ],
  },
  {
    slug: "select",
    title: "Select",
    category: "Forms",
    description: "A borderless select trigger and a floating option list.",
    imports: `import { Select } from "@nphuonha/ui-kit";`,
    code: `import { Select } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <Select
      placeholder="Choose a framework"
      defaultValue="next"
      options={[
        { value: "next", label: "Next.js" },
        { value: "vite", label: "Vite" },
        { value: "remix", label: "Remix" },
      ]}
    />
  );
}`,
    usage: `import { Field, Select } from "@nphuonha/ui-kit";

<Field label="Framework">
  <Select options={frameworks} placeholder="Choose one" />
</Field>`,
    props: [
      { name: "options", type: "SelectOption[]", description: "Value/label entries." },
      { name: "value", type: "string | null", description: "Controlled value." },
      { name: "defaultValue", type: "string | null", description: "Uncontrolled initial value." },
      { name: "onValueChange", type: "(value: string | null) => void", description: "Called when the selection changes." },
      { name: "placeholder", type: "string", default: `"Select…"`, description: "Text shown without a value." },
      { name: "disabled", type: "boolean", description: "Disables the trigger." },
      { name: "error", type: "boolean", description: "Applies the invalid visual state." },
    ],
    examples: [
      {
        title: "Inside a field",
        description: "Compose Select with Field for labels, help text and validation.",
        demoKey: "select-field",
        code: `<Field label="Framework" description="Choose the app foundation.">
  <Select options={frameworks} defaultValue="next" />
</Field>`,
      },
    ],
  },
  {
    slug: "dialog",
    title: "Dialog",
    category: "Overlays",
    description: "A focused modal surface with title, description, footer and a backdrop.",
    imports: `import { Button, Dialog } from "@nphuonha/ui-kit";`,
    code: `import { Button, Dialog } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <Dialog
      trigger={<Button>Open dialog</Button>}
      title="Confirm action"
      description="This action cannot be undone."
      footer={
        <>
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </>
      }
    >
      Dialog content.
    </Dialog>
  );
}`,
    usage: `<Dialog open={open} onOpenChange={setOpen} title="Title">
  Content
</Dialog>`,
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "defaultOpen", type: "boolean", description: "Uncontrolled initial state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the dialog opens or closes." },
      { name: "trigger", type: "ReactElement", description: "Element that opens the dialog." },
      { name: "title", type: "ReactNode", description: "Dialog title." },
      { name: "description", type: "ReactNode", description: "Supporting description." },
      { name: "footer", type: "ReactNode", description: "Actions rendered at the bottom." },
      { name: "showClose", type: "boolean", default: "true", description: "Shows the close icon button." },
    ],
  },
  {
    slug: "sheet",
    title: "Sheet",
    category: "Overlays",
    description: "A floating side or bottom panel with a rounded overlay surface.",
    imports: `import { Button, Sheet } from "@nphuonha/ui-kit";`,
    code: `import { Button, Sheet } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <Sheet
      trigger={<Button variant="secondary">Open sheet</Button>}
      title="Filters"
      description="Narrow down the results."
      side="right"
      footer={<Button>Apply</Button>}
    >
      Sheet content.
    </Sheet>
  );
}`,
    usage: `<Sheet open={open} onOpenChange={setOpen} side="right" title="Filters">
  Content
</Sheet>`,
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the sheet opens or closes." },
      { name: "trigger", type: "ReactElement", description: "Element that opens the sheet." },
      { name: "side", type: `"right" | "left" | "bottom"`, default: `"right"`, description: "Panel edge." },
      { name: "title", type: "ReactNode", description: "Sheet title." },
      { name: "description", type: "ReactNode", description: "Supporting description." },
      { name: "footer", type: "ReactNode", description: "Actions rendered at the bottom." },
    ],
  },
  {
    slug: "popover",
    title: "Popover",
    category: "Overlays",
    description: "A small floating surface anchored to a trigger.",
    imports: `import { Button, Popover } from "@nphuonha/ui-kit";`,
    code: `import { Button, Popover } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <Popover
      trigger={<Button variant="outline">Open popover</Button>}
      title="Popover"
      description="A floating surface."
    >
      Content
    </Popover>
  );
}`,
    usage: `<Popover trigger={<Button>Open</Button>} title="Title">
  Content
</Popover>`,
    props: [
      { name: "trigger", type: "ReactElement", description: "Element that opens the popover." },
      { name: "title", type: "ReactNode", description: "Optional title." },
      { name: "description", type: "ReactNode", description: "Optional supporting text." },
      { name: "side", type: `"top" | "bottom" | "left" | "right"`, default: `"bottom"`, description: "Preferred placement." },
      { name: "align", type: `"start" | "center" | "end"`, default: `"center"`, description: "Alignment along the trigger." },
    ],
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    category: "Overlays",
    description: "A short contextual label shown on hover or focus.",
    imports: `import { Button, Tooltip } from "@nphuonha/ui-kit";`,
    code: `import { Button, Tooltip } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <Tooltip content="Helpful context">
      <Button variant="ghost">Hover me</Button>
    </Tooltip>
  );
}`,
    usage: `<Tooltip content="Copy to clipboard">
  <IconButton aria-label="Copy">...</IconButton>
</Tooltip>`,
    props: [
      { name: "content", type: "ReactNode", description: "Tooltip text." },
      { name: "children", type: "ReactElement", description: "Trigger element." },
      { name: "side", type: `"top" | "bottom" | "left" | "right"`, default: `"top"`, description: "Preferred placement." },
      { name: "align", type: `"start" | "center" | "end"`, default: `"center"`, description: "Alignment along the trigger." },
      { name: "delay", type: "number", default: "300", description: "Open delay in milliseconds." },
    ],
  },
  {
    slug: "tabs",
    title: "Tabs",
    category: "Navigation",
    description: "Segmented navigation with a sliding active pill.",
    imports: `import { Tabs } from "@nphuonha/ui-kit";`,
    code: `import { Tabs } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <Tabs
      defaultValue="overview"
      items={[
        { value: "overview", label: "Overview", content: "Overview content" },
        { value: "activity", label: "Activity", content: "Activity content" },
      ]}
    />
  );
}`,
    usage: `<Tabs items={items} defaultValue="overview" />`,
    props: [
      { name: "items", type: "TabItem[]", description: "Value/label/content entries." },
      { name: "value", type: "string", description: "Controlled active value." },
      { name: "defaultValue", type: "string", description: "Uncontrolled initial value." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called when the active tab changes." },
      { name: "listClassName", type: "string", description: "Extra classes for the tab list." },
    ],
    examples: [
      {
        title: "Settings tabs",
        description: "Tabs can hold any content, not only text.",
        demoKey: "tabs-settings",
        code: `<Tabs
  defaultValue="general"
  items={[
    { value: "general", label: "General", content: <GeneralPanel /> },
    { value: "billing", label: "Billing", content: <BillingPanel /> },
  ]}
/>`,
      },
    ],
  },
  {
    slug: "card",
    title: "Card",
    category: "Data Display",
    description: "A borderless solid surface with a top-lit curved edge.",
    imports: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@nphuonha/ui-kit";`,
    code: `import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nphuonha/ui-kit";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project</CardTitle>
        <CardDescription>Manage your project settings.</CardDescription>
      </CardHeader>
      <CardContent>Content</CardContent>
      <CardFooter>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  );
}`,
    usage: `<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`,
    props: [
      { name: "Card", type: "div", description: "Rounded solid surface with soft depth." },
      { name: "CardHeader", type: "div", description: "Title and description stack." },
      { name: "CardTitle", type: "h3", description: "Card heading." },
      { name: "CardDescription", type: "p", description: "Muted supporting text." },
      { name: "CardContent", type: "div", description: "Padded content area." },
      { name: "CardFooter", type: "div", description: "Actions area." },
    ],
    examples: [
      {
        title: "Profile card",
        description: "Combine the card parts with badges and actions.",
        demoKey: "card-profile",
        code: `<Card>
  <CardContent className="flex items-center gap-3 pt-6">
    <div className="size-10 rounded-full bg-primary-soft" />
    <div className="flex-1">
      <p className="text-sm font-medium">Avery Quinn</p>
      <p className="text-xs text-muted-foreground">Product designer</p>
    </div>
    <Badge variant="primary">Pro</Badge>
  </CardContent>
</Card>`,
      },
    ],
  },
  {
    slug: "badge",
    title: "Badge",
    category: "Data Display",
    description: "A compact status or count label in solid tonal colors.",
    imports: `import { Badge } from "@nphuonha/ui-kit";`,
    code: `import { Badge } from "@nphuonha/ui-kit";

export function Example() {
  return <Badge variant="primary">New</Badge>;
}`,
    usage: `<Badge>Neutral</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="danger">Failed</Badge>`,
    props: [
      { name: "variant", type: `"neutral" | "primary" | "success" | "warning" | "danger" | "info" | "solid" | "outline"`, default: `"neutral"`, description: "Tone of the badge." },
    ],
  },
  {
    slug: "alert",
    title: "Alert",
    category: "Feedback",
    description: "A tonal feedback surface for information, success, warning or danger.",
    imports: `import { Alert } from "@nphuonha/ui-kit";\nimport { InfoIcon } from "@phosphor-icons/react";`,
    code: `import { Alert } from "@nphuonha/ui-kit";
import { InfoIcon } from "@phosphor-icons/react";

export function Example() {
  return (
    <Alert icon={InfoIcon} variant="info" title="Information">
      A short supporting message.
    </Alert>
  );
}`,
    usage: `<Alert variant="success" title="Saved">
  Your changes are live.
</Alert>`,
    props: [
      { name: "variant", type: `"neutral" | "info" | "success" | "warning" | "danger"`, default: `"neutral"`, description: "Tone of the alert." },
      { name: "title", type: "string", description: "Bold heading." },
      { name: "icon", type: "IconComponent", description: "Optional leading icon." },
      { name: "children", type: "ReactNode", description: "Supporting message." },
    ],
  },
  {
    slug: "separator",
    title: "Separator",
    category: "Data Display",
    description: "A hairline divider for grouping content.",
    imports: `import { Separator } from "@nphuonha/ui-kit";`,
    code: `import { Separator } from "@nphuonha/ui-kit";

export function Example() {
  return <Separator />;
}`,
    usage: `<Separator orientation="horizontal" />`,
    props: [
      { name: "orientation", type: `"horizontal" | "vertical"`, default: `"horizontal"`, description: "Divider direction." },
      { name: "decorative", type: "boolean", default: "true", description: "Removes separator semantics when decorative." },
    ],
  },
  {
    slug: "spinner",
    title: "Spinner",
    category: "Feedback",
    description: "A small, token-colored loading indicator.",
    imports: `import { Spinner } from "@nphuonha/ui-kit";`,
    code: `import { Spinner } from "@nphuonha/ui-kit";

export function Example() {
  return <Spinner />;
}`,
    usage: `<span className="inline-flex items-center gap-2">
  <Spinner size={16} /> Loading
</span>`,
    props: [
      { name: "size", type: "number", default: "18", description: "Pixel size of the icon." },
      { name: "className", type: "string", description: "Extra classes." },
    ],
  },
  {
    slug: "toaster",
    title: "Toaster",
    category: "Feedback",
    description: "Theme-aware toast notifications powered by Sonner and kit tokens.",
    imports: `import { Toaster, toast } from "@nphuonha/ui-kit";`,
    code: `import { Button, Toaster, toast } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <>
      <Toaster />
      <Button onClick={() => toast("Saved", { description: "Your changes are live." })}>
        Show toast
      </Button>
    </>
  );
}`,
    usage: `import { Toaster, toast } from "@nphuonha/ui-kit";

<Toaster theme="dark" />
toast.success("Saved");`,
    props: [
      { name: "position", type: `"top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"`, default: `"bottom-right"`, description: "Screen corner for toasts." },
      { name: "theme", type: `"light" | "dark" | "system"`, default: `"light"`, description: "Toast appearance." },
      { name: "richColors", type: "boolean", default: "false", description: "Use semantic colors for status toasts." },
      { name: "closeButton", type: "boolean", default: "true", description: "Show a close button." },
    ],
    examples: [
      {
        title: "Promise toast",
        description: "Use toast.promise to show loading, success and error states.",
        demoKey: "toast-promise",
        code: `toast.promise(saveChanges(), {
  loading: "Saving…",
  success: "Saved",
  error: "Could not save",
});`,
      },
    ],
  },
];

export const searchIndex = registry.map(({ slug, title, description, category }) => ({
  slug,
  title,
  description,
  category,
}));

export const componentGroups = categories.map((category) => ({
  category,
  components: registry.filter((entry) => entry.category === category),
}));

export function getComponent(slug: string) {
  return registry.find((entry) => entry.slug === slug);
}
