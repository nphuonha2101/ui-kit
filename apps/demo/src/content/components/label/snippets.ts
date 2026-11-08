import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Input, Label } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto flex w-full max-w-sm flex-col gap-1.5\">\n      <Label htmlFor=\"demo-label-email\">Email</Label>\n      <Input id=\"demo-label-email\" placeholder=\"you@example.com\" />\n      <p className=\"mt-1 text-xs text-muted-foreground\">\n        Labels can also show a required mark.\n      </p>\n    </div>\n  );\n}",
  "usage": "<Label htmlFor=\"email\" requiredMark>Email</Label>",
  "examples": {}
};
