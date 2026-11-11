import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "time-field",
  "title": "TimeField",
  "description": "An accessible segmented time input with locale-aware hour cycles, minute steps, min/max constraints and a canonical 24-hour HH:mm value.",
  "category": "Forms",
  "imports": "import { TimeField } from \"@nphuonha/ui-kit\";",
  "examples": [
    {
      "title": "12-hour clock",
      "description": "Set hourCycle={12} to show an AM/PM segment while keeping the value in 24-hour form.",
      "demoKey": "time-field-twelve-hour"
    },
    {
      "title": "Steps and constraints",
      "description": "Use step for quarter-hour increments and min/max to clamp selectable times.",
      "demoKey": "time-field-constraints"
    },
    {
      "title": "States",
      "description": "Disabled, read-only, clearable and invalid states share the same field styling.",
      "demoKey": "time-field-states"
    }
  ]
};
