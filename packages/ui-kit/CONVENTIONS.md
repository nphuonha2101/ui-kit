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
- **Shadows only lift, never outline**: keep subtle outer shadows for overlays (`--shadow-overlay`), raised cards/buttons (`--shadow-soft`/`--shadow-raised`) and tiny active indicators (`--shadow-control`); the curved utilities only add inset edge light. Use `shadow-none` to drop the outer lift (keeping the rim) and `surface-flat` to remove the rim and gradient too.
- **Shape** via tokens: `--radius-2xs` (~4px), `--radius-xs` (~8px), `--radius-control` (~12px), `--radius-card` (~20px), `--radius-overlay`, `--radius-field`; pill (`rounded-pill`) for actions and switch thumbs.
- **Typography**: tokenized (`--font-body`), clear hierarchy.
- **Motion**: restrained 150–220ms, `--ease-out-ui`, CSS transitions for feedback/enter-exit; **no bouncy springs** by default. Honor `prefers-reduced-motion` (global guard in `base.css`).

## Component API
- **Prop-driven & consistent**: prefer clear props over compound anatomy for core controls.
- **Controls**: comfortable `h-10` default; shared focus/disabled/error states.
- **Forms**: `label`, `description`, `error` (with `aria-invalid`/`aria-describedby`/`role="alert"` where relevant), `required` mark.
  - Controls that own their label (`Checkbox`, `Switch`, `RadioGroup`, `NumberField`, `Calendar`, `DatePicker`, `FileUpload`) expose `required` and render the red `*` themselves.
  - Label-less controls (`Input`, `Textarea`, `Select`) get label/description/error/required from `Field` (native or other form libraries) or `FormField` (react-hook-form). `Select` still forwards `required` to its native control.
  - With `FormField`, set `required` and `rules` on `FormField`; do not also pass `label`/`required`/`error` to the child. `required` owns the visual mark, `rules` owns validation. Do not enable duplicate native validation unless the form uses `noValidate`.
  - `Slider` has no `required` state because it always has a value.
- **Icons**: default internal affordances use **Phosphor**. `startIcon`/`endIcon`, `Alert.icon` and `IconButton` children accept any icon component (`IconComponent { size?, className? }`), so user-facing icons are pack-agnostic. The internal set (`check`, `minus`, `chevron`, `close`, `spinner`) is replaceable via `IconProvider`; `Toaster` exposes its own `icons` prop.
- **Loading**: preserve layout (spinner + label), set `disabled`/`aria-busy`.

## Structure & exports
- One folder per component: `src/components/ui/<name>/<name>.tsx`, `<name>-variants.ts`, `<name>.test.tsx`, `index.ts`.
- Extract `cva` into `<name>-variants.ts` **without** `"use client"`, so variants can be used in server components.
- The folder `index.ts` exports the component and its variants explicitly. The main `src/index.ts` barrel re-exports folders, and `package.json` exposes subpaths (`@nphuonha/ui-kit/<name>`) for smaller client bundles.
- Keep tests colocated with the component. Prefer a11y smoke tests plus token/scale regressions for components with meaningful state.
- `dist/` and `.next/` are generated. Never edit build output by hand.

## Focus & interaction states
- Interactive components use the kit ring, not the browser outline: `outline-none` + `focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background`. Use `/50` for buttons, `/40` for compact controls and `/35` for large fields or inset surfaces.
- The global `:focus-visible` outline in `base.css` is a fallback. Reset it when a component defines its own ring.
- Targets under ~32px (for example the toast close button) use a compact inset ring (`focus-visible:ring-2 focus-visible:ring-inset`) instead of the offset outline. Never remove the focus indicator.
- Hover, active, disabled and invalid states are part of the API. Use semantic tokens, never raw brand colors.

## Third-party styling
- Base UI owns behavior and accessibility. `sonner` is the toast engine only and injects **unlayered** CSS at runtime.
- Kit utilities that must beat sonner need the `!` important modifier, including `focus-visible` box-shadow/outline overrides.
- Restyle sonner through `Toaster`'s `toastOptions.classNames`, not through global `[data-sonner-*]` selectors.

## Docs & agent context
- Component docs live in `apps/demo/src/content/components/<slug>/`: `meta.ts` (props are the API source of truth), `snippets.ts`, and `demo.tsx` (must export `demo` and `examples`).
- `apps/demo/src/content/components/{index.ts,snippets-map.ts,demo-map.tsx}` are generated. Run `npm run gen:content -w @nphuonha/ui-demo`; CI runs the `--check` variant.
- Scaffold content with `npm run new:component -w @nphuonha/ui-demo -- <slug> "<Title>" <Category>`.
- Component pages and core setup guides (installation, upgrading) expose a "Copy for agent" button and a page-scoped `llms.txt` route. Keep prompts in `apps/demo/src/content/llms.ts` as the single source.
- Any new docs page must be added to the sidebar, sitemap, root `llms.txt` links and README when it is part of the core setup flow.

## Versioning & migrations
- Breaking API changes require a row in `apps/demo/src/content/migrations.ts`, newest release first: surface, old snippet, new snippet, searchable `find` pattern and fix.
- Additive and behavior changes get a row too, tagged `additive` or `behavior`; never present them as required migrations.
- `/docs/upgrading` and `/docs/upgrading/llms.txt` are generated from that data. Do not duplicate migration copy elsewhere.
- Breaking changes require a major version (minor while the package is 0.x), updated component props, tests and README/setup notes in the same change.

## Adding or renaming a component
1. Create the component folder, explicit `index.ts`, colocated test and (when needed) a server-safe `*-variants.ts`.
2. Export it from the root barrel and add its `package.json` subpath export.
3. Add docs content (`meta.ts`, `snippets.ts`, `demo.tsx`) and regenerate content indexes.
4. Update the README component list and any affected page-scoped `llms.txt` content.
5. Run typecheck, kit tests and the docs build; confirm focus, disabled, error and dark-mode states.

## Stack notes
- Overlays/behavior: `@base-ui/react`. Toast: `sonner` (restyled via tokens).
- Prefer CSS transitions; avoid adding animation libraries for core MVP unless necessary.
- When adding components, follow the token contract + these conventions and add/extend colocated tests.
