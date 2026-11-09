import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "card",
  "title": "Card",
  "description": "A borderless solid surface with a top-lit curved edge.",
  "category": "Data Display",
  "imports": "import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "Card",
      "type": "div",
      "description": "Rounded solid surface with soft depth."
    },
    {
      "name": "CardHeader",
      "type": "div",
      "description": "Title and description stack."
    },
    {
      "name": "CardTitle",
      "type": "h3",
      "description": "Card heading."
    },
    {
      "name": "CardDescription",
      "type": "p",
      "description": "Muted supporting text."
    },
    {
      "name": "CardContent",
      "type": "div",
      "description": "Padded content area."
    },
    {
      "name": "CardFooter",
      "type": "div",
      "description": "Actions area."
    }
  ],
  "examples": [
    {
      "title": "Profile card",
      "description": "Combine the card parts with badges and actions.",
      "demoKey": "card-profile"
    },
    {
      "title": "Elevation options",
      "description": "Use shadow-none to keep the curved rim without the outer lift, or surface-flat for a fully flat surface.",
      "demoKey": "card-elevation"
    }
  ]
};
