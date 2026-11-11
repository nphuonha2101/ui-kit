import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "data-table",
  "title": "DataTable",
  "description": "Data-driven table powered by TanStack Table: sorting, search, client-side pagination, row selection and custom action columns.",
  "category": "Data Display",
  "imports": "import { Badge, Card, DataTable } from \"@nphuonha/ui-kit\";",
  "examples": [
    {
      "title": "Row selection",
      "description": "Set selectable to add checkboxes and track selectedIds.",
      "demoKey": "data-table-selection"
    },
    {
      "title": "Row actions",
      "description": "Render buttons, menus or dialogs from a plain action column.",
      "demoKey": "data-table-actions"
    }
  ]
};
