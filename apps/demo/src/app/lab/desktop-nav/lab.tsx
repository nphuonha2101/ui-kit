"use client";

import * as React from "react";
import { ListIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import {
  Button,
  DesktopNav,
  IconButton,
  MobileNav,
  type DesktopNavItem,
} from "@nphuonha/ui-kit";

const items: DesktopNavItem[] = [
  {
    value: "product",
    label: "Product",
    children: [
      { value: "overview", label: "Overview" },
      { value: "features", label: "Features" },
      { value: "pricing", label: "Pricing" },
    ],
  },
  {
    value: "resources",
    label: "Resources",
    children: [
      { value: "docs", label: "Documentation" },
      {
        value: "guides",
        label: "Guides",
        children: [
          { value: "getting-started", label: "Getting started" },
          { value: "tokens", label: "Design tokens" },
        ],
      },
    ],
  },
  { value: "customers", label: "Customers" },
];

function BrandMark() {
  return (
    <span className="flex items-center gap-2">
      <span className="flex size-8 items-center justify-center rounded-control bg-primary text-sm font-semibold text-primary-foreground">
        A
      </span>
      <span className="text-sm font-semibold tracking-[-0.02em]">Acme</span>
    </span>
  );
}

export function DesktopNavLab() {
  const [active, setActive] = React.useState("overview");

  React.useEffect(() => {
    document.body.classList.add("lab-blank");
    return () => document.body.classList.remove("lab-blank");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-background">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 md:px-6">
          <div className="shrink-0">
            <BrandMark />
          </div>

          <div className="hidden min-w-0 flex-1 justify-center md:flex">
            <DesktopNav
              items={items}
              value={active}
              onValueChange={setActive}
              aria-label="Primary navigation"
            />
          </div>

          <div className="ml-auto flex items-center gap-1">
            <IconButton
              aria-label="Search"
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
            >
              <MagnifyingGlassIcon size={18} />
            </IconButton>
            <Button size="sm" shape="pill" className="hidden md:inline-flex">
              Get started
            </Button>

            <MobileNav
              items={items}
              value={active}
              onValueChange={setActive}
              logo={<BrandMark />}
              trigger={
                <IconButton
                  aria-label="Open menu"
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                >
                  <ListIcon size={18} />
                </IconButton>
              }
            />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-12 md:px-6">
        <section className="flex flex-1 flex-col items-center justify-center gap-2 py-24 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Empty page
          </p>
          <p className="text-sm text-muted-foreground">
            Active value:{" "}
            <span className="font-medium text-foreground">{active}</span>
          </p>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            Trang rỗng để test header 3 segment, submenu nhiều cấp và menu
            mobile. Resize cửa sổ để xem breakpoint.
          </p>
        </section>
      </main>
    </div>
  );
}
