import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { CheckboxGroup } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto w-full max-w-sm\">\n      <CheckboxGroup\n        label=\"Notification channels\"\n        description=\"Choose where we should reach you.\"\n        defaultValue={[\"email\"]}\n        options={[\n          { value: \"email\", label: \"Email\" },\n          { value: \"sms\", label: \"SMS\" },\n          { value: \"push\", label: \"Push notifications\", description: \"Mobile app only\" },\n        ]}\n      />\n    </div>\n  );\n}",
  "usage": "<CheckboxGroup\n  label=\"Channels\"\n  value={channels}\n  onValueChange={setChannels}\n  options={options}\n/>",
  "examples": {
    "checkbox-group-horizontal": "import { CheckboxGroup } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto w-full max-w-sm\">\n      <CheckboxGroup\n        label=\"Dietary preferences\"\n        orientation=\"horizontal\"\n        options={[\n          { value: \"vegetarian\", label: \"Vegetarian\" },\n          { value: \"vegan\", label: \"Vegan\" },\n          { value: \"gluten\", label: \"Gluten free\" },\n        ]}\n      />\n    </div>\n  );\n}",
    "checkbox-group-error": "import { CheckboxGroup } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto w-full max-w-sm\">\n      <CheckboxGroup\n        label=\"Notification channels\"\n        required\n        error=\"Choose at least one channel.\"\n        options={[\n          { value: \"email\", label: \"Email\" },\n          { value: \"sms\", label: \"SMS\" },\n        ]}\n      />\n    </div>\n  );\n}"
  }
};
