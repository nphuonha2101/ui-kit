import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { Badge } from "@nphuonha/ui-kit";
import { PageHeader } from "@/components/page-header";
import { demoMap } from "@/components/demos";
import { componentGroups } from "@/lib/registry";

export const metadata: Metadata = { title: "Components" };

export default function ComponentsPage() {
  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Components"
        description="The MVP set: accessible behavior from Base UI, borderless solid surfaces and a consistent prop-driven API."
      />

      <div className="flex flex-col gap-12">
        {componentGroups.map((group) => (
          <section key={group.category}>
            <div className="mb-4 flex items-center gap-2">
              <h2 className="text-lg font-semibold tracking-[-0.025em]">{group.category}</h2>
              <Badge>{group.components.length}</Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {group.components.map((entry) => {
                const Demo = demoMap[entry.slug];
                return (
                  <Link
                    key={entry.slug}
                    href={`/docs/components/${entry.slug}`}
                    className="surface-curved group relative flex flex-col overflow-hidden rounded-card bg-card shadow-soft transition-transform hover:-translate-y-0.5"
                  >
                    <div
                      className="preview-canvas pointer-events-none flex h-40 items-center justify-center overflow-hidden p-4"
                      aria-hidden
                    >
                      <div className="w-full scale-[0.82]">
                        {Demo ? <Demo /> : null}
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
        ))}
      </div>
    </div>
  );
}
