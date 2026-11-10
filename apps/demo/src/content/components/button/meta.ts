import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "button",
  "title": "Button",
  "description": "Triggers an action or event. Supports variants, sizes, icons, and disabled and loading states; use ButtonLink for navigation.",
  "category": "Actions",
  "imports": "import { Button } from \"@nphuonha/ui-kit\";\nimport { PlusIcon } from \"@phosphor-icons/react\";",
  "examples": [
    {
      "title": "Sizes and shapes",
      "description": "Use size to match density and shape to soften an action.",
      "demoKey": "button-sizes"
    },
    {
      "title": "Disabled and loading",
      "description": "Disabled buttons keep their label, drop their raised shadow and ignore clicks. Loading also disables interaction.",
      "demoKey": "button-states"
    }
  ]
};
