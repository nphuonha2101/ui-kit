import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "alert",
  "title": "Alert",
  "description": "A tonal feedback surface for information, success, warning or danger.",
  "category": "Feedback",
  "imports": "import { Alert } from \"@nphuonha/ui-kit\";\nimport { CheckCircleIcon, InfoIcon, WarningIcon } from \"@phosphor-icons/react\";",
  "props": [
    {
      "name": "variant",
      "type": "\"neutral\" | \"info\" | \"success\" | \"warning\" | \"danger\"",
      "default": "\"neutral\"",
      "description": "Tone of the alert."
    },
    {
      "name": "title",
      "type": "string",
      "description": "Bold heading."
    },
    {
      "name": "icon",
      "type": "IconComponent",
      "description": "Optional leading icon."
    },
    {
      "name": "children",
      "type": "ReactNode",
      "description": "Supporting message."
    }
  ]
};
