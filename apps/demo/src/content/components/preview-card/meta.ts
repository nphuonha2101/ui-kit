import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "preview-card",
  "title": "Preview Card",
  "description": "A hover or focus card for profile, link and entity previews without leaving the page.",
  "category": "Overlays",
  "imports": "import { PreviewCard } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "trigger",
      "type": "ReactElement",
      "description": "Link or button that opens the preview card."
    },
    {
      "name": "children",
      "type": "ReactNode",
      "description": "Preview content."
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
      "default": "8",
      "description": "Gap between the trigger and the card."
    },
    {
      "name": "delay",
      "type": "number",
      "default": "400",
      "description": "Hover delay before the card opens, in milliseconds."
    },
    {
      "name": "closeDelay",
      "type": "number",
      "default": "200",
      "description": "Delay before the card closes after the pointer leaves, in milliseconds."
    },
    {
      "name": "open",
      "type": "boolean",
      "description": "Controlled open state."
    },
    {
      "name": "defaultOpen",
      "type": "boolean",
      "description": "Initial open state for an uncontrolled card."
    },
    {
      "name": "onOpenChange",
      "type": "(open: boolean) => void",
      "description": "Called when the card opens or closes."
    }
  ],
  "examples": [
    {
      "title": "Entity preview",
      "description": "Preview a task or issue with metadata and a short summary.",
      "demoKey": "preview-card-issue"
    },
    {
      "title": "Top placement",
      "description": "Use side to keep the card inside the viewport near the bottom of the page.",
      "demoKey": "preview-card-top"
    }
  ]
};
