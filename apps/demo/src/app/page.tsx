import Link from "next/link";
import {
  ArrowUpRightIcon,
  PaletteIcon,
  ShieldCheckIcon,
  SparkleIcon,
} from "@/components/icons";
import { Badge, Card, CardContent, buttonVariants } from "@nphuonha/ui-kit";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDemo } from "@/content/components/demo-map";
import { HeroSignup } from "@/components/home/hero-signup";
import { registry } from "@/content/components";

const featured = ["button", "input", "dialog", "tabs", "card", "badge"];

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto grid w-full max-w-6xl gap-12 px-4 pb-16 pt-16 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-24">
        <div>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(2.7rem,6vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.055em]">
            The foundation for your design system.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
            A solid, borderless React UI kit built on Base UI. Tonal surfaces, top-lit curves,
            and a vibrant accent you can change at runtime.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Link href="/docs" className={buttonVariants({ size: "lg" })}>
              Get started
            </Link>
            <Link
              href="/docs/components"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Browse components
            </Link>
          </div>
          <div className="mt-6 max-w-md">
            <CodeBlock
              code="npm install @nphuonha/ui-kit"
              language="bash"
              filename="Terminal"
            />
          </div>
        </div>

        <HeroSignup />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.03em]">A few components</h2>
            <p className="mt-1 text-sm text-muted-foreground">
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((slug) => {
            const entry = registry.find((item) => item.slug === slug);
            if (!entry) return null;
            return (
              <Link
                key={slug}
                href={`/docs/components/${slug}`}
                className="surface-curved group relative flex flex-col overflow-hidden rounded-card bg-card shadow-soft transition-transform hover:-translate-y-0.5"
              >
                <div className="preview-canvas pointer-events-none flex h-44 items-center justify-center overflow-hidden p-4" aria-hidden>
                  <div className="w-full scale-[0.72]">
                    <ComponentDemo slug={slug} />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{entry.title}</div>
                    <div className="line-clamp-1 text-xs text-muted-foreground">
                      {entry.description}
                    </div>
                  </div>
                  <ArrowUpRightIcon
                    size={16}
                    className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
          <div className="mb-6 max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-[-0.035em]">
              Solid surfaces. No outlined boxes.
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Depth comes from tonal fills, a top-lit rim and a barely-there gradient. The
              accent is token-driven, so the whole system re-tones from one color.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: SparkleIcon,
                title: "Borderless by default",
                body: "Fields, cards and overlays use solid fills and soft depth instead of gray outlines.",
              },
              {
                icon: ShieldCheckIcon,
                title: "Base UI behavior",
                body: "Accessible focus, overlays and form semantics come from headless primitives.",
              },
              {
                icon: PaletteIcon,
                title: "Accent at runtime",
                body: "Generate a full primary palette from one color with generateAccentVars.",
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="flex flex-col gap-3 pt-6">
                  <span className="flex size-9 items-center justify-center rounded-[10px] bg-primary-soft text-primary-soft-foreground">
                    <item.icon size={18} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.body}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-6">
        <div className="surface-curved relative overflow-hidden rounded-[2rem] bg-card p-8 shadow-soft md:p-12">
          <div className="absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl" aria-hidden />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.035em]">Ready to start?</h2>
              <p className="mt-2 max-w-lg text-sm leading-7 text-muted-foreground">
                Install the package, import the stylesheet, and scope the kit with{" "}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">
                  data-ui=&quot;kit&quot;
                </code>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/docs/installation" className={buttonVariants()}>
                Installation
              </Link>
              <Link href="/docs/theming" className={buttonVariants({ variant: "secondary" })}>
                Theming
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
