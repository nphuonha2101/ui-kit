import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "toaster",
  "title": "Toaster",
  "description": "Theme-aware toast notifications powered by Sonner and kit tokens.",
  "category": "Feedback",
  "imports": "import { Button, Toaster, toast } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "position",
      "type": "\"top-left\" | \"top-right\" | \"bottom-left\" | \"bottom-right\" | \"top-center\" | \"bottom-center\"",
      "default": "\"bottom-right\"",
      "description": "Screen corner for toasts."
    },
    {
      "name": "theme",
      "type": "\"light\" | \"dark\" | \"system\"",
      "default": "\"light\"",
      "description": "Toast appearance."
    },
    {
      "name": "richColors",
      "type": "boolean",
      "default": "false",
      "description": "Use semantic colors for status toasts."
    },
    {
      "name": "closeButton",
      "type": "boolean",
      "default": "true",
      "description": "Show a close button."
    }
  ],
  "examples": [
    {
      "title": "Promise toast",
      "description": "Use toast.promise to show loading, success and error states.",
      "demoKey": "toast-promise"
    }
  ]
};
