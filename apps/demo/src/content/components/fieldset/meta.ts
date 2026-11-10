import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "fieldset",
  "title": "Fieldset",
  "description": "An accessible group of related fields with a shared legend and disabled state.",
  "category": "Forms",
  "imports": "import { Field, Fieldset, Input } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "legend",
      "type": "ReactNode",
      "description": "Accessible name for the group, rendered as the fieldset legend."
    },
    {
      "name": "description",
      "type": "ReactNode",
      "description": "Helper text shown under the legend."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables every field inside the group."
    },
    {
      "name": "children",
      "type": "ReactNode",
      "description": "Fields and controls to group."
    },
    {
      "name": "contentClassName",
      "type": "string",
      "description": "Additional classes for the inner field stack."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Additional classes for the fieldset element."
    }
  ],
  "examples": [
    {
      "title": "Disabled group",
      "description": "The disabled state flows to every control inside the fieldset.",
      "demoKey": "fieldset-disabled"
    }
  ]
};
