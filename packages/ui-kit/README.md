# @nphuonha/ui-kit

Solid, clean, flat, modern React UI kit. **Base UI** for behavior/a11y + owned tokens/styles + a consistent prop-driven API. Accent is vibrant by default and customizable by color generation.

> **v0.3.0** adds `BottomNav`, `DesktopNav` and `activeIcon` support for selected navigation items.

- **Docs:** https://ui.nphuonha.id.vn
- **Agent guide:** https://ui.nphuonha.id.vn/docs/agents
- **llms.txt:** https://ui.nphuonha.id.vn/llms.txt

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

The kit uses **Phosphor** for its internal affordances (check, minus, chevron, close, spinner). User-facing icons are pack-agnostic — pass any component that accepts `size` and `className`:

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

`Button`, `IconButton`, `Input`, `Textarea`, `Field`/`Label`, `Checkbox`, `RadioGroup`, `Switch`, `Select`, `Dialog`, `Sheet`, `Popover`, `Tooltip`, `Tabs`, `BottomNav`, `DesktopNav`, `Card` (+Header/Title/Description/Content/Footer), `Badge`, `Alert`, `Separator`, `Spinner`, `Toaster`/`toast`.

`BottomNav` and `DesktopNav` items accept an optional `activeIcon` to swap to a filled or alternate icon when selected.

Live previews, code and API reference: https://ui.nphuonha.id.vn

## License

MIT
