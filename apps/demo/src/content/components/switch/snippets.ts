import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Switch } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto flex w-full max-w-sm flex-col gap-4\">\n      <Switch\n        label=\"Notifications\"\n        description=\"Receive product updates.\"\n        defaultChecked\n      />\n      <Switch label=\"Disabled\" disabled />\n    </div>\n  );\n}",
  "usage": "<Switch label=\"Notifications\" defaultChecked />",
  "examples": {}
};
