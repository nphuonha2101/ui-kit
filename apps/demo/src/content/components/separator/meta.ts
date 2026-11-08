import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "separator",
  "title": "Separator",
  "description": "A hairline divider for grouping content.",
  "category": "Data Display",
  "imports": "import { Badge, Separator } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "orientation",
      "type": "\"horizontal\" | \"vertical\"",
      "default": "\"horizontal\"",
      "description": "Divider direction."
    },
    {
      "name": "decorative",
      "type": "boolean",
      "default": "true",
      "description": "Removes separator semantics when decorative."
    }
  ]
};
