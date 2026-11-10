# Adding components and docs

The docs app is intentionally split so adding a component does not create another 1,000-line registry.

## Content layout

```txt
src/content/
  types.ts
  components/
    button/
      meta.ts       # title, category, description, example metadata
      snippets.ts   # preview code, usage code, example code
      demo.tsx      # "use client" live demo
    input/
    ...
    index.ts        # generated: registry, groups, search index
    snippets-map.ts # generated: slug -> snippets
    demo-map.tsx    # generated: slug -> lazy demo
    props-map.ts    # generated: slug -> props extracted from kit JSDoc
```

Why the split:

- `meta.ts` is serializable and lightweight. Sidebar, search and metadata import only this.
- `snippets.ts` is only loaded by a component page. It is not part of the nav/search bundle.
- `demo.tsx` is the client boundary for the live preview. It is lazy-loaded by `demo-map.tsx`.

## Scaffold a component doc

```bash
cd apps/demo
npm run new:component -- date-picker "Date Picker" Forms
```

This creates `src/content/components/date-picker/{meta,snippets,demo}.tsx` and regenerates the indexes.

Then fill in:

1. `meta.ts` — description, imports, example metadata.
2. `demo.tsx` — the live preview. Export `demo` and `examples`.
3. `snippets.ts` — the code shown in the **Code** tab. It must match the demo.
4. The exported `*Props` type in `packages/ui-kit/src` — add JSDoc to every prop that should appear in the API table. `npm run gen:props` turns that JSDoc into `props-map.ts`.

Regenerate the indexes and props map after manual file changes:

```bash
npm run gen:content
npm run gen:props
npm run check:content   # CI-safe check
npm run check:props     # CI-safe check
```

## Props docs

The API table is generated from the kit source, not written by hand:

- Add `/** ... */` to each prop on the exported `*Props` type in `packages/ui-kit/src`.
- `@default` overrides a value that cannot be inferred from destructuring or `cva` `defaultVariants`.
- `@type` overrides the displayed type for a generic or opaque prop.
- `@ignore` hides a prop that has JSDoc.
- For curated inherited props (Base UI/native), add `@docs <name> <description>` to the `*Props` interface. Use `@docsDefault <name> <value>` and `@docsType <name> <type>` when needed.
- Compound components that document parts rather than one Props type use `manualProps` in `meta.ts`. Components that mix generated props with part rows (Table, Kbd, DesktopNav) use `extraProps`.

Run `npm run gen:props` after changing a component API. CI runs `check:props`.

## Keeping code and preview in sync

- `snippets.preview` is the code for the **Preview** tab. It should render the same JSX as `demo.tsx`.
- `snippets.usage` is a separate, shorter usage example.
- `snippets.examples[key]` matches `meta.examples[].demoKey` and `demo.tsx`'s `examples[key]`.
- When changing a demo, update the matching snippet in the same PR. A review rule and the `check:content` script prevent missing files; they cannot verify visual equality, so keep them close.

If Next/Turbopack supports `?raw` imports reliably, the longer-term option is to import the demo source for the Code tab so there is a single source of truth. Until then, keep `demo.tsx` and `snippets.ts` colocated per component.

## Adding a kit component (future)

For a new `@nphuonha/ui-kit` component:

```txt
packages/ui-kit/src/components/ui/date-picker/
  date-picker.tsx        # "use client", Base UI behavior + render
  date-picker-variants.ts # cva, no "use client" (server-safe)
  date-picker.test.tsx   # colocated tests
  index.ts               # explicit exports
```

Rules:

- Extract `cva` into a `*-variants.ts` file. Do not import client-only modules into server components just to get a variant.
- Export the component from `packages/ui-kit/src/index.ts` explicitly.
- Keep tokens semantic. No raw brand colors in component files.
- Keep `surface-curved*`, `surface-inset`, radius, motion and accent tokens as the only visual primitives.
- For portalled overlays, `data-ui="kit"` must be on `<html>` or the portal root.

## Checks

```bash
npm run check:content
npm run check:props
npm run typecheck
npm run build
```

## When the docs outgrow this

- Around 30–50 components, this per-component content structure is still comfortable.
- Beyond that, move the docs prose to MDX (or Fumadocs/Nextra) and keep `content/components` as the generated component manifest. Do not build a custom CMS.
- Consider subpath exports for the kit (e.g. `@nphuonha/ui-kit/button`) if bundle size becomes a concern.
