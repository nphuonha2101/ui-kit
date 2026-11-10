# @nphuonha/ui-kit

![nphuonha UI — solid, borderless React UI kit](https://ui.nphuonha.id.vn/og.png)

**Solid, borderless React UI kit** built on **Base UI** and **Tailwind CSS v4**. Tonal surfaces, top-lit curves, accessible primitives and an accent you can change at runtime.

[![npm version](https://img.shields.io/npm/v/%40nphuonha%2Fui-kit?style=flat-square)](https://www.npmjs.com/package/@nphuonha/ui-kit)
[![npm downloads](https://img.shields.io/npm/dm/%40nphuonha%2Fui-kit?style=flat-square)](https://www.npmjs.com/package/@nphuonha/ui-kit)
[![CI](https://github.com/nphuonha2101/ui-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/nphuonha2101/ui-kit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-4f46e5?style=flat-square)](./LICENSE)
[![Docs](https://img.shields.io/badge/docs-ui.nphuonha.id.vn-4f46e5?style=flat-square)](https://ui.nphuonha.id.vn)
[![Base UI](https://img.shields.io/badge/Base%20UI-1.9-4f46e5?style=flat-square)](https://base-ui.com)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=flat-square)](https://tailwindcss.com)

[Docs](https://ui.nphuonha.id.vn) · [Components](https://ui.nphuonha.id.vn/docs/components) · [Forms](https://ui.nphuonha.id.vn/docs/forms) · [Theming](https://ui.nphuonha.id.vn/docs/theming) · [Utilities](https://ui.nphuonha.id.vn/docs/utilities) · [Upgrading](https://ui.nphuonha.id.vn/docs/upgrading) · [For agents](https://ui.nphuonha.id.vn/docs/agents) · [llms.txt](https://ui.nphuonha.id.vn/llms.txt) · [Releases](https://github.com/nphuonha2101/ui-kit/releases)

## Why this kit

- **Behavior from Base UI** — focus management, overlays and form semantics are accessible by default.
- **Owned visual language** — semantic tokens, solid filled surfaces and a top-lit curved edge; no gray outlined boxes.
- **Runtime accent** — generate the full primary palette from one color and re-tone the whole app.
- **Prop-driven API** — consistent variants, sizes, icons and loading semantics across components.

## Install

```bash
npm install @nphuonha/ui-kit
```

Peer dependencies: React 19, React DOM 19, Tailwind CSS 4.

The published package ships compiled ESM + `.d.ts`, so it works with Next.js, Vite, Remix and other bundlers. No `transpilePackages` step is required.

## Usage

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

- Scope tokens/overlays with `data-ui="kit"` (add to `<html>` for portalled overlays).
- Dark mode: add the `dark` class to the same element.
- Change the accent at runtime:

```tsx
import { accentStyle } from "@nphuonha/ui-kit";

<div data-ui="kit" style={accentStyle("#0d9488", "light")}>
  <App />
</div>
```

Or generate variables directly:

```ts
import { generateAccentVars } from "@nphuonha/ui-kit";

const vars = generateAccentVars("#0d9488", "dark");
```

Tailwind v4: the package stylesheet imports Tailwind. If your setup ignores `@source` from dependencies, add:

```css
@source "../node_modules/@nphuonha/ui-kit/dist/components";
```

## Granular imports

The main barrel is convenient. For smaller client bundles, import from a component subpath:

```tsx
import { Button, buttonVariants } from "@nphuonha/ui-kit/button";
import { Field } from "@nphuonha/ui-kit/field";
import { Input } from "@nphuonha/ui-kit/input";
```

Variants live in server-safe `*-variants.ts` files and can be used from server components.

## Icons

The kit uses **Phosphor** for its internal affordances (calendar, check, minus, chevron, chevronDown, close, file, spinner, upload, user). User-facing icons are pack-agnostic — pass any component that accepts `size` and `className`:

```tsx
<Button startIcon={Plus}>New item</Button>
<IconButton aria-label="Search"><Search /></IconButton>
<Alert icon={Info} title="Heads up">...</Alert>
```

Swap the internal set with `IconProvider`:

```tsx
import { IconProvider } from "@nphuonha/ui-kit";
import { Check, ChevronUpDown, Loader, Minus, X } from "your-icon-pack";

<IconProvider
  icons={{ check: Check, minus: Minus, chevron: ChevronUpDown, close: X, spinner: Loader }}
>
  <App />
</IconProvider>
```

`Toaster` also accepts an `icons` prop for `success`, `info`, `warning`, `error`, `loading` and `close`.

## Components

`Accordion`, `Alert`, `AlertDialog`, `Avatar`, `Badge`, `BottomNav`, `Breadcrumb`, `Button`/`ButtonLink`, `Calendar`, `Card` (+Header/Title/Description/Content/Footer), `Checkbox`, `CheckboxGroup`, `Collapsible`, `Combobox`, `DatePicker`, `DesktopNav`, `Dialog`, `EmptyState`, `Field`/`Label`, `Fieldset`, `FileUpload`, `IconButton`, `Input`, `Kbd`/`KbdGroup`, `Menu`, `Meter`, `MobileNav`, `NumberField`, `OTPField`, `Pagination`, `Popover`, `PreviewCard`, `Progress`, `RadioGroup`, `ScrollArea`, `Select`, `Separator`, `Sheet`, `Skeleton`, `Slider`, `Spinner`, `Switch`, `Table`, `Tabs`, `Textarea`, `Toaster`/`toast`, `Toggle`, `ToggleGroup`, `Tooltip`.

`BottomNav` and `DesktopNav` items accept an optional `activeIcon` to swap to a filled or alternate icon when selected.

For forms, `Input` and `Textarea` work with react-hook-form's `register()`. Use `Controller` or the optional `FormField` wrapper from `@nphuonha/ui-kit/form` for `Calendar`, `DatePicker`, `FileUpload`, `Select`, `Combobox`, `Checkbox`, `CheckboxGroup`, `RadioGroup`, `Switch`, `Slider`, `NumberField` and `OTPField`. `Calendar`/`DatePicker` use `value`/`onValueChange` (DatePicker range mode uses `{ from, to }`); `FileUpload` uses `files`/`onFilesChange`; all accept `onBlur`/`aria-invalid`:

```tsx
import { Form, FormField } from "@nphuonha/ui-kit/form";
```

For required fields, set `required` on controls that own their label (`Checkbox`, `CheckboxGroup`, `Switch`, `RadioGroup`, `NumberField`, `OTPField`, `Calendar`, `DatePicker`, `FileUpload`) and on `Field`/`FormField` for `Input`, `Textarea`, `Select` and `Combobox`. With `FormField`, `required` controls the red mark and `rules` controls validation.

Install `react-hook-form` (optional peer dependency) when using the `form` entry.

Live previews, code and API reference: https://ui.nphuonha.id.vn

## Upgrading

Breaking API changes ship with a migration row: old code, new code, a search pattern and a fix. Point people and coding agents at:

- Guide: https://ui.nphuonha.id.vn/docs/upgrading
- Machine-readable: https://ui.nphuonha.id.vn/docs/upgrading/llms.txt

## License

MIT
