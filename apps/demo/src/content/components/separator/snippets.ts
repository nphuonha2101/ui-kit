import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Badge, Separator } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto w-full max-w-sm rounded-card bg-card p-4 shadow-soft\">\n      <div className=\"flex items-center justify-between text-sm\">\n        <span>Storage</span>\n        <span className=\"text-muted-foreground\">64%</span>\n      </div>\n      <Separator className=\"my-3\" />\n      <div className=\"flex items-center justify-between text-sm\">\n        <span>Members</span>\n        <span className=\"text-muted-foreground\">12</span>\n      </div>\n      <Separator className=\"my-3\" />\n      <div className=\"flex items-center justify-between text-sm\">\n        <span>Plan</span>\n        <Badge variant=\"primary\">Pro</Badge>\n      </div>\n    </div>\n  );\n}",
  "usage": "<Separator orientation=\"horizontal\" />",
  "examples": {}
};
