# UI Kit

A solid, clean, flat, modern React UI kit (MVP rewrite): **Base UI** for behavior/a11y + owned semantic tokens/styles + a consistent prop-driven API. Single suite, accent-customizable via color generation (M3 Expressive-inspired, not M3 Expressive).

> **Status:** MVP, not live. Breaking rewrite — previous `warm-editorial`/`celebration` suites removed.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3100
```

```bash
npm run typecheck
npm run build
```

## Structure

```
ui-kits/
├── packages/ui-kit/                 # @nphuonha/ui-kit
│   └── src/
│       ├── styles/{base.css,theme.css} + styles.css
│       ├── lib/{utils.ts,color.ts}  # cn + accent color generation
│       ├── components/ui/*          # MVP components
│       └── index.ts
├── apps/demo/                       # MVP showcase (theming + components)
└── package.json                     # npm workspaces
```

## Usage

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

- Scope with `data-ui="kit"` (set on `<html>` for portalled overlays). Dark mode: `.dark`.
- Change accent: `style={accentStyle("#0d9488", "light")}` or `generateAccentVars(color, mode)` (overrides `--primary*`/`--ring`).

## MVP components

`Button`, `IconButton`, `Input`, `Textarea`, `Field`/`Label`, `Checkbox`, `RadioGroup`, `Switch`, `Select`, `Dialog`, `Sheet`, `Popover`, `Tooltip`, `Tabs`, `Card`, `Badge`, `Alert`, `Separator`, `Spinner`, `Toaster`/`toast`.

Details: [`packages/ui-kit/README.md`](packages/ui-kit/README.md), [`packages/ui-kit/CONVENTIONS.md`](packages/ui-kit/CONVENTIONS.md).

MIT licensed.
