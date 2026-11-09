import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { RadioGroup } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto w-full max-w-sm\">\n      <RadioGroup\n        label=\"Plan\"\n        required\n        defaultValue=\"pro\"\n        options={[\n          { value: \"free\", label: \"Free\", description: \"Basics for personal projects\" },\n          { value: \"pro\", label: \"Pro\", description: \"Most features, unlimited projects\" },\n          {\n            value: \"team\",\n            label: \"Team\",\n            description: \"Collaboration and roles\",\n            disabled: true,\n          },\n        ]}\n      />\n    </div>\n  );\n}",
  "usage": "<RadioGroup label=\"Plan\" options={plans} defaultValue=\"pro\" />",
  "examples": {}
};
