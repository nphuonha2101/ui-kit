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
    "data-table-selection": `const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

<DataTable
  columns={columns}
  rows={rows}
  getRowId={(row) => row.id}
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
