import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "radio-group",
  "title": "RadioGroup",
  "description": "A single-choice group with a consistent label, description and error treatment.",
  "category": "Forms",
  "imports": "import { RadioGroup } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "options",
      "type": "RadioOption[]",
      "description": "Value/label/description entries."
    },
    {
      "name": "value",
      "type": "string",
      "description": "Controlled value."
    },
    {
      "name": "defaultValue",
      "type": "string",
      "description": "Uncontrolled initial value."
    },
    {
      "name": "onValueChange",
      "type": "(value: string) => void",
      "description": "Called when the selection changes."
    },
    {
      "name": "label",
      "type": "ReactNode",
      "description": "Group label."
    },
    {
      "name": "description",
      "type": "ReactNode",
      "description": "Group helper text."
    },
    {
      "name": "error",
      "type": "ReactNode",
      "description": "Group error message."
    },
    {
      "name": "required",
      "type": "boolean",
      "description": "Marks the group label and native input as required."
    },
    {
      "name": "orientation",
      "type": "\"vertical\" | \"horizontal\"",
      "default": "\"vertical\"",
      "description": "Layout direction."
    }
  ]
};
