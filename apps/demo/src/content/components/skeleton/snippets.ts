import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import { Skeleton } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <div className="mx-auto flex w-full max-w-md items-start gap-3">
      <Skeleton variant="circle" className="size-12" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton variant="text" className="w-2/3" />
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-4/5" />
      </div>
    </div>
  );
}`,
  "usage": `import { Skeleton } from "@nphuonha/ui-kit";

<Skeleton className="h-32 w-full" />`,
  "examples": {
    "skeleton-lines": `<Skeleton variant="text" lines={4} />`,
    "skeleton-card": `<Card className="mx-auto w-full max-w-sm p-5">
  <Skeleton className="mb-4 h-36 w-full" />
  <div className="flex flex-col gap-2">
    <Skeleton variant="text" className="w-1/2" />
    <Skeleton variant="text" />
    <Skeleton variant="text" className="w-3/4" />
  </div>
</Card>`,
  },
};
