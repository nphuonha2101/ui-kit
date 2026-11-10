import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "menu",
  "title": "Menu",
  "description": "A keyboard-accessible action menu with groups, shortcuts, danger items and submenus.",
  "category": "Actions",
  "imports": "import { Button, Menu } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "trigger",
      "type": "ReactElement",
      "description": "Element that opens the menu. It receives the trigger props and keyboard behavior."
    },
    {
      "name": "items",
      "type": "MenuEntry[]",
      "description": "Menu entries: items, separators, labels, groups and submenus."
    },
    {
      "name": "side",
      "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
      "default": "\"bottom\"",
      "description": "Preferred side of the trigger."
    },
    {
      "name": "align",
      "type": "\"start\" | \"center\" | \"end\"",
      "default": "\"center\"",
      "description": "Alignment against the trigger."
    },
    {
      "name": "sideOffset",
      "type": "number",
      "default": "6",
      "description": "Gap between the trigger and the popup."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Additional classes for the popup."
    },
    {
      "name": "aria-label",
      "type": "string",
      "description": "Accessible name for the menu popup."
    }
  ],
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
