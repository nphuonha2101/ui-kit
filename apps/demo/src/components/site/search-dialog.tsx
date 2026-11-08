"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CubeIcon,
  KeyReturnIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import { Kbd, KbdGroup, cn, Dialog } from "@nphuonha/ui-kit";
import { searchIndex } from "@/content/components";

function optionId(slug: string) {
  return `search-option-${slug}`;
}

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

  const active = filtered[activeIndex];

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      showClose={false}
      aria-label="Search documentation"
      className="max-w-lg gap-0 overflow-hidden p-0"
    >
      <div className="flex min-w-0 max-h-[min(560px,80vh)] flex-col">
        <div className="flex h-14 shrink-0 items-center gap-2.5 px-4">
          <MagnifyingGlassIcon size={18} className="shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search components..."
            aria-label="Search components"
            aria-controls="search-results"
            aria-activedescendant={active ? optionId(active.slug) : undefined}
            className="h-full min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/70"
          />
          <Kbd size="sm" className="hidden shrink-0 sm:inline-flex">
            Esc
          </Kbd>
        </div>

        <div className="h-px shrink-0 bg-border/60" />

        <div
          id="search-results"
          role="listbox"
          aria-label="Components"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2"
        >
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-1.5 px-3 py-12 text-center">
              <MagnifyingGlassIcon size={24} className="text-muted-foreground/50" />
              <p className="text-sm font-medium text-foreground">No components found</p>
              <p className="text-xs text-muted-foreground">Try a different search term.</p>
            </div>
          ) : (
            filtered.map((item, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={item.slug}
                  id={optionId(item.slug)}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => go(item.slug)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-control px-3 py-2.5 text-left transition-colors",
                    selected ? "bg-surface" : "hover:bg-surface/60",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-[10px] transition-colors",
                      selected
                        ? "bg-primary-soft text-primary-soft-foreground"
                        : "bg-surface text-muted-foreground",
                    )}
                  >
                    <CubeIcon size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium text-foreground">
                        {item.title}
                      </span>
                      <span className="hidden shrink-0 rounded-pill bg-surface px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground sm:inline-flex">
                        {item.category}
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </span>
                  {selected ? (
                    <KeyReturnIcon size={14} className="shrink-0 text-muted-foreground" />
                  ) : null}
                </button>
              );
            })
          )}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border/60 px-4 py-2.5 text-[11px] text-muted-foreground">
          <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
            <KbdGroup>
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
            </KbdGroup>
            to navigate
          </span>
          <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
            <Kbd>↵</Kbd>
            to open
          </span>
        </div>
      </div>
    </Dialog>
  );
}
