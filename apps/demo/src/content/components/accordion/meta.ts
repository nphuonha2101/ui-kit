import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "accordion",
  "title": "Accordion",
  "description": "A vertically stacked set of expandable panels for FAQs, settings and dense content.",
  "category": "Data Display",
  "imports": "import { Accordion } from \"@nphuonha/ui-kit\";\nimport {\n  ArrowUUpLeftIcon,\n  ShieldCheckIcon,\n  TruckIcon,\n} from \"@phosphor-icons/react\";",
  "props": [
    {
      "name": "items",
      "type": "AccordionItemData[]",
      "description": "Panel entries: value, title, content, and optional description, icon or disabled."
    },
    {
      "name": "value",
      "type": "string[]",
      "description": "Controlled list of open item values."
    },
    {
      "name": "defaultValue",
      "type": "string[]",
      "description": "Initial open items for an uncontrolled accordion."
    },
    {
      "name": "onValueChange",
      "type": "(value: string[]) => void",
      "description": "Called when the open items change."
    },
    {
      "name": "multiple",
      "type": "boolean",
      "default": "false",
      "description": "Allow more than one panel to stay open."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables every item in the accordion."
    },
    {
      "name": "variant",
      "type": "\"joined\" | \"separated\"",
      "default": "\"joined\"",
      "description": "Group panels in one surface or render each as its own card."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Additional classes for the root element."
    }
  ],
  "examples": [
    {
      "title": "Multiple open panels",
      "description": "Set multiple to let readers keep several answers open.",
      "demoKey": "accordion-multiple"
    },
    {
      "title": "Separated cards",
      "description": "Use separated when each panel should stand on its own.",
      "demoKey": "accordion-separated"
    }
  ]
};
