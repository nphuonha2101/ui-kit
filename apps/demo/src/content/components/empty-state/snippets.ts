import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import { Button, Card, EmptyState } from "@nphuonha/ui-kit";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export function Example() {
  return (
    <Card className="mx-auto w-full max-w-md p-4">
      <EmptyState
        icon={MagnifyingGlassIcon}
        title="No results found"
        description="Try a different keyword or clear the active filters to see everything."
        action={
          <Button variant="secondary" size="sm">
            Clear filters
          </Button>
        }
      />
    </Card>
  );
}`,
  "usage": `<EmptyState
  icon={InboxIcon}
  title="No messages yet"
  description="New messages will appear here."
/>`
};
