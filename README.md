# nphuonha UI

**Solid, borderless React UI kit** built on **Base UI** and **Tailwind CSS v4**. Tonal surfaces, top-lit curves, accessible primitives and an accent you can change at runtime.

[![npm version](https://img.shields.io/npm/v/%40nphuonha%2Fui-kit?style=flat-square)](https://www.npmjs.com/package/@nphuonha/ui-kit)
[![CI/CD](https://github.com/nphuonha2101/ui-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/nphuonha2101/ui-kit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-4f46e5?style=flat-square)](./LICENSE)
[![Docs](https://img.shields.io/badge/docs-ui.nphuonha.id.vn-4f46e5?style=flat-square)](https://ui.nphuonha.id.vn)

[Docs](https://ui.nphuonha.id.vn) · [Components](https://ui.nphuonha.id.vn/docs/components) · [Theming](https://ui.nphuonha.id.vn/docs/theming) · [Utilities](https://ui.nphuonha.id.vn/docs/utilities) · [Upgrading](https://ui.nphuonha.id.vn/docs/upgrading) · [For agents](https://ui.nphuonha.id.vn/docs/agents) · [llms.txt](https://ui.nphuonha.id.vn/llms.txt) · [Releases](https://github.com/nphuonha2101/ui-kit/releases)

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

- **Surfaces:** `--background`, `--card`, `--surface`, `--field`, `--popover`, `--muted`, `--switch-thumb`
- **Actions:** `--primary`, `--primary-foreground`, `--primary-hover`, `--primary-soft`, `--ring`
- **Status:** `--destructive`, `--success`, `--warning`, `--info`
- **Shape:** `--radius-2xs`, `--radius-xs`, `--radius-control`, `--radius-field`, `--radius-card`, `--radius-overlay`
- **Depth:** `--shadow-control`, `--shadow-soft`, `--shadow-raised`, `--shadow-overlay`
- **Lighting:** `--light-top`, `--light-sheen`, `--light-bottom`, `--light-rim`

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

## Utilities

Surface treatments, shadow levels, radii and semantic fills are documented with live examples: https://ui.nphuonha.id.vn/docs/utilities

## Components

`Accordion`, `Alert`, `AlertDialog`, `Avatar`, `Badge`, `BottomNav`, `Breadcrumb`, `Button`, `ButtonLink`, `Calendar`, `Card`, `Checkbox`, `CheckboxGroup`, `Collapsible`, `Combobox`, `DatePicker`, `DesktopNav`, `Dialog`, `EmptyState`, `Field`, `Fieldset`, `FileUpload`, `IconButton`, `Input`, `Kbd`, `Label`, `Menu`, `Meter`, `MobileNav`, `NumberField`, `OTPField`, `Pagination`, `Popover`, `PreviewCard`, `Progress`, `RadioGroup`, `ScrollArea`, `Select`, `Separator`, `Sheet`, `Skeleton`, `Slider`, `Spinner`, `Switch`, `Table`, `Tabs`, `Textarea`, `Toaster`, `Toggle`, `ToggleGroup`, `Toolbar`, `Tooltip`.

Each component page includes a live preview, copyable code, props and examples:

**[Browse the component docs →](https://ui.nphuonha.id.vn/docs/components)**

## Forms

`Input` and `Textarea` forward refs to the native elements, so react-hook-form's `register()` works directly. Custom controls (`Calendar`, `Checkbox`, `CheckboxGroup`, `Combobox`, `DatePicker`, `FileUpload`, `NumberField`, `OTPField`, `RadioGroup`, `Select`, `Slider`, `Switch`) expose controlled value APIs — use `Controller` or the optional `FormField` wrapper. `Calendar`/`DatePicker` use `value`/`onValueChange` (DatePicker range mode uses `{ from, to }`), `FileUpload` uses `files`/`onFilesChange`, and all accept `onBlur`/`aria-invalid` for form state:

```tsx
import { Input } from "@nphuonha/ui-kit";
import { Form, FormField } from "@nphuonha/ui-kit/form";

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      label="Email"
      required
      rules={{ required: "Email is required" }}
      render={({ field }) => <Input type="email" {...field} />}
    />
  </form>
</Form>
```

For required fields, set `required` on controls that own their label (`Checkbox`, `CheckboxGroup`, `Switch`, `RadioGroup`, `NumberField`, `OTPField`, `Calendar`, `DatePicker`, `FileUpload`) and on `Field`/`FormField` for `Input`, `Textarea`, `Select` and `Combobox`. With `FormField`, `required` controls the red mark and `rules` controls validation.

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

`DesktopNav` items can include `children` for submenus, including multiple levels:

```tsx
const items: DesktopNavItem[] = [
  { value: "overview", label: "Overview" },
  {
    value: "components",
    label: "Components",
    children: [
      { value: "buttons", label: "Buttons" },
      {
        value: "forms",
        label: "Forms",
        children: [{ value: "input", label: "Input" }],
      },
    ],
  },
];
```

The component docs include a three-segment header with logo/actions, a plain logo nav and a responsive `Sheet` menu for mobile.

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
