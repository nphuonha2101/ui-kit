"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretDownIcon, ListIcon } from "@phosphor-icons/react";
import { Button, Sheet, cn } from "@nphuonha/ui-kit";
import { componentGroups, getComponent } from "@/content/components";

const gettingStarted = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs/theming", label: "Theming" },
  { href: "/docs/utilities", label: "Utilities" },
  { href: "/docs/forms", label: "Forms" },
  { href: "/docs/upgrading", label: "Upgrading" },
  { href: "/docs/agents", label: "For agents" },
];

function SidebarLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const current = pathname.replace(/\/+$/, "") || "/";
  const active = current === href;
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex h-8 items-center rounded-control px-2.5 text-sm transition-colors",
        active
          ? "surface-curved-soft bg-surface font-medium text-foreground"
          : "text-muted-foreground hover:bg-surface/60 hover:text-foreground",
      )}
    >
      <span className="truncate">{label}</span>
    </Link>
  );
}

function SidebarGroup({
  category,
  components,
  onNavigate,
}: {
  category: string;
  components: { slug: string; title: string }[];
  onNavigate?: () => void;
}) {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex h-9 items-center justify-between gap-2 rounded-control px-2.5 text-[13px] font-semibold text-foreground transition-colors hover:bg-surface/60"
      >
        <span className="truncate">{category}</span>
        <CaretDownIcon
          size={12}
          className={cn(
            "shrink-0 transition-transform duration-[var(--duration-ui)] ease-[var(--ease-out-ui)]",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-[var(--duration-ui)] ease-[var(--ease-out-ui)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="ml-2.5 flex flex-col gap-0.5 border-l border-border/70 pl-3 pt-0.5">
            {components.map((component) => (
              <SidebarLink
                key={component.slug}
                href={`/docs/components/${component.slug}`}
                label={component.title}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-6">
      <div>
        <p className="mb-2 px-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Getting Started
        </p>
        <div className="flex flex-col gap-0.5">
          {gettingStarted.map((item) => (
            <SidebarLink key={item.href} {...item} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 px-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Components
        </p>
        <div className="flex flex-col gap-2">
          {componentGroups.map((group) => (
            <SidebarGroup
              key={group.category}
              category={group.category}
              components={group.components}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();
  const slug = pathname.startsWith("/docs/components/")
    ? pathname.split("/").pop()
    : undefined;
  const current = slug ? getComponent(slug) : undefined;

  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div className="sticky top-20 -ml-1 max-h-[calc(100vh-5rem)] scrollbar-none overflow-y-auto py-8 pl-1 pr-4">
        <SidebarNav />
        {current ? (
          <div className="mt-6 flex items-center gap-2 px-2.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            {current.title}
          </div>
        ) : null}
      </div>
    </aside>
  );
}

export function MobileDocsNav() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="mb-6 lg:hidden">
      <Sheet
        open={open}
        onOpenChange={setOpen}
        side="left"
        title="Documentation"
        description="Browse the kit."
        trigger={
          <Button variant="outline" size="sm" startIcon={ListIcon}>
            Browse docs
          </Button>
        }
      >
        <SidebarNav onNavigate={() => setOpen(false)} />
      </Sheet>
    </div>
  );
}
