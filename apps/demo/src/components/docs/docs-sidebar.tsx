"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListIcon } from "@phosphor-icons/react";
import { Button, Sheet, cn } from "@nphuonha/ui-kit";
import { componentGroups, getComponent } from "@/content/components";

const gettingStarted = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs/theming", label: "Theming" },
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
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex h-8 items-center rounded-control px-2.5 text-[13px] transition-colors",
        active
          ? "surface-curved-soft bg-surface font-medium text-foreground"
          : "text-muted-foreground hover:bg-surface/60 hover:text-foreground",
      )}
    >
      {label}
    </Link>
  );
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-6">
      <div>
        <p className="mb-2 px-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Getting Started
        </p>
        <div className="flex flex-col gap-0.5">
          {gettingStarted.map((item) => (
            <SidebarLink key={item.href} {...item} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 px-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Components
        </p>
        <div className="flex flex-col gap-4">
          {componentGroups.map((group) => (
            <div key={group.category}>
              <p className="px-2.5 pb-1 text-[11px] font-medium text-muted-foreground/70">
                {group.category}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.components.map((component) => (
                  <SidebarLink
                    key={component.slug}
                    href={`/docs/components/${component.slug}`}
                    label={component.title}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
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
    <aside className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] scrollbar-none overflow-y-auto py-8 pr-4">
        <div className="mb-5 flex items-center gap-2 px-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Documentation
          </span>
        </div>
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
