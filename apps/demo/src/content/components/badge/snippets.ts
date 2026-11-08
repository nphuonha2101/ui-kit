import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Badge } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"flex flex-wrap items-center justify-center gap-2\">\n      <Badge>Neutral</Badge>\n      <Badge variant=\"primary\">Primary</Badge>\n      <Badge variant=\"success\">Success</Badge>\n      <Badge variant=\"warning\">Warning</Badge>\n      <Badge variant=\"danger\">Danger</Badge>\n      <Badge variant=\"info\">Info</Badge>\n      <Badge variant=\"solid\">Solid</Badge>\n      <Badge variant=\"outline\">Outline</Badge>\n    </div>\n  );\n}",
  "usage": "<Badge>Neutral</Badge>\n<Badge variant=\"success\">Active</Badge>\n<Badge variant=\"danger\">Failed</Badge>",
  "examples": {}
};
