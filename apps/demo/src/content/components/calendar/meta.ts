import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "calendar",
  "title": "Calendar",
  "description": "An inline date grid with single and range selection, keyboard navigation and locale-aware weeks. Use DatePicker for an input-style field.",
  "category": "Forms",
  "imports": "import { Calendar } from \"@nphuonha/ui-kit\";",
  "examples": [
    {
      "title": "Range selection",
      "description": "Set mode to range and use a { from, to } value. Hovering previews the second endpoint.",
      "demoKey": "calendar-range"
    },
    {
      "title": "Compact size",
      "description": "Use size=\"sm\" for tighter layouts. For an input-style field, use DatePicker.",
      "demoKey": "calendar-compact"
    },
    {
      "title": "Constraints",
      "description": "Limit selectable days with min, max and a disabled predicate.",
      "demoKey": "calendar-constraints"
    }
  ]
};
