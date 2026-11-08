import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "icon-button",
  "title": "IconButton",
  "description": "A compact icon-only button with an accessible label.",
  "category": "Actions",
  "imports": "import { IconButton } from \"@nphuonha/ui-kit\";\nimport { CopyIcon, HeartIcon, MagnifyingGlassIcon, ShareIcon } from \"@phosphor-icons/react\";",
  "props": [
    {
      "name": "aria-label",
      "type": "string",
      "description": "Required accessible name for the action."
    },
    {
      "name": "variant",
      "type": "\"primary\" | \"secondary\" | \"outline\" | \"ghost\" | \"soft\" | \"danger\"",
      "default": "\"primary\"",
      "description": "Visual emphasis."
    },
    {
      "name": "size",
      "type": "\"icon\" | \"icon-sm\"",
      "default": "\"icon\"",
      "description": "Square control size."
    },
    {
      "name": "shape",
      "type": "\"rounded\" | \"pill\"",
      "default": "\"rounded\"",
      "description": "Corner treatment."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables the button."
    }
  ]
};
