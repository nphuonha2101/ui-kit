"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";
import { Checkbox } from "../checkbox";
import { EmptyState } from "../empty-state";
import { Pagination } from "../pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

export type DataTableSortDirection = "asc" | "desc";

export interface DataTableColumn<T> {
  /** Stable key. Used for controlled sorting and header identity. */
  key: string;
  /** Header label. */
  header: React.ReactNode;
  /** Cell content for a row. */
  render: (row: T) => React.ReactNode;
  /** Shows the sort control. Requires `sortValue`. */
  sortable?: boolean;
  /** Comparable value used when this column sorts. Nullish values sort last. */
  sortValue?: (row: T) => string | number | null | undefined;
  /** Extra classes for the header cell. */
  headerClassName?: string;
  /** Extra classes for every body cell in this column. */
  cellClassName?: string;
}

export interface DataTableProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "defaultValue"> {
  /** Column definitions. Actions go in a final column with `render`. */
  columns: DataTableColumn<T>[];
  /** Rows in their natural order. Sorting and pagination are applied inside. */
  rows: T[];
  /** Stable id per row. Defaults to the row index. */
  getRowId?: (row: T, index: number) => string;
  /** Accessible name announced for the grid. */
  caption?: string;
  /** Controlled sorted column key. */
  sortKey?: string | null;
  /** Initial sorted column key for uncontrolled usage. */
  defaultSortKey?: string | null;
  /** Controlled sort direction. */
  sortDirection?: DataTableSortDirection;
  /** Initial sort direction for uncontrolled usage. */
  defaultSortDirection?: DataTableSortDirection;
  /** Called when sorting changes. */
  onSortChange?: (key: string | null, direction: DataTableSortDirection) => void;
  /** Rows per page. Defaults to 10. Set to 0 to disable pagination. */
  pageSize?: number;
  /** Controlled current page (1-based). */
  page?: number;
  /** Initial page for uncontrolled usage. */
  defaultPage?: number;
  /** Called when the page changes. */
  onPageChange?: (page: number) => void;
  /** Shows a leading checkbox column with select-all for the visible page. */
  selectable?: boolean;
  /** Controlled selected row ids. */
  selectedIds?: string[];
  /** Initial selection for uncontrolled usage. */
  defaultSelectedIds?: string[];
  /** Called when the selection changes. */
  onSelectionChange?: (ids: string[]) => void;
  /** Accessible label for a row checkbox. Defaults to the row id. */
  getRowLabel?: (row: T, index: number) => string;
  /** Empty state title. */
  emptyTitle?: React.ReactNode;
  /** Empty state supporting copy. */
  emptyDescription?: React.ReactNode;
  /** Extra classes for the scroll container around the table. */
  containerClassName?: string;
}

function compareValues(
  a: string | number | null | undefined,
  b: string | number | null | undefined,
  direction: DataTableSortDirection,
) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") {
    return direction === "asc" ? a - b : b - a;
  }
  const result = String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });
  return direction === "asc" ? result : -result;
}

