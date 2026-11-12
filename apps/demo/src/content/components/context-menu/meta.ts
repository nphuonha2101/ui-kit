import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "context-menu",
  "title": "Context Menu",
  "description": "A right-click menu with the same entries API as Menu: items, shortcuts, danger items and submenus.",
  "category": "Actions",
  "imports": "import { ContextMenu } from \"@nphuonha/ui-kit\";",
  "examples": [
    {
      "title": "Submenu",
      "description": "Nest a submenu for secondary actions such as export formats.",
      "demoKey": "context-menu-submenu"
    }
  ]
};
