import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import { ScrollArea } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <div className="surface-curved relative mx-auto w-full max-w-sm rounded-card bg-card p-1 shadow-soft">
      <ScrollArea className="h-56" viewportClassName="p-3">
        <div className="flex flex-col gap-2">
          {Array.from({ length: 14 }, (_, index) => (
            <div
              key={index}
              className="rounded-control bg-surface px-3 py-2 text-sm text-muted-foreground"
            >
              Item {index + 1}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}`,
  "usage": `<ScrollArea className="h-72">
  <div className="flex flex-col gap-2">{items}</div>
</ScrollArea>`
};
