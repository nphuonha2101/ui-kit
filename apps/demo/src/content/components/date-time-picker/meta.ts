import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "date-time-picker",
  "title": "DateTimePicker",
  "description": "A local-time date and time field built on Calendar and TimeField, with single or range selection, default times, min/max constraints and clear/now shortcuts.",
  "category": "Forms",
  "imports": "import { DateTimePicker } from \"@nphuonha/ui-kit\";",
  "examples": [
    {
      "title": "Range selection",
      "description": "Set mode=\"range\" and use a { from, to } value. Each endpoint keeps its own time.",
      "demoKey": "date-time-picker-range"
    },
    {
      "title": "Constraints",
      "description": "Limit selectable days and times with min/max and a disabled-day predicate.",
      "demoKey": "date-time-picker-constraints"
    },
    {
      "title": "Now and clear",
      "description": "Add Now and Clear actions for scheduling flows.",
      "demoKey": "date-time-picker-actions"
    },
    {
      "title": "States",
      "description": "Disabled and invalid states share the same field styling as DatePicker.",
      "demoKey": "date-time-picker-states"
    }
  ]
};
