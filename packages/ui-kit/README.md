# @nphuonha/ui-kit

Solid, clean, flat, modern React UI kit. **Base UI** for behavior/a11y + owned tokens/styles + a consistent prop-driven API. Accent is vibrant by default and **customizable by color generation** (M3 Expressive-inspired, not M3 Expressive).

> Status: MVP rewrite (single suite). Breaking changes from previous `warm-editorial`/`celebration` suites.

## Install / use (workspace or package)

```tsx
import "@nphuonha/ui-kit/styles.css";
import { Button, Card, CardContent, Input, Toaster, accentStyle } from "@nphuonha/ui-kit";

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
- Dark mode: add `class="dark"` (and/or `data-ui="kit"` dark variant as supported by your setup).
- Change accent at runtime: `style={accentStyle("#0d9488", "light")}` or `generateAccentVars(color, mode)` to override `--primary*`/`--ring`.

## Granular imports

The main barrel is convenient. For smaller client bundles, import from a component subpath:

```tsx
import { Button, buttonVariants } from "@nphuonha/ui-kit/button";
import { Field } from "@nphuonha/ui-kit/field";
import { Input } from "@nphuonha/ui-kit/input";
```

Variants live in server-safe `*-variants.ts` files and can be used from server components.

## Structure

```
src/components/ui/button/
  button.tsx           # "use client" behavior/render
  button-variants.ts   # cva, server-safe
  button.test.tsx      # colocated test
  index.ts             # explicit exports
```

## Icons

The kit uses **Phosphor** as its default internal icon set (check, minus, chevron, close, spinner). User-facing icons stay icon-agnostic — pass any icon component that accepts `size` and `className`:

```tsx
<Button startIcon={Plus}>New item</Button>
<IconButton aria-label="Search"><Search /></IconButton>
<Alert icon={Info} title="Heads up">...</Alert>
```

Swap the internal set at any time with `IconProvider`:

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

The docs site uses Phosphor too. Swapping to another pack only affects the kit's internal affordances; icons you pass to `Button`, `IconButton` and `Alert` are always yours.

## MVP components

`Button`, `IconButton`, `Input`, `Textarea`, `Field`/`Label`, `Checkbox`, `RadioGroup`, `Switch`, `Select`, `Dialog`, `Sheet`, `Popover`, `Tooltip`, `Tabs`, `Card` (+Header/Title/Description/Content/Footer), `Badge`, `Alert`, `Separator`, `Spinner`, `Toaster`/`toast`.

## Scripts

```bash
npm run typecheck -w @nphuonha/ui-kit
npm run test -w @nphuonha/ui-kit
```

See `CONVENTIONS.md` for design/API rules.
