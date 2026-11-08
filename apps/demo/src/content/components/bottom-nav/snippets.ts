import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { BottomNav } from \"@nphuonha/ui-kit\";\nimport { BookmarkSimpleIcon, HouseIcon, MagnifyingGlassIcon, UserIcon } from \"@phosphor-icons/react\";\n\nconst HouseActiveIcon = (props: { size?: number; className?: string }) => (\n  <HouseIcon {...props} weight=\"fill\" />\n);\n\nexport function Example() {\n  return (\n    <BottomNav\n      defaultValue=\"home\"\n      items={[\n        { value: \"home\", label: \"Home\", icon: HouseIcon, activeIcon: HouseActiveIcon },\n        { value: \"search\", label: \"Search\", icon: MagnifyingGlassIcon, badge: 2 },\n        { value: \"saved\", label: \"Saved\", icon: BookmarkSimpleIcon },\n        { value: \"profile\", label: \"Profile\", icon: UserIcon },\n      ]}\n    />\n  );\n}",
  "usage": "<BottomNav\n  items={items}\n  value={active}\n  onValueChange={setActive}\n  fixed\n/>"
};
