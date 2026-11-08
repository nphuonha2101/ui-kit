import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "dialog",
  "title": "Dialog",
  "description": "A focused modal surface with title, description, footer and a backdrop.",
  "category": "Overlays",
  "imports": "import * as React from \"react\";\nimport { Button, Dialog } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "open",
      "type": "boolean",
      "description": "Controlled open state."
    },
    {
      "name": "defaultOpen",
      "type": "boolean",
      "description": "Uncontrolled initial state."
    },
    {
      "name": "onOpenChange",
      "type": "(open: boolean) => void",
      "description": "Called when the dialog opens or closes."
    },
    {
      "name": "trigger",
      "type": "ReactElement",
      "description": "Element that opens the dialog."
    },
    {
      "name": "title",
      "type": "ReactNode",
      "description": "Dialog title."
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
    },
    {
      "name": "showClose",
      "type": "boolean",
      "default": "true",
      "description": "Shows the close icon button."
    }
  ]
};
