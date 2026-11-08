import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Button, Spinner } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"flex flex-col items-center gap-5\">\n      <div className=\"flex items-center gap-4 text-muted-foreground\">\n        <Spinner size={14} />\n        <Spinner />\n        <Spinner size={24} />\n      </div>\n      <Button loading>Loading…</Button>\n    </div>\n  );\n}",
  "usage": "<span className=\"inline-flex items-center gap-2\">\n  <Spinner size={16} /> Loading\n</span>",
  "examples": {}
};
