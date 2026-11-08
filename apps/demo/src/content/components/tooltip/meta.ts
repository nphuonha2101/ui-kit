import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "tooltip",
  "title": "Tooltip",
  "description": "A short contextual label shown on hover or focus.",
  "category": "Overlays",
  "imports": "import { IconButton, Tooltip } from \"@nphuonha/ui-kit\";\nimport { CopyIcon, MagnifyingGlassIcon, ShareIcon } from \"@phosphor-icons/react\";",
  "props": [
    {
      "name": "content",
      "type": "ReactNode",
      "description": "Tooltip text."
    },
    {
      "name": "children",
      "type": "ReactElement",
      "description": "Trigger element."
    },
    {
      "name": "side",
      "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
      "default": "\"top\"",
      "description": "Preferred placement."
    },
    {
      "name": "align",
      "type": "\"start\" | \"center\" | \"end\"",
      "default": "\"center\"",
      "description": "Alignment along the trigger."
    },
    {
      "name": "delay",
      "type": "number",
      "default": "300",
      "description": "Open delay in milliseconds."
    }
  ]
};
