import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "desktop-nav",
  "title": "DesktopNav",
  "description": "A horizontal pill navigation for desktop headers, toolbars and section switchers.",
  "category": "Navigation",
  "imports": "import { DesktopNav } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "items",
      "type": "DesktopNavItem[]",
      "description": "Value/label entries. Add optional icon, activeIcon, href, badge or disabled per item."
    },
    {
      "name": "value",
      "type": "string",
      "description": "Controlled active value."
    },
    {
      "name": "defaultValue",
      "type": "string",
      "description": "Uncontrolled initial active value."
    },
    {
      "name": "onValueChange",
      "type": "(value: string) => void",
      "description": "Called when the active item changes."
    },
    {
      "name": "aria-label",
      "type": "string",
      "default": "\"Desktop navigation\"",
      "description": "Accessible name for the navigation landmark."
    }
  ]
};
