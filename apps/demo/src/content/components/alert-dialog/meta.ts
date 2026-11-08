import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "alert-dialog",
  "title": "AlertDialog",
  "description": "A modal confirmation for destructive or high-impact actions.",
  "category": "Overlays",
  "imports": "import { AlertDialog } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "open",
      "type": "boolean",
      "description": "Controlled open state."
    },
    {
      "name": "defaultOpen",
      "type": "boolean",
      "description": "Initial open state for uncontrolled usage."
    },
    {
      "name": "onOpenChange",
      "type": "(open: boolean) => void",
      "description": "Called when the dialog opens or closes."
    },
    {
      "name": "trigger",
      "type": "ReactElement",
      "description": "Element that opens the dialog."
    },
    {
      "name": "title",
      "type": "ReactNode",
      "description": "Dialog title and accessible name."
    },
    {
      "name": "description",
      "type": "ReactNode",
      "description": "Explanation of the consequence."
    },
    {
      "name": "confirmLabel",
      "type": "ReactNode",
      "default": "\"Confirm\"",
      "description": "Confirm button label."
    },
    {
      "name": "cancelLabel",
      "type": "ReactNode",
      "default": "\"Cancel\"",
      "description": "Cancel button label."
    },
    {
      "name": "onConfirm",
      "type": "() => void",
      "description": "Called when the confirm button is pressed."
    },
    {
      "name": "tone",
      "type": "\"danger\" | \"default\"",
      "default": "\"danger\"",
      "description": "Colors the icon well and confirm button."
    },
    {
      "name": "icon",
      "type": "IconComponent",
      "description": "Optional status icon."
    },
    {
      "name": "loading",
      "type": "boolean",
      "description": "Shows a spinner and disables the confirm button."
    }
  ]
};
