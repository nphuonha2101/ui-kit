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
import { IconButton, Kbd, MobileNav, Popover, buttonVariants, cn } from "@nphuonha/ui-kit";
import { AccentPicker } from "./accent-picker";
import { BrandLogo } from "./brand-logo";
import { useThemeSettings } from "./providers";
import { SearchDialog } from "./search-dialog";

const nav = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "/docs/theming", label: "Theming" },
  { href: "/docs/utilities", label: "Utilities" },
];

const GITHUB_URL = "https://github.com/nphuonha2101/ui-kit";

function navLinkClass(active: boolean) {
  return cn(
    "relative z-10 inline-flex h-10 items-center justify-center rounded-pill px-4 text-[13px] font-semibold tracking-[-0.01em] transition-colors duration-[var(--duration-ui)] ease-[var(--ease-out-ui)]",
    active
      ? "text-primary-soft-foreground"
      : "text-muted-foreground hover:bg-surface hover:text-foreground",
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { setDark, accent } = useThemeSettings();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navRef = React.useRef<HTMLElement>(null);
  const [indicator, setIndicator] = React.useState({
    left: 0,
    width: 0,
    visible: false,
  });

  React.useEffect(() => {
    const container = navRef.current;
    if (!container) return;

    const update = () => {
      const active = container.querySelector<HTMLElement>('[aria-current="page"]');
      if (!active) {
        setIndicator((current) => ({ ...current, visible: false }));
        return;
      }
      setIndicator({
        left: active.offsetLeft,
        width: active.offsetWidth,
        visible: true,
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

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
      if (current === "/docs") return true;
      return (
        current.startsWith("/docs/") &&
        !current.startsWith("/docs/components") &&
        !current.startsWith("/docs/theming") &&
        !current.startsWith("/docs/utilities")
      );
    }
    return current === href || current.startsWith(`${href}/`);
  };

  const mobileItems = nav.map((item) => ({
    value: item.href,
    label: item.label,
    href: item.href,
  }));
  const activeMobileHref = nav.find((item) => isActive(item.href))?.href;

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

          <nav
            ref={navRef}
            className="surface-curved pointer-events-auto relative hidden items-center gap-0.5 rounded-pill bg-card p-1 shadow-[var(--shadow-soft)] md:flex"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute top-1 h-10 rounded-pill bg-primary-soft transition-[left,width,opacity] duration-[var(--duration-ui-slow)] ease-[var(--ease-out-ui)]"
              style={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.visible ? 1 : 0,
              }}
            />
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
              <Kbd size="sm" className="hidden xl:inline-flex">
                ⌘ K
              </Kbd>
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
              aria-label="Toggle color theme"
              variant="ghost"
              size="icon"
              shape="pill"
              onClick={() => setDark((current) => !current)}
            >
              <MoonIcon size={18} className="dark:hidden" />
              <SunIcon size={18} className="hidden dark:block" />
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

            <MobileNav
              open={menuOpen}
              onOpenChange={setMenuOpen}
              items={mobileItems}
              value={activeMobileHref}
              size="lg"
              itemsAlign="center"
              logo={<BrandLogo logoClassName="h-6" />}
              trigger={
                <IconButton
                  aria-label="Open menu"
                  variant="ghost"
                  size="icon"
                  shape="pill"
                  className="md:hidden"
                >
                  <ListIcon size={18} />
                </IconButton>
              }
              footer={
                <div className="flex w-full flex-col gap-4">
                  <Link
                    href="/docs/installation"
                    onClick={closeMenu}
                    className={cn(buttonVariants({ shape: "pill" }), "w-full")}
                  >
                    Get started
                    <ArrowRightIcon size={14} />
                  </Link>
                  <div className="flex items-center justify-center gap-2 pb-1">
                    <Popover
                      trigger={
                        <IconButton
                          aria-label="Choose accent color"
                          variant="ghost"
                          size="icon"
                          shape="pill"
                          className="relative"
                        >
                          <PaletteIcon size={18} />
                          <span
                            aria-hidden
                            className="absolute right-2 top-2 size-1.5 rounded-full ring-1 ring-card"
                            style={{ background: accent ?? "#4f46e5" }}
                          />
                        </IconButton>
                      }
                      title="Accent"
                      description="Recolor the system at runtime."
                      align="center"
                      side="top"
                    >
                      <AccentPicker compact />
                    </Popover>

                    <IconButton
                      aria-label="Toggle color theme"
                      variant="ghost"
                      size="icon"
                      shape="pill"
                      onClick={() => setDark((current) => !current)}
                    >
                      <MoonIcon size={18} className="dark:hidden" />
                      <SunIcon size={18} className="hidden dark:block" />
                    </IconButton>

                    <Link
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub repository"
                      onClick={closeMenu}
                      className="inline-flex size-10 items-center justify-center rounded-pill text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                    >
                      <GithubLogoIcon size={18} />
                    </Link>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

    </>
  );
}
