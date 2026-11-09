import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import { AlertDialog, Button, toast } from "@nphuonha/ui-kit";
import { WarningIcon } from "@phosphor-icons/react";

export function Example() {
  return (
    <AlertDialog
      trigger={<Button variant="danger">Delete project</Button>}
      icon={WarningIcon}
      title="Delete project?"
      description="This will permanently remove the project and all of its data. This action cannot be undone."
      confirmLabel="Delete project"
      onConfirm={() => toast("Project deleted")}
    />
  );
}`,
  "usage": `<AlertDialog
  trigger={<Button variant="danger">Delete</Button>}
  title="Delete project?"
  description="This action cannot be undone."
  confirmLabel="Delete"
  onConfirm={handleDelete}
/>`
};
