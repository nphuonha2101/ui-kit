export type MigrationKind = "additive" | "behavior" | "rename" | "remove" | "replace";

export interface ApiMigration {
  id: string;
  kind: MigrationKind;
  surface: string;
  before: string;
  after: string;
  find: string;
  fix: string;
}

export interface ReleaseMigration {
  version: string;
  date: string;
  breaking: boolean;
  summary: string;
  changes: ApiMigration[];
}

/**
 * Release upgrade log. Newest release first; never rewrite shipped entries.
 *
 * Every breaking API change must be recorded here with an old → new snippet,
 * a searchable `find` pattern and a concise fix. Additive changes are listed
 * too, so agents can discover them while upgrading without treating them as
 * required migrations.
 */
export const releases: ReleaseMigration[] = [
  {
    version: "0.7.0",
    date: "2026-11-09",
    breaking: false,
    summary:
      "Additive release: MobileNav, nested DesktopNav submenus, a Sheet header slot and animated nav indicators. Existing APIs and imports keep working.",
    changes: [
      {
        id: "mobile-nav",
        kind: "additive",
        surface: "MobileNav",
        before:
          "Mobile navigation required composing Sheet, a trigger and collapsible groups manually.",
        after:
          'import { MobileNav } from "@nphuonha/ui-kit";\n\n<MobileNav items={items} logo={<BrandMark />} />',
        find: "<Sheet",
        fix: 'Nothing required. Use MobileNav for a logo header, collapsible groups and multi-level mobile navigation. Sheet now also accepts header and aria-label for custom menus.',
      },
      {
        id: "desktop-nav-submenus",
        kind: "additive",
        surface: "DesktopNav",
        before:
          "DesktopNav only accepted a flat item list.",
        after:
          'const items = [{ value: "components", label: "Components", children: [{ value: "buttons", label: "Buttons" }] }];',
        find: "DesktopNavItem",
        fix: "Nothing required. Add children to any item to render a submenu; children can nest recursively.",
      },
      {
        id: "sheet-header-aria-label",
        kind: "additive",
        surface: "Sheet",
        before:
          "Sheet had no logo slot and required a visible title for its accessible name.",
        after:
          '<Sheet header={<BrandMark />} aria-label="Menu">...</Sheet>',
        find: "<Sheet",
        fix: "Nothing required. Use header for logos and aria-label when omitting the visible title.",
      },
      {
        id: "depth-and-shape-tokens",
        kind: "additive",
        surface: "Theme tokens",
        before:
          "Small active indicators used Tailwind's shadow-sm and micro controls used arbitrary radius values.",
        after:
          'className="shadow-control rounded-xs"',
        find: "shadow-sm",
        fix: "Nothing required. shadow-control, rounded-xs and rounded-2xs are available alongside the existing soft/raised/overlay shadows and shape tokens.",
      },
      {
        id: "nav-active-motion",
        kind: "behavior",
        surface: "BottomNav / DesktopNav",
        before:
          "Active items changed state without moving the active indicator.",
        after:
          "<BottomNav items={items} value={active} onValueChange={setActive} />",
        find: "<BottomNav",
        fix: "Nothing required. Active pills now slide between items and honor prefers-reduced-motion automatically.",
      },
    ],
  },
  {
    version: "0.6.0",
    date: "2026-11-09",
    breaking: false,
    summary:
      "Additive release: five new components, ButtonLink for navigation, and a clearer disabled state for buttons. Existing imports and props keep working.",
    changes: [
      {
        id: "new-components-0-6-0",
        kind: "additive",
        surface: "Components",
        before:
          "Accordion, Avatar, Progress, Skeleton and Toggle were not part of the kit.",
        after:
          'import { Accordion, Avatar, Progress, Skeleton, Toggle } from "@nphuonha/ui-kit";',
        find: 'from "@nphuonha/ui-kit"',
        fix: 'Nothing required. Each component also ships a subpath such as "@nphuonha/ui-kit/progress".',
      },
      {
        id: "button-link",
        kind: "additive",
        surface: "ButtonLink",
        before:
          "Navigation links had to reuse buttonVariants manually on an anchor element.",
        after:
          '<ButtonLink href="/docs" variant="secondary">Read the docs</ButtonLink>',
        find: "buttonVariants({",
        fix: "Nothing required. Keep buttonVariants for custom elements or switch to ButtonLink for styled anchors and framework links via render.",
      },
      {
        id: "button-disabled-state",
        kind: "behavior",
        surface: "Button",
        before:
          "Disabled buttons were dimmed but used pointer-events-none, so they showed no disabled cursor and could still match hover styles.",
        after: "<Button disabled>Save</Button>",
        find: "<Button",
        fix: "Nothing required. Disabled buttons now show cursor-not-allowed, flatten their shadow and ignore hover styles.",
      },
    ],
  },
  {
    version: "0.5.0",
    date: "2026-11-08",
    breaking: false,
    summary:
      "ScrollArea scrollbars now auto-hide by default and can be hidden entirely. The new prop is additive; the default visual behavior changes.",
    changes: [
      {
        id: "scroll-area-scrollbar-visibility",
        kind: "behavior",
        surface: "ScrollArea.scrollbar",
        before: "Custom scrollbars stayed visible whenever content overflowed.",
        after: 'scrollbar="auto" | "hidden" (default: "auto")',
        find: "<ScrollArea",
        fix: "Nothing required. auto reveals the bar on hover, focus or scroll; hidden removes the bar while scrolling still works.",
      },
    ],
  },
  {
    version: "0.4.1",
    date: "2026-11-08",
    breaking: false,
    summary:
      "Patch release. Keeps the toast close-button focus ring compact and adds the upgrading guide. No API changes.",
    changes: [],
  },
  {
    version: "0.4.0",
    date: "2026-11-08",
    breaking: false,
    summary:
      "Additive release. Existing imports, props and CSS entry points keep working.",
    changes: [
      {
        id: "select-ref-onblur",
        kind: "additive",
        surface: "Select",
        before: "The trigger did not forward a ref or expose onBlur.",
        after: "<Select ref={ref} onBlur={onBlur} />",
        find: "<Select",
        fix: "Nothing required. Attach ref/onBlur only when needed; both land on the trigger button.",
      },
      {
        id: "toaster-close-icon",
        kind: "behavior",
        surface: "Toaster.icons",
        before: "Passing icons only overrode status icons; close fell back to Sonner.",
        after: "icons={{ close: <XIcon /> }}",
        find: "icons={{",
        fix: "Nothing required. The kit close icon is merged in by default and can be overridden with icons.close.",
      },
      {
        id: "new-component-subpaths",
        kind: "additive",
        surface: "Package exports",
        before: "New components were only available from the root barrel.",
        after: 'import { Table } from "@nphuonha/ui-kit/table";',
        find: 'from "@nphuonha/ui-kit"',
        fix: "Nothing required. Keep root imports or switch to subpaths for smaller client bundles.",
      },
    ],
  },
];

export const latestRelease = releases[0];
