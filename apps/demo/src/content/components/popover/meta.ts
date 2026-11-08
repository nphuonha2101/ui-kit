import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "popover",
  "title": "Popover",
  "description": "A small floating surface anchored to a trigger.",
  "category": "Overlays",
  "imports": "import { Button, Input, Popover } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "trigger",
      "type": "ReactElement",
      "description": "Element that opens the popover."
    },
    {
      "name": "title",
      "type": "ReactNode",
      "description": "Optional title."
    },
    {
      "name": "description",
      "type": "ReactNode",
      "description": "Optional supporting text."
    },
    {
      "name": "side",
      "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
      "default": "\"bottom\"",
      "description": "Preferred placement."
    },
    {
      "name": "align",
      "type": "\"start\" | \"center\" | \"end\"",
      "default": "\"center\"",
      "description": "Alignment along the trigger."
    }
  ]
};
