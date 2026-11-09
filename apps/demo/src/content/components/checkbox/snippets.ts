import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Checkbox } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto flex w-full max-w-sm flex-col gap-4\">\n      <Checkbox\n        label=\"Accept terms\"\n        description=\"You agree to the privacy policy.\"\n        required\n        defaultChecked\n      />\n      <Checkbox label=\"Indeterminate\" indeterminate />\n      <Checkbox label=\"Disabled\" disabled />\n    </div>\n  );\n}",
  "usage": "<Checkbox label=\"Email updates\" defaultChecked />",
  "examples": {}
};
