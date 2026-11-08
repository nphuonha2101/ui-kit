# UI Kit

A solid, clean, flat, modern React UI kit built on **Base UI** and **Tailwind CSS v4**. Borderless surfaces, a customizable accent, accessible primitives and a consistent prop-driven API.

- **Docs:** https://ui.nphuonha.id.vn
- **npm:** https://www.npmjs.com/package/@nphuonha/ui-kit
- **Agent guide:** https://ui.nphuonha.id.vn/docs/agents
- **llms.txt:** https://ui.nphuonha.id.vn/llms.txt

## Install

```bash
npm install @nphuonha/ui-kit
```

Peer dependencies: React 19, React DOM 19, Tailwind CSS 4.

The package ships compiled ESM + TypeScript declarations. No `transpilePackages` step is required.

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

- Add `data-ui="kit"` to `<html>` when using portalled overlays (dialog, sheet, popover, select) so they inherit tokens.
- Dark mode: add the `dark` class to the same element.
- Tailwind v4: the package stylesheet imports Tailwind. If your setup ignores `@source` from dependencies, add:

```css
@source "../node_modules/@nphuonha/ui-kit/dist/components";
```

## Theming

Semantic CSS variables drive the whole system:

- surfaces: `--background`, `--card`, `--surface`, `--field`, `--popover`, `--muted`
- actions: `--primary`, `--primary-foreground`, `--primary-hover`, `--primary-soft`, `--ring`
- status: `--destructive`, `--success`, `--warning`, `--info`
- shape: `--radius-control`, `--radius-field`, `--radius-card`, `--radius-overlay`

Change the accent from one color:

```tsx
import { accentStyle, generateAccentVars } from "@nphuonha/ui-kit";

<div data-ui="kit" style={accentStyle("#0d9488", "light")}>
  <App />
</div>

// or generate variables directly
const vars = generateAccentVars("#0d9488", "dark");
```

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

`Button`, `IconButton`, `Input`, `Textarea`, `Field`/`Label`, `Checkbox`, `RadioGroup`, `Switch`, `Select`, `Dialog`, `Sheet`, `Popover`, `Tooltip`, `Tabs`, `BottomNav`, `DesktopNav`, `Card`, `Badge`, `Alert`, `Separator`, `Spinner`, `Toaster`/`toast`.

Browse the live docs for previews, code and API reference: https://ui.nphuonha.id.vn

## License

MIT
