import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import * as React from "react";
import { Pagination } from "@nphuonha/ui-kit";

export function Example() {
  const [page, setPage] = React.useState(1);

  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination page={page} pageCount={12} onPageChange={setPage} />
      <p className="text-sm text-muted-foreground">Page {page} of 12</p>
    </div>
  );
}`,
  "usage": `<Pagination
  page={page}
  pageCount={pageCount}
  onPageChange={setPage}
/>`
};
