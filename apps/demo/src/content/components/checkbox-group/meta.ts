import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "checkbox-group",
  "title": "Checkbox Group",
  "description": "A labelled set of checkboxes with shared value, description, error and disabled state.",
  "category": "Forms",
  "imports": "import { CheckboxGroup } from \"@nphuonha/ui-kit\";",
  "examples": [
    {
      "title": "Horizontal",
      "description": "Use a row layout for compact groups with short labels.",
      "demoKey": "checkbox-group-horizontal"
    },
    {
      "title": "Invalid",
      "description": "Show a group-level error while keeping every checkbox accessible.",
      "demoKey": "checkbox-group-error"
    }
  ]
};
