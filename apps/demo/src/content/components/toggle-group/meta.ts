import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "toggle-group",
  "title": "ToggleGroup",
  "description": "A pill segmented control for view switchers and multi-select filters.",
  "category": "Actions",
  "imports": "import { ToggleGroup } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "items",
      "type": "ToggleGroupItem[]",
      "description": "Value/label entries. Add optional icon, disabled or aria-label per item."
    },
    {
      "name": "value",
      "type": "string[]",
      "description": "Controlled pressed values."
    },
    {
      "name": "defaultValue",
      "type": "string[]",
      "description": "Initial pressed values for an uncontrolled group."
    },
    {
      "name": "onValueChange",
      "type": "(value: string[]) => void",
      "description": "Called when the pressed values change."
    },
    {
      "name": "multiple",
      "type": "boolean",
      "default": "false",
      "description": "Allow more than one item to stay pressed."
    },
    {
      "name": "variant",
      "type": "\"segmented\" | \"ghost\"",
      "default": "\"segmented\"",
      "description": "Surface treatment for the group."
    },
    {
      "name": "orientation",
      "type": "\"horizontal\" | \"vertical\"",
      "default": "\"horizontal\"",
      "description": "Layout direction."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables every item in the group."
    }
  ],
  "examples": [
    {
      "title": "Multiple filters",
      "description": "Set multiple to keep several filters pressed at once.",
      "demoKey": "toggle-group-multiple"
    }
  ]
};
