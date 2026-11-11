"use client";

import * as React from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, type ColumnDef, type PaginationState, type Row, type RowSelectionState, type SortingState, type VisibilityState } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "../../../lib/utils";
import { useKitIcon } from "../_shared/icon-provider";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { EmptyState } from "../empty-state";
import { Input } from "../input";
import { Pagination } from "../pagination";
import { Popover } from "../popover";
import { Skeleton } from "../skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

export type DataTableSortDirection = "asc" | "desc";

export interface DataTableSort {
  /** Column key. */
  key: string;
  /** Sort direction for that column. */
  direction: DataTableSortDirection;
}

export interface DataTableColumn<T> {
  /** Stable key. Used for controlled sorting and header identity. */
  key: string;
  /** Header label. */
  header: React.ReactNode;
  /** Cell content for a row. */
  render: (row: T) => React.ReactNode;
  /** Shows the sort control. Requires `sortValue`. */
  sortable?: boolean;
  /** Comparable value used when this column sorts. Nullish values sort last in both directions. */
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
  /**
   * Accessible name for the table, rendered as a visually hidden caption.
   * Required so every table is announced with a meaningful name.
   */
  caption: string;
  /** Stable id per row. Defaults to the row index. */
  getRowId?: (row: T, index: number) => string;
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
  /** Controlled sort list. Takes precedence over `sortKey`/`sortDirection`. */
  sorting?: DataTableSort[];
  /** Initial sort list for uncontrolled multi-sort. */
  defaultSorting?: DataTableSort[];
  /** Called with the full sort list, including multi-sort entries. */
  onSortingChange?: (sorting: DataTableSort[]) => void;
  /** Allows shift-click multi-column sorting. */
  multiSort?: boolean;
  /** Locale used for string sorting. Defaults to "en" for deterministic output. */
  sortLocale?: string;
  /** Rows per page. Defaults to 10. Set to 0 to disable pagination. */
  pageSize?: number;
  /** Controlled current page (1-based). */
  page?: number;
  /** Initial page for uncontrolled usage. */
  defaultPage?: number;
  /**
   * Called when the reader activates a pagination control. Automatic page
   * resets after search or sort changes do not call it.
   */
  onPageChange?: (page: number) => void;
  /** Shows a leading checkbox column with select-all for the visible page. */
  selectable?: boolean;
  /**
   * Controlled selected row ids. Selection survives filtering and sorting;
   * the header checkbox only toggles rows on the current page.
   */
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
  /** Accessible label for the search box. */
  searchLabel?: string;
  /** Accessible label for the select-all checkbox. */
  selectAllLabel?: string;
  /** Accessible label for the pagination navigation. */
  paginationLabel?: string;
  /** Custom visible range text. */
  showingLabel?: (range: { start: number; end: number; total: number }) => React.ReactNode;
  /** Controlled search text. */
  searchValue?: string;
  /** Initial search text for uncontrolled usage. */
  defaultSearchValue?: string;
  /** Called when the search text changes. */
  onSearchChange?: (value: string) => void;
  /** Text matched against the search. Defaults to joining sortable column values. */
  getSearchText?: (row: T) => string;
  /** Shows skeleton rows while data is loading. */
  loading?: boolean;
  /** Keeps header cells visible while the page scrolls. */
  stickyHeader?: boolean;
  /**
   * Pagination is handled by the caller. Set `rowCount` to the server total
   * and control `page`/`onPageChange`.
   */
  manualPagination?: boolean;
  /** Total rows on the server when `manualPagination` is set. */
  rowCount?: number;
  /** Sorting is handled by the caller. Pair with controlled `sortKey`. */
  manualSorting?: boolean;
  /** Filtering is handled by the caller. Pair with controlled `searchValue`. */
  manualFiltering?: boolean;
  /** Controlled column visibility keyed by column key. */
  columnVisibility?: Record<string, boolean>;
  /** Initial column visibility for uncontrolled usage. */
  defaultColumnVisibility?: Record<string, boolean>;
  /** Called when column visibility changes. */
  onColumnVisibilityChange?: (visibility: Record<string, boolean>) => void;
  /** Shows a Columns popover for toggling column visibility. */
  columnMenu?: boolean;
  /** Accessible label for the column menu trigger. */
  columnMenuLabel?: string;
  /** Virtualizes body rows inside a fixed-height scroll area. */
  virtualized?: boolean;
  /** Height of the virtualized scroll area in pixels. Defaults to 360. */
  virtualHeight?: number;
  /** Estimated row height in pixels. Defaults to 48. */
  estimateRowHeight?: number;
  /** Extra classes for the scroll container around the table. */
  containerClassName?: string;
}

