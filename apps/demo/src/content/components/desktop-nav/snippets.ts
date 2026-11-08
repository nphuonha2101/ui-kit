import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { DesktopNav } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <DesktopNav\n      defaultValue=\"overview\"\n      items={[\n        { value: \"overview\", label: \"Overview\" },\n        { value: \"components\", label: \"Components\" },\n        { value: \"themes\", label: \"Themes\" },\n        { value: \"changelog\", label: \"Changelog\", badge: \"New\" },\n      ]}\n    />\n  );\n}",
  "usage": "<DesktopNav\n  items={items}\n  value={active}\n  onValueChange={setActive}\n/>"
};
