"use client";

import * as React from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  Field,
  IconButton,
  Input,
  Label,
  Popover,
  RadioGroup,
  Select,
  Separator,
  Sheet,
  Spinner,
  Switch,
  Tabs,
  Textarea,
  Tooltip,
  toast,
} from "@nphuonha/ui-kit";
import {
  CheckCircleIcon,
  CopyIcon,
  HeartIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ShareIcon,
  WarningIcon,
} from "@phosphor-icons/react";

function ButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="sm" startIcon={PlusIcon}>New item</Button>
        <Button loading>Loading</Button>
        <Button shape="pill">Pill action</Button>
      </div>
    </div>
  );
}

function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button shape="pill">Pill</Button>
      <Button shape="pill" variant="secondary">Pill secondary</Button>
    </div>
  );
}

function IconButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <IconButton aria-label="Search"><MagnifyingGlassIcon size={18} /></IconButton>
      <IconButton aria-label="Copy" variant="secondary"><CopyIcon size={18} /></IconButton>
      <IconButton aria-label="Like" variant="soft"><HeartIcon size={18} /></IconButton>
      <IconButton aria-label="Share" variant="outline"><ShareIcon size={18} /></IconButton>
    </div>
  );
}

function InputDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Field label="Email" description="We'll never share it." required>
        <Input placeholder="you@example.com" type="email" />
      </Field>
      <Field label="With error" error="This field is required">
        <Input placeholder="Required" error />
      </Field>
    </div>
  );
}

function TextareaDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Field label="Message" description="Markdown is supported.">
        <Textarea placeholder="Write something..." />
      </Field>
    </div>
  );
}

function FieldDemo() {
  return (
    <div className="mx-auto grid w-full max-w-md gap-4 sm:grid-cols-2">
      <Field label="First name">
        <Input placeholder="Avery" />
      </Field>
      <Field label="Last name">
        <Input placeholder="Quinn" />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Email" description="Used for sign-in and receipts." required>
          <Input placeholder="you@example.com" type="email" />
        </Field>
      </div>
    </div>
  );
}

function LabelDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="demo-label-email">Email</Label>
      <Input id="demo-label-email" placeholder="you@example.com" />
      <p className="mt-1 text-xs text-muted-foreground">
        Labels can also show a required mark.
      </p>
    </div>
  );
}

function CheckboxDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Checkbox label="Accept terms" description="You agree to the privacy policy." defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
    </div>
  );
}

function RadioGroupDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <RadioGroup
        label="Plan"
        defaultValue="pro"
        options={[
          { value: "free", label: "Free", description: "Basics for personal projects" },
          { value: "pro", label: "Pro", description: "Most features, unlimited projects" },
          { value: "team", label: "Team", description: "Collaboration and roles", disabled: true },
        ]}
      />
    </div>
  );
}

function SwitchDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Switch label="Notifications" description="Receive product updates." defaultChecked />
      <Switch label="Disabled" disabled />
    </div>
  );
}

function SelectDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Field label="Framework">
        <Select
          placeholder="Choose one"
          defaultValue="next"
          options={[
            { value: "next", label: "Next.js" },
            { value: "vite", label: "Vite" },
            { value: "remix", label: "Remix" },
          ]}
        />
      </Field>
    </div>
  );
}

function SelectFieldDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Field label="Framework">
        <Select
          options={[
            { value: "next", label: "Next.js" },
            { value: "vite", label: "Vite" },
            { value: "remix", label: "Remix" },
          ]}
          defaultValue="next"
        />
      </Field>
      <Field label="Package manager">
        <Select
          options={[
            { value: "npm", label: "npm" },
            { value: "pnpm", label: "pnpm" },
            { value: "yarn", label: "yarn" },
          ]}
          defaultValue="npm"
        />
      </Field>
    </div>
  );
}

function DialogDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Confirm action"
        description="This is a solid, borderless dialog surface."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p className="text-sm leading-6 text-muted-foreground">
          Dialog content goes here. Use it for focused tasks, confirmations or short forms.
        </p>
      </Dialog>
    </>
  );
}

function SheetDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open sheet</Button>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        side="right"
        title="Filters"
        description="Narrow down the results."
        footer={<Button onClick={() => setOpen(false)}>Apply</Button>}
      >
        <div className="flex flex-col gap-4">
          <Field label="Search">
            <Input placeholder="Type a keyword..." />
          </Field>
          <Field label="Status">
            <Select
              options={[
                { value: "all", label: "All" },
                { value: "active", label: "Active" },
                { value: "archived", label: "Archived" },
              ]}
              defaultValue="all"
            />
          </Field>
        </div>
      </Sheet>
    </>
  );
}

function PopoverDemo() {
  return (
    <Popover
      trigger={<Button variant="outline">Open popover</Button>}
      title="Stay in the loop"
      description="Get product updates in your inbox."
    >
      <div className="flex flex-col gap-2">
        <Input placeholder="you@example.com" type="email" />
        <Button size="sm">Subscribe</Button>
      </div>
    </Popover>
  );
}

function TooltipDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <TooltipWrapper content="Search documentation">
        <IconButton aria-label="Search"><MagnifyingGlassIcon size={18} /></IconButton>
      </TooltipWrapper>
      <TooltipWrapper content="Copy to clipboard">
        <IconButton aria-label="Copy" variant="secondary"><CopyIcon size={18} /></IconButton>
      </TooltipWrapper>
      <TooltipWrapper content="Share with your team">
        <IconButton aria-label="Share" variant="outline"><ShareIcon size={18} /></IconButton>
      </TooltipWrapper>
    </div>
  );
}

function TooltipWrapper({ content, children }: { content: string; children: React.ReactElement }) {
  return <Tooltip content={content}>{children}</Tooltip>;
}

function TabsDemo() {
  return (
    <Tabs
      defaultValue="overview"
      listClassName="mx-auto"
      items={[
        {
          value: "overview",
          label: "Overview",
          content: (
            <div className="rounded-card bg-surface p-4 text-sm leading-6 text-muted-foreground">
              A clean segmented control with a sliding active pill and clear content panels.
            </div>
          ),
        },
        {
          value: "activity",
          label: "Activity",
          content: (
            <div className="rounded-card bg-surface p-4 text-sm leading-6 text-muted-foreground">
              Recent activity appears here.
            </div>
          ),
        },
        {
          value: "disabled",
          label: "Disabled",
          content: null,
          disabled: true,
        },
      ]}
    />
  );
}

function TabsSettingsDemo() {
  return (
    <Tabs
      defaultValue="general"
      items={[
        {
          value: "general",
          label: "General",
          content: (
            <div className="flex flex-col gap-3 rounded-card bg-surface p-4">
              <div className="text-sm font-medium">Workspace name</div>
              <Input defaultValue="Avery Studio" />
            </div>
          ),
        },
        {
          value: "notifications",
          label: "Notifications",
          content: (
            <div className="flex flex-col gap-3 rounded-card bg-surface p-4">
              <Switch label="Product updates" defaultChecked />
              <Switch label="Weekly digest" />
            </div>
          ),
        },
        {
          value: "danger",
          label: "Danger",
          content: (
            <div className="rounded-card bg-destructive/10 p-4 text-sm text-muted-foreground">
              Destructive settings can live in their own tab.
            </div>
          ),
        },
      ]}
    />
  );
}

function CardDemo() {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Project</CardTitle>
        <CardDescription>Manage your project settings and deployments.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm leading-6 text-muted-foreground">
        Solid surfaces, clear hierarchy and a top-lit curved edge.
      </CardContent>
      <CardFooter>
        <Button size="sm">Save</Button>
        <Button size="sm" variant="ghost">Cancel</Button>
      </CardFooter>
    </Card>
  );
}

