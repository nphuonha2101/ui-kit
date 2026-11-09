import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "mobile-nav",
  "title": "MobileNav",
  "description": "A compact mobile menu with an optional logo, collapsible submenus and multi-level items.",
  "category": "Navigation",
  "imports": "import { MobileNav } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "items",
      "type": "MobileNavItem[]",
      "description": "Navigation items. Items with children render as collapsible groups and can nest further."
    },
    {
      "name": "open",
      "type": "boolean",
      "description": "Controlled open state."
    },
    {
      "name": "defaultOpen",
      "type": "boolean",
      "description": "Uncontrolled initial open state."
    },
    {
      "name": "onOpenChange",
      "type": "(open: boolean) => void",
      "description": "Called when the menu opens or closes."
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
      "description": "Called when a leaf item is selected."
    },
    {
      "name": "trigger",
      "type": "ReactElement",
      "description": "Custom trigger. Defaults to an IconButton with a menu icon."
    },
    {
      "name": "logo",
      "type": "ReactNode",
      "description": "Brand or page mark rendered above the menu."
    },
    {
      "name": "title",
      "type": "ReactNode",
      "description": "Optional visible menu title."
    },
    {
      "name": "description",
      "type": "ReactNode",
      "description": "Optional supporting copy."
    },
    {
      "name": "children",
      "type": "ReactNode",
      "description": "Extra content below the navigation, such as account or theme controls."
    },
    {
      "name": "footer",
      "type": "ReactNode",
      "description": "Actions rendered at the bottom of the menu."
    },
    {
      "name": "side",
      "type": "\"right\" | \"left\" | \"bottom\"",
      "default": "\"right\"",
      "description": "Panel edge."
    },
    {
      "name": "aria-label",
      "type": "string",
      "default": "\"Menu\"",
      "description": "Accessible name when no visible title is provided."
    }
  ]
};
