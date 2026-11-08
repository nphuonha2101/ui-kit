import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "breadcrumb",
  "title": "Breadcrumb",
  "description": "Composable breadcrumb navigation with separators, ellipsis and current page state.",
  "category": "Navigation",
  "imports": "import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "Breadcrumb",
      "type": "component",
      "description": "Navigation landmark with aria-label=\"breadcrumb\"."
    },
    {
      "name": "BreadcrumbList",
      "type": "component",
      "description": "Ordered list that lays items and separators in a row."
    },
    {
      "name": "BreadcrumbItem",
      "type": "component",
      "description": "List item wrapper for a link, page or ellipsis."
    },
    {
      "name": "BreadcrumbLink",
      "type": "component",
      "description": "Anchor with hover and focus treatment."
    },
    {
      "name": "BreadcrumbPage",
      "type": "component",
      "description": "Current page label with aria-current=\"page\"."
    },
    {
      "name": "BreadcrumbSeparator",
      "type": "component",
      "description": "Presentational separator, defaults to a chevron."
    },
    {
      "name": "BreadcrumbEllipsis",
      "type": "component",
      "description": "Presentational ellipsis for collapsed levels."
    }
  ]
};
