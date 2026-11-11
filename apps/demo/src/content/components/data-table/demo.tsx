"use client";

import * as React from "react";
import {
  Badge,
  Button,
  Card,
  DataTable,
  Dialog,
  type DataTableColumn,
} from "@nphuonha/ui-kit";

interface Invoice {
  id: string;
  client: string;
  status: "Paid" | "Pending" | "Overdue";
  amount: number;
}

const invoices: Invoice[] = [
  { id: "INV-001", client: "Acme Studio", status: "Paid", amount: 1200 },
  { id: "INV-002", client: "Northwind", status: "Pending", amount: 480 },
  { id: "INV-003", client: "Lumen Labs", status: "Paid", amount: 2150 },
  { id: "INV-004", client: "Kite & Co.", status: "Overdue", amount: 320 },
  { id: "INV-005", client: "Paper Plane", status: "Paid", amount: 860 },
  { id: "INV-006", client: "Hexagon", status: "Pending", amount: 1490 },
  { id: "INV-007", client: "Bluebird", status: "Overdue", amount: 640 },
];

const statusVariant = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
} as const;

const columns: DataTableColumn<Invoice>[] = [
  {
    key: "id",
    header: "Invoice",
    render: (row) => <span className="font-medium text-foreground">{row.id}</span>,
    sortable: true,
    sortValue: (row) => row.id,
  },
  {
    key: "client",
    header: "Client",
    render: (row) => <span className="text-muted-foreground">{row.client}</span>,
    sortable: true,
    sortValue: (row) => row.client,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <Badge variant={statusVariant[row.status]}>{row.status}</Badge>,
    sortable: true,
    sortValue: (row) => row.status,
  },
  {
    key: "amount",
    header: "Amount",
    render: (row) => <span className="tabular-nums">${row.amount.toLocaleString()}</span>,
    sortable: true,
    sortValue: (row) => row.amount,
    headerClassName: "text-right",
    cellClassName: "text-right",
  },
];

function DataTableDemo() {
  return (
    <Card className="w-full overflow-hidden p-2">
      <DataTable
        columns={columns}
        rows={invoices}
        getRowId={(row) => row.id}
        caption="Invoices with sorting, search and pagination"
        pageSize={5}
        searchable
        searchPlaceholder="Search invoices…"
        getSearchText={(row) => `${row.id} ${row.client} ${row.status} ${row.amount}`}
      />
    </Card>
  );
}

function SelectionExample() {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="font-mono text-[11px] text-muted-foreground">
        {selectedIds.length === 0
          ? "No rows selected"
          : `Selected: ${selectedIds.join(", ")}`}
      </p>
      <Card className="w-full overflow-hidden p-2">
        <DataTable
          columns={columns}
          rows={invoices.slice(0, 4)}
          getRowId={(row) => row.id}
          caption="Selectable invoices"
          pageSize={0}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </Card>
    </div>
  );
}

function ActionsExample() {
  const [active, setActive] = React.useState<Invoice | null>(null);
  return (
    <Card className="w-full overflow-hidden p-2">
      <DataTable
        columns={[
          ...columns.slice(0, 3),
          {
            key: "actions",
            header: "Actions",
            render: (row) => (
              <Button variant="ghost" size="sm" onClick={() => setActive(row)}>
                View detail
              </Button>
            ),
            headerClassName: "text-right",
            cellClassName: "text-right",
          },
        ]}
        rows={invoices.slice(0, 4)}
        getRowId={(row) => row.id}
        caption="Invoices with a row action"
        pageSize={0}
      />
      <Dialog
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
        title={active ? `Invoice ${active.id}` : undefined}
        description={active ? `${active.client} — ${active.status}` : undefined}
      >
        <p className="text-sm leading-6 text-muted-foreground">
          Amount due:{" "}
          <span className="font-medium tabular-nums text-foreground">
            ${active?.amount.toLocaleString()}
          </span>
        </p>
      </Dialog>
    </Card>
  );
}

export const demo = DataTableDemo;
export const examples = {
  "data-table-selection": SelectionExample,
  "data-table-actions": ActionsExample,
};
