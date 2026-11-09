import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "field",
  "title": "Field",
  "description": "Wires a label, description and error message to a control with the right ARIA relationships.",
  "category": "Forms",
  "imports": "import { Field, Input } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "label",
      "type": "ReactNode",
      "description": "Visible label for the control."
    },
    {
      "name": "description",
      "type": "ReactNode",
      "description": "Helper text below the control."
    },
    {
      "name": "error",
      "type": "ReactNode",
      "description": "Error message; also marks the control invalid."
    },
    {
      "name": "required",
      "type": "boolean",
      "description": "Shows the required mark and forwards required to the control."
    },
    {
      "name": "id",
      "type": "string",
      "description": "Explicit control id."
    }
  ]
};
