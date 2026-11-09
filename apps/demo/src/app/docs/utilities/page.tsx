import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nphuonha/ui-kit";
import { CodeBlock } from "@/components/docs/code-block";
import { PageHeader } from "@/components/docs/page-header";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Utilities",
  description:
    "The visual utility classes behind the kit: surfaces, shadows, radii and semantic fills.",
  path: "/docs/utilities/",
});

const surfaces = [
  {
    name: "surface-curved",
    description: "Cards, dialogs, popovers and primary buttons.",
    preview: (
      <div className="surface-curved relative flex h-full w-full items-center justify-center rounded-card bg-card text-xs text-muted-foreground shadow-soft">
        Aa
      </div>
    ),
  },
  {
    name: "surface-curved-soft",
    description: "Secondary buttons, tabs, alerts, badges and tracks.",
    preview: (
      <div className="surface-curved-soft relative flex h-full w-full items-center justify-center rounded-control bg-field text-xs text-muted-foreground">
        Aa
      </div>
    ),
  },
  {
    name: "surface-curved-pill",
    description: "Switch thumbs and pill controls. Pair with a track and a raised shadow so the edge reads.",
    preview: (
      <div className="flex h-full w-full items-center justify-center rounded-pill bg-field p-2">
        <div className="surface-curved-pill relative h-8 w-16 rounded-pill bg-card shadow-raised ring-1 ring-border/60" />
      </div>
    ),
  },
  {
    name: "surface-inset",
    description: "Native fields, where pseudo-elements are unavailable.",
    preview: (
      <div className="surface-inset flex h-full w-full items-center justify-center rounded-field bg-field text-xs text-muted-foreground">
        Aa
      </div>
    ),
  },
];

const shadows = [
  {
    name: "shadow-control",
    description: "Tiny active indicators: tab pills, nav highlights and badges.",
    className: "shadow-control",
  },
  {
    name: "shadow-soft",
    description: "Resting cards and grouped panels. The default for Card.",
    className: "shadow-soft",
  },
  {
    name: "shadow-raised",
    description: "Primary actions and states that should feel lifted.",
    className: "shadow-raised",
  },
  {
    name: "shadow-overlay",
    description: "Dialogs, sheets, popovers and toasts above the page.",
    className: "shadow-overlay",
  },
];

const radii = [
  { name: "rounded-2xs", value: "4px", description: "Micro details such as breadcrumb ellipsis." },
  { name: "rounded-xs", value: "8px", description: "Checkboxes, Kbd keys and stepper buttons." },
  { name: "rounded-control", value: "12px", description: "Buttons and compact controls." },
  { name: "rounded-field", value: "12px", description: "Inputs, textareas and selects." },
  { name: "rounded-card", value: "20px", description: "Cards and grouped panels." },
  { name: "rounded-overlay", value: "20px", description: "Dialogs, sheets and popovers." },
  { name: "rounded-pill", value: "9999px", description: "Pills and segmented controls." },
];

const fills = [
  { name: "bg-background", description: "Page canvas." },
  { name: "bg-card", description: "Raised surfaces." },
  { name: "bg-surface", description: "Tonal sections and controls." },
  { name: "bg-field", description: "Input and field fills." },
  { name: "bg-primary", description: "Primary action fill." },
  { name: "bg-primary-soft", description: "Quiet accent fill." },
];

const cheatsheet = [
  ["Card", "surface-curved · rounded-card · shadow-soft"],
  ["Primary button", "surface-curved · rounded-control · shadow-raised"],
  ["Secondary control", "surface-curved-soft · rounded-control"],
  ["Input / textarea / select", "surface-inset · rounded-field"],
  ["Dialog / sheet / popover", "surface-curved · rounded-overlay · shadow-overlay"],
  ["Nested card", "shadow-none or surface-flat"],
];

