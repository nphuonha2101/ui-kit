import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "table",
  "title": "Table",
  "description": "Composable table primitives with tonal headers, hairline rows and horizontal scroll.",
  "category": "Data Display",
  "imports": "import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "containerClassName",
      "type": "string",
      "description": "Extra classes for the scroll container that wraps the table."
    },
    {
      "name": "TableHeader",
      "type": "component",
      "description": "Thead wrapper with the standard bottom hairline."
    },
    {
      "name": "TableBody",
      "type": "component",
      "description": "Tbody wrapper that removes the final row border."
    },
    {
      "name": "TableFooter",
      "type": "component",
      "description": "Tfoot wrapper with a tonal fill."
    },
    {
      "name": "TableRow",
      "type": "component",
      "description": "Row with hover and selected states."
    },
    {
      "name": "TableHead",
      "type": "component",
      "description": "Header cell with muted uppercase-friendly type."
    },
    {
      "name": "TableCell",
      "type": "component",
      "description": "Body cell with consistent padding."
    },
    {
      "name": "TableCaption",
      "type": "component",
      "description": "Caption rendered below the table."
    }
  ]
};
