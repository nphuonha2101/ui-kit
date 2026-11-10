import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "checkbox-group",
  "title": "Checkbox Group",
  "description": "A labelled set of checkboxes with shared value, description, error and disabled state.",
  "category": "Forms",
  "imports": "import { CheckboxGroup } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "options",
      "type": "CheckboxGroupOption[]",
      "description": "Option entries: value, label, and optional description or disabled state."
    },
    {
      "name": "value",
      "type": "string[]",
      "description": "Controlled list of selected option values."
    },
    {
      "name": "defaultValue",
      "type": "string[]",
      "description": "Initial selection for an uncontrolled group."
    },
    {
      "name": "onValueChange",
      "type": "(value: string[]) => void",
      "description": "Called with the next selected values."
    },
    {
      "name": "label",
      "type": "ReactNode",
      "description": "Visible group label."
    },
    {
      "name": "description",
      "type": "ReactNode",
      "description": "Helper text below the options."
    },
    {
      "name": "error",
      "type": "ReactNode",
      "description": "Error message and invalid state for the group."
    },
    {
      "name": "required",
      "type": "boolean",
      "description": "Marks the group as required. Validation stays with your form layer."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables every checkbox in the group."
    },
    {
      "name": "orientation",
      "type": "\"vertical\" | \"horizontal\"",
      "default": "\"vertical\"",
      "description": "Stack options or lay them out in a wrapping row."
    },
    {
      "name": "name",
      "type": "string",
      "description": "Shared input name used for native form submission."
    }
  ],
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
