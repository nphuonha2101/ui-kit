import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "slider",
  "title": "Slider",
  "description": "A single or range value slider with a soft inset track and pill thumb.",
  "category": "Forms",
  "imports": "import { Slider } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "value",
      "type": "number | readonly number[]",
      "description": "Controlled value. Pass an array for a range slider."
    },
    {
      "name": "defaultValue",
      "type": "number | readonly number[]",
      "description": "Initial value for an uncontrolled slider."
    },
    {
      "name": "onValueChange",
      "type": "(value: number | readonly number[]) => void",
      "description": "Called while the value changes."
    },
    {
      "name": "min",
      "type": "number",
      "default": "0",
      "description": "Minimum value."
    },
    {
      "name": "max",
      "type": "number",
      "default": "100",
      "description": "Maximum value."
    },
    {
      "name": "step",
      "type": "number",
      "default": "1",
      "description": "Step increment."
    },
    {
      "name": "label",
      "type": "ReactNode",
      "description": "Visible label associated with the slider."
    },
    {
      "name": "description",
      "type": "ReactNode",
      "description": "Helper text below the control."
    },
    {
      "name": "error",
      "type": "ReactNode",
      "description": "Error message and invalid state."
    },
    {
      "name": "showValue",
      "type": "boolean",
      "default": "false",
      "description": "Show the formatted value next to the label."
    },
    {
      "name": "formatValue",
      "type": "(value: number) => ReactNode",
      "description": "Custom value formatter."
    },
    {
      "name": "marks",
      "type": "SliderMark[]",
      "description": "Optional tick labels rendered below a horizontal slider."
    },
    {
      "name": "orientation",
      "type": "\"horizontal\" | \"vertical\"",
      "default": "\"horizontal\"",
      "description": "Slider direction."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables the slider."
    }
  ]
};
