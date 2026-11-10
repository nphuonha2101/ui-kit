import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "collapsible",
  "title": "Collapsible",
  "description": "A single expandable panel for advanced filters, details and progressive disclosure.",
  "category": "Data Display",
  "imports": "import { Collapsible } from \"@nphuonha/ui-kit\";",
  "examples": [
    {
      "title": "Separated card",
      "description": "Use the separated variant when the panel sits in a stack of cards.",
      "demoKey": "collapsible-separated"
    },
    {
      "title": "Plain disclosure",
      "description": "The plain variant is a bare trigger for inline content.",
      "demoKey": "collapsible-plain"
    }
  ]
};
