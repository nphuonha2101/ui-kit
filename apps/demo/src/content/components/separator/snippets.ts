import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Badge, Card, Separator } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <Card className=\"mx-auto w-full max-w-sm p-4\">\n      <div className=\"flex items-center justify-between text-sm\">\n        <span>Storage</span>\n        <span className=\"text-muted-foreground\">64%</span>\n      </div>\n      <Separator className=\"my-3\" />\n      <div className=\"flex items-center justify-between text-sm\">\n        <span>Members</span>\n        <span className=\"text-muted-foreground\">12</span>\n      </div>\n      <Separator className=\"my-3\" />\n      <div className=\"flex items-center justify-between text-sm\">\n        <span>Plan</span>\n        <Badge variant=\"primary\">Pro</Badge>\n      </div>\n    </Card>\n  );\n}",
  "usage": "<Separator orientation=\"horizontal\" />",
  "examples": {}
};
