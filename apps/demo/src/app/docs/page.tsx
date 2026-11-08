import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  ListChecksIcon,
  PaletteIcon,
  RobotIcon,
  RocketLaunchIcon,
  SquaresFourIcon,
} from "@/components/icons";
import { Card, CardContent } from "@nphuonha/ui-kit";
import { CodeBlock } from "@/components/docs/code-block";
import { PageHeader } from "@/components/docs/page-header";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Introduction",
  description:
    "A modern, borderless React UI kit built on Base UI and Tailwind CSS v4, with semantic tokens and a runtime-customizable accent.",
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
    href: "/docs/forms",
    title: "Forms",
    description: "React Hook Form integration and accessible validation.",
    icon: ListChecksIcon,
  },
  {
    href: "/docs/components",
    title: "Components",
    description: "Browse the MVP components with live previews and API notes.",
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
            primitives. This kit sits in between: behavior and accessibility come from{" "}
            <a href="https://base-ui.com" target="_blank" rel="noreferrer" className="docs-link">
              Base UI
            </a>
            , while the visual language is owned here — semantic tokens, solid fills, a
            top-lit curved edge and a restrained motion system.
          </p>
          <p className="text-sm leading-7 text-muted-foreground">
            There are no gray outlined boxes. Depth comes from tonal surfaces, a light rim on
            the top edge and a barely-there vertical gradient. The accent is generated from one
            color, so the whole system re-tones without hand-editing every variable.
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
                <span className="flex size-9 items-center justify-center rounded-[10px] bg-primary-soft text-primary-soft-foreground">
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
