import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "meter",
  "title": "Meter",
  "description": "A measurement gauge for quota, usage and capacity, with native threshold semantics.",
  "category": "Feedback",
  "imports": "import { Meter } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "value",
      "type": "number",
      "description": "Current measurement."
    },
    {
      "name": "min",
      "type": "number",
      "default": "0",
      "description": "Lower bound of the range."
    },
    {
      "name": "max",
      "type": "number",
      "default": "100",
      "description": "Upper bound of the range."
    },
    {
      "name": "low",
      "type": "number",
      "description": "Upper bound of the low zone, matching the native meter element."
    },
    {
      "name": "high",
      "type": "number",
      "description": "Lower bound of the high zone, matching the native meter element."
    },
    {
      "name": "optimum",
      "type": "number",
      "description": "Best value in the range. Setting it derives a success, warning or danger tone."
    },
    {
      "name": "label",
      "type": "ReactNode",
      "description": "Visible label, wired to the meter for assistive technology."
    },
    {
      "name": "showValue",
      "type": "boolean",
      "default": "false",
      "description": "Show the formatted value beside the label."
    },
    {
      "name": "formatValue",
      "type": "(formatted: string, value: number) => ReactNode",
      "description": "Customize the visible value, for example with a unit."
    },
    {
      "name": "size",
      "type": "\"sm\" | \"default\" | \"lg\"",
      "default": "\"default\"",
      "description": "Track height."
    },
    {
      "name": "tone",
      "type": "\"primary\" | \"success\" | \"warning\" | \"danger\"",
      "description": "Explicit indicator tone. Overrides the tone derived from optimum."
    },
    {
      "name": "aria-label",
      "type": "string",
      "description": "Accessible name when no visible label is rendered."
    }
  ],
  "examples": [
    {
      "title": "Thresholds",
      "description": "Set low, high and optimum to let the meter choose the semantic tone.",
      "demoKey": "meter-thresholds"
    },
    {
      "title": "Sizes and units",
      "description": "Use formatValue for units and size to match the surrounding layout.",
      "demoKey": "meter-sizes"
    }
  ]
};
