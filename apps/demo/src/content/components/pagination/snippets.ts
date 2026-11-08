import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import { Pagination } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <Pagination
      defaultPage={1}
      pageCount={12}
      onPageChange={(page) => console.log(page)}
    />
  );
}`,
  "usage": `<Pagination
  page={page}
  pageCount={pageCount}
  onPageChange={setPage}
/>`
};
