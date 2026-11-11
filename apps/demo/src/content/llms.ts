import { componentGroups } from "./components";
import { getComponentProps } from "./props";
import { latestRelease, releases, type ApiMigration } from "./migrations";
import type { ComponentMeta, ComponentSnippets } from "./types";

export const DOCS_URL = "https://ui.nphuonha.id.vn";

export function buildComponentAgentPrompt(meta: ComponentMeta, snippets: ComponentSnippets) {
  const props = getComponentProps(meta)
    .map(
      (prop) =>
        `- ${prop.name} (${prop.type}${prop.default ? `, default: ${prop.default}` : ""}) — ${prop.description}`,
    )
    .join("\n");

  return `Use this page as the source of truth for the ${meta.title} component.

Package: @nphuonha/ui-kit
Docs: ${DOCS_URL}/docs/components/${meta.slug}

Install:
npm install @nphuonha/ui-kit

Import:
${meta.imports}

Props:
${props}

Usage:
${snippets.usage}

Rules:
- Import "@nphuonha/ui-kit/styles.css" once at the app root.
- Put data-ui="kit" on <html> and add class="dark" for dark mode.
- Use semantic tokens and the documented props. Do not add another UI library.`;
}

export const INSTALLATION_AGENT_PROMPT = `Set up @nphuonha/ui-kit in this project.

1. npm install @nphuonha/ui-kit
2. Import "@nphuonha/ui-kit/styles.css" once at the app root.
3. Put data-ui="kit" on <html>; add class="dark" for dark mode.
4. Use semantic tokens and the documented components.

Do not add transpilePackages: the package ships compiled ESM and .d.ts files.
Do not add another UI library.`;

export const UPGRADING_AGENT_PROMPT = `Upgrade @nphuonha/ui-kit safely.

1. Read package.json to find the installed version and the target version.
2. Read ${DOCS_URL}/docs/upgrading/llms.txt before changing code.
3. Apply only the migrations between those versions, oldest first, using each row's find and fix values.
4. Never guess a renamed or removed prop. If a breaking change has no row, stop and report it.
5. Run typecheck and tests after each release; keep unrelated refactors out of the upgrade.`;

function formatMigration(change: ApiMigration) {
  return `- ${change.surface} (${change.kind})
  - Before: ${change.before}
  - After: ${change.after}
  - Find: ${change.find}
  - Fix: ${change.fix}`;
}

export function buildUpgradingAgentPrompt() {
  const releaseBlocks = releases
    .map((release) => {
      const heading = `### ${release.version} (${release.date}) — ${
        release.breaking ? "breaking changes" : "no breaking changes"
      }`;
      const changes = release.changes.length
        ? release.changes.map(formatMigration).join("\n")
        : "- No action required.";

      return `${heading}\n\n${release.summary}\n\n${changes}`;
    })
    .join("\n\n");

  return `# Upgrading @nphuonha/ui-kit

Latest release: ${latestRelease.version} (${latestRelease.date})
Upgrade guide: ${DOCS_URL}/docs/upgrading
Machine-readable: ${DOCS_URL}/docs/upgrading/llms.txt
Releases: https://github.com/nphuonha2101/ui-kit/releases

## Protocol

1. Read package.json and record the installed version and the target version.
2. Apply only the releases between those two versions, oldest first.
3. For each row, search for the Find value and rewrite Before → After; follow the Fix notes.
4. Never guess a replacement prop. If a breaking change has no row, stop and report it.
5. Run typecheck and tests after each release, then spot-check focus, overlays and dark mode.
6. Keep the stylesheet import and data-ui="kit" setup unchanged unless a migration says otherwise.

## Compatibility policy

- Additive APIs ship in minor releases and do not require code changes.
- Breaking API changes require a major release (or a minor while the package is 0.x) and a row here.
- Visual-only changes do not require a migration, but may change focus rings, spacing or shadows.

## Releases

${releaseBlocks}

## Report a missing migration

Open an issue at https://github.com/nphuonha2101/ui-kit/issues with the failing type error and the old/new prop names.`;
}

