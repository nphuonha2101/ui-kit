"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRightIcon,
  GithubLogoIcon,
  ListIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  PaletteIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { IconButton, Popover, Sheet, buttonVariants, cn } from "@nphuonha/ui-kit";
import { AccentPicker } from "./accent-picker";
import { BrandLogo } from "./brand-logo";
import { useThemeSettings } from "./providers";
import { SearchDialog } from "./search-dialog";

const nav = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "/docs/theming", label: "Theming" },
];

const GITHUB_URL = "https://github.com/nphuonha2101/ui-kit";

function navLinkClass(active: boolean) {
  return cn(
    "inline-flex h-10 items-center justify-center rounded-pill px-4 text-[13px] font-semibold tracking-[-0.01em] transition-colors",
    active
      ? "bg-primary-soft text-primary-soft-foreground"
      : "text-muted-foreground hover:bg-surface hover:text-foreground",
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { dark, setDark } = useThemeSettings();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

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
    const current = pathname.replace(/\/+$/, "") || "/";
    if (href === "/docs") {
      return current === "/docs" || current.startsWith("/docs/installation");
    }
    return current === href || current.startsWith(`${href}/`);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 pt-3 sm:pt-4">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 md:px-6">
          <Link
            href="/"
            aria-label="nphuonha UI home"
            className="surface-curved pointer-events-auto relative flex h-12 shrink-0 items-center rounded-pill bg-card p-1 pr-2.5 shadow-[var(--shadow-soft)]"
          >
            <BrandLogo className="px-1.5" />
          </Link>

          <nav className="surface-curved pointer-events-auto relative hidden items-center gap-0.5 rounded-pill bg-card p-1 shadow-[var(--shadow-soft)] md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={navLinkClass(isActive(item.href))}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="surface-curved pointer-events-auto relative flex items-center gap-0.5 rounded-pill bg-card p-1 shadow-[var(--shadow-soft)]">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search documentation"
              className="inline-flex h-10 items-center gap-2 rounded-pill px-3 text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              <MagnifyingGlassIcon size={16} />
              <span className="hidden text-xs font-medium xl:inline">Search</span>
              <kbd className="hidden rounded-[5px] bg-surface px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground xl:inline-flex">
                ⌘ K
              </kbd>
            </button>

            <span aria-hidden className="mx-0.5 h-4 w-px shrink-0 bg-border" />

            <Popover
              trigger={
                <IconButton
                  aria-label="Choose accent color"
                  variant="ghost"
                  size="icon"
                  shape="pill"
                  className="hidden sm:inline-flex"
                >
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
              size="icon"
              shape="pill"
              onClick={() => setDark(!dark)}
            >
              {dark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </IconButton>

            <span
              aria-hidden
              className="mx-0.5 hidden h-4 w-px shrink-0 bg-border sm:block"
            />

            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
              className="hidden size-10 items-center justify-center rounded-pill text-muted-foreground transition-colors hover:bg-surface hover:text-foreground sm:inline-flex"
            >
              <GithubLogoIcon size={18} />
            </Link>

            <Link
              href="/docs/installation"
              className={cn(
                buttonVariants({ shape: "pill", size: "sm" }),
                "ml-0.5 hidden h-10 px-4 lg:inline-flex",
              )}
            >
              Get started
              <ArrowRightIcon size={14} />
            </Link>

            <IconButton
              aria-label="Open menu"
              variant="ghost"
              size="icon"
              shape="pill"
              className="md:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <ListIcon size={18} />
            </IconButton>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      <Sheet
        open={menuOpen}
        onOpenChange={setMenuOpen}
        side="right"
        title="Menu"
        description="Documentation, components and theming."
        footer={
          <Link
            href="/docs/installation"
            onClick={closeMenu}
            className={cn(buttonVariants({ shape: "pill" }), "w-full")}
          >
            Get started
            <ArrowRightIcon size={14} />
          </Link>
        }
      >
        <nav className="flex flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "flex h-11 items-center rounded-control px-3 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-primary-soft text-primary-soft-foreground"
                  : "text-muted-foreground hover:bg-surface hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 border-t border-border/60 pt-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Accent
          </p>
          <AccentPicker />
        </div>

        <div className="mt-6 border-t border-border/60 pt-5">
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
            className="flex h-11 items-center gap-2.5 rounded-control px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
          >
            <GithubLogoIcon size={18} />
            GitHub repository
          </Link>
        </div>
      </Sheet>
    </>
  );
}
