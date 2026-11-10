import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "toggle",
  "title": "Toggle",
  "description": "A two-state button for saved, liked and other on/off actions.",
  "category": "Actions",
  "imports": "import { Toggle } from \"@nphuonha/ui-kit\";\nimport {\n  BellIcon,\n  BookmarkSimpleIcon,\n  HeartIcon,\n  StarIcon,\n} from \"@phosphor-icons/react\";",
  "examples": [
    {
      "title": "Sizes and shapes",
      "description": "Use icon-only sizes for compact toolbars, pills for filters.",
      "demoKey": "toggle-sizes"
    }
  ]
};
