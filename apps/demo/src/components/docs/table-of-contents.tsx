export interface TocItem {
  href: string;
  label: string;
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          On this page
        </p>
        <nav className="mt-3 flex flex-col gap-1.5 border-l border-border/60 pl-3">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
