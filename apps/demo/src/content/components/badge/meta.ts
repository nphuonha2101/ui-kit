import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "badge",
  "title": "Badge",
  "description": "A compact status or count label in solid tonal colors.",
  "category": "Data Display",
  "imports": "import { Badge } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "variant",
      "type": "\"neutral\" | \"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\" | \"solid\" | \"outline\"",
      "default": "\"neutral\"",
      "description": "Tone of the badge."
    }
  ]
};
