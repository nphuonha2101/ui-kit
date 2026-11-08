import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "textarea",
  "title": "Textarea",
  "description": "A multi-line text field with the same borderless field treatment.",
  "category": "Forms",
  "imports": "import { Field, Textarea } from \"@nphuonha/ui-kit\";",
  "props": [
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
      "name": "rows",
      "type": "number",
      "description": "Native textarea rows."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables the field."
    }
  ]
};
