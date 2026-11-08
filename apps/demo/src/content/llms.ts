import { componentGroups } from "./components";

export const DOCS_URL = "https://ui.nphuonha.id.vn";

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

> Solid, borderless React UI kit built on Base UI and Tailwind CSS v4. Components use semantic tokens, a top-lit solid surface language and a runtime-customizable accent.

Docs: ${DOCS_URL}
Agent guide: ${DOCS_URL}/docs/agents
Machine-readable guide: ${DOCS_URL}/llms.txt

## Install

npm install @nphuonha/ui-kit

import "@nphuonha/ui-kit/styles.css";
import { Button, Card, CardContent, Input } from "@nphuonha/ui-kit";

## Required setup

- Put data-ui="kit" on <html> (or the app root). This is required for portalled overlays.
- Add class="dark" to the same element for dark mode.
- Import the stylesheet exactly once.
- The package ships compiled ESM and .d.ts files. Do not add a transpilePackages step.

## Rules for agents

- Use the kit's primitives before adding another UI dependency.
- Use semantic utilities and tokens: bg-card, bg-surface, bg-field, text-muted-foreground, border-border, rounded-card, rounded-control, shadow-soft.
- Do not hardcode colors unless you are overriding a documented token.
- Use cn from "@nphuonha/ui-kit" when merging class names.
- Buttons accept startIcon/endIcon. IconButton requires an aria-label. BottomNav and DesktopNav items accept activeIcon for the selected state.
- Use generateAccentVars(color, mode) or accentStyle(color, mode) to create an accent palette; put the variables on the root that carries data-ui="kit".
- For smaller bundles, import from a component subpath: @nphuonha/ui-kit/button, @nphuonha/ui-kit/input, @nphuonha/ui-kit/dialog.
- Keep overlays inside the data-ui="kit" scope so dialogs, sheets, popovers and tooltips inherit the theme.

## Components

${groups}

## More documentation

- [Installation](${DOCS_URL}/docs/installation)
- [Theming](${DOCS_URL}/docs/theming)
- [Component index](${DOCS_URL}/docs/components)
- [For agents](${DOCS_URL}/docs/agents)
`;
}
