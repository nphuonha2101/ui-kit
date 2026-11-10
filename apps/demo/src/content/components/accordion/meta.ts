import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "accordion",
  "title": "Accordion",
  "description": "A vertically stacked set of expandable panels for FAQs, settings and dense content.",
  "category": "Data Display",
  "imports": "import { Accordion } from \"@nphuonha/ui-kit\";\nimport {\n  ArrowUUpLeftIcon,\n  ShieldCheckIcon,\n  TruckIcon,\n} from \"@phosphor-icons/react\";",
  "examples": [
    {
      "title": "Multiple open panels",
      "description": "Set multiple to let readers keep several answers open.",
      "demoKey": "accordion-multiple"
    },
    {
      "title": "Separated cards",
      "description": "Use separated when each panel should stand on its own.",
      "demoKey": "accordion-separated"
    }
  ]
};
