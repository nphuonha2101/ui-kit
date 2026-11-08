import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "pagination",
  "title": "Pagination",
  "description": "Page controls with sibling pages, ellipses and optional link rendering.",
  "category": "Navigation",
  "imports": "import { Pagination } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "page",
      "type": "number",
      "description": "Controlled current page (1-based)."
    },
    {
      "name": "defaultPage",
      "type": "number",
      "default": "1",
      "description": "Initial page for uncontrolled usage."
    },
    {
      "name": "pageCount",
      "type": "number",
      "description": "Total number of pages."
    },
    {
      "name": "onPageChange",
      "type": "(page: number) => void",
      "description": "Called when a page control is activated."
    },
    {
      "name": "siblingCount",
      "type": "number",
      "default": "1",
      "description": "Pages shown on each side of the current page."
    },
    {
      "name": "getHref",
      "type": "(page: number) => string",
      "description": "Render page controls as links instead of buttons."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables every control."
    }
  ]
};
