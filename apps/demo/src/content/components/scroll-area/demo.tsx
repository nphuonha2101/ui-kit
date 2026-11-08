import { ScrollArea } from "@nphuonha/ui-kit";

const items = Array.from({ length: 14 }, (_, index) => `Item ${index + 1}`);

function ScrollAreaDemo() {
  return (
    <div className="surface-curved relative mx-auto w-full max-w-sm rounded-card bg-card p-1 shadow-soft">
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
    </div>
  );
}

function HiddenScrollbarDemo() {
  return (
    <div className="surface-curved relative mx-auto w-full max-w-sm rounded-card bg-card p-1 shadow-soft">
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
    </div>
  );
}

export const demo = ScrollAreaDemo;
export const examples = {
  "scroll-area-hidden-scrollbar": HiddenScrollbarDemo,
};
