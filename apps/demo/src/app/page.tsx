import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowUpRightIcon,
  PaletteIcon,
  ShieldCheckIcon,
  SparkleIcon,
} from "@/components/icons";
import { ButtonLink, Card, CardContent } from "@nphuonha/ui-kit";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDemo } from "@/content/components/demo-map";
import { HeroShowcase } from "@/components/home/hero-showcase";
import { HomeMotion } from "@/components/home/home-motion";
import { registry } from "@/content/components";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ path: "/" });

const featured = ["button", "input", "dialog", "tabs", "card", "badge"];

export default function HomePage() {
  return (
    <HomeMotion>
      <section className="mx-auto grid w-full max-w-7xl gap-14 overflow-x-clip px-4 pb-20 pt-16 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-28 xl:gap-24">
        <div data-motion="hero-copy">
          <h1 className="max-w-[16ch] text-[clamp(2.7rem,6vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.055em]">
            The foundation for your design system.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
            A solid, borderless React UI kit for Tailwind v4. Base UI powers the primitives it
            covers; calendar, date/time, color and data-grid controls are first-party. Tonal
            surfaces, top-lit curves, and a vibrant accent you can change at runtime.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink render={<Link href="/docs" />} size="lg">
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
          <div className="mt-8 max-w-md">
            <CodeBlock
              code="npm install @nphuonha/ui-kit"
              language="bash"
              filename="Terminal"
            />
          </div>
        </div>

        <HeroShowcase />
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-6 lg:pb-28">
        <div data-motion="reveal" className="mb-8 flex items-end justify-between gap-4 md:mb-10">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.03em]">A few components</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Borderless, solid and ready to compose.
            </p>
          </div>
          <Link
            href="/docs/components"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View all <ArrowUpRightIcon size={14} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:gap-8">
          {featured.map((slug) => {
            const entry = registry.find((item) => item.slug === slug);
            if (!entry) return null;
            return (
              <div
                key={slug}
                data-motion="component-card"
                className="surface-curved group relative flex flex-col overflow-hidden rounded-card bg-card shadow-soft transition-transform hover:-translate-y-0.5"
              >
                <Link
                  href={`/docs/components/${slug}`}
                  aria-label={`Open ${entry.title}`}
                  className="absolute inset-0 z-10 rounded-card outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                />
                <div className="preview-canvas pointer-events-none flex h-48 items-center justify-center overflow-hidden p-5 xl:h-52" aria-hidden>
                  <div className="w-full scale-[0.72]">
                    <ComponentDemo slug={slug} />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 px-5 py-4">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{entry.title}</div>
                    <div className="mt-1 line-clamp-1 text-xs leading-5 text-muted-foreground">
                      {entry.description}
                    </div>
                  </div>
                  <ArrowUpRightIcon
                    size={16}
                    className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 md:px-6 lg:py-28">
          <div data-motion="reveal" className="mb-8 max-w-2xl md:mb-10">
            <h2 className="text-2xl font-semibold tracking-[-0.035em]">
              Solid surfaces. No outlined boxes.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Depth comes from tonal fills, a top-lit rim and a barely-there gradient. The
              accent is token-driven, so the whole system re-tones from one color.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 xl:gap-8">
            {[
              {
                icon: SparkleIcon,
                title: "Borderless by default",
                body: "Fields, cards and overlays use solid fills and soft depth instead of gray outlines.",
              },
              {
                icon: ShieldCheckIcon,
                title: "Base UI where it fits",
                body: "Overlays and form primitives use Base UI. Calendar, date/time, color and data-grid controls are first-party with the same a11y contract.",
              },
              {
                icon: PaletteIcon,
                title: "Accent at runtime",
                body: "Generate a full primary palette from one color with generateAccentVars.",
              },
            ].map((item) => (
              <Card key={item.title} data-motion="feature-card">
                <CardContent className="flex flex-col gap-4 p-6">
                  <span className="flex size-9 items-center justify-center rounded-sm bg-primary-soft text-primary-soft-foreground">
                    <item.icon size={18} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.body}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-24 md:px-6 lg:pb-32">
        <div data-motion="reveal" className="surface-curved relative overflow-hidden rounded-[2rem] bg-card p-8 shadow-soft md:p-16">
          <div className="absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl" aria-hidden />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.035em]">Ready to start?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                Install the package, import the stylesheet, and scope the kit with{" "}
                <code className="whitespace-nowrap rounded bg-surface px-1.5 py-0.5 font-mono text-xs">
                  data-ui=&quot;kit&quot;
                </code>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <ButtonLink render={<Link href="/docs/installation" />}>
                Installation
              </ButtonLink>
              <ButtonLink
                render={<Link href="/docs/theming" />}
                variant="secondary"
              >
                Theming
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </HomeMotion>
  );
}