export function DataTable<T>({
  columns,
  rows,
  getRowId,
  caption,
  sortKey,
  defaultSortKey = null,
  sortDirection,
  defaultSortDirection = "asc",
  onSortChange,
  pageSize = 10,
  page,
  defaultPage = 1,
  onPageChange,
  selectable = false,
  selectedIds,
  defaultSelectedIds = [],
  onSelectionChange,
  getRowLabel,
  emptyTitle = "No rows",
  emptyDescription,
  className,
  containerClassName,
  ...props
}: DataTableProps<T>) {
  const ChevronDownIcon = useKitIcon("chevronDown");
  const resolveId = React.useCallback(
    (row: T, index: number) => getRowId?.(row, index) ?? String(index),
    [getRowId],
  );

  const [internalSortKey, setInternalSortKey] = React.useState<string | null>(defaultSortKey);
  const [internalDirection, setInternalDirection] =
    React.useState<DataTableSortDirection>(defaultSortDirection);
  const activeSortKey = sortKey !== undefined ? sortKey : internalSortKey;
  const activeDirection = sortDirection ?? internalDirection;

  const [internalPage, setInternalPage] = React.useState(defaultPage);
  const [internalSelected, setInternalSelected] = React.useState<string[]>(defaultSelectedIds);
  const activeSelected = selectedIds ?? internalSelected;

  const sorted = React.useMemo(() => {
    const column = columns.find((entry) => entry.key === activeSortKey);
    if (!column?.sortable || !column.sortValue) return rows;
    const { sortValue } = column;
    return rows
      .map((row, index) => ({ row, index }))
      .sort((a, b) => {
        const result = compareValues(sortValue(a.row), sortValue(b.row), activeDirection);
        return result !== 0 ? result : a.index - b.index;
      })
      .map((entry) => entry.row);
  }, [columns, rows, activeSortKey, activeDirection]);

  const paginated = pageSize > 0;
  const pageCount = paginated ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const activePage = Math.min(Math.max(page ?? internalPage, 1), pageCount);

  React.useEffect(() => {
    if (page === undefined) {
      setInternalPage((current) => Math.min(Math.max(current, 1), pageCount));
    }
  }, [page, pageCount]);

  const resetPage = React.useCallback(() => {
    if (page === undefined) setInternalPage(1);
  }, [page]);

  const visibleRows = paginated
    ? sorted.slice((activePage - 1) * pageSize, activePage * pageSize)
    : sorted;

  const changeSort = (key: string) => {
    const nextDirection =
      activeSortKey === key ? (activeDirection === "asc" ? "desc" : "asc") : "asc";
    if (sortKey === undefined) setInternalSortKey(key);
    if (sortDirection === undefined) setInternalDirection(nextDirection);
    onSortChange?.(key, nextDirection);
    resetPage();
  };

  const changePage = (next: number) => {
    if (page === undefined) setInternalPage(next);
    onPageChange?.(next);
  };

  const toggleRow = (id: string) => {
    const next = activeSelected.includes(id)
      ? activeSelected.filter((entry) => entry !== id)
      : [...activeSelected, id];
    if (selectedIds === undefined) setInternalSelected(next);
    onSelectionChange?.(next);
  };

  const visibleIds = visibleRows.map((row, index) =>
    resolveId(row, paginated ? (activePage - 1) * pageSize + index : index),
  );
  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => activeSelected.includes(id));
  const someVisibleSelected =
    !allVisibleSelected && visibleIds.some((id) => activeSelected.includes(id));

  const toggleVisible = () => {
    const selected = new Set(activeSelected);
    if (allVisibleSelected) {
      visibleIds.forEach((id) => selected.delete(id));
    } else {
      visibleIds.forEach((id) => selected.add(id));
    }
    const next = [...selected];
    if (selectedIds === undefined) setInternalSelected(next);
    onSelectionChange?.(next);
  };

  const total = sorted.length;
  const rangeStart = total === 0 ? 0 : (activePage - 1) * pageSize + 1;
  const rangeEnd = paginated ? Math.min(activePage * pageSize, total) : total;

  return (
    <div className={cn("flex w-full flex-col gap-3", className)} {...props}>
      {sorted.length === 0 ? (
        <EmptyState size="sm" title={emptyTitle} description={emptyDescription} />
      ) : (
        <Table containerClassName={containerClassName}>
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <TableHeader>
            <TableRow>
              {selectable ? (
                <TableHead className="w-10">
                  <Checkbox
                    aria-label="Select all rows on this page"
                    checked={allVisibleSelected}
                    indeterminate={someVisibleSelected}
                    onCheckedChange={toggleVisible}
                  />
                </TableHead>
              ) : null}
              {columns.map((column) => {
                const active = activeSortKey === column.key && column.sortable;
                return (
                  <TableHead
                    key={column.key}
                    aria-sort={
                      column.sortable
                        ? active
                          ? activeDirection === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                        : undefined
                    }
                    className={column.headerClassName}
                  >
                    {column.sortable && column.sortValue ? (
                      <button
                        type="button"
                        onClick={() => changeSort(column.key)}
                        className="inline-flex items-center gap-1 rounded-xs transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
                      >
                        <span>{column.header}</span>
                        <ChevronDownIcon
                          size={13}
                          className={cn(
                            "transition-transform duration-[var(--duration-ui)]",
                            active && activeDirection === "asc" && "rotate-180",
                            !active && "opacity-40",
                          )}
                        />
                      </button>
                    ) : (
                      column.header
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleRows.map((row, index) => {
              const absoluteIndex = paginated ? (activePage - 1) * pageSize + index : index;
              const id = resolveId(row, absoluteIndex);
              const selected = activeSelected.includes(id);
              return (
                <TableRow key={id} data-state={selected ? "selected" : undefined}>
                  {selectable ? (
                    <TableCell>
                      <Checkbox
                        aria-label={getRowLabel?.(row, absoluteIndex) ?? `Select row ${id}`}
                        checked={selected}
                        onCheckedChange={() => toggleRow(id)}
                      />
                    </TableCell>
                  ) : null}
                  {columns.map((column) => (
                    <TableCell key={column.key} className={column.cellClassName}>
                      {column.render(row)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
      {paginated && pageCount > 1 ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-muted-foreground">
            Showing {rangeStart}–{rangeEnd} of {total}
          </p>
          <Pagination page={activePage} pageCount={pageCount} onPageChange={changePage} />
        </div>
      ) : null}
    </div>
  );
}
