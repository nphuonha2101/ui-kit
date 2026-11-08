import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "sheet",
  "title": "Sheet",
  "description": "A floating side or bottom panel with a rounded overlay surface.",
  "category": "Overlays",
  "imports": "import * as React from \"react\";\nimport { Button, Field, Input, Select, Sheet } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "open",
      "type": "boolean",
      "description": "Controlled open state."
    },
    {
      "name": "onOpenChange",
      "type": "(open: boolean) => void",
      "description": "Called when the sheet opens or closes."
    },
    {
      "name": "trigger",
      "type": "ReactElement",
      "description": "Element that opens the sheet."
    },
    {
      "name": "side",
      "type": "\"right\" | \"left\" | \"bottom\"",
      "default": "\"right\"",
      "description": "Panel edge."
    },
    {
      "name": "title",
      "type": "ReactNode",
      "description": "Sheet title."
    },
    {
      "name": "description",
      "type": "ReactNode",
      "description": "Supporting description."
    },
    {
      "name": "footer",
      "type": "ReactNode",
      "description": "Actions rendered at the bottom."
    }
  ]
};
