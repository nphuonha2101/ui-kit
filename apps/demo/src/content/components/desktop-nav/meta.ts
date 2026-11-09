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
      "description": "Value/label entries. Add optional icon, activeIcon, href, badge, disabled or children per item."
    },
    {
      "name": "items[].children",
      "type": "DesktopNavItem[]",
      "description": "Nested items rendered as a submenu. Children can nest again for multi-level menus."
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
    },
    {
      "title": "Navigation with logo",
      "description": "A compact logo and horizontal navigation bar.",
      "demoKey": "desktop-nav-logo"
    }
  ]
};
