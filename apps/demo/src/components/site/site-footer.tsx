import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center md:px-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-[8px] bg-primary text-[10px] font-bold text-primary-foreground">
              ui
            </span>
            <span className="text-sm font-semibold text-foreground">UI Kit</span>
          </div>
          <p>Solid, borderless, expressive. Built with React, Next.js, Tailwind CSS and Base UI.</p>
        </div>
        <nav className="flex flex-wrap items-center gap-4">
          <Link href="/docs" className="transition-colors hover:text-foreground">Docs</Link>
          <Link href="/docs/components" className="transition-colors hover:text-foreground">Components</Link>
          <Link href="/docs/theming" className="transition-colors hover:text-foreground">Theming</Link>
          <Link href="https://github.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">GitHub</Link>
        </nav>
      </div>
    </footer>
  );
}
