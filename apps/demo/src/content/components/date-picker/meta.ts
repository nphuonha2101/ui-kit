import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "date-picker",
  "title": "DatePicker",
  "description": "An input-style date field that opens a Calendar in a popover for single dates or ranges, with clear/today shortcuts, constraints and form support.",
  "category": "Forms",
  "imports": "import { DatePicker } from \"@nphuonha/ui-kit\";",
  "examples": [
    {
      "title": "Range selection",
      "description": "Set mode=\"range\" and use a { from, to } value. The popup closes after both endpoints are selected.",
      "demoKey": "date-picker-range"
    },
    {
      "title": "Clearable",
      "description": "Add a Clear action when the date is optional.",
      "demoKey": "date-picker-clearable"
    },
    {
      "title": "Constraints",
      "description": "Limit selectable days with min, max and a disabled predicate.",
      "demoKey": "date-picker-constraints"
    },
    {
      "title": "States",
      "description": "Disabled and invalid states share the same field styling as Input.",
      "demoKey": "date-picker-states"
    }
  ]
};