export function buildLlmsTxt() {
  const groups = componentGroups
    .filter((group) => group.components.length > 0)
    .map(
      (group) =>
        `### ${group.category}\n\n${group.components
          .map(
            (component) =>
              `- [${component.title}](${DOCS_URL}/docs/components/${component.slug}) — ${component.description}`,
          )
          .join("\n")}`,
    )
    .join("\n\n");

  return `# @nphuonha/ui-kit

> Solid, borderless React UI kit for Tailwind CSS v4. Base UI supplies overlay and form primitives where available; calendar, date/time, color and data-grid controls are first-party. Components use semantic tokens, a top-lit solid surface language and a runtime-customizable accent.

Docs: ${DOCS_URL}
Agent guide: ${DOCS_URL}/docs/agents
Upgrading: ${DOCS_URL}/docs/upgrading
Machine-readable guide: ${DOCS_URL}/llms.txt
Per-page context: append /llms.txt to any docs URL, e.g. ${DOCS_URL}/docs/components/button/llms.txt
Latest release: ${latestRelease.version}

## Install

npm install @nphuonha/ui-kit

import "@nphuonha/ui-kit/styles.css";
import { Button, Card, CardContent, Input } from "@nphuonha/ui-kit";

## Required setup

- Put data-ui="kit" on <html> (or the app root). This is required for portalled overlays.
- Add class="dark" to the same element for dark mode.
- Import the stylesheet exactly once.
- The package ships compiled ESM and .d.ts files. Do not add a transpilePackages step.

## Base UI coverage

- Base UI primitives: Dialog, AlertDialog, Sheet, Popover, Menu, Select, Combobox, Tooltip, PreviewCard, Tabs, Accordion, Collapsible, Checkbox, CheckboxGroup, RadioGroup, Switch, Slider, NumberField, OTPField, Toggle, ToggleGroup, Toolbar, Progress, Meter, Avatar, ScrollArea, Fieldset.
- First-party controls (Base UI 1.9 has no primitive): Calendar, DatePicker, DateTimePicker, TimeField, ColorPicker, DataTable, Table, FileUpload, Input, Textarea, Button, Badge, Card, Alert, Breadcrumb, Pagination, BottomNav, DesktopNav, MobileNav, Field/Form, Kbd, Skeleton, Spinner, EmptyState.
- Third-party engines: Toaster uses sonner; DataTable uses TanStack Table and Virtual on top of the kit's Table primitives.
- First-party controls must keep the same focus, keyboard, ARIA and validation contract as Base UI-backed components.

## Rules for agents

- Use the kit's primitives before adding another UI dependency.
- Use semantic utilities and tokens: bg-card, bg-surface, bg-field, text-muted-foreground, border-border, rounded-card, rounded-control, shadow-soft. Use shadow-none for nested surfaces and surface-flat for fully flat ones.
- Do not hardcode colors unless you are overriding a documented token.
- Use cn from "@nphuonha/ui-kit" when merging class names.
- Buttons accept startIcon/endIcon. IconButton requires an aria-label. BottomNav and DesktopNav items accept activeIcon for the selected state.
- For required fields, set required on FormField (RHF) or Field (native) together with validation rules; controls that own their label also accept required standalone.
- Use generateAccentVars(color, mode) or accentStyle(color, mode) to create an accent palette; put the variables on the root that carries data-ui="kit".
- For smaller bundles, import from a component subpath: @nphuonha/ui-kit/button, @nphuonha/ui-kit/input, @nphuonha/ui-kit/dialog.
- Keep overlays inside the data-ui="kit" scope so dialogs, sheets, popovers and tooltips inherit the theme.
- Before upgrading, read ${DOCS_URL}/docs/upgrading/llms.txt and apply its migration rows instead of guessing renamed props.

## Components

${groups}

## More documentation

- [Installation](${DOCS_URL}/docs/installation)
- [Theming](${DOCS_URL}/docs/theming)
- [Utilities](${DOCS_URL}/docs/utilities)
- [Upgrading](${DOCS_URL}/docs/upgrading)
- [Component index](${DOCS_URL}/docs/components)
- [For agents](${DOCS_URL}/docs/agents)
- [Upgrade context for agents](${DOCS_URL}/docs/upgrading/llms.txt)
`;
}
