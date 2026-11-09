import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import * as React from "react";
import { ToggleGroup } from "@nphuonha/ui-kit";
import { KanbanIcon, ListIcon, SquaresFourIcon } from "@phosphor-icons/react";

const viewItems = [
  { value: "grid", label: "Grid", icon: SquaresFourIcon },
  { value: "list", label: "List", icon: ListIcon },
  { value: "board", label: "Board", icon: KanbanIcon },
];

export function Example() {
  const [view, setView] = React.useState(["grid"]);

  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup
        aria-label="View"
        items={viewItems}
        value={view}
        onValueChange={setView}
      />
      <p className="text-sm text-muted-foreground">Showing: {view[0]}</p>
    </div>
  );
}`,
  "usage": `<ToggleGroup
  aria-label="View"
  items={items}
  value={view}
  onValueChange={setView}
/>`,
  "examples": {
    "toggle-group-multiple": `import * as React from "react";
import { ToggleGroup } from "@nphuonha/ui-kit";

const filterItems = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
];

export function Example() {
  const [filters, setFilters] = React.useState(["design"]);

  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup
        aria-label="Filters"
        items={filterItems}
        multiple
        value={filters}
        onValueChange={setFilters}
      />
      <p className="text-sm text-muted-foreground">
        {filters.length} selected
      </p>
    </div>
  );
}`
  }
};
