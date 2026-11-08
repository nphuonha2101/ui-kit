import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentDemo } from "@/content/components/demo-map";
import { componentGroups } from "@/content/components";
import { Badge } from "@nphuonha/ui-kit";

export function ComponentIndex() {
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
              {group.components.map((entry) => (
                <div
                  key={entry.slug}
                  className="surface-curved group relative flex flex-col overflow-hidden rounded-card bg-card shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  <Link
                    href={`/docs/components/${entry.slug}`}
                    aria-label={`Open ${entry.title}`}
                    className="absolute inset-0 z-10 rounded-card outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                  />
                  <div
                    className="preview-canvas pointer-events-none flex h-44 items-center justify-center overflow-hidden p-4"
                    aria-hidden
                  >
                    <div className="w-full scale-[0.72]">
                      <ComponentDemo slug={entry.slug} />
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
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
