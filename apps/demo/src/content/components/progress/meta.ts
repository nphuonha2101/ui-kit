import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "progress",
  "title": "Progress",
  "description": "A determinate or indeterminate bar for uploads, setup flows and long-running tasks.",
  "category": "Feedback",
  "imports": "import { Progress } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "value",
      "type": "number | null",
      "description": "Current value. Pass null for an indeterminate bar."
    },
    {
      "name": "min",
      "type": "number",
      "default": "0",
      "description": "Lower bound of the value range."
    },
    {
      "name": "max",
      "type": "number",
      "default": "100",
      "description": "Upper bound of the value range."
    },
    {
      "name": "label",
      "type": "ReactNode",
      "description": "Visible label, wired to the progress bar for assistive technology."
    },
    {
      "name": "showValue",
      "type": "boolean",
      "default": "false",
      "description": "Show the formatted percentage beside the label."
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
      "default": "\"primary\"",
      "description": "Semantic color of the indicator."
    },
    {
      "name": "aria-label",
      "type": "string",
      "description": "Accessible name when no visible label is rendered."
    }
  ],
  "examples": [
    {
      "title": "Indeterminate",
      "description": "Pass null when the duration is unknown.",
      "demoKey": "progress-indeterminate"
    },
    {
      "title": "Tones and sizes",
      "description": "Match the indicator to the meaning of the task.",
      "demoKey": "progress-tones"
    }
  ]
};
