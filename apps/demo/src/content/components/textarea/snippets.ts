import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Field, Textarea } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto w-full max-w-sm\">\n      <Field label=\"Message\" description=\"Markdown is supported.\">\n        <Textarea placeholder=\"Write something...\" />\n      </Field>\n    </div>\n  );\n}",
  "usage": "<Textarea placeholder=\"Write something...\" rows={4} />",
  "examples": {}
};
