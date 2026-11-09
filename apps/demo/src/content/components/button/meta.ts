import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "button",
  "title": "Button",
  "description": "Triggers an action or event. Supports variants, sizes, icons, and disabled and loading states; use ButtonLink for navigation.",
  "category": "Actions",
  "imports": "import { Button } from \"@nphuonha/ui-kit\";\nimport { PlusIcon } from \"@phosphor-icons/react\";",
  "props": [
    {
      "name": "variant",
      "type": "\"primary\" | \"secondary\" | \"outline\" | \"ghost\" | \"soft\" | \"danger\"",
      "default": "\"primary\"",
      "description": "Visual emphasis of the button."
    },
    {
      "name": "size",
      "type": "\"sm\" | \"default\" | \"lg\" | \"icon\" | \"icon-sm\"",
      "default": "\"default\"",
      "description": "Control height and padding."
    },
    {
      "name": "shape",
      "type": "\"rounded\" | \"pill\"",
      "default": "\"rounded\"",
      "description": "Corner treatment."
    },
    {
      "name": "loading",
      "type": "boolean",
      "description": "Shows a spinner and disables interaction."
    },
    {
      "name": "startIcon",
      "type": "IconComponent",
      "description": "Icon rendered before the label."
    },
    {
      "name": "endIcon",
      "type": "IconComponent",
      "description": "Icon rendered after the label."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables the button."
    }
  ],
  "examples": [
    {
      "title": "Sizes and shapes",
      "description": "Use size to match density and shape to soften an action.",
      "demoKey": "button-sizes"
    },
    {
      "title": "Disabled and loading",
      "description": "Disabled buttons keep their label, drop their raised shadow and ignore clicks. Loading also disables interaction.",
      "demoKey": "button-states"
    }
  ]
};
