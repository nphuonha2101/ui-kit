import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "toggle",
  "title": "Toggle",
  "description": "A two-state button for saved, liked and other on/off actions.",
  "category": "Actions",
  "imports": "import { Toggle } from \"@nphuonha/ui-kit\";\nimport {\n  BellIcon,\n  BookmarkSimpleIcon,\n  HeartIcon,\n  StarIcon,\n} from \"@phosphor-icons/react\";",
  "props": [
    {
      "name": "pressed",
      "type": "boolean",
      "description": "Controlled pressed state."
    },
    {
      "name": "defaultPressed",
      "type": "boolean",
      "default": "false",
      "description": "Initial pressed state for an uncontrolled toggle."
    },
    {
      "name": "onPressedChange",
      "type": "(pressed: boolean) => void",
      "description": "Called when the pressed state changes."
    },
    {
      "name": "variant",
      "type": "\"default\" | \"outline\"",
      "default": "\"default\"",
      "description": "Visual emphasis of the toggle."
    },
    {
      "name": "size",
      "type": "\"sm\" | \"default\" | \"lg\" | \"icon\" | \"icon-sm\"",
      "default": "\"default\"",
      "description": "Control height, padding and icon-only sizing."
    },
    {
      "name": "shape",
      "type": "\"rounded\" | \"pill\"",
      "default": "\"rounded\"",
      "description": "Corner treatment."
    },
    {
      "name": "startIcon",
      "type": "IconComponent",
      "description": "Icon rendered before the label."
    },
    {
      "name": "endIcon",
      "type": "IconComponent",
      "description": "Icon rendered after the label."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables the toggle."
    }
  ],
  "examples": [
    {
      "title": "Sizes and shapes",
      "description": "Use icon-only sizes for compact toolbars, pills for filters.",
      "demoKey": "toggle-sizes"
    }
  ]
};
