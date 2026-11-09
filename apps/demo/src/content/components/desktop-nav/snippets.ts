import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import * as React from "react";
import { Card, DesktopNav } from "@nphuonha/ui-kit";
import {
  ClockCounterClockwiseIcon,
  PaletteIcon,
  SquaresFourIcon,
  StackIcon,
} from "@phosphor-icons/react";

const items = [
  { value: "overview", label: "Overview" },
  { value: "components", label: "Components", badge: 24 },
  { value: "themes", label: "Themes" },
  { value: "changelog", label: "Changelog", badge: "New" },
];

const content = {
  overview: {
    title: "Overview",
    body: "A horizontal pill nav that keeps a desktop header compact and scannable.",
    icon: StackIcon,
  },
  components: {
    title: "Components",
    body: "Jump between sections without losing the shared active state.",
    icon: SquaresFourIcon,
  },
  themes: {
    title: "Themes",
    body: "Every active item inherits the semantic tokens and current accent.",
    icon: PaletteIcon,
  },
  changelog: {
    title: "Changelog",
    body: "Badges make new sections visible without adding visual noise.",
    icon: ClockCounterClockwiseIcon,
  },
} as const;

export function Example() {
  const [active, setActive] = React.useState("overview");
  const current = content[active as keyof typeof content];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5">
      <div className="flex justify-center">
        <DesktopNav
          items={items}
          value={active}
          onValueChange={setActive}
          aria-label="Demo desktop navigation"
        />
      </div>

      <Card className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Desktop header
            </p>
            <h3 className="mt-1 text-lg font-semibold tracking-[-0.03em]">
              {current.title}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              {current.body}
            </p>
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-control bg-primary-soft text-primary-soft-foreground">
            <current.icon size={19} />
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            ["24", "Components"],
            ["3", "Themes"],
            ["100%", "Tokens"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-control bg-surface p-3">
              <div className="text-sm font-semibold">{value}</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {label}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}`,
  "usage": `<DesktopNav
  items={items}
  value={active}
  onValueChange={setActive}
/>`
};
