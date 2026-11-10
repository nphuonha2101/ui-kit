import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "preview-card",
  "title": "Preview Card",
  "description": "A hover or focus card for profile, link and entity previews without leaving the page.",
  "category": "Overlays",
  "imports": "import { PreviewCard } from \"@nphuonha/ui-kit\";",
  "examples": [
    {
      "title": "Entity preview",
      "description": "Preview a task or issue with metadata and a short summary.",
      "demoKey": "preview-card-issue"
    },
    {
      "title": "Top placement",
      "description": "Use side to keep the card inside the viewport near the bottom of the page.",
      "demoKey": "preview-card-top"
    }
  ]
};
