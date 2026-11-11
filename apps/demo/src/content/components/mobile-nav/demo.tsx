"use client";

import * as React from "react";
import { MobileNav, type MobileNavItem } from "@nphuonha/ui-kit";

const items: MobileNavItem[] = [
  { value: "home", label: "Home" },
  {
    value: "components",
    label: "Components",
    children: [
      { value: "buttons", label: "Buttons" },
      {
        value: "forms",
        label: "Forms",
        children: [
          { value: "input", label: "Input" },
          { value: "select", label: "Select" },
        ],
      },
    ],
  },
  {
    value: "resources",
    label: "Resources",
    badge: "New",
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
  { value: "pricing", label: "Pricing" },
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

function MobileNavDemo() {
  const [active, setActive] = React.useState("home");

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <div className="surface-curved relative flex items-center justify-between rounded-card bg-card p-3 shadow-soft">
        <BrandMark />
        <MobileNav
          items={items}
          value={active}
          onValueChange={setActive}
          logo={<BrandMark />}
        />
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Selected: <span className="font-medium text-foreground">{active}</span>
      </p>
    </div>
  );
}

function MobileNavLargeDemo() {
  const [active, setActive] = React.useState("home");

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <div className="surface-curved relative flex items-center justify-between rounded-card bg-card p-3 shadow-soft">
        <BrandMark />
        <MobileNav
          items={items}
          value={active}
          onValueChange={setActive}
          size="lg"
          itemsAlign="center"
          logo={<BrandMark />}
        />
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Selected: <span className="font-medium text-foreground">{active}</span>
      </p>
    </div>
  );
}

export const demo = MobileNavDemo;
export const examples = {
  "mobile-nav-large": MobileNavLargeDemo,
};
