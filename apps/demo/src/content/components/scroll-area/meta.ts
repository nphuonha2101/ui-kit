import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "scroll-area",
  "title": "ScrollArea",
  "description": "A custom scroll container with auto-hiding, token-styled scrollbars and optional horizontal scrolling.",
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
      "name": "scrollbar",
      "type": "\"auto\" | \"hidden\"",
      "default": "\"auto\"",
      "description": "Auto shows the scrollbar on hover, focus or scroll. Hidden keeps scrolling without a visible bar."
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
  ],
  "examples": [
    {
      "title": "Hidden scrollbar",
      "description": "Keep the area scrollable without a visible bar. Use it when another scroll cue is present.",
      "demoKey": "scroll-area-hidden-scrollbar"
    }
  ]
};