/** Ascending comparison with nullish values last. TanStack inverts for desc. */
function compareAscending(
  collator: Intl.Collator,
  a: string | number | null | undefined,
  b: string | number | null | undefined,
) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return collator.compare(String(a), String(b));
}

export function DataTable<T>({
  columns,
  rows,
  caption,
  getRowId,
  sortKey,
  defaultSortKey = null,
  sortDirection,
  defaultSortDirection = "asc",
  onSortChange,
  sorting,
  defaultSorting,
  onSortingChange,
  multiSort = false,
  sortLocale = "en",
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
  searchLabel = "Search table",
  selectAllLabel = "Select all rows on this page",
  paginationLabel = "Pagination",
  showingLabel,
  searchValue,
  defaultSearchValue = "",
  onSearchChange,
  getSearchText,
  loading = false,
  stickyHeader = false,
  manualPagination = false,
  rowCount,
  manualSorting = false,
  manualFiltering = false,
  columnVisibility,
  defaultColumnVisibility,
  onColumnVisibilityChange,
  columnMenu = false,
  columnMenuLabel = "Columns",
  virtualized = false,
  virtualHeight = 360,
  estimateRowHeight = 48,
  className,
  containerClassName,
  ...props
}: DataTableProps<T>) {
  const ChevronDownIcon = useKitIcon("chevronDown");
  const isPageControlled = page !== undefined;
  const effectivePageSize = pageSize > 0 ? pageSize : Math.max(rows.length, 1);
  const collator = React.useMemo(
    () =>
      new Intl.Collator(sortLocale, {
        numeric: true,
        sensitivity: "base",
      }),
    [sortLocale],
  );

  const [internalSorting, setInternalSorting] = React.useState<SortingState>(() => {
    if (defaultSorting?.length) {
      return defaultSorting.map((entry) => ({
        id: entry.key,
        desc: entry.direction === "desc",
      }));
    }
    return defaultSortKey
      ? [{ id: defaultSortKey, desc: defaultSortDirection === "desc" }]
      : [];
  });
  const [internalVisibility, setInternalVisibility] = React.useState<VisibilityState>(
    () => defaultColumnVisibility ?? {},
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

  // One predicate pass per render, reused by the count and the filter model.
  const matchedFlags = React.useMemo(
    () => rows.map(matchesSearch),
    [rows, matchesSearch],
  );
  const filteredCount = React.useMemo(
    () =>
      manualFiltering
        ? rows.length
        : matchedFlags.reduce((count, matched) => (matched ? count + 1 : count), 0),
    [manualFiltering, rows.length, matchedFlags],
  );
  const total = manualPagination ? (rowCount ?? rows.length) : filteredCount;
  const manualPageCount = Math.max(1, Math.ceil(total / effectivePageSize));

  // Original position per row, so labels stay stable after sorting/filtering.
  const originalIndex = React.useMemo(() => {
    const map = new Map<T, number>();
    rows.forEach((row, index) => {
      if (!map.has(row)) map.set(row, index);
    });
    return map;
  }, [rows]);

  const isSortControlled =
    sorting !== undefined || sortKey !== undefined || sortDirection !== undefined;

  const sortingState: SortingState = React.useMemo(() => {
    if (!isSortControlled) return internalSorting;
    if (sorting) {
      return sorting.map((entry) => ({
        id: entry.key,
        desc: entry.direction === "desc",
      }));
    }
    return sortKey ? [{ id: sortKey, desc: (sortDirection ?? "asc") === "desc" }] : [];
  }, [isSortControlled, internalSorting, sorting, sortKey, sortDirection]);

  const visibilityState: VisibilityState =
    columnVisibility !== undefined ? columnVisibility : internalVisibility;
  const visibleColumns = React.useMemo(
    () => columns.filter((column) => visibilityState[column.key] !== false),
    [columns, visibilityState],
  );

  const maxPageIndex = Math.max(Math.ceil(total / effectivePageSize) - 1, 0);

  const pagination: PaginationState = React.useMemo(() => {
    const rawIndex = isPageControlled ? (page ?? 1) - 1 : internalPagination.pageIndex;
    return {
      pageIndex: Math.min(Math.max(rawIndex, 0), maxPageIndex),
      pageSize: effectivePageSize,
    };
  }, [isPageControlled, page, internalPagination.pageIndex, effectivePageSize, maxPageIndex]);

  // Keep a controlled page in sync when data shrinks below the requested page.
  React.useEffect(() => {
    if (!isPageControlled) return;
    const clamped = Math.min(Math.max(page ?? 1, 1), maxPageIndex + 1);
    if ((page ?? 1) !== clamped) onPageChange?.(clamped);
  }, [isPageControlled, page, maxPageIndex, onPageChange]);

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
            accessorFn: (row: T) => sortValue(row) ?? undefined,
            sortUndefined: "last" as const,
            sortingFn: (rowA: Row<T>, rowB: Row<T>, columnId: string) =>
              compareAscending(
                collator,
                rowA.getValue(columnId) as string | number | null,
                rowB.getValue(columnId) as string | number | null,
              ),
          };
        }
        // Display-only column: a null accessor keeps it visible to the
        // global filter (TanStack skips columns without accessorFn).
        return { ...base, accessorFn: () => null, enableSorting: false };
      }),
    [columns, collator],
  );

  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const seenColumns = new Set<string>();
    for (const column of columns) {
      if (seenColumns.has(column.key)) {
        console.warn(`DataTable: duplicate column key "${column.key}".`);
      }
      seenColumns.add(column.key);
      if (column.sortable && !column.sortValue) {
        console.warn(
          `DataTable: column "${column.key}" is sortable but has no sortValue.`,
        );
      }
    }
    const seenRows = new Set<string>();
    rows.forEach((row, index) => {
      const id = getRowId?.(row, index) ?? String(index);
      if (seenRows.has(id)) {
        console.warn(`DataTable: duplicate row id "${id}".`);
      }
      seenRows.add(id);
    });
  }, [columns, rows, getRowId]);

  const pageChangeRequested = React.useRef(false);
  const table = useReactTable({
    data: rows,
    columns: tanstackColumns,
    getRowId: (row, index) => getRowId?.(row, index) ?? String(index),
    state: {
      sorting: sortingState,
      pagination,
      rowSelection,
      globalFilter,
      columnVisibility: visibilityState,
    },
    onSortingChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(sortingState) : updater;
      const entries = next.map((entry) => ({
        key: entry.id,
        direction: entry.desc ? ("desc" as const) : ("asc" as const),
      }));
      const [first] = next;
      if (!isSortControlled) setInternalSorting(next);
      onSortingChange?.(entries);
      onSortChange?.(first?.id ?? null, first?.desc ? "desc" : "asc");
    },
    onColumnVisibilityChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(visibilityState) : updater;
      if (columnVisibility === undefined) setInternalVisibility(next);
      onColumnVisibilityChange?.(
        Object.fromEntries(
          Object.entries(next).filter(([, visible]) => visible !== undefined),
        ) as Record<string, boolean>,
      );
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex: pagination.pageIndex, pageSize: effectivePageSize })
          : updater;
      if (!isPageControlled) {
        setInternalPagination({ pageIndex: next.pageIndex, pageSize: effectivePageSize });
      }
      if (pageChangeRequested.current) {
        pageChangeRequested.current = false;
        onPageChange?.(next.pageIndex + 1);
      }
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
    globalFilterFn: (row) => matchedFlags[row.index] ?? true,
    enableRowSelection: selectable,
    enableSortingRemoval: false,
    enableMultiSort: multiSort,
    autoResetPageIndex: !isPageControlled,
    manualPagination,
    manualSorting,
    manualFiltering,
    pageCount: manualPagination ? manualPageCount : undefined,
  });

  const pageRows = table.getRowModel().rows;
  const pageCount = manualPagination ? manualPageCount : table.getPageCount();
  const activePageIndex = table.getState().pagination.pageIndex;
  const rangeStart = total === 0 ? 0 : activePageIndex * effectivePageSize + 1;
  const rangeEnd =
    pageSize > 0
      ? Math.min(activePageIndex * effectivePageSize + effectivePageSize, total)
      : total;

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: virtualized ? pageRows.length : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimateRowHeight,
    overscan: 8,
    initialRect: { width: 800, height: virtualHeight },
  });
  const virtualItems = virtualized ? rowVirtualizer.getVirtualItems() : [];
  const virtualPaddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;
  const virtualPaddingBottom =
    virtualItems.length > 0
      ? rowVirtualizer.getTotalSize() -
        virtualItems[virtualItems.length - 1].end
      : 0;
  const renderedRows = virtualized
    ? virtualItems.map((item) => ({
        row: pageRows[item.index],
        virtualIndex: item.index,
      }))
    : pageRows.map((row) => ({ row, virtualIndex: undefined }));
  const columnCount = visibleColumns.length + (selectable ? 1 : 0);

  const stickyHeadClassName = stickyHeader ? "sticky top-0 z-10 bg-card" : undefined;

  const tableHeader = (
    <TableHeader>
      <TableRow>
        {selectable ? (
          <TableHead className={cn("w-10", stickyHeadClassName)}>
            <Checkbox
              className="flex"
              aria-label={selectAllLabel}
              checked={table.getIsAllPageRowsSelected()}
              indeterminate={table.getIsSomePageRowsSelected()}
              onCheckedChange={(checked) =>
                table.toggleAllPageRowsSelected(checked === true)
              }
            />
          </TableHead>
        ) : null}
        {visibleColumns.map((column) => {
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
              className={cn(column.headerClassName, stickyHeadClassName)}
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
  );

  return (
    <div
      className={cn("flex w-full flex-col gap-3", className)}
      aria-busy={loading || undefined}
      {...props}
    >
      {searchable || columnMenu ? (
        <div className="flex flex-wrap items-center gap-3">
          {searchable ? (
            <Input
              value={globalFilter}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchLabel}
              className="max-w-xs"
            />
          ) : null}
          <p
            aria-live="polite"
            className="font-mono text-[11px] text-muted-foreground"
          >
            {loading
              ? "Loading…"
              : manualPagination
                ? `${total} result${total === 1 ? "" : "s"}`
                : `${total} of ${rows.length}`}
          </p>
          {columnMenu ? (
            <div className="ml-auto">
              <Popover
                trigger={
                  <Button variant="secondary" size="sm">
                    {columnMenuLabel}
                  </Button>
                }
                title={columnMenuLabel}
                aria-label={columnMenuLabel}
              >
                <div className="flex flex-col gap-2.5">
                  {columns.map((column) => {
                    const visible = visibilityState[column.key] !== false;
                    return (
                      <Checkbox
                        key={column.key}
                        label={
                          typeof column.header === "string" ? column.header : column.key
                        }
                        checked={visible}
                        disabled={visible && visibleColumns.length === 1}
                        onCheckedChange={(checked) =>
                          table.setColumnVisibility((current) => ({
                            ...current,
                            [column.key]: checked === true,
                          }))
                        }
                      />
                    );
                  })}
                </div>
              </Popover>
            </div>
          ) : null}
        </div>
      ) : null}
      {loading ? (
        <Table containerClassName={containerClassName}>
          <caption className="sr-only">{caption}</caption>
          {tableHeader}
          <TableBody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {selectable ? (
                  <TableCell>
                    <Skeleton className="size-5 rounded-xs" />
                  </TableCell>
                ) : null}
                {visibleColumns.map((column, columnIndex) => (
                  <TableCell key={column.key}>
                    <Skeleton
                      className={cn(
                        "h-4",
                        (rowIndex + columnIndex) % 3 === 0 ? "w-24" : "w-32",
                      )}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : total === 0 ? (
        <EmptyState size="sm" title={emptyTitle} description={emptyDescription} />
      ) : (
        <div
          ref={virtualized ? scrollRef : undefined}
          data-virtualized={virtualized || undefined}
          className={virtualized ? "overflow-auto" : undefined}
          style={virtualized ? { height: virtualHeight } : undefined}
        >
          <Table
            containerClassName={cn(
              virtualized && "overflow-visible",
              containerClassName,
            )}
          >
            <caption className="sr-only">{caption}</caption>
            {tableHeader}
            <TableBody>
              {virtualized && virtualPaddingTop > 0 ? (
                <TableRow aria-hidden="true" className="hover:bg-transparent">
                  <TableCell
                    colSpan={columnCount}
                    style={{ height: virtualPaddingTop, padding: 0 }}
                  />
                </TableRow>
              ) : null}
              {renderedRows.map(({ row, virtualIndex }) => {
                const selected = row.getIsSelected();
                return (
                  <TableRow
                    key={row.id}
                    data-index={virtualIndex}
                    ref={virtualized ? rowVirtualizer.measureElement : undefined}
                    data-state={selected ? "selected" : undefined}
                  >
                    {selectable ? (
                      <TableCell>
                        <Checkbox
                          className="flex"
                          aria-label={
                            getRowLabel?.(row.original, originalIndex.get(row.original) ?? 0) ??
                            `Select row ${row.id}`
                          }
                          checked={selected}
                          onCheckedChange={(checked) =>
                            row.toggleSelected(checked === true)
                          }
                        />
                      </TableCell>
                    ) : null}
                    {visibleColumns.map((column) => (
                      <TableCell key={column.key} className={column.cellClassName}>
                        {column.render(row.original)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {virtualized && virtualPaddingBottom > 0 ? (
                <TableRow aria-hidden="true" className="hover:bg-transparent">
                  <TableCell
                    colSpan={columnCount}
                    style={{ height: virtualPaddingBottom, padding: 0 }}
                  />
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      )}
      {!loading && pageSize > 0 && pageCount > 1 ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-muted-foreground">
            {showingLabel
              ? showingLabel({ start: rangeStart, end: rangeEnd, total })
              : `Showing ${rangeStart}–${rangeEnd} of ${total}`}
          </p>
          <Pagination
            aria-label={paginationLabel}
            page={activePageIndex + 1}
            pageCount={pageCount}
            onPageChange={(next) => {
              pageChangeRequested.current = true;
              table.setPageIndex(next - 1);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
