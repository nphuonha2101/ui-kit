"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import { cn } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";
import { Checkbox } from "../checkbox";
import { EmptyState } from "../empty-state";
import { Input } from "../input";
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
  /** Accessible name announced for the table. */
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
  /** Shows a search box that filters rows across `getSearchText`. */
  searchable?: boolean;
  /** Placeholder for the search box. */
  searchPlaceholder?: string;
  /** Controlled search text. */
  searchValue?: string;
  /** Initial search text for uncontrolled usage. */
  defaultSearchValue?: string;
  /** Called when the search text changes. */
  onSearchChange?: (value: string) => void;
  /** Text matched against the search. Defaults to joining sortable column values. */
  getSearchText?: (row: T) => string;
  /** Extra classes for the scroll container around the table. */
  containerClassName?: string;
}

/** Ascending comparison with nullish values last. TanStack inverts for desc. */
function compareAscending(
  a: string | number | null | undefined,
  b: string | number | null | undefined,
) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });
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
  searchable = false,
  searchPlaceholder = "Search…",
  searchValue,
  defaultSearchValue = "",
  onSearchChange,
  getSearchText,
  className,
  containerClassName,
  ...props
}: DataTableProps<T>) {
  const ChevronDownIcon = useKitIcon("chevronDown");
  const isPageControlled = page !== undefined;
  const isSortControlled = sortKey !== undefined || sortDirection !== undefined;
  const effectivePageSize = pageSize > 0 ? pageSize : Math.max(rows.length, 1);

  const [internalSorting, setInternalSorting] = React.useState<SortingState>(() =>
    defaultSortKey
      ? [{ id: defaultSortKey, desc: defaultSortDirection === "desc" }]
      : [],
  );
  const [internalPagination, setInternalPagination] =
    React.useState<PaginationState>({ pageIndex: defaultPage - 1, pageSize });
  const [internalSelection, setInternalSelection] = React.useState<RowSelectionState>(() =>
    Object.fromEntries(defaultSelectedIds.map((id) => [id, true])),
  );
  const [internalSearch, setInternalSearch] = React.useState(defaultSearchValue);
  const isSearchControlled = searchValue !== undefined;
  const globalFilter = isSearchControlled ? searchValue : internalSearch;

  const matchesSearch = React.useCallback(
    (row: T) => {
      const query = globalFilter.trim().toLowerCase();
      if (!query) return true;
      const haystack = getSearchText
        ? getSearchText(row)
        : columns
            .filter((column) => column.sortValue)
            .map((column) => String(column.sortValue?.(row) ?? ""))
            .join(" ");
      return haystack.toLowerCase().includes(query);
    },
    [globalFilter, columns, getSearchText],
  );

  const filteredCount = React.useMemo(
    () => rows.filter(matchesSearch).length,
    [rows, matchesSearch],
  );

  // Original position per row, so labels stay stable after sorting/filtering.
  const originalIndex = React.useMemo(() => {
    const map = new Map<T, number>();
    rows.forEach((row, index) => {
      if (!map.has(row)) map.set(row, index);
    });
    return map;
  }, [rows]);

  const sorting: SortingState = React.useMemo(() => {
    if (!isSortControlled) return internalSorting;
    return sortKey ? [{ id: sortKey, desc: (sortDirection ?? "asc") === "desc" }] : [];
  }, [isSortControlled, internalSorting, sortKey, sortDirection]);

  const maxPageIndex = Math.max(Math.ceil(filteredCount / effectivePageSize) - 1, 0);

  const pagination: PaginationState = React.useMemo(() => {
    const rawIndex = isPageControlled ? (page ?? 1) - 1 : internalPagination.pageIndex;
    return {
      pageIndex: Math.min(Math.max(rawIndex, 0), maxPageIndex),
      pageSize: effectivePageSize,
    };
  }, [isPageControlled, page, internalPagination.pageIndex, effectivePageSize, maxPageIndex]);

  const rowSelection: RowSelectionState = React.useMemo(() => {
    if (selectedIds !== undefined) {
      return Object.fromEntries(selectedIds.map((id) => [id, true]));
    }
    return internalSelection;
  }, [selectedIds, internalSelection]);

  const tanstackColumns = React.useMemo<ColumnDef<T, unknown>[]>(
    () =>
      columns.map((column) => {
        const base = {
          id: column.key,
          header: () => column.header,
          cell: ({ row }: { row: Row<T> }) => column.render(row.original),
        };
        if (column.sortable && column.sortValue) {
          const sortValue = column.sortValue;
          return {
            ...base,
            accessorFn: (row: T) => sortValue(row) ?? null,
            sortingFn: (rowA: Row<T>, rowB: Row<T>, columnId: string) =>
              compareAscending(
                rowA.getValue(columnId) as string | number | null,
                rowB.getValue(columnId) as string | number | null,
              ),
          };
        }
        // Display-only column: a null accessor keeps it visible to the
        // global filter (TanStack skips columns without accessorFn).
        return { ...base, accessorFn: () => null, enableSorting: false };
      }),
    [columns],
  );

  const table = useReactTable({
    data: rows,
    columns: tanstackColumns,
    getRowId: (row, index) => getRowId?.(row, index) ?? String(index),
    state: { sorting, pagination, rowSelection, globalFilter },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      const [first] = next;
      if (!isSortControlled) setInternalSorting(next);
      onSortChange?.(first?.id ?? null, first?.desc ? "desc" : "asc");
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex: pagination.pageIndex, pageSize: effectivePageSize })
          : updater;
      if (!isPageControlled) {
        setInternalPagination({ pageIndex: next.pageIndex, pageSize: effectivePageSize });
      }
      onPageChange?.(next.pageIndex + 1);
    },
    onRowSelectionChange: (updater) => {
      const next = typeof updater === "function" ? updater(rowSelection) : updater;
      if (selectedIds === undefined) setInternalSelection(next);
      onSelectionChange?.(
        Object.keys(next).filter((id) => next[id]),
      );
    },
    onGlobalFilterChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(globalFilter) : updater;
      if (!isSearchControlled) setInternalSearch(next);
      onSearchChange?.(next);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getColumnCanGlobalFilter: () => true,
    globalFilterFn: (row) => matchesSearch(row.original),
    enableRowSelection: selectable,
    enableSortingRemoval: false,
    autoResetPageIndex: !isPageControlled,
  });

  const pageRows = table.getRowModel().rows;
  const total = filteredCount;
  const pageCount = table.getPageCount();
  const activePageIndex = table.getState().pagination.pageIndex;
  const rangeStart = total === 0 ? 0 : activePageIndex * effectivePageSize + 1;
  const rangeEnd =
    pageSize > 0
      ? Math.min(activePageIndex * effectivePageSize + effectivePageSize, total)
      : total;

  return (
    <div className={cn("flex w-full flex-col gap-3", className)} {...props}>
      {searchable ? (
        <div className="flex items-center justify-between gap-3">
          <Input
            value={globalFilter}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label="Search table"
            className="max-w-xs"
          />
          <p className="font-mono text-[11px] text-muted-foreground">
            {total} of {rows.length}
          </p>
        </div>
      ) : null}
      {total === 0 ? (
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
                    checked={table.getIsAllPageRowsSelected()}
                    indeterminate={table.getIsSomePageRowsSelected()}
                    onCheckedChange={(checked) =>
                      table.toggleAllPageRowsSelected(checked === true)
                    }
                  />
                </TableHead>
              ) : null}
              {columns.map((column) => {
                const tableColumn = table.getColumn(column.key);
                const sorted = tableColumn?.getIsSorted() ?? false;
                const canSort = tableColumn?.getCanSort() ?? false;
                return (
                  <TableHead
                    key={column.key}
                    aria-sort={
                      canSort
                        ? sorted === "asc"
                          ? "ascending"
                          : sorted === "desc"
                            ? "descending"
                            : "none"
                        : undefined
                    }
                    className={column.headerClassName}
                  >
                    {canSort ? (
                      <button
                        type="button"
                        onClick={tableColumn?.getToggleSortingHandler()}
                        className="inline-flex items-center gap-1 rounded-xs transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
                      >
                        <span>{column.header}</span>
                        <ChevronDownIcon
                          size={13}
                          className={cn(
                            "transition-transform duration-[var(--duration-ui)]",
                            sorted === "asc" && "rotate-180",
                            !sorted && "opacity-40",
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
            {pageRows.map((row) => {
              const selected = row.getIsSelected();
              return (
                <TableRow key={row.id} data-state={selected ? "selected" : undefined}>
                  {selectable ? (
                    <TableCell>
                      <Checkbox
                        aria-label={
                          getRowLabel?.(row.original, originalIndex.get(row.original) ?? 0) ??
                          `Select row ${row.id}`
                        }
                        checked={selected}
                        onCheckedChange={(checked) => row.toggleSelected(checked === true)}
                      />
                    </TableCell>
                  ) : null}
                  {columns.map((column) => (
                    <TableCell key={column.key} className={column.cellClassName}>
                      {column.render(row.original)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
      {pageSize > 0 && pageCount > 1 ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-muted-foreground">
            Showing {rangeStart}–{rangeEnd} of {total}
          </p>
          <Pagination
            page={activePageIndex + 1}
            pageCount={pageCount}
            onPageChange={(next) => table.setPageIndex(next - 1)}
          />
        </div>
      ) : null}
    </div>
  );
}
