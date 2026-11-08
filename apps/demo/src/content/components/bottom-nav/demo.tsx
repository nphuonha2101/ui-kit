"use client";

import * as React from "react";
import {
  BookmarkSimpleIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { BottomNav, type BottomNavItem } from "@nphuonha/ui-kit";

function HouseActiveIcon(props: { size?: number; className?: string }) {
  return <HouseIcon {...props} weight="fill" />;
}

const items: BottomNavItem[] = [
  { value: "home", label: "Home", icon: HouseIcon, activeIcon: HouseActiveIcon },
  { value: "search", label: "Search", icon: MagnifyingGlassIcon, badge: 2 },
  { value: "saved", label: "Saved", icon: BookmarkSimpleIcon },
  { value: "profile", label: "Profile", icon: UserIcon },
];

const content = {
  home: {
    title: "Home",
    body: "A calm place for the things that matter today.",
    icon: HouseIcon,
  },
  search: {
    title: "Search",
    body: "Find components, screens and settings in one place.",
    icon: MagnifyingGlassIcon,
  },
  saved: {
    title: "Saved",
    body: "Everything you bookmarked, one tap away.",
    icon: BookmarkSimpleIcon,
  },
  profile: {
    title: "Profile",
    body: "Your workspace, preferences and account.",
    icon: UserIcon,
  },
} as const;

function BottomNavDemo() {
  const [active, setActive] = React.useState("home");
  const current = content[active as keyof typeof content];

  return (
    <div className="mx-auto w-full max-w-[340px]">
      <div className="rounded-[36px] bg-surface p-2.5 shadow-[var(--shadow-soft)]">
        <div className="surface-curved relative flex h-[360px] flex-col overflow-hidden rounded-[28px] bg-background p-4 pb-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Preview
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-[-0.03em]">
                {current.title}
              </h3>
            </div>
            <span className="flex size-9 items-center justify-center rounded-control bg-primary-soft text-primary-soft-foreground">
              <current.icon size={17} />
            </span>
          </div>

          <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
            <p className="text-sm leading-6 text-muted-foreground">{current.body}</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 rounded-control bg-card p-3 shadow-[var(--shadow-soft)]">
                <span className="size-8 shrink-0 rounded-[10px] bg-primary-soft" />
                <div className="min-w-0 flex-1">
                  <div className="h-2 w-2/3 rounded-pill bg-surface" />
                  <div className="mt-2 h-2 w-1/2 rounded-pill bg-surface/70" />
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-control bg-card p-3 shadow-[var(--shadow-soft)]">
                <span className="size-8 shrink-0 rounded-[10px] bg-surface" />
                <div className="min-w-0 flex-1">
                  <div className="h-2 w-1/2 rounded-pill bg-surface" />
                  <div className="mt-2 h-2 w-2/3 rounded-pill bg-surface/70" />
                </div>
              </div>
            </div>
          </div>

          <BottomNav
            className="mt-4"
            items={items}
            value={active}
            onValueChange={setActive}
            aria-label="Demo bottom navigation"
          />
        </div>
      </div>
    </div>
  );
}

export const demo = BottomNavDemo;
export const examples = {};
