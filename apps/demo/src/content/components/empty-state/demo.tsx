import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Button, Card, EmptyState } from "@nphuonha/ui-kit";

function EmptyStateDemo() {
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
}

export const demo = EmptyStateDemo;
export const examples = {};
