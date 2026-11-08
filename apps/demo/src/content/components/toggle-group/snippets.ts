import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import { ToggleGroup } from "@nphuonha/ui-kit";
import { ListIcon, SquaresFourIcon } from "@phosphor-icons/react";

export function Example() {
  return (
    <ToggleGroup
      aria-label="View"
      defaultValue={["grid"]}
      items={[
        { value: "grid", label: "Grid", icon: SquaresFourIcon },
        { value: "list", label: "List", icon: ListIcon },
      ]}
    />
  );
}`,
  "usage": `<ToggleGroup
  aria-label="View"
  items={items}
  value={view}
  onValueChange={setView}
/>`,
  "examples": {
    "toggle-group-multiple": `import { ToggleGroup } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <ToggleGroup
      aria-label="Filters"
      multiple
      defaultValue={["design"]}
      items={[
        { value: "design", label: "Design" },
        { value: "engineering", label: "Engineering" },
        { value: "marketing", label: "Marketing" },
      ]}
    />
  );
}`
  }
};
