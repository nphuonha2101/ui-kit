import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import { Card, DataTable, type DataTableColumn } from "@nphuonha/ui-kit";

interface Invoice {
  id: string;
  client: string;
  amount: number;
}

const columns: DataTableColumn<Invoice>[] = [
  {
    key: "id",
    header: "Invoice",
    render: (row) => row.id,
    sortable: true,
    sortValue: (row) => row.id,
  },
  {
    key: "amount",
    header: "Amount",
    render: (row) => \`$\${row.amount}\`,
    sortable: true,
    sortValue: (row) => row.amount,
  },
];

export function Example() {
  return (
    <Card className="p-2">
      <DataTable
        columns={columns}
        rows={invoices}
        getRowId={(row) => row.id}
        caption="Invoices"
        pageSize={5}
        searchable
        searchPlaceholder="Search invoices…"
        getSearchText={(row) => \`\${row.id} \${row.client} \${row.amount}\`}
      />
    </Card>
  );
}`,
  "usage": `<DataTable
  columns={columns}
  rows={rows}
  getRowId={(row) => row.id}
  caption="Invoices"
  pageSize={5}
/>`,
  "examples": {
    "data-table-virtualized": `const rows = React.useMemo(
  () => Array.from({ length: 1000 }, (_, index) => makeInvoice(index)),
  [],
);

<DataTable
  columns={columns}
  rows={rows}
  getRowId={(row) => row.id}
  caption="Invoices"
  pageSize={0}
  virtualized
  virtualHeight={320}
  estimateRowHeight={53}
/>`,
    "data-table-async": `const [page, setPage] = React.useState(1);
const [sortKey, setSortKey] = React.useState<string | null>("id");
const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");
const [search, setSearch] = React.useState("");
const [loading, setLoading] = React.useState(true);
const [result, setResult] = React.useState({ rows: [], total: 0 });

React.useEffect(() => {
  setLoading(true);
  fetchInvoices({ page, pageSize, sortKey, sortDirection, search })
    .then((response) => setResult(response))
    .finally(() => setLoading(false));
}, [page, pageSize, sortKey, sortDirection, search]);

<DataTable
  columns={columns}
  rows={result.rows}
  getRowId={(row) => row.id}
  caption="Invoices"
  pageSize={pageSize}
  searchable
  searchValue={search}
  onSearchChange={(value) => {
    setSearch(value);
    setPage(1);
  }}
  sortKey={sortKey}
  sortDirection={sortDirection}
  onSortChange={(key, direction) => {
    setSortKey(key);
    setSortDirection(direction);
    setPage(1);
  }}
  manualSorting
  manualFiltering
  manualPagination
  rowCount={result.total}
  page={page}
  onPageChange={setPage}
  loading={loading}
/>`,
    "data-table-selection": `const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

<DataTable
  columns={columns}
  rows={rows}
  getRowId={(row) => row.id}
  caption="Selectable invoices"
  pageSize={0}
  selectable
  selectedIds={selectedIds}
  onSelectionChange={setSelectedIds}
/>`,
    "data-table-actions": `<DataTable
  columns={[
    ...columns,
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <Button variant="ghost" size="sm" onClick={() => setActive(row)}>
          View detail
        </Button>
      ),
    },
  ]}
  rows={rows}
  getRowId={(row) => row.id}
  caption="Invoices with a row action"
  pageSize={0}
/>

<Dialog
  open={active !== null}
  onOpenChange={(open) => {
    if (!open) setActive(null);
  }}
  title={active ? \`Invoice \${active.id}\` : undefined}
>
  {/* Full row detail */}
</Dialog>`
  }
};
