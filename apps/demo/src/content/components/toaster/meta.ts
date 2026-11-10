import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "toaster",
  "title": "Toaster",
  "description": "Theme-aware toast notifications powered by Sonner and kit tokens.",
  "category": "Feedback",
  "imports": "import { Button, Toaster, toast } from \"@nphuonha/ui-kit\";",
  "examples": [
    {
      "title": "Promise toast",
      "description": "Use toast.promise to show loading, success and error states.",
      "demoKey": "toast-promise"
    }
  ]
};
