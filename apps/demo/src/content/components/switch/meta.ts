import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "switch",
  "title": "Switch",
  "description": "A pill toggle with a stretchy pill thumb and clear checked state.",
  "category": "Forms",
  "imports": "import { Switch } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "label",
      "type": "ReactNode",
      "description": "Visible label."
    },
    {
      "name": "description",
      "type": "ReactNode",
      "description": "Helper text."
    },
    {
      "name": "checked",
      "type": "boolean",
      "description": "Controlled checked state."
    },
    {
      "name": "defaultChecked",
      "type": "boolean",
      "description": "Initial checked state."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables the switch."
    }
  ]
};
