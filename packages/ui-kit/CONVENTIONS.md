# UI Kit Conventions (Solid / Clean / Flat / Modern)

Single-suite, not-shadcn component kit: **Base UI** for behavior/a11y + owned tokens, styles, and a consistent **prop-driven** API. Visual direction: solid surfaces, clean hierarchy, flat-first depth, modern rounded shapes, vibrant-but-customizable accent (inspired by M3 Expressive, not M3 Expressive).

## Foundations
- **Semantic tokens only** in components (no app-specific variables, no hardcoded brand paints). Core contract lives in `src/styles/theme.css` and is mapped in `src/styles/base.css`.
- **Accent is customizable** via CSS vars (`--primary`, `--primary-foreground`, `--primary-hover/active`, `--primary-soft*`, `--ring`). Use `generateAccentVars`/`accentStyle` from `@nphuonha/ui-kit` to derive a palette from one color (light/dark).
- **Scope**: wrap with `data-ui="kit"` (put on `<html>`/portal root so overlay portals inherit tokens). Dark mode via `.dark`.

## Visual
- **Flat-first, softly curved**: separate surfaces with tonal solid fills; use a **top-lit rim + micro vertical gradient** for convexity instead of full outlines.
  - `surface-curved` — cards, dialogs, popovers, primary/danger buttons.
  - `surface-curved-soft` — secondary buttons, tabs, alerts, badges, switch tracks.
  - `surface-curved-pill` — switch thumbs and pill controls.
  - `surface-inset` — native fields (input/textarea/select), where `::before` is unavailable.
  - Lighting tokens: `--light-top`, `--light-sheen`, `--light-bottom`, `--light-rim` (defined per light/dark theme).
- **Shadows only lift, never outline**: keep subtle outer shadows for overlays (`--shadow-overlay`) and raised cards/buttons (`--shadow-soft`/`--shadow-raised`); the curved utilities only add inset edge light.
- **Shape** via tokens: `--radius-control` (~12px), `--radius-card` (~20px), `--radius-overlay`, `--radius-field`; pill (`rounded-pill`) for actions and switch thumbs.
- **Typography**: tokenized (`--font-body`), clear hierarchy.
- **Motion**: restrained 150–220ms, `--ease-out-ui`, CSS transitions for feedback/enter-exit; **no bouncy springs** by default. Honor `prefers-reduced-motion` (global guard in `base.css`).

## Component API
- **Prop-driven & consistent**: prefer clear props over compound anatomy for core controls.
- **Controls**: comfortable `h-10` default; shared focus/disabled/error states.
- **Forms**: `label`, `description`, `error` (with `aria-invalid`/`aria-describedby`/`role="alert"` where relevant), `required` mark.
- **Icons**: default internal affordances use **Phosphor**. `startIcon`/`endIcon`, `Alert.icon` and `IconButton` children accept any icon component (`IconComponent { size?, className? }`), so user-facing icons are pack-agnostic. The internal set (`check`, `minus`, `chevron`, `close`, `spinner`) is replaceable via `IconProvider`; `Toaster` exposes its own `icons` prop.
- **Loading**: preserve layout (spinner + label), set `disabled`/`aria-busy`.

## Structure & exports
- One folder per component: `src/components/ui/<name>/<name>.tsx`, `<name>-variants.ts`, `<name>.test.tsx`, `index.ts`.
- Extract `cva` into `<name>-variants.ts` **without** `"use client"`, so variants can be used in server components.
- The folder `index.ts` exports the component and its variants explicitly. The main `src/index.ts` barrel re-exports folders, and `package.json` exposes subpaths (`@nphuonha/ui-kit/<name>`) for smaller client bundles.
- Keep tests colocated with the component. Prefer a11y smoke tests plus token/scale regressions for components with meaningful state.

## Stack notes
- Overlays/behavior: `@base-ui/react`. Toast: `sonner` (restyled via tokens).
- Prefer CSS transitions; avoid adding animation libraries for core MVP unless necessary.
- When adding components, follow the token contract + these conventions and add/extend colocated tests.
