import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import { Button, EmptyState } from "@nphuonha/ui-kit";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export function Example() {
  return (
    <div className="surface-curved relative mx-auto w-full max-w-md rounded-card bg-card p-4 shadow-soft">
      <EmptyState
        icon={MagnifyingGlassIcon}
        title="No results found"
        description="Try a different keyword or clear the active filters."
        action={<Button variant="secondary" size="sm">Clear filters</Button>}
      />
    </div>
  );
}`,
  "usage": `<EmptyState
  icon={InboxIcon}
  title="No messages yet"
  description="New messages will appear here."
/>`
};
