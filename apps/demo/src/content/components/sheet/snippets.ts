import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import * as React from \"react\";\nimport { Button, Field, Input, Select, Sheet } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  const [open, setOpen] = React.useState(false);\n  return (\n    <>\n      <Button variant=\"secondary\" onClick={() => setOpen(true)}>Open sheet</Button>\n      <Sheet\n        open={open}\n        onOpenChange={setOpen}\n        side=\"right\"\n        title=\"Filters\"\n        description=\"Narrow down the results.\"\n        footer={<Button onClick={() => setOpen(false)}>Apply</Button>}\n      >\n        <div className=\"flex flex-col gap-4\">\n          <Field label=\"Search\">\n            <Input placeholder=\"Type a keyword...\" />\n          </Field>\n          <Field label=\"Status\">\n            <Select\n              options={[\n                { value: \"all\", label: \"All\" },\n                { value: \"active\", label: \"Active\" },\n                { value: \"archived\", label: \"Archived\" },\n              ]}\n              defaultValue=\"all\"\n            />\n          </Field>\n        </div>\n      </Sheet>\n    </>\n  );\n}",
  "usage": "<Sheet open={open} onOpenChange={setOpen} side=\"right\" title=\"Filters\">\n  Content\n</Sheet>",
  "examples": {}
};
