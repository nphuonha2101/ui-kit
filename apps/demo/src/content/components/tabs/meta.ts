import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "tabs",
  "title": "Tabs",
  "description": "Segmented navigation with a sliding active pill.",
  "category": "Navigation",
  "imports": "import { Tabs } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "items",
      "type": "TabItem[]",
      "description": "Value/label/content entries."
    },
    {
      "name": "value",
      "type": "string",
      "description": "Controlled active value."
    },
    {
      "name": "defaultValue",
      "type": "string",
      "description": "Uncontrolled initial value."
    },
    {
      "name": "onValueChange",
      "type": "(value: string) => void",
      "description": "Called when the active tab changes."
    },
    {
      "name": "listClassName",
      "type": "string",
      "description": "Extra classes for the tab list."
    }
  ],
  "examples": [
    {
      "title": "Settings tabs",
      "description": "Tabs can hold any content, not only text.",
      "demoKey": "tabs-settings"
    }
  ]
};
