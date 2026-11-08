import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Field, Input } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto grid w-full max-w-md gap-4 sm:grid-cols-2\">\n      <Field label=\"First name\">\n        <Input placeholder=\"Avery\" />\n      </Field>\n      <Field label=\"Last name\">\n        <Input placeholder=\"Quinn\" />\n      </Field>\n      <div className=\"sm:col-span-2\">\n        <Field label=\"Email\" description=\"Used for sign-in and receipts.\" required>\n          <Input placeholder=\"you@example.com\" type=\"email\" />\n        </Field>\n      </div>\n    </div>\n  );\n}",
  "usage": "<Field label=\"Password\" error=\"Password is required\">\n  <Input type=\"password\" error />\n</Field>",
  "examples": {}
};
