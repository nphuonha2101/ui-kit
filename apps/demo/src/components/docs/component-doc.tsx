import Link from "next/link";
import { Badge } from "@nphuonha/ui-kit";
import type { ComponentMeta, ComponentSnippets } from "@/content/types";
import { registry } from "@/content/components";
import { ComponentDemo, ExampleDemo } from "@/content/components/demo-map";
import { CodeBlock } from "./code-block";
import { ComponentPreview } from "./component-preview";
import { PropTable } from "./prop-table";
import { TableOfContents, type TocItem } from "./table-of-contents";

export function ComponentDoc({
  meta,
  snippets,
}: {
  meta: ComponentMeta;
  snippets: ComponentSnippets;
}) {
  const index = registry.findIndex((item) => item.slug === meta.slug);
  const previous = registry[index - 1];
  const next = registry[index + 1];

  const toc: TocItem[] = [
    { href: "#preview", label: "Preview" },
    { href: "#installation", label: "Installation" },
    { href: "#usage", label: "Usage" },
    ...(meta.examples?.length ? [{ href: "#examples", label: "Examples" }] : []),
    { href: "#api-reference", label: "API Reference" },
  ];

  return (
    <div className="flex flex-col gap-8 xl:grid xl:grid-cols-[minmax(0,1fr)_200px] xl:items-start xl:gap-10">
      <article className="min-w-0 max-w-3xl">
        <nav className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/docs/components" className="transition-colors hover:text-foreground">
            Components
          </Link>
          <span>/</span>
          <span className="text-foreground">{meta.title}</span>
        </nav>

        <header className="mb-8 flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-4xl">
              {meta.title}
            </h1>
            <Badge variant="primary">{meta.category}</Badge>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            {meta.description}
          </p>
        </header>

        <section id="preview" className="scroll-mt-24">
          <ComponentPreview code={snippets.preview}>
            <ComponentDemo slug={meta.slug} />
          </ComponentPreview>
        </section>

        <section id="installation" className="mt-10 scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Installation</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Import the component from the kit. The package ships source and is transpiled by
            Next.js.
          </p>
          <div className="mt-3">
            <CodeBlock code={meta.imports} filename="Import" />
          </div>
        </section>

        <section id="usage" className="mt-10 scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Usage</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Compose the component with your own content. All controls share the same focus,
            disabled and invalid states.
          </p>
          <div className="mt-3">
            <CodeBlock code={snippets.usage} filename="Usage" />
          </div>
        </section>

        {meta.examples?.length ? (
          <section id="examples" className="mt-10 scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-[-0.025em]">Examples</h2>
            <div className="mt-4 flex flex-col gap-6">
              {meta.examples.map((example) => (
                <div key={example.title} className="flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">{example.title}</h3>
                  {example.description ? (
                    <p className="text-sm leading-6 text-muted-foreground">
                      {example.description}
                    </p>
                  ) : null}
                  {example.demoKey ? (
                    <ComponentPreview
                      code={snippets.examples?.[example.demoKey] ?? ""}
                      title={example.title}
                    >
                      <ExampleDemo demoKey={example.demoKey} />
                    </ComponentPreview>
                  ) : (
                    <CodeBlock code={snippets.examples?.[example.title] ?? ""} />
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section id="api-reference" className="mt-10 scroll-mt-24">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">API Reference</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Props are additive to the underlying Base UI or native element.
          </p>
          <div className="mt-4">
            <PropTable props={meta.props} />
          </div>
        </section>

        <nav className="mt-12 grid gap-3 border-t border-border/60 pt-6 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/docs/components/${previous.slug}`}
              className="group flex flex-col gap-1 rounded-card bg-surface/50 p-4 transition-colors hover:bg-surface"
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Previous
              </span>
              <span className="text-sm font-medium text-foreground">← {previous.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/docs/components/${next.slug}`}
              className="group flex flex-col gap-1 rounded-card bg-surface/50 p-4 text-right transition-colors hover:bg-surface"
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Next
              </span>
              <span className="text-sm font-medium text-foreground">{next.title} →</span>
            </Link>
          ) : null}
        </nav>
      </article>

      <TableOfContents items={toc} />
    </div>
  );
}
