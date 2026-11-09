import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "number-field",
  "title": "NumberField",
  "description": "A stepper number input with min/max, step, formatting and keyboard support.",
  "category": "Forms",
  "imports": "import { NumberField } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "value",
      "type": "number | null",
      "description": "Controlled numeric value."
    },
    {
      "name": "defaultValue",
      "type": "number",
      "description": "Initial value for uncontrolled usage."
    },
    {
      "name": "onValueChange",
      "type": "(value: number | null) => void",
      "description": "Called when the value changes."
    },
    {
      "name": "min",
      "type": "number",
      "description": "Minimum allowed value."
    },
    {
      "name": "max",
      "type": "number",
      "description": "Maximum allowed value."
    },
    {
      "name": "step",
      "type": "number",
      "default": "1",
      "description": "Increment used by the buttons and arrow keys."
    },
    {
      "name": "format",
      "type": "Intl.NumberFormatOptions",
      "description": "Formatting options for display and input."
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
      "name": "required",
      "type": "boolean",
      "description": "Marks the label and native input as required."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables the control."
    }
  ]
};
