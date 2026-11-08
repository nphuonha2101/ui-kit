"use client";

import * as React from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
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
  Toaster,
  Tooltip,
  toast,
} from "@nphuonha/ui-kit";
import {
  CheckCircleIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { AccentPicker } from "@/components/accent-picker";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold tracking-[-0.02em]">{title}</h2>
        <Separator className="flex-1 opacity-60" />
      </div>
      {children}
    </section>
  );
}

function Surface({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-card bg-card p-5 shadow-[var(--shadow-soft)] ${className ?? ""}`}>{children}</div>;
}

export default function Page() {
  const [dark, setDark] = React.useState(false);
  const [accentVars, setAccentVars] = React.useState<React.CSSProperties | undefined>();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div data-ui="kit" className={dark ? "dark" : ""} style={accentVars}>
      <Toaster />
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-[12px] bg-primary text-primary-foreground shadow-[var(--shadow-raised)]">
                <span className="text-sm font-bold tracking-tight">ui</span>
              </div>
              <div>
                <div className="text-sm font-semibold tracking-[-0.01em]">UI Kit</div>
                <div className="text-[11px] font-medium text-muted-foreground">Solid · borderless · modern</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1 rounded-pill bg-surface p-1 sm:flex">
                {["Showcase", "Theming", "Components"].map((label, i) => (
                  <span
                    key={label}
                    className={
                      i === 0
                        ? "rounded-pill bg-card px-3 py-1.5 text-xs font-semibold shadow-sm"
                        : "rounded-pill px-3 py-1.5 text-xs font-medium text-muted-foreground"
                    }
                  >
                    {label}
                  </span>
                ))}
              </div>
              <IconButton
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                variant="ghost"
                onClick={() => setDark((v) => !v)}
              >
                {dark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
              </IconButton>
            </div>
          </div>
        </header>

        <main className="mx-auto flex max-w-6xl flex-col gap-10 px-5 pb-16 pt-8">
          <section className="flex flex-col gap-5 rounded-[28px] bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-xl">
                <Badge variant="primary">MVP</Badge>
                <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
                  Borderless, solid,
                  <br />
                  expressive UI.
                </h1>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Tonal surfaces, solid fills and confident accent — no outlined boxes. Change the accent color at runtime and watch the system re-tone.
                </p>
              </div>
              <div className="flex w-full max-w-sm flex-col gap-3">
                <div className="rounded-card bg-surface p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Accent</div>
                  <div className="mt-3">
                    <AccentPicker dark={dark} onChange={setAccentVars} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" startIcon={PlusIcon} onClick={() => toast("Saved", { description: "Your changes are live." })}>
                    Create
                  </Button>
                  <Button variant="secondary" className="flex-1">Cancel</Button>
                </div>
              </div>
            </div>
          </section>

          <Section title="Buttons">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="danger">Danger</Button>
              <Button loading>Loading</Button>
              <Button startIcon={PlusIcon}>With icon</Button>
              <Button shape="pill">Pill</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <IconButton aria-label="Search" variant="secondary"><MagnifyingGlassIcon size={18} /></IconButton>
            </div>
          </Section>

          <Section title="Inputs & Field">
            <Surface className="grid gap-4 md:grid-cols-2">
              <Field label="Email" description="We'll never share it." required>
                <Input placeholder="you@example.com" type="email" />
              </Field>
              <Field label="With error" error="This field is required">
                <Input placeholder="Required" error />
              </Field>
              <div className="md:col-span-2">
                <Field label="Message">
                  <Textarea placeholder="Write something..." />
                </Field>
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <Label htmlFor="plain">Plain label + input</Label>
                <Input id="plain" placeholder="Plain" />
              </div>
            </Surface>
          </Section>

          <Section title="Selection controls">
            <div className="grid gap-6 md:grid-cols-3">
              <Surface className="flex flex-col gap-3">
                <Checkbox label="Accept terms" description="You agree to the policy." defaultChecked />
                <Checkbox label="Indeterminate" indeterminate />
                <Checkbox label="Disabled" disabled />
              </Surface>
              <Surface className="flex flex-col gap-3">
                <Switch label="Notifications" description="Email updates" defaultChecked />
                <Switch label="Disabled" disabled />
              </Surface>
              <Surface>
                <RadioGroup
                  label="Plan"
                  defaultValue="pro"
                  options={[
                    { value: "free", label: "Free", description: "Basics" },
                    { value: "pro", label: "Pro", description: "Most features" },
                    { value: "team", label: "Team", description: "Collaboration", disabled: true },
                  ]}
                />
              </Surface>
            </div>
          </Section>

          <Section title="Select">
            <Surface className="max-w-xs">
              <Field label="Framework">
                <Select
                  placeholder="Choose one"
                  options={[
                    { value: "next", label: "Next.js" },
                    { value: "vite", label: "Vite" },
                    { value: "remix", label: "Remix" },
                  ]}
                  defaultValue="next"
                />
              </Field>
            </Surface>
          </Section>

          <Section title="Overlays">
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
              <Dialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title="Confirm action"
                description="This is a solid, borderless dialog overlay."
                footer={<><Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={() => setDialogOpen(false)}>Confirm</Button></>}
              >
                Dialog content goes here.
              </Dialog>

              <Button variant="secondary" onClick={() => setSheetOpen(true)}>Open sheet</Button>
              <Sheet
                open={sheetOpen}
                onOpenChange={setSheetOpen}
                side="right"
                title="Sheet panel"
                description="Floating rounded surface, soft depth."
                footer={<Button onClick={() => setSheetOpen(false)}>Done</Button>}
              >
                Sheet content. Good for details and forms.
              </Sheet>

              <Popover trigger={<Button variant="outline">Popover</Button>} title="Popover" description="Solid surface, soft overlay depth.">
                <div className="text-sm text-muted-foreground">Any content here.</div>
              </Popover>

              <Tooltip content="Helpful, restrained tooltip">
                <Button variant="ghost">Tooltip</Button>
              </Tooltip>
            </div>
          </Section>

          <Section title="Tabs">
            <Tabs
              defaultValue="one"
              items={[
                { value: "one", label: "Overview", content: <Surface className="text-sm text-muted-foreground">Clean segmented tabs with solid selected state.</Surface> },
                { value: "two", label: "Details", content: <Surface className="text-sm text-muted-foreground">Details panel content.</Surface> },
                { value: "three", label: "Disabled", content: null, disabled: true },
              ]}
            />
          </Section>

          <Section title="Feedback & display">
            <div className="grid gap-4 md:grid-cols-2">
              <Alert icon={InfoIcon} variant="info" title="Information">Neutral, readable status surface.</Alert>
              <Alert icon={CheckCircleIcon} variant="success" title="Success">Action completed.</Alert>
              <Alert icon={WarningIcon} variant="warning" title="Warning">Something needs attention.</Alert>
              <Alert icon={WarningIcon} variant="danger" title="Error">There was a problem.</Alert>
            </div>
            <Surface className="flex flex-wrap items-center gap-2">
              <Badge>Neutral</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="solid">Solid</Badge>
              <Badge variant="outline">Outline</Badge>
              <span className="ml-2 inline-flex items-center gap-2 text-sm text-muted-foreground"><Spinner size={16} /> Loading</span>
            </Surface>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => toast("Saved", { description: "Your changes are live." })}>Toast</Button>
              <Button variant="secondary" onClick={() => toast.success("Success toast")}>Success</Button>
              <Button variant="secondary" onClick={() => toast.error("Error toast")}>Error</Button>
            </div>
          </Section>

          <Section title="Card">
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>Card {i}</CardTitle>
                    <CardDescription>Borderless, solid, soft depth.</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">Solid surfaces with clear hierarchy.</CardContent>
                </Card>
              ))}
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}
