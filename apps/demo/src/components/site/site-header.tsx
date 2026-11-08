"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GithubLogoIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  PaletteIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { IconButton, Popover, cn } from "@nphuonha/ui-kit";
import { AccentPicker } from "./accent-picker";
import { useThemeSettings } from "./providers";
import { SearchDialog } from "./search-dialog";

const nav = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "/docs/theming", label: "Theming" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { dark, setDark } = useThemeSettings();
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href: string) => {
    if (href === "/docs") {
      return pathname === "/docs" || pathname.startsWith("/docs/installation");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex min-w-0 items-center gap-5">
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-[10px] bg-primary text-xs font-bold tracking-tight text-primary-foreground shadow-[var(--shadow-raised)]">
                ui
              </span>
              <span className="text-sm font-semibold tracking-[-0.02em]">UI Kit</span>
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex h-8 items-center rounded-control px-2.5 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-surface text-foreground"
                      : "text-muted-foreground hover:bg-surface/60 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden h-9 w-56 items-center gap-2 rounded-control bg-field px-3 text-xs text-muted-foreground transition-colors hover:bg-field-hover md:flex"
            >
              <MagnifyingGlassIcon size={15} />
              <span className="flex-1 text-left">Search documentation...</span>
              <kbd className="rounded-[5px] bg-background/70 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)]">
                ⌘K
              </kbd>
            </button>
            <IconButton
              aria-label="Search documentation"
              variant="ghost"
              size="icon-sm"
              className="md:hidden"
              onClick={() => setSearchOpen(true)}
            >
              <MagnifyingGlassIcon size={18} />
            </IconButton>

            <Popover
              trigger={
                <IconButton aria-label="Choose accent color" variant="ghost" size="icon-sm">
                  <PaletteIcon size={18} />
                </IconButton>
              }
              title="Accent"
              description="Recolor the system at runtime."
              align="end"
            >
              <AccentPicker compact />
            </Popover>

            <IconButton
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              variant="ghost"
              size="icon-sm"
              onClick={() => setDark(!dark)}
            >
              {dark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </IconButton>

            <Link
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hidden size-9 items-center justify-center rounded-control text-foreground transition-colors hover:bg-surface active:bg-surface-hover sm:inline-flex"
            >
              <GithubLogoIcon size={18} />
            </Link>
          </div>
        </div>
      </header>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
