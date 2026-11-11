import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTable, type DataTableColumn } from "./data-table";

interface Invoice {
  id: string;
  client: string;
  amount: number;
}

const rows: Invoice[] = [
  { id: "INV-003", client: "Lumen Labs", amount: 2150 },
  { id: "INV-001", client: "Acme Studio", amount: 1200 },
  { id: "INV-002", client: "Northwind", amount: 480 },
];

const columns: DataTableColumn<Invoice>[] = [
  {
    key: "id",
    header: "Invoice",
    render: (row) => row.id,
    sortable: true,
    sortValue: (row) => row.id,
  },
  {
    key: "client",
    header: "Client",
    render: (row) => row.client,
  },
  {
    key: "amount",
    header: "Amount",
    render: (row) => `$${row.amount}`,
    sortable: true,
    sortValue: (row) => row.amount,
  },
];

function rowIds() {
  return within(screen.getByRole("table").querySelector("tbody")!).getAllByRole("row").map(
    (row) => within(row).getAllByRole("cell")[0].textContent,
  );
}

describe("DataTable", () => {
  it("renders headers and cells with table semantics", () => {
    render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /invoice/i })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Acme Studio" })).toBeInTheDocument();
  });

  it("sorts ascending then descending when a sortable header is activated", async () => {
    const user = userEvent.setup();
    render(
      <DataTable columns={columns} rows={rows} getRowId={(row) => row.id} pageSize={0} />,
    );

    expect(rowIds()).toEqual(["INV-003", "INV-001", "INV-002"]);

    await user.click(screen.getByRole("button", { name: /invoice/i }));
    expect(rowIds()).toEqual(["INV-001", "INV-002", "INV-003"]);
    expect(screen.getByRole("columnheader", { name: /invoice/i })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );

    await user.click(screen.getByRole("button", { name: /invoice/i }));
    expect(rowIds()).toEqual(["INV-003", "INV-002", "INV-001"]);
  });

  it("paginates rows and reports the visible range", async () => {
    const user = userEvent.setup();
    const many = Array.from({ length: 12 }, (_, index) => ({
      id: `INV-${String(index + 1).padStart(3, "0")}`,
      client: `Client ${index + 1}`,
      amount: (index + 1) * 100,
    }));
    render(
      <DataTable
        columns={columns}
        rows={many}
        getRowId={(row) => row.id}
        pageSize={5}
      />,
    );

    expect(screen.getByText("Showing 1–5 of 12")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Page 3" }));
    expect(screen.getByText("Showing 11–12 of 12")).toBeInTheDocument();
  });

  it("clamps to the last valid page when rows shrink", async () => {
    const user = userEvent.setup();
    const many = Array.from({ length: 12 }, (_, index) => ({
      id: `INV-${String(index + 1).padStart(3, "0")}`,
      client: `Client ${index + 1}`,
      amount: (index + 1) * 100,
    }));
    const { rerender } = render(
      <DataTable
        columns={columns}
        rows={many}
        getRowId={(row) => row.id}
        pageSize={5}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Page 3" }));
    expect(screen.getByText("Showing 11–12 of 12")).toBeInTheDocument();

    rerender(
      <DataTable
        columns={columns}
        rows={many.slice(0, 7)}
        getRowId={(row) => row.id}
        pageSize={5}
      />,
    );
    expect(screen.getByText("Showing 6–7 of 7")).toBeInTheDocument();
  });

  it("clamps an out-of-range controlled page", () => {
    const many = Array.from({ length: 12 }, (_, index) => ({
      id: `INV-${String(index + 1).padStart(3, "0")}`,
      client: `Client ${index + 1}`,
      amount: (index + 1) * 100,
    }));
    render(
      <DataTable
        columns={columns}
        rows={many}
        getRowId={(row) => row.id}
        pageSize={5}
        page={99}
      />,
    );

    expect(screen.getByText("Showing 11–12 of 12")).toBeInTheDocument();
  });

  it("reports controlled sorting without changing order", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    render(
      <DataTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        sortKey="amount"
        sortDirection="desc"
        onSortChange={onSortChange}
      />,
    );

    expect(rowIds()).toEqual(["INV-003", "INV-001", "INV-002"]);
    await user.click(screen.getByRole("button", { name: /invoice/i }));
    expect(onSortChange).toHaveBeenLastCalledWith("id", "asc");
    expect(rowIds()).toEqual(["INV-003", "INV-001", "INV-002"]);
  });

  it("selects rows and reports selection changes", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(
      <DataTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        selectable
        onSelectionChange={onSelectionChange}
      />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Select all rows on this page" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(["INV-003", "INV-001", "INV-002"]);

    await user.click(screen.getByRole("checkbox", { name: "Select row INV-001" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(["INV-003", "INV-002"]);
  });

  it("shows a mixed state when only some rows are selected", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        selectable
      />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Select row INV-001" }));
    expect(
      screen.getByRole("checkbox", { name: "Select all rows on this page" }),
    ).toHaveAttribute("aria-checked", "mixed");
  });

  it("renders an empty state when there are no rows", () => {
    render(
      <DataTable
        columns={columns}
        rows={[]}
        emptyTitle="No invoices"
        emptyDescription="Create one to get started."
      />,
    );

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByText("No invoices")).toBeInTheDocument();
  });
});
