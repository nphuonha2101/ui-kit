import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  ListChecksIcon,
  PaletteIcon,
  RobotIcon,
  RocketLaunchIcon,
  SparkleIcon,
  SquaresFourIcon,
  TerminalWindowIcon,
} from "@/components/icons";
import { Card, CardContent } from "@nphuonha/ui-kit";
import { CodeBlock } from "@/components/docs/code-block";
import { PageHeader } from "@/components/docs/page-header";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Introduction",
  description:
    "A modern, borderless React UI kit for Tailwind v4. Base UI primitives where they exist, first-party calendar, date/time, color and data-grid controls where they don't.",
  path: "/docs/",
});

const links = [
  {
    href: "/docs/installation",
    title: "Installation",
    description: "Add the package, import the stylesheet and scope the kit.",
    icon: RocketLaunchIcon,
  },
  {
    href: "/docs/theming",
    title: "Theming",
    description: "Semantic tokens, dark mode and runtime accent generation.",
    icon: PaletteIcon,
  },
  {
    href: "/docs/utilities",
    title: "Utilities",
    description: "Surface, shadow, radius and fill classes with live examples.",
    icon: SparkleIcon,
  },
  {
    href: "/docs/forms",
    title: "Forms",
    description: "React Hook Form integration and accessible validation.",
    icon: ListChecksIcon,
  },
  {
    href: "/docs/upgrading",
    title: "Upgrading",
    description: "Version policy and old → new API migration rows.",
    icon: TerminalWindowIcon,
  },
  {
    href: "/docs/components",
    title: "Components",
    description: "Browse components with live previews and API notes.",
    icon: SquaresFourIcon,
  },
  {
    href: "/docs/agents",
    title: "For agents",
    description: "Machine-readable docs and a prompt for coding agents.",
    icon: RobotIcon,
  },
];

export default function IntroductionPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Introduction"
        description="A modern, borderless React UI kit you can own. Solid surfaces, top-lit curves, accessible behavior and an accent that changes at runtime."
      />

      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">The idea</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Most component libraries give you a fixed visual language or a pile of unstyled
            primitives. This kit sits in between.{" "}
            <a href="https://base-ui.com" target="_blank" rel="noreferrer" className="docs-link">
              Base UI
            </a>{" "}
            supplies behavior and accessibility where a matching primitive exists. Where Base
            UI has no primitive — calendar, date/time, color and data grid — the control is
            first-party and follows the same focus, keyboard and ARIA contract. The visual
            language is owned here: semantic tokens, solid fills, a top-lit curved edge and a
            restrained motion system.
          </p>
          <p className="text-sm leading-7 text-muted-foreground">
            There are no gray outlined boxes. Depth comes from tonal surfaces, a light rim on
            the top edge and a barely-there vertical gradient. The accent is generated from one
            color, so the whole system re-tones without hand-editing every variable.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">
            What comes from Base UI?
          </h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Base UI is the behavior layer where a matching primitive exists — it is not a
            wrapper around every component. Base UI 1.9 has no calendar, time, color or
            data-grid primitive, so those controls are implemented first-party.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              [
                "Base UI primitives",
                "Dialog, AlertDialog, Sheet, Popover, Menu, Select, Combobox, Tooltip, PreviewCard, Tabs, Accordion, Collapsible, Checkbox, RadioGroup, Switch, Slider, NumberField, OTPField, Toggle, ToggleGroup, Toolbar, Progress, Meter, Avatar, ScrollArea and Fieldset.",
              ],
              [
                "First-party controls",
                "Calendar, DatePicker, DateTimePicker, TimeField, ColorPicker, DataTable, Table, FileUpload, Input, Textarea, Button, Badge, Card, Alert, Breadcrumb, Pagination and the navigation components.",
              ],
              [
                "Third-party engines",
                "Toaster uses sonner. DataTable uses TanStack Table and Virtual on top of the kit's own Table primitives.",
              ],
            ].map(([title, body]) => (
              <Card key={title}>
                <CardContent className="pt-5">
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            First-party controls are not thin wrappers: they own keyboard handling, ARIA,
            validation and popover state. That is why some of them are larger than their Base
            UI-backed peers.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Three ideas</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Borderless", "Solid fills and edge light instead of outlines."],
              ["Expressive", "Pill shapes, sliding tabs and a vibrant accent."],
              ["Owned", "Semantic CSS variables, no hidden brand paints."],
            ].map(([title, body]) => (
              <Card key={title}>
                <CardContent className="pt-5">
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Quick start</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Install the package, import the stylesheet once, and scope your app with{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">data-ui=&quot;kit&quot;</code>.
          </p>
          <CodeBlock
            filename="app/page.tsx"
            code={`import "@nphuonha/ui-kit/styles.css";
import { Button, Input } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <div data-ui="kit" className="flex gap-2">
      <Input placeholder="Email" />
      <Button>Continue</Button>
    </div>
  );
}`}
          />
          <p className="text-sm leading-7 text-muted-foreground">
            Put <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">data-ui=&quot;kit&quot;</code>{" "}
            on <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">&lt;html&gt;</code>{" "}
            when you use portalled overlays, so dialogs, sheets and popovers inherit the tokens.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Start here</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="surface-curved group relative flex flex-col gap-3 rounded-card bg-card p-5 shadow-soft transition-transform hover:-translate-y-0.5"
              >
                <span className="flex size-9 items-center justify-center rounded-sm bg-primary-soft text-primary-soft-foreground">
                  <item.icon size={18} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                  Read more <ArrowRightIcon size={13} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
