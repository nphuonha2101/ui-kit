import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import { Card, ScrollArea } from "@nphuonha/ui-kit";

const items = Array.from({ length: 14 }, (_, index) => \`Item \${index + 1}\`);

export function Example() {
  return (
    <Card className="mx-auto w-full max-w-sm p-1">
      <ScrollArea className="h-56" viewportClassName="p-3">
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-control bg-surface px-3 py-2 text-sm text-muted-foreground"
            >
              {item}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}`,
  "usage": `<ScrollArea className="h-72">
  <div className="flex flex-col gap-2">{items}</div>
</ScrollArea>`,
  "examples": {
    "scroll-area-hidden-scrollbar": `import { Card, ScrollArea } from "@nphuonha/ui-kit";

const items = Array.from({ length: 14 }, (_, index) => \`Item \${index + 1}\`);

export function Example() {
  return (
    <Card className="mx-auto w-full max-w-sm p-1">
      <ScrollArea className="h-56" viewportClassName="p-3" scrollbar="hidden">
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-control bg-surface px-3 py-2 text-sm text-muted-foreground"
            >
              {item}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}`
  }
};
