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

## MVP components

`Button`, `IconButton`, `Input`, `Textarea`, `Field`/`Label`, `Checkbox`, `RadioGroup`, `Switch`, `Select`, `Dialog`, `Sheet`, `Popover`, `Tooltip`, `Tabs`, `Card` (+Header/Title/Description/Content/Footer), `Badge`, `Alert`, `Separator`, `Spinner`, `Toaster`/`toast`.

## Scripts

```bash
npm run typecheck -w @nphuonha/ui-kit
npm run test -w @nphuonha/ui-kit
```

See `CONVENTIONS.md` for design/API rules.
