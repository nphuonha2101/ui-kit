import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "input",
  "title": "Input",
  "description": "A borderless text field with a solid fill and a soft focus ring.",
  "category": "Forms",
  "imports": "import { Field, Input } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "type",
      "type": "string",
      "default": "\"text\"",
      "description": "Native input type."
    },
    {
      "name": "error",
      "type": "boolean",
      "description": "Applies the invalid visual state."
    },
    {
      "name": "placeholder",
      "type": "string",
      "description": "Hint text when empty."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables the field."
    }
  ]
};
