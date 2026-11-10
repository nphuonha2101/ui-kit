import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "combobox",
  "title": "Combobox",
  "description": "A searchable select with single or multiple selection, chips and empty states.",
  "category": "Forms",
  "imports": "import { Combobox, Field } from \"@nphuonha/ui-kit\";",
  "examples": [
    {
      "title": "Multiple selection",
      "description": "Set multiple to keep several values as removable chips.",
      "demoKey": "combobox-multiple"
    },
    {
      "title": "Async-friendly empty state",
      "description": "Customize the message shown when the query has no matches.",
      "demoKey": "combobox-empty"
    }
  ]
};
