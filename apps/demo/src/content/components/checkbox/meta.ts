import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "checkbox",
  "title": "Checkbox",
  "description": "A binary or indeterminate selection control with label and description support.",
  "category": "Forms",
  "imports": "import { Checkbox } from \"@nphuonha/ui-kit\";",
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
      "description": "Initial unchecked state."
    },
    {
      "name": "indeterminate",
      "type": "boolean",
      "description": "Shows the mixed state."
    },
    {
      "name": "error",
      "type": "boolean",
      "description": "Applies the invalid visual state."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables the control."
    }
  ]
};
