"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";

export interface PaginationProps {
  /** Controlled current page (1-based). */
  page?: number;
  /** Initial page for uncontrolled usage. */
  defaultPage?: number;
  /** Total number of pages. */
  pageCount: number;
  /** Called when a page control is activated. */
  onPageChange?: (page: number) => void;
  /** Pages shown on each side of the current page. */
  siblingCount?: number;
  /** Disables every control. */
  disabled?: boolean;
  /** Render page controls as links instead of buttons. */
  getHref?: (page: number) => string;
  className?: string;
  "aria-label"?: string;
}

type PaginationEntry = number | "ellipsis-start" | "ellipsis-end";

function getPaginationRange(
  page: number,
  pageCount: number,
  siblingCount: number,
): PaginationEntry[] {
  const totalNumbers = siblingCount * 2 + 5;
  if (pageCount <= totalNumbers) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const start = Math.max(2, page - siblingCount);
  const end = Math.min(pageCount - 1, page + siblingCount);
  const entries: PaginationEntry[] = [1];

  if (start > 2) entries.push("ellipsis-start");
  for (let current = start; current <= end; current += 1) {
    entries.push(current);
  }
  if (end < pageCount - 1) entries.push("ellipsis-end");
  entries.push(pageCount);

  return entries;
}

export function Pagination({
  page,
  defaultPage = 1,
  pageCount,
  onPageChange,
  siblingCount = 1,
  disabled = false,
  getHref,
  className,
  "aria-label": ariaLabel = "Pagination",
}: PaginationProps) {
  const [uncontrolledPage, setUncontrolledPage] = React.useState(defaultPage);
  const currentPage = Math.min(
    Math.max(page ?? uncontrolledPage, 1),
    Math.max(pageCount, 1),
  );
  const ChevronLeft = useKitIcon("chevronLeft");
  const ChevronRight = useKitIcon("chevronRight");
  const entries = getPaginationRange(
    currentPage,
    Math.max(pageCount, 1),
    Math.max(siblingCount, 0),
  );

  const changePage = (next: number) => {
    if (disabled || next < 1 || next > pageCount || next === currentPage) return;
    if (page === undefined) setUncontrolledPage(next);
    onPageChange?.(next);
  };

  const itemClassName = cn(
    "relative inline-flex size-9 items-center justify-center rounded-control text-sm font-medium tabular-nums outline-none transition-[background-color,color,box-shadow] duration-[var(--duration-ui)]",
    "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
  );

  const renderItem = (
    target: number,
    label: React.ReactNode,
    options?: { active?: boolean; ariaLabel?: string },
  ) => {
    const active = options?.active ?? target === currentPage;
    const content = (
      <>
        {label}
        {active ? <span className="sr-only">(current)</span> : null}
      </>
    );
    const shared = {
      "aria-label": options?.ariaLabel,
      "aria-current": active ? ("page" as const) : undefined,
      className: cn(
        itemClassName,
        active
          ? "surface-curved bg-primary text-primary-foreground shadow-[var(--shadow-raised)]"
          : "text-muted-foreground hover:bg-surface hover:text-foreground",
      ),
    };

    if (getHref) {
      return (
        <a
          key={target}
          href={getHref(target)}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          onClick={(event) => {
            if (disabled) {
              event.preventDefault();
              return;
            }
            changePage(target);
          }}
          {...shared}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        key={target}
        type="button"
        disabled={disabled}
        onClick={() => changePage(target)}
        {...shared}
      >
        {content}
      </button>
    );
  };

  return (
    <nav
      aria-label={ariaLabel}
      className={cn("flex items-center gap-1", className)}
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={disabled || currentPage <= 1}
        onClick={() => changePage(currentPage - 1)}
        className={cn(itemClassName, "text-muted-foreground hover:bg-surface hover:text-foreground")}
      >
        <ChevronLeft size={16} />
      </button>

      {entries.map((entry) =>
        typeof entry === "number" ? (
          renderItem(entry, entry, {
            ariaLabel: `Page ${entry}`,
          })
        ) : (
          <span
            key={entry}
            aria-hidden="true"
            className="inline-flex size-9 items-center justify-center text-sm text-muted-foreground"
          >
            …
          </span>
        ),
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={disabled || currentPage >= pageCount}
        onClick={() => changePage(currentPage + 1)}
        className={cn(itemClassName, "text-muted-foreground hover:bg-surface hover:text-foreground")}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
