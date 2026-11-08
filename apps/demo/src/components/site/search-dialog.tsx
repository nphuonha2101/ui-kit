"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { cn, Dialog, Input } from "@nphuonha/ui-kit";
import { searchIndex } from "@/content/components";

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  const filtered = React.useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return searchIndex;
    return searchIndex.filter((item) =>
      `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(value),
    );
  }, [query]);

  const go = React.useCallback(
    (slug: string) => {
      onOpenChange(false);
      router.push(`/docs/components/${slug}`);
    },
    [onOpenChange, router],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (filtered.length ? (index + 1) % filtered.length : 0));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        filtered.length ? (index - 1 + filtered.length) % filtered.length : 0,
      );
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const item = filtered[activeIndex];
      if (item) go(item.slug);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      showClose={false}
      aria-label="Search documentation"
      className="max-w-xl gap-0 overflow-hidden p-0"
    >
      <div className="flex items-center gap-2 px-4">
        <MagnifyingGlassIcon size={18} className="shrink-0 text-muted-foreground" />
        <Input
          autoFocus
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search components..."
          aria-label="Search components"
          className="surface-flat h-12 rounded-none bg-transparent px-0 text-base focus-visible:ring-0"
        />
      </div>
      <div className="h-px bg-border/60" />
      <div className="max-h-[360px] overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <p className="px-3 py-8 text-center text-sm text-muted-foreground">
            No components found.
          </p>
        ) : (
          filtered.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => go(item.slug)}
              onMouseEnter={() => setActiveIndex(index)}
              className={cn(
                "flex w-full items-center gap-3 rounded-control px-3 py-2 text-left transition-colors",
                index === activeIndex ? "bg-surface" : "hover:bg-surface/60",
              )}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-field text-muted-foreground">
                <MagnifyingGlassIcon size={15} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-foreground">
                  {item.title}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {item.description}
                </span>
              </span>
            </button>
          ))
        )}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border/60 px-4 py-2 text-[11px] text-muted-foreground">
        <span>↑↓ to navigate</span>
        <span>↵ to open</span>
      </div>
    </Dialog>
  );
}
