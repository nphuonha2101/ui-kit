import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Button, EmptyState } from "@nphuonha/ui-kit";

function EmptyStateDemo() {
  return (
    <div className="surface-curved relative mx-auto w-full max-w-md rounded-card bg-card p-4 shadow-soft">
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
    </div>
  );
}

export const demo = EmptyStateDemo;
export const examples = {};
