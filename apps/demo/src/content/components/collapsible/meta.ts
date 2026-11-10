import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "collapsible",
  "title": "Collapsible",
  "description": "A single expandable panel for advanced filters, details and progressive disclosure.",
  "category": "Data Display",
  "imports": "import { Collapsible } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "title",
      "type": "ReactNode",
      "description": "Visible trigger label."
    },
    {
      "name": "description",
      "type": "ReactNode",
      "description": "Secondary line inside the trigger."
    },
    {
      "name": "icon",
      "type": "IconComponent",
      "description": "Optional leading icon."
    },
    {
      "name": "children",
      "type": "ReactNode",
      "description": "Panel content."
    },
    {
      "name": "open",
      "type": "boolean",
      "description": "Controlled open state."
    },
    {
      "name": "defaultOpen",
      "type": "boolean",
      "default": "false",
      "description": "Initial open state for an uncontrolled panel."
    },
    {
      "name": "onOpenChange",
      "type": "(open: boolean) => void",
      "description": "Called when the panel opens or closes."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables the trigger."
    },
    {
      "name": "variant",
      "type": "\"joined\" | \"separated\" | \"plain\"",
      "default": "\"joined\"",
      "description": "Surface treatment: card, separate card or bare disclosure."
    },
    {
      "name": "contentClassName",
      "type": "string",
      "description": "Additional classes for the panel content."
    }
  ],
  "examples": [
    {
      "title": "Separated card",
      "description": "Use the separated variant when the panel sits in a stack of cards.",
      "demoKey": "collapsible-separated"
    },
    {
      "title": "Plain disclosure",
      "description": "The plain variant is a bare trigger for inline content.",
      "demoKey": "collapsible-plain"
    }
  ]
};
