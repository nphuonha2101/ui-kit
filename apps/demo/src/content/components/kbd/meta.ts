import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "kbd",
  "title": "Kbd",
  "description": "Compact keyboard key caps for shortcuts and command hints.",
  "category": "Data Display",
  "imports": "import { Kbd, KbdGroup } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "size",
      "type": "\"sm\" | \"default\"",
      "default": "\"default\"",
      "description": "Key cap height and type scale."
    },
    {
      "name": "KbdGroup",
      "type": "component",
      "description": "Inline wrapper that spaces multiple keys."
    }
  ]
};
