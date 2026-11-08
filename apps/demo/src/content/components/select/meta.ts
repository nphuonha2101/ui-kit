import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "select",
  "title": "Select",
  "description": "A borderless select trigger and a floating option list.",
  "category": "Forms",
  "imports": "import { Field, Select } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "options",
      "type": "SelectOption[]",
      "description": "Value/label entries."
    },
    {
      "name": "value",
      "type": "string | null",
      "description": "Controlled value."
    },
    {
      "name": "defaultValue",
      "type": "string | null",
      "description": "Uncontrolled initial value."
    },
    {
      "name": "onValueChange",
      "type": "(value: string | null) => void",
      "description": "Called when the selection changes."
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "\"Select…\"",
      "description": "Text shown without a value."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables the trigger."
    },
    {
      "name": "error",
      "type": "boolean",
      "description": "Applies the invalid visual state."
    }
  ],
  "examples": [
    {
      "title": "Inside a field",
      "description": "Compose Select with Field for labels, help text and validation.",
      "demoKey": "select-field"
    }
  ]
};