function CardProfileDemo() {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent className="flex items-center gap-3 pt-6">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary-soft-foreground">
          AQ
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Avery Quinn</p>
          <p className="text-xs text-muted-foreground">Product designer</p>
        </div>
        <Badge variant="primary">Pro</Badge>
      </CardContent>
      <CardContent className="grid grid-cols-3 gap-2 pt-0 text-center">
        {[
          ["24", "Projects"],
          ["1.2k", "Followers"],
          ["86", "Following"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-control bg-surface p-2">
            <div className="text-sm font-semibold">{value}</div>
            <div className="text-[11px] text-muted-foreground">{label}</div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="flex-1" size="sm" startIcon={PlusIcon}>Follow</Button>
        <Button size="sm" variant="secondary" startIcon={ShareIcon}>Share</Button>
      </CardFooter>
    </Card>
  );
}

function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>Neutral</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

function AlertDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <Alert icon={InfoIcon} variant="info" title="Heads up">
        A short supporting message with useful context.
      </Alert>
      <Alert icon={CheckCircleIcon} variant="success" title="Saved">
        Your changes are live.
      </Alert>
      <Alert icon={WarningIcon} variant="danger" title="Something went wrong">
        Check the form and try again.
      </Alert>
    </div>
  );
}

function SeparatorDemo() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-card bg-card p-4 shadow-soft">
      <div className="flex items-center justify-between text-sm">
        <span>Storage</span>
        <span className="text-muted-foreground">64%</span>
      </div>
      <Separator className="my-3" />
      <div className="flex items-center justify-between text-sm">
        <span>Members</span>
        <span className="text-muted-foreground">12</span>
      </div>
      <Separator className="my-3" />
      <div className="flex items-center justify-between text-sm">
        <span>Plan</span>
        <Badge variant="primary">Pro</Badge>
      </div>
    </div>
  );
}

function SpinnerDemo() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center gap-4 text-muted-foreground">
        <Spinner size={14} />
        <Spinner />
        <Spinner size={24} />
      </div>
      <Button loading>Loading…</Button>
    </div>
  );
}

function ToasterDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="secondary"
        onClick={() => toast("Saved", { description: "Your changes are live." })}
      >
        Default toast
      </Button>
      <Button variant="secondary" onClick={() => toast.success("Success toast")}>Success</Button>
      <Button variant="secondary" onClick={() => toast.error("Error toast")}>Error</Button>
    </div>
  );
}

function ToastPromiseDemo() {
  return (
    <Button
      variant="secondary"
      onClick={() => {
        toast.promise(
          new Promise<void>((resolve) => window.setTimeout(resolve, 1600)),
          {
            loading: "Saving…",
            success: "Saved",
            error: "Could not save",
          },
        );
      }}
    >
      Promise toast
    </Button>
  );
}

export const demoMap: Record<string, React.ComponentType> = {
  button: ButtonDemo,
  "icon-button": IconButtonDemo,
  input: InputDemo,
  textarea: TextareaDemo,
  field: FieldDemo,
  label: LabelDemo,
  checkbox: CheckboxDemo,
  "radio-group": RadioGroupDemo,
  switch: SwitchDemo,
  select: SelectDemo,
  dialog: DialogDemo,
  sheet: SheetDemo,
  popover: PopoverDemo,
  tooltip: TooltipDemo,
  tabs: TabsDemo,
  card: CardDemo,
  badge: BadgeDemo,
  alert: AlertDemo,
  separator: SeparatorDemo,
  spinner: SpinnerDemo,
  toaster: ToasterDemo,
};

export const exampleMap: Record<string, React.ComponentType> = {
  "button-sizes": ButtonSizesDemo,
  "select-field": SelectFieldDemo,
  "tabs-settings": TabsSettingsDemo,
  "card-profile": CardProfileDemo,
  "toast-promise": ToastPromiseDemo,
};
