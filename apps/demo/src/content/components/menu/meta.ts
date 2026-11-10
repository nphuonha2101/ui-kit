import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "menu",
  "title": "Menu",
  "description": "A keyboard-accessible action menu with groups, shortcuts, danger items and submenus.",
  "category": "Actions",
  "imports": "import { Button, Menu } from \"@nphuonha/ui-kit\";",
  "examples": [
    {
      "title": "Groups and shortcuts",
      "description": "Use labels, separators and shortcut hints to organize actions.",
      "demoKey": "menu-groups"
    },
    {
      "title": "Submenu",
      "description": "Nest a submenu for secondary actions such as export formats.",
      "demoKey": "menu-submenu"
    }
  ]
};
