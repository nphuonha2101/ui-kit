import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "progress",
  "title": "Progress",
  "description": "A determinate or indeterminate bar for uploads, setup flows and long-running tasks.",
  "category": "Feedback",
  "imports": "import { Progress } from \"@nphuonha/ui-kit\";",
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
