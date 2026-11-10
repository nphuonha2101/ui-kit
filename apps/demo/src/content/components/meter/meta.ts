import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "meter",
  "title": "Meter",
  "description": "A measurement gauge for quota, usage and capacity, with native threshold semantics.",
  "category": "Feedback",
  "imports": "import { Meter } from \"@nphuonha/ui-kit\";",
  "examples": [
    {
      "title": "Thresholds",
      "description": "Set low, high and optimum to let the meter choose the semantic tone.",
      "demoKey": "meter-thresholds"
    },
    {
      "title": "Sizes and units",
      "description": "Use formatValue for units and size to match the surrounding layout.",
      "demoKey": "meter-sizes"
    }
  ]
};
