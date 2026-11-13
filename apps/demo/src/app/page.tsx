import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  PaletteIcon,
  ShieldCheckIcon,
  SparkleIcon,
} from "@/components/icons";
import { ButtonLink } from "@nphuonha/ui-kit";
import { AccentLab } from "@/components/home/accent-lab";
import { HeroSpecimen } from "@/components/home/hero-specimen";
import { HomeMotion } from "@/components/home/home-motion";
import { InstallPill } from "@/components/home/install-pill";
import { ShowcaseTiles } from "@/components/home/showcase-tiles";
import { registry } from "@/content/components";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ path: "/" });

const principles = [
  {
    icon: SparkleIcon,
    href: "/docs/utilities",
    title: "Borderless by default",
    body: "Depth comes from tonal fills, a top-lit rim and a soft shadow. No gray outlines to keep in sync.",
  },
  {
    icon: ShieldCheckIcon,
    href: "/docs/components",
    title: "Behavior you don't rewrite",
    body: "Base UI covers dialogs, menus, comboboxes and form primitives. Calendar, time, color and data grid are first-party with the same keyboard and ARIA contract.",
  },
  {
    icon: PaletteIcon,
    href: "/docs/theming",
    title: "One accent token",
    body: "generateAccentVars turns a single color into a complete primary scale, so dark mode and the focus ring stay in tune.",
  },
];

const startLinks = [
  { href: "/docs/installation", label: "Installation", note: "Install and scope the kit" },
  { href: "/docs/theming", label: "Theming", note: "Tokens, dark mode, accents" },
  { href: "/docs/components", label: "Components", note: `${registry.length} documented controls` },
  { href: "/playground", label: "Playground", note: "Edit and preview in the browser" },
];

export default function HomePage() {
  return (
    <HomeMotion>
      {/* Hero — editorial split, product-first: a live specimen instead of an illustration */}
      <div className="relative -mt-16 overflow-x-clip">
        <div aria-hidden>
          <div className="hero-wash" />
          <div className="hero-canvas" />
          <div className="hero-noise" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 pt-24 md:px-8 md:pt-28 lg:pt-32">
          <div className="grid items-center gap-14 pb-14 lg:grid-cols-12 lg:gap-10 lg:pb-20">
            <div className="lg:col-span-6">
              <div data-motion="hero-copy">
                <h1 className="max-w-[15ch] text-balance text-[clamp(2.6rem,5.4vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
                  The foundation for your{" "}
                  <span className="font-gluten font-medium text-primary sm:whitespace-nowrap">
                    design system.
                  </span>
                </h1>

                <p className="mt-6 max-w-md text-[15px] leading-7 text-muted-foreground">
                  Solid fills, top-lit edges and one accent that re-tones the whole kit.
                  Base UI for behavior; first-party controls where it has no primitive.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <ButtonLink render={<Link href="/docs/installation" />} size="lg">
                    Get started
                  </ButtonLink>
                  <ButtonLink
                    render={<Link href="/docs/components" />}
                    variant="secondary"
                    size="lg"
                  >
                    Browse components
                  </ButtonLink>
                </div>

                <div className="mt-8">
                  <InstallPill />
                </div>
              </div>
            </div>

            <div className="min-w-0 lg:col-span-6 lg:pl-2 xl:pl-6">
              <HeroSpecimen />
            </div>
          </div>

          <div className="tick-rule opacity-50" aria-hidden />
        </div>
      </div>

      <Section label="Showcase" title="Real controls, not screenshots">
        <div
          data-motion="reveal"
          className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-lg text-[15px] leading-7 text-muted-foreground">
            Every tile renders the same component you get from the package. Open one to read
            its props, keyboard contract and snippets.
          </p>
          <Link
            href="/docs/components"
            className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            All {registry.length} components <ArrowUpRightIcon size={14} />
          </Link>
        </div>

        <ShowcaseTiles />
      </Section>

      <Section label="Principles" title="Why it looks the way it does">
        <div className="border-t border-border/60">
          {principles.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              data-motion="reveal"
              className="group grid grid-cols-1 gap-x-4 gap-y-2 border-b border-border/60 px-2 py-7 transition-colors hover:bg-surface/50 md:grid-cols-[13rem_1fr_2.5rem] md:items-start"
            >
              <h3 className="text-sm font-semibold transition-colors group-hover:text-primary">
                {item.title}
              </h3>
              <p className="text-[15px] leading-7 text-muted-foreground">{item.body}</p>
              <span className="hidden justify-end text-muted-foreground/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:flex">
                <item.icon size={17} />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section label="Theming" title="Recolor it at runtime">
        <div className="flex flex-col gap-8">
          <p data-motion="reveal" className="max-w-lg text-[15px] leading-7 text-muted-foreground">
            Pick an accent and watch the page, the docs and every component follow. Tokens
            are written to <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">&lt;html&gt;</code>,
            so nothing rebuilds and nothing flashes.
          </p>
          <div data-motion="reveal">
            <AccentLab />
          </div>
        </div>
      </Section>

      <Section label="Start" title="Install it, then own it">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div data-motion="reveal">
            <h3 className="max-w-[18ch] text-2xl font-semibold tracking-[-0.035em] md:text-3xl">
              Start with a button. Ship the rest.
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">
              One stylesheet import, one scope attribute, and the kit inherits your theme.
              No config file, no build plugin.
            </p>
            <div className="mt-7">
              <InstallPill />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <ButtonLink render={<Link href="/docs/installation" />}>
                Installation
              </ButtonLink>
              <ButtonLink render={<Link href="/docs/theming" />} variant="secondary">
                Theming
              </ButtonLink>
            </div>
          </div>

          <ul data-motion="reveal" className="border-y border-border/60">
            {startLinks.map((item) => (
              <li key={item.href} className="border-b border-border/60 last:border-b-0">
                <Link
                  href={item.href}
                  className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-primary"
                >
                  <span>
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {item.note}
                    </span>
                  </span>
                  <ArrowRightIcon
                    size={15}
                    className="shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </HomeMotion>
  );
}

function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <div className="md:sticky md:top-28">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {label}
              </p>
              <h2 className="mt-3 text-lg font-semibold tracking-[-0.02em]">{title}</h2>
            </div>
          </div>
          <div className="md:col-span-9">{children}</div>
        </div>
      </div>
    </section>
  );
}
