import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "scroll-area",
  "title": "ScrollArea",
  "description": "A custom scroll container with token-styled scrollbars and optional horizontal scrolling.",
  "category": "Data Display",
  "imports": "import { ScrollArea } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "orientation",
      "type": "\"vertical\" | \"horizontal\" | \"both\"",
      "default": "\"vertical\"",
      "description": "Which scrollbars to render."
    },
    {
      "name": "viewportClassName",
      "type": "string",
      "description": "Extra classes for the scrollable viewport."
    },
    {
      "name": "contentClassName",
      "type": "string",
      "description": "Extra classes for the content wrapper."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Extra classes for the root; set a height or max-height here."
    }
  ]
};
