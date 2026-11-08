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
│       ├── components/ui/<name>/    # component + variants + test + index
│       └── index.ts                 # barrel + subpath exports
├── apps/demo/                       # docs site
│   ├── src/app/                     # thin routes (landing, docs, component pages)
│   ├── src/components/{site,docs,home}/
│   ├── src/content/components/<slug>/
│   │   ├── meta.ts                  # nav/search/SEO data (serializable)
│   │   ├── snippets.ts              # code tab / usage / examples
│   │   └── demo.tsx                 # "use client" live preview
│   └── scripts/{gen-content-index,new-component}.mjs
└── package.json                     # npm workspaces
```

Content indexes are generated, not hand-maintained:

```bash
cd apps/demo
npm run new:component -- date-picker "Date Picker" Forms
npm run gen:content
npm run check:content
```

See [`apps/demo/CONTRIBUTING.md`](apps/demo/CONTRIBUTING.md) for the workflow.

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
