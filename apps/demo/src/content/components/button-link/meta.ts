import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "button-link",
  "title": "ButtonLink",
  "description": "A button-styled anchor for navigation, with the same variants, sizes and icons as Button.",
  "category": "Actions",
  "imports": "import { ButtonLink } from \"@nphuonha/ui-kit\";\nimport { ArrowRightIcon, ArrowUpRightIcon } from \"@phosphor-icons/react\";",
  "props": [
    {
      "name": "href",
      "type": "string",
      "description": "Destination URL. Renders a native anchor by default."
    },
    {
      "name": "render",
      "type": "ReactElement",
      "description": "Render a custom link component, such as Next.js Link, while keeping the button styles."
    },
    {
      "name": "variant",
      "type": "\"primary\" | \"secondary\" | \"outline\" | \"ghost\" | \"soft\" | \"danger\"",
      "default": "\"primary\"",
      "description": "Visual emphasis."
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
      "name": "target",
      "type": "string",
      "description": "Native anchor target. Use _blank with rel=\"noreferrer\" for external links."
    }
  ],
  "examples": [
    {
      "title": "Next.js Link",
      "description": "Pass a custom link through render to keep client-side navigation.",
      "demoKey": "button-link-next"
    }
  ]
};
