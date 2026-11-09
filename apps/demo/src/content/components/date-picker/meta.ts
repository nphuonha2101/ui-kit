import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "date-picker",
  "title": "DatePicker",
  "description": "An input-style date field that opens a Calendar in a popover, with clear and today shortcuts, constraints and form support.",
  "category": "Forms",
  "imports": "import { DatePicker } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "value",
      "type": "Date | null",
      "description": "Controlled selected date."
    },
    {
      "name": "defaultValue",
      "type": "Date | null",
      "description": "Initial date for uncontrolled usage."
    },
    {
      "name": "defaultMonth",
      "type": "Date",
      "description": "Initial month shown in the popup."
    },
    {
      "name": "onValueChange",
      "type": "(value: Date | null) => void",
      "description": "Called when a date is selected or cleared."
    },
    {
      "name": "onBlur",
      "type": "FocusEventHandler<HTMLButtonElement>",
      "description": "Blur handler for react-hook-form."
    },
    {
      "name": "min",
      "type": "Date",
      "description": "Earliest selectable day."
    },
    {
      "name": "max",
      "type": "Date",
      "description": "Latest selectable day."
    },
    {
      "name": "dateDisabled",
      "type": "(date: Date) => boolean",
      "description": "Disables individual days."
    },
    {
      "name": "locale",
      "type": "Intl.LocalesArgument",
      "description": "Locale used for the trigger label and calendar."
    },
    {
      "name": "weekStartsOn",
      "type": "0 | 1 | 2 | 3 | 4 | 5 | 6",
      "description": "First day of the week. Defaults to the locale's week info."
    },
    {
      "name": "showOutsideDays",
      "type": "boolean",
      "default": "true",
      "description": "Renders days from the previous and next months."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables the trigger."
    },
    {
      "name": "required",
      "type": "boolean",
      "description": "Marks the label as required."
    },
    {
      "name": "clearable",
      "type": "boolean",
      "default": "false",
      "description": "Adds a Clear action to the popup."
    },
    {
      "name": "showToday",
      "type": "boolean",
      "default": "false",
      "description": "Adds a Today action to the popup."
    },
    {
      "name": "name",
      "type": "string",
      "description": "Name for a hidden input with a YYYY-MM-DD value."
    },
    {
      "name": "label",
      "type": "ReactNode",
      "description": "Visible label."
    },
    {
      "name": "description",
      "type": "ReactNode",
      "description": "Helper text."
    },
    {
      "name": "error",
      "type": "ReactNode",
      "description": "Error message and invalid state."
    },
    {
      "name": "placeholder",
      "type": "ReactNode",
      "default": "\"Pick a date\"",
      "description": "Text shown when no date is selected."
    }
  ],
  "examples": [
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
