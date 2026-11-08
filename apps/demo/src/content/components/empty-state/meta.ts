import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "empty-state",
  "title": "EmptyState",
  "description": "A centered empty state with an icon, title, description and optional action.",
  "category": "Feedback",
  "imports": "import { EmptyState } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "icon",
      "type": "IconComponent",
      "description": "Optional icon shown in a soft circular well."
    },
    {
      "name": "title",
      "type": "ReactNode",
      "description": "Primary empty state message."
    },
    {
      "name": "description",
      "type": "ReactNode",
      "description": "Supporting copy with the next step."
    },
    {
      "name": "action",
      "type": "ReactNode",
      "description": "Optional action, usually a Button."
    },
    {
      "name": "size",
      "type": "\"sm\" | \"default\"",
      "default": "\"default\"",
      "description": "Compact spacing for nested panels."
    }
  ]
};
