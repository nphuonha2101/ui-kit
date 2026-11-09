import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Field, Select } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto w-full max-w-sm\">\n      <Field label=\"Framework\" required>\n        <Select\n          placeholder=\"Choose one\"\n          required\n          defaultValue=\"next\"\n          options={[\n            { value: \"next\", label: \"Next.js\" },\n            { value: \"vite\", label: \"Vite\" },\n            { value: \"remix\", label: \"Remix\" },\n          ]}\n        />\n      </Field>\n    </div>\n  );\n}",
  "usage": "import { Field, Select } from \"@nphuonha/ui-kit\";\n\n<Field label=\"Framework\">\n  <Select options={frameworks} placeholder=\"Choose one\" />\n</Field>",
  "examples": {
    "select-field": "import { Field, Select } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto flex w-full max-w-sm flex-col gap-4\">\n      <Field label=\"Framework\">\n        <Select\n          options={[\n            { value: \"next\", label: \"Next.js\" },\n            { value: \"vite\", label: \"Vite\" },\n            { value: \"remix\", label: \"Remix\" },\n          ]}\n          defaultValue=\"next\"\n        />\n      </Field>\n      <Field label=\"Package manager\">\n        <Select\n          options={[\n            { value: \"npm\", label: \"npm\" },\n            { value: \"pnpm\", label: \"pnpm\" },\n            { value: \"yarn\", label: \"yarn\" },\n          ]}\n          defaultValue=\"npm\"\n        />\n      </Field>\n    </div>\n  );\n}"
  }
};
