# nphuonha UI

**Solid, borderless React UI kit** built on **Base UI** and **Tailwind CSS v4**. Tonal surfaces, top-lit curves, accessible primitives and an accent you can change at runtime.

[![npm version](https://img.shields.io/npm/v/%40nphuonha%2Fui-kit?style=flat-square)](https://www.npmjs.com/package/@nphuonha/ui-kit)
[![CI](https://github.com/nphuonha2101/ui-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/nphuonha2101/ui-kit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-4f46e5?style=flat-square)](./LICENSE)
[![Docs](https://img.shields.io/badge/docs-ui.nphuonha.id.vn-4f46e5?style=flat-square)](https://ui.nphuonha.id.vn)

[Docs](https://ui.nphuonha.id.vn) · [Components](https://ui.nphuonha.id.vn/docs/components) · [Theming](https://ui.nphuonha.id.vn/docs/theming) · [Upgrading](https://ui.nphuonha.id.vn/docs/upgrading) · [For agents](https://ui.nphuonha.id.vn/docs/agents) · [llms.txt](https://ui.nphuonha.id.vn/llms.txt) · [Releases](https://github.com/nphuonha2101/ui-kit/releases)

## Why this kit

- **Behavior from Base UI** — focus management, overlays and form semantics are accessible by default.
- **Owned visual language** — semantic tokens, solid filled surfaces and a top-lit curved edge; no gray outlined boxes.
- **Runtime accent** — generate the full primary palette from one color and re-tone the whole app.
- **Prop-driven API** — consistent variants, sizes, icons and loading semantics across components.

## Install

```bash
npm install @nphuonha/ui-kit
```

Peer dependencies: **React 19**, **React DOM 19**, **Tailwind CSS 4**.

The package ships compiled ESM + TypeScript declarations. No `transpilePackages` step is required.

## Quick start

```tsx
import "@nphuonha/ui-kit/styles.css";
import { Button, Card, CardContent, Input, Toaster } from "@nphuonha/ui-kit";

export function App() {
  return (
    <div data-ui="kit">
      <Toaster />
      <Card>
        <CardContent className="flex gap-2 pt-5">
          <Input placeholder="Email" />
          <Button>Continue</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

- Put `data-ui="kit"` on `<html>` when using portalled overlays (dialog, sheet, popover, select).
- Add the `dark` class to the same element for dark mode.
- If your Tailwind setup ignores `@source` from dependencies, add:

```css
@source "../node_modules/@nphuonha/ui-kit/dist/components";
```

## Theming

Semantic CSS variables drive the whole system:

- **Surfaces:** `--background`, `--card`, `--surface`, `--field`, `--popover`, `--muted`
- **Actions:** `--primary`, `--primary-foreground`, `--primary-hover`, `--primary-soft`, `--ring`
- **Status:** `--destructive`, `--success`, `--warning`, `--info`
- **Shape:** `--radius-control`, `--radius-field`, `--radius-card`, `--radius-overlay`

Change the accent from one color:

```tsx
import { accentStyle } from "@nphuonha/ui-kit";

<div data-ui="kit" style={accentStyle("#0d9488", "light")}>
  <App />
</div>
```

Or generate the variables directly:

```ts
import { generateAccentVars } from "@nphuonha/ui-kit";

const vars = generateAccentVars("#0d9488", "dark");
```

## Components

`Alert`, `AlertDialog`, `Badge`, `BottomNav`, `Breadcrumb`, `Button`, `Card`, `Checkbox`, `DesktopNav`, `Dialog`, `EmptyState`, `Field`, `IconButton`, `Input`, `Kbd`, `Label`, `NumberField`, `Pagination`, `Popover`, `RadioGroup`, `ScrollArea`, `Select`, `Separator`, `Sheet`, `Slider`, `Spinner`, `Switch`, `Table`, `Tabs`, `Textarea`, `Toaster`, `ToggleGroup`, `Tooltip`.

Each component page includes a live preview, copyable code, props and examples:

**[Browse the component docs →](https://ui.nphuonha.id.vn/docs/components)**

## Forms

`Input` and `Textarea` forward refs to the native elements, so react-hook-form's `register()` works directly. Custom Base UI controls (`Select`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `NumberField`) expose `value`/`onValueChange` APIs — use `Controller` or the optional `FormField` wrapper:

```tsx
import { Input } from "@nphuonha/ui-kit";
import { Form, FormField } from "@nphuonha/ui-kit/form";

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      label="Email"
      rules={{ required: "Email is required" }}
      render={({ field }) => <Input type="email" {...field} />}
    />
  </form>
</Form>
```

`react-hook-form` is an optional peer dependency: `npm install react-hook-form`. Full guide: https://ui.nphuonha.id.vn/docs/forms

## Navigation

`BottomNav` and `DesktopNav` share the same item model. Items can include links, badges and an alternate icon for the active state:

```tsx
import { BottomNav, type BottomNavItem } from "@nphuonha/ui-kit";
import { HouseIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";

const HouseActive = (props: { size?: number; className?: string }) => (
  <HouseIcon {...props} weight="fill" />
);

const items: BottomNavItem[] = [
  { value: "home", label: "Home", icon: HouseIcon, activeIcon: HouseActive },
  { value: "search", label: "Search", icon: MagnifyingGlassIcon, badge: 2 },
];

<BottomNav items={items} defaultValue="home" fixed />;
```

## AI agents

Point coding agents at the machine-readable guide:

- **Agent guide:** https://ui.nphuonha.id.vn/docs/agents
- **llms.txt:** https://ui.nphuonha.id.vn/llms.txt

The file includes setup rules, token conventions, icon patterns and the full component map.

## Upgrading

Breaking API changes are published with a migration row: old code, new code, a search pattern and a fix. Read the upgrade guide before bumping a major version:

- **Guide:** https://ui.nphuonha.id.vn/docs/upgrading
- **Agent context:** https://ui.nphuonha.id.vn/docs/upgrading/llms.txt

## Development

```bash
npm install
npm run dev        # docs site at http://localhost:3100
npm run typecheck
npm test -w @nphuonha/ui-kit
npm run build
```

Monorepo layout:

```text
packages/ui-kit/   @nphuonha/ui-kit
apps/demo/         Next.js docs site
```

## License

MIT
