import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "label",
  "title": "Label",
  "description": "A small, accessible label for a form control.",
  "category": "Forms",
  "imports": "import { Input, Label } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "htmlFor",
      "type": "string",
      "description": "Associates the label with a control."
    },
    {
      "name": "requiredMark",
      "type": "boolean",
      "description": "Shows a required asterisk."
    },
    {
      "name": "children",
      "type": "ReactNode",
      "description": "Label content."
    }
  ]
};
