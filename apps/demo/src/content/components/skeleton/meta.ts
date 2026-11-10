import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "skeleton",
  "title": "Skeleton",
  "description": "A pulsing placeholder that preserves layout while content loads.",
  "category": "Feedback",
  "imports": "import { Skeleton } from \"@nphuonha/ui-kit\";",
  "examples": [
    {
      "title": "Text lines",
      "description": "Use lines to stand in for a paragraph.",
      "demoKey": "skeleton-lines"
    },
    {
      "title": "Card placeholder",
      "description": "Compose primitives into a believable loading card.",
      "demoKey": "skeleton-card"
    }
  ]
};
