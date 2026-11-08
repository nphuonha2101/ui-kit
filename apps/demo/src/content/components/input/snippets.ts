import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Field, Input } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto flex w-full max-w-sm flex-col gap-4\">\n      <Field label=\"Email\" description=\"We'll never share it.\" required>\n        <Input placeholder=\"you@example.com\" type=\"email\" />\n      </Field>\n      <Field label=\"With error\" error=\"This field is required\">\n        <Input placeholder=\"Required\" error />\n      </Field>\n    </div>\n  );\n}",
  "usage": "import { Field, Input } from \"@nphuonha/ui-kit\";\n\n<Field label=\"Email\" description=\"We'll never share it.\">\n  <Input placeholder=\"you@example.com\" type=\"email\" />\n</Field>",
  "examples": {}
};
