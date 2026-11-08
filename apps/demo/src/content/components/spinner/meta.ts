import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "spinner",
  "title": "Spinner",
  "description": "A small, token-colored loading indicator.",
  "category": "Feedback",
  "imports": "import { Button, Spinner } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "size",
      "type": "number",
      "default": "18",
      "description": "Pixel size of the icon."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Extra classes."
    }
  ]
};
