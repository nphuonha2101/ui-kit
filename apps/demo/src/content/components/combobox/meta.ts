import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "combobox",
  "title": "Combobox",
  "description": "A searchable select with single or multiple selection, chips and empty states.",
  "category": "Forms",
  "imports": "import { Combobox, Field } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "options",
      "type": "ComboboxOption[]",
      "description": "Value/label entries with optional description and disabled state."
    },
    {
      "name": "multiple",
      "type": "boolean",
      "default": "false",
      "description": "Allow more than one selected value. Selected values render as removable chips."
    },
    {
      "name": "value",
      "type": "string | string[] | null",
      "description": "Controlled value: a string in single mode, an array in multiple mode."
    },
    {
      "name": "defaultValue",
      "type": "string | string[] | null",
      "description": "Uncontrolled initial value."
    },
    {
      "name": "onValueChange",
      "type": "(value: string | string[] | null) => void",
      "description": "Called with the next value when the selection changes."
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "\"Search…\"",
      "description": "Input placeholder shown before a value is selected."
    },
    {
      "name": "emptyMessage",
      "type": "ReactNode",
      "default": "\"No results found.\"",
      "description": "Message shown when no option matches the query."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables the input, trigger and option list."
    },
    {
      "name": "required",
      "type": "boolean",
      "description": "Marks the native control as required. The visible * comes from Field or FormField."
    },
    {
      "name": "error",
      "type": "boolean",
      "description": "Applies the invalid visual state."
    },
    {
      "name": "name",
      "type": "string",
      "description": "Name used when the owning form is submitted."
    },
    {
      "name": "aria-label",
      "type": "string",
      "description": "Accessible name when no visible label is rendered."
    }
  ],
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
