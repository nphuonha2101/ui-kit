import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "desktop-nav",
  "title": "DesktopNav",
  "description": "A horizontal pill navigation for desktop headers, toolbars and section switchers.",
  "category": "Navigation",
  "imports": "import { DesktopNav } from \"@nphuonha/ui-kit\";",
  "extraProps": [
    {
      "name": "items[].children",
      "type": "DesktopNavItem[]",
      "description": "Nested items rendered as a submenu. Children can nest again for multi-level menus."
    }
  ],
  "examples": [
    {
      "title": "Submenus and nested levels",
      "description": "Items with children open a dropdown; children can nest again for multi-level menus.",
      "demoKey": "desktop-nav-submenu"
    },
    {
      "title": "Three-segment header",
      "description": "Logo, centered navigation and actions. Container queries switch to a collapsible Sheet menu with an optional logo on narrow widths.",
      "demoKey": "desktop-nav-header"
    }
  ]
};
