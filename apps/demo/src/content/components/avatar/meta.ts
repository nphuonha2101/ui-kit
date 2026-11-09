import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "avatar",
  "title": "Avatar",
  "description": "A compact profile image with automatic initials or a custom fallback.",
  "category": "Data Display",
  "imports": "import { Avatar } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "src",
      "type": "string",
      "description": "Image URL. Omit it to show the fallback immediately."
    },
    {
      "name": "alt",
      "type": "string",
      "description": "Accessible name. Initials are derived from it when no fallback is set."
    },
    {
      "name": "fallback",
      "type": "ReactNode",
      "description": "Custom content shown while the image loads or when it fails."
    },
    {
      "name": "size",
      "type": "\"sm\" | \"default\" | \"lg\" | \"xl\"",
      "default": "\"default\"",
      "description": "Control the avatar diameter."
    },
    {
      "name": "shape",
      "type": "\"circle\" | \"rounded\"",
      "default": "\"circle\"",
      "description": "Corner treatment."
    },
    {
      "name": "delay",
      "type": "number",
      "default": "0",
      "description": "Milliseconds to wait before showing the fallback."
    }
  ],
  "examples": [
    {
      "title": "Sizes and shapes",
      "description": "Match avatar size to the surrounding list or header.",
      "demoKey": "avatar-sizes"
    }
  ]
};
