import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Field, Fieldset, Input } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto w-full max-w-sm\">\n      <Fieldset legend=\"Shipping address\" description=\"Where should we deliver?\">\n        <Field label=\"Full name\">\n          <Input placeholder=\"Ana Duarte\" />\n        </Field>\n        <Field label=\"Street\">\n          <Input placeholder=\"12 Nguyễn Huệ\" />\n        </Field>\n      </Fieldset>\n    </div>\n  );\n}",
  "usage": "<Fieldset legend=\"Billing address\" description=\"Shown on invoices.\">\n  <Field label=\"Company\">\n    <Input />\n  </Field>\n</Fieldset>",
  "examples": {
    "fieldset-disabled": "import { Field, Fieldset, Input } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto w-full max-w-sm\">\n      <Fieldset legend=\"Account\" disabled>\n        <Field label=\"Email\">\n          <Input type=\"email\" defaultValue=\"ana@example.com\" />\n        </Field>\n        <Field label=\"Role\">\n          <Input defaultValue=\"Editor\" />\n        </Field>\n      </Fieldset>\n    </div>\n  );\n}"
  }
};
