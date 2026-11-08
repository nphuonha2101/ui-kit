import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "bottom-nav",
  "title": "BottomNav",
  "description": "A mobile-first bottom navigation bar with icon, label, badge and active states.",
  "category": "Navigation",
  "imports": "import { BottomNav } from \"@nphuonha/ui-kit\";\nimport { BookmarkSimpleIcon, HouseIcon, MagnifyingGlassIcon, UserIcon } from \"@phosphor-icons/react\";",
  "props": [
    {
      "name": "items",
      "type": "BottomNavItem[]",
      "description": "Value/label/icon entries. activeIcon swaps the icon for the selected item; add href, badge or disabled per item."
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
      "name": "fixed",
      "type": "boolean",
      "default": "false",
      "description": "Pins the bar to the bottom of the viewport with a safe-area offset."
    },
    {
      "name": "aria-label",
      "type": "string",
      "default": "\"Bottom navigation\"",
      "description": "Accessible name for the navigation landmark."
    }
  ]
};