export default function UtilitiesPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Utilities"
        description="The small set of classes that gives the kit its look. Prefer these over hand-rolled borders, gradients and shadows so every surface stays consistent."
      />

      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Surfaces</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Surface utilities paint the top-lit curve and inset rim. Pair them with a
            background token and a radius, and use one base surface treatment per element.
            For nested surfaces, see the zero-depth options under Shadows.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {surfaces.map((surface) => (
              <div
                key={surface.name}
                className="flex flex-col gap-2 rounded-card bg-surface/50 p-3"
              >
                <div className="flex h-24 items-center justify-center rounded-control bg-background p-3">
                  {surface.preview}
                </div>
                <div>
                  <code className="text-xs font-semibold text-foreground">{surface.name}</code>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {surface.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            <code className="text-[13px] font-semibold text-foreground">surface-curved</code> uses a
            pseudo-element for its rim, so the element needs{" "}
            <code className="text-[13px] font-semibold text-foreground">relative</code>.
          </p>
          <CodeBlock
            filename="Surfaces"
            code={`<div className="surface-curved relative rounded-card bg-card shadow-soft">
  ...
</div>

<div className="surface-curved-soft rounded-control bg-field">
  ...
</div>

<div className="surface-curved-pill relative h-5 w-7 rounded-pill bg-card shadow-raised ring-1 ring-border/60" />

<div className="surface-inset rounded-field bg-field">
  <input />
</div>`}
          />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Shadows</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Shadows are tonal and subtle: they lift a surface, never outline it. Keep one
            level of depth per surface; nested cards should drop the outer lift instead of
            stacking another shadow.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {shadows.map((shadow) => (
              <div key={shadow.name} className="flex flex-col gap-2">
                <div className={`flex h-24 items-center justify-center rounded-card bg-card p-4 text-xs text-muted-foreground ${shadow.className}`}>
                  {shadow.name}
                </div>
                <p className="text-xs leading-5 text-muted-foreground">
                  <code className="font-semibold text-foreground">{shadow.name}</code> —{" "}
                  {shadow.description}
                </p>
              </div>
            ))}
          </div>
          <h3 className="mt-2 text-sm font-semibold">Zero depth</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="surface-curved relative flex h-24 items-center justify-center rounded-card bg-card text-xs text-muted-foreground shadow-none">
                shadow-none
              </div>
              <p className="text-xs leading-5 text-muted-foreground">
                <code className="font-semibold text-foreground">shadow-none</code> — keep the
                curved rim, drop the outer lift. Good for a card nested inside another surface.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="surface-curved surface-flat relative flex h-24 items-center justify-center rounded-card bg-card text-xs text-muted-foreground">
                surface-flat
              </div>
              <p className="text-xs leading-5 text-muted-foreground">
                <code className="font-semibold text-foreground">surface-flat</code> — remove the
                rim and gradient as well. Use it when the surface should disappear into its parent.
              </p>
            </div>
          </div>
          <CodeBlock
            filename="No-shadow options"
            code={`// Default: soft lift
<Card>...</Card>

// No outer shadow, keep the curved rim
<Card className="shadow-none">...</Card>

// Fully flat: no shadow, rim or gradient
<Card className="surface-flat">...</Card>

// Use a stronger lift only for floating controls
<Card className="shadow-raised">...</Card>`}
          />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Radius</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Radii come from shape tokens. Use the semantic class instead of arbitrary
            pixel values.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {radii.map((radius) => (
              <div key={radius.name} className="flex items-center gap-3 rounded-control bg-surface/50 p-3">
                <div className={`h-14 w-20 shrink-0 bg-primary-soft ${radius.name}`} />
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <code className="text-xs font-semibold text-foreground">{radius.name}</code>
                    <span className="text-[11px] text-muted-foreground">{radius.value}</span>
                  </div>
                  <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                    {radius.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Fills</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Fill classes map to semantic tokens, so they re-tone with the accent and dark
            mode. Avoid raw colors unless you are overriding a documented token.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {fills.map((fill) => (
              <div key={fill.name} className="flex items-center gap-3 rounded-control bg-surface/50 p-2.5">
                <span className={`size-9 shrink-0 rounded-sm ring-1 ring-border/60 ${fill.name}`} />
                <div>
                  <code className="text-xs font-semibold text-foreground">{fill.name}</code>
                  <p className="text-xs leading-5 text-muted-foreground">{fill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Cheatsheet</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            The classes each component uses by default. Override them only when the
            surface needs a different role.
          </p>
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Classes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cheatsheet.map(([role, classes]) => (
                  <TableRow key={role}>
                    <TableCell className="font-medium text-foreground">{role}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {classes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

        <section className="flex flex-wrap items-center gap-3 rounded-card bg-surface/60 p-4 text-sm text-muted-foreground">
          <span>
            Need the tokens behind these classes? Read{" "}
            <Link href="/docs/theming" className="docs-link">
              Theming
            </Link>
            .
          </span>
        </section>
      </div>
    </div>
  );
}
