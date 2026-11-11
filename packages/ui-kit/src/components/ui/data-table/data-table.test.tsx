import { fireEvent, render, screen, within } from "@testing-library/react";
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
    sortable: true,
    sortValue: (row) => row.client,
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
    render(<DataTable caption="Invoices" columns={columns} rows={rows} getRowId={(row) => row.id} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /invoice/i })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Acme Studio" })).toBeInTheDocument();
  });

  it("sorts ascending then descending when a sortable header is activated", async () => {
    const user = userEvent.setup();
    render(
      <DataTable caption="Invoices" columns={columns} rows={rows} getRowId={(row) => row.id} pageSize={0} />,
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
      <DataTable caption="Invoices"
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
      <DataTable caption="Invoices"
        columns={columns}
        rows={many}
        getRowId={(row) => row.id}
        pageSize={5}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Page 3" }));
    expect(screen.getByText("Showing 11–12 of 12")).toBeInTheDocument();

    rerender(
      <DataTable caption="Invoices"
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
      <DataTable caption="Invoices"
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
      <DataTable caption="Invoices"
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
      <DataTable caption="Invoices"
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

  it("filters rows through the search box", async () => {
    const user = userEvent.setup();
    render(
      <DataTable caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        searchable
      />,
    );

    expect(screen.getByText("3 of 3")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Search table"), "acme");
    expect(rowIds()).toEqual(["INV-001"]);
    expect(screen.getByText("1 of 3")).toBeInTheDocument();
  });

  it("falls back to sortable values when no search text is provided", async () => {
    const user = userEvent.setup();
    render(
      <DataTable caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        searchable
      />,
    );

    await user.type(screen.getByLabelText("Search table"), "2150");
    expect(rowIds()).toEqual(["INV-003"]);
  });

  it("supports controlled search", () => {
    render(
      <DataTable caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        searchable
        searchValue="northwind"
      />,
    );

    expect(rowIds()).toEqual(["INV-002"]);
    expect(screen.getByLabelText("Search table")).toHaveValue("northwind");
  });

  it("shows the empty state when search matches nothing", async () => {
    const user = userEvent.setup();
    render(
      <DataTable caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        searchable
        emptyTitle="No matches"
      />,
    );

    await user.type(screen.getByLabelText("Search table"), "zzz");
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByText("No matches")).toBeInTheDocument();
  });

  it("searches render-only content through getSearchText", async () => {
    const user = userEvent.setup();
    const noteColumns: DataTableColumn<Invoice>[] = [
      {
        key: "id",
        header: "Invoice",
        render: (row) => row.id,
      },
      {
        key: "note",
        header: "Note",
        render: (row) => `Billed to ${row.client}`,
      },
    ];
    render(
      <DataTable caption="Invoices"
        columns={noteColumns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        searchable
        getSearchText={(row) => `${row.id} ${row.client} ${row.amount}`}
      />,
    );

    await user.type(screen.getByLabelText("Search table"), "lumen");
    expect(
      screen.getByRole("cell", { name: "INV-003" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("cell", { name: "INV-001" })).not.toBeInTheDocument();
  });

  it("falls back to index-based row ids", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(
      <DataTable caption="Invoices"
        columns={columns}
        rows={rows}
        pageSize={0}
        selectable
        onSelectionChange={onSelectionChange}
      />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Select row 1" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(["1"]);
  });

  it("uses a custom row label when provided", async () => {
    const user = userEvent.setup();
    render(
      <DataTable caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        getRowLabel={(row) => `Pick ${row.id}`}
        pageSize={0}
        selectable
      />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Pick INV-002" }));
    expect(screen.getByRole("checkbox", { name: "Pick INV-002" })).toBeChecked();
  });

  it("reports page changes through onPageChange", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    const many = Array.from({ length: 12 }, (_, index) => ({
      id: `INV-${String(index + 1).padStart(3, "0")}`,
      client: `Client ${index + 1}`,
      amount: (index + 1) * 100,
    }));
    render(
      <DataTable caption="Invoices"
        columns={columns}
        rows={many}
        getRowId={(row) => row.id}
        pageSize={5}
        onPageChange={onPageChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Page 3" }));
    expect(onPageChange).toHaveBeenLastCalledWith(3);
    await user.click(screen.getByRole("button", { name: "Previous page" }));
    expect(onPageChange).toHaveBeenLastCalledWith(2);
  });

  it("applies a default sort on mount", () => {
    render(
      <DataTable caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        defaultSortKey="amount"
        defaultSortDirection="desc"
      />,
    );

    expect(rowIds()).toEqual(["INV-003", "INV-001", "INV-002"]);
    expect(screen.getByRole("columnheader", { name: /amount/i })).toHaveAttribute(
      "aria-sort",
      "descending",
    );
  });

  it("keeps sorting when columns get a new identity", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <DataTable caption="Invoices"
        columns={columns.map((column) => ({ ...column }))}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
      />,
    );

    await user.click(screen.getByRole("button", { name: /invoice/i }));
    expect(rowIds()).toEqual(["INV-001", "INV-002", "INV-003"]);

    rerender(
      <DataTable caption="Invoices"
        columns={columns.map((column) => ({ ...column }))}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
      />,
    );
    expect(rowIds()).toEqual(["INV-001", "INV-002", "INV-003"]);
  });

  it("shows a mixed state when only some rows are selected", async () => {
    const user = userEvent.setup();
    render(
      <DataTable caption="Invoices"
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

  it("keeps row labels stable after sorting", async () => {
    const user = userEvent.setup();
    render(
      <DataTable caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        getRowLabel={(row, index) => `${index}:${row.id}`}
        pageSize={0}
        selectable
      />,
    );

    expect(screen.getByRole("checkbox", { name: "0:INV-003" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /invoice/i }));
    expect(screen.getByRole("checkbox", { name: "1:INV-001" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "0:INV-003" })).toBeInTheDocument();
  });

  it("keeps selection attached to the same row after sorting", async () => {
    const user = userEvent.setup();
    render(
      <DataTable caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        selectable
      />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Select row INV-003" }));
    await user.click(screen.getByRole("button", { name: /invoice/i }));

    expect(screen.getByRole("checkbox", { name: "Select row INV-003" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Select row INV-001" })).not.toBeChecked();
  });

  it("marks sortable but unsorted headers as aria-sort none", () => {
    render(
      <DataTable caption="Invoices" columns={columns} rows={rows} getRowId={(row) => row.id} pageSize={0} />,
    );

    expect(screen.getByRole("columnheader", { name: /client/i })).toHaveAttribute(
      "aria-sort",
      "none",
    );
  });

  it("keeps the search box usable when nothing matches", async () => {
    const user = userEvent.setup();
    render(
      <DataTable caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        searchable
      />,
    );

    await user.type(screen.getByLabelText("Search table"), "zzz");
    expect(screen.getByText("0 of 3")).toBeInTheDocument();
    await user.clear(screen.getByLabelText("Search table"));
    expect(rowIds()).toHaveLength(3);
  });

  it("searches and paginates together", async () => {
    const user = userEvent.setup();
    const many = Array.from({ length: 12 }, (_, index) => ({
      id: `INV-${String(index + 1).padStart(3, "0")}`,
      client: index % 2 === 0 ? "Acme Studio" : "Northwind",
      amount: (index + 1) * 100,
    }));
    render(
      <DataTable caption="Invoices"
        columns={columns}
        rows={many}
        getRowId={(row) => row.id}
        pageSize={5}
        searchable
      />,
    );

    await user.type(screen.getByLabelText("Search table"), "acme");
    expect(screen.getByText("6 of 12")).toBeInTheDocument();
    expect(screen.getByText("Showing 1–5 of 6")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Page 2" }));
    expect(screen.getByText("Showing 6–6 of 6")).toBeInTheDocument();
  });

  it("renders an empty state when there are no rows", () => {
    render(
      <DataTable caption="Invoices"
        columns={columns}
        rows={[]}
        emptyTitle="No invoices"
        emptyDescription="Create one to get started."
      />,
    );

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByText("No invoices")).toBeInTheDocument();
  });

  it("exposes the caption as the accessible table name", () => {
    render(<DataTable caption="Open invoices" columns={columns} rows={rows} />);

    expect(screen.getByRole("table", { name: "Open invoices" })).toBeInTheDocument();
  });

  it("applies custom labels", async () => {
    const user = userEvent.setup();
    const many = Array.from({ length: 12 }, (_, index) => ({
      id: `INV-${String(index + 1).padStart(3, "0")}`,
      client: `Client ${index + 1}`,
      amount: (index + 1) * 100,
    }));
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={many}
        getRowId={(row) => row.id}
        pageSize={5}
        searchable
        searchLabel="Filter invoices"
        selectable
        selectAllLabel="Pick every invoice"
        paginationLabel="Invoice pages"
        showingLabel={({ start, end, total }) => `${start} to ${end} / ${total}`}
      />,
    );

    expect(screen.getByLabelText("Filter invoices")).toBeInTheDocument();
    expect(screen.getByLabelText("Pick every invoice")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Invoice pages" })).toBeInTheDocument();
    expect(screen.getByText("1 to 5 / 12")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Filter invoices"), "Client 1");
    expect(screen.getByText("4 of 12")).toBeInTheDocument();
  });

  it("announces the result count", () => {
    render(
      <DataTable caption="Invoices" columns={columns} rows={rows} searchable />,
    );

    expect(screen.getByText("3 of 3")).toHaveAttribute("aria-live", "polite");
  });

  it("syncs an out-of-range controlled page", () => {
    const onPageChange = vi.fn();
    const many = Array.from({ length: 12 }, (_, index) => ({
      id: `INV-${String(index + 1).padStart(3, "0")}`,
      client: `Client ${index + 1}`,
      amount: (index + 1) * 100,
    }));
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={many}
        getRowId={(row) => row.id}
        pageSize={5}
        page={99}
        onPageChange={onPageChange}
      />,
    );

    expect(onPageChange).toHaveBeenLastCalledWith(3);
    expect(screen.getByText("Showing 11–12 of 12")).toBeInTheDocument();
  });

  it("does not report automatic page resets from search", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    const many = Array.from({ length: 12 }, (_, index) => ({
      id: `INV-${String(index + 1).padStart(3, "0")}`,
      client: `Client ${index + 1}`,
      amount: (index + 1) * 100,
    }));
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={many}
        getRowId={(row) => row.id}
        pageSize={5}
        searchable
        onPageChange={onPageChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Page 3" }));
    expect(onPageChange).toHaveBeenLastCalledWith(3);

    onPageChange.mockClear();
    await user.type(screen.getByLabelText("Search table"), "Client 1");
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("sorts with a deterministic en collator", async () => {
    const user = userEvent.setup();
    const names = [
      { id: "1", client: "Zebra", amount: 1 },
      { id: "2", client: "Ähre", amount: 2 },
      { id: "3", client: "apple", amount: 3 },
    ];
    render(
      <DataTable
        caption="Names"
        columns={[
          {
            key: "client",
            header: "Client",
            render: (row) => row.client,
            sortable: true,
            sortValue: (row) => row.client,
          },
        ]}
        rows={names}
        getRowId={(row) => row.id}
        pageSize={0}
      />,
    );

    await user.click(screen.getByRole("button", { name: /client/i }));
    expect(rowIds()).toEqual(["Ähre", "apple", "Zebra"]);
  });

  it("keeps nullish values last in both directions", async () => {
    const user = userEvent.setup();
    const list: { id: string; client: string | null }[] = [
      { id: "1", client: "Beta" },
      { id: "2", client: null },
      { id: "3", client: "Alpha" },
    ];
    render(
      <DataTable
        caption="Clients"
        columns={[
          {
            key: "client",
            header: "Client",
            render: (row) => row.client ?? "—",
            sortable: true,
            sortValue: (row) => row.client,
          },
        ]}
        rows={list}
        getRowId={(row) => row.id}
        pageSize={0}
      />,
    );

    await user.click(screen.getByRole("button", { name: /client/i }));
    expect(rowIds()).toEqual(["Alpha", "Beta", "—"]);
    await user.click(screen.getByRole("button", { name: /client/i }));
    expect(rowIds()).toEqual(["Beta", "Alpha", "—"]);
  });

  it("sorts numbers inside strings naturally", async () => {
    const user = userEvent.setup();
    const list = [
      { id: "1", client: "Item 2" },
      { id: "2", client: "Item 10" },
      { id: "3", client: "Item 1" },
    ];
    render(
      <DataTable
        caption="Items"
        columns={[
          {
            key: "client",
            header: "Item",
            render: (row) => row.client,
            sortable: true,
            sortValue: (row) => row.client,
          },
        ]}
        rows={list}
        getRowId={(row) => row.id}
        pageSize={0}
      />,
    );

    await user.click(screen.getByRole("button", { name: /item/i }));
    expect(rowIds()).toEqual(["Item 1", "Item 2", "Item 10"]);
  });

  it("keeps selections from other pages when selecting the current page", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    const many = Array.from({ length: 12 }, (_, index) => ({
      id: `INV-${String(index + 1).padStart(3, "0")}`,
      client: `Client ${index + 1}`,
      amount: (index + 1) * 100,
    }));
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={many}
        getRowId={(row) => row.id}
        pageSize={5}
        selectable
        onSelectionChange={onSelectionChange}
      />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Select row INV-001" }));
    await user.click(screen.getByRole("button", { name: "Page 2" }));
    await user.click(screen.getByRole("checkbox", { name: "Select all rows on this page" }));

    const ids = onSelectionChange.mock.calls.at(-1)?.[0] as string[];
    expect(ids).toEqual(
      expect.arrayContaining(["INV-001", "INV-006", "INV-007", "INV-008", "INV-009", "INV-010"]),
    );
    expect(ids).not.toContain("INV-002");
  });

  it("respects a controlled selection", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    const { rerender } = render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        selectable
        selectedIds={["INV-001"]}
        onSelectionChange={onSelectionChange}
      />,
    );

    expect(screen.getByRole("checkbox", { name: "Select row INV-001" })).toBeChecked();
    await user.click(screen.getByRole("checkbox", { name: "Select row INV-002" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(["INV-001", "INV-002"]);
    expect(screen.getByRole("checkbox", { name: "Select row INV-002" })).not.toBeChecked();

    rerender(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        selectable
        selectedIds={["INV-001", "INV-002"]}
        onSelectionChange={onSelectionChange}
      />,
    );
    expect(screen.getByRole("checkbox", { name: "Select row INV-002" })).toBeChecked();
  });

  it("applies defaultSelectedIds", () => {
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        selectable
        defaultSelectedIds={["INV-002"]}
      />,
    );

    expect(screen.getByRole("checkbox", { name: "Select row INV-002" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Select row INV-001" })).not.toBeChecked();
  });

  it("applies defaultSearchValue and reports search changes", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        searchable
        defaultSearchValue="acme"
        onSearchChange={onSearchChange}
      />,
    );

    expect(screen.getByLabelText("Search table")).toHaveValue("acme");
    expect(rowIds()).toEqual(["INV-001"]);
    await user.type(screen.getByLabelText("Search table"), "!");
    expect(onSearchChange).toHaveBeenLastCalledWith("acme!");
  });

  it("trims whitespace in search queries", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        searchable
      />,
    );

    await user.type(screen.getByLabelText("Search table"), "  acme  ");
    expect(rowIds()).toEqual(["INV-001"]);
  });

  it("reports uncontrolled sorting changes", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        onSortChange={onSortChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /invoice/i }));
    expect(onSortChange).toHaveBeenLastCalledWith("id", "asc");
    await user.click(screen.getByRole("button", { name: /invoice/i }));
    expect(onSortChange).toHaveBeenLastCalledWith("id", "desc");
  });

  it("clamps the page when pageSize changes", async () => {
    const user = userEvent.setup();
    const many = Array.from({ length: 12 }, (_, index) => ({
      id: `INV-${String(index + 1).padStart(3, "0")}`,
      client: `Client ${index + 1}`,
      amount: (index + 1) * 100,
    }));
    const { rerender } = render(
      <DataTable
        caption="Invoices"
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
        caption="Invoices"
        columns={columns}
        rows={many}
        getRowId={(row) => row.id}
        pageSize={10}
      />,
    );
    expect(screen.getByText("Showing 11–12 of 12")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("warns about duplicate keys, duplicate ids and sortable columns without values", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <DataTable
        caption="Warnings"
        columns={[
          { key: "a", header: "A", render: () => null },
          { key: "a", header: "A2", render: () => null },
          { key: "b", header: "B", render: () => null, sortable: true },
        ]}
        rows={[{}, {}, {}]}
        getRowId={(_, index) => (index < 2 ? "same" : String(index))}
      />,
    );

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('duplicate column key "a"'));
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('column "b" is sortable but has no sortValue'),
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('duplicate row id "same"'));
    warn.mockRestore();
  });

  it("uses the default empty title", () => {
    render(<DataTable caption="Invoices" columns={columns} rows={[]} />);

    expect(screen.getByText("No rows")).toBeInTheDocument();
  });

  it("shows skeleton rows while loading", () => {
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={5}
        searchable
        loading
      />,
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("table").closest("[aria-busy]")).toHaveAttribute(
      "aria-busy",
      "true",
    );
    expect(screen.getByText("Loading…")).toBeInTheDocument();
    expect(screen.queryByRole("cell", { name: "Acme Studio" })).not.toBeInTheDocument();
    expect(screen.queryByText("No rows")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Page 2" })).not.toBeInTheDocument();
  });

  it("supports manual pagination with a server row count", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    const pageRows = Array.from({ length: 10 }, (_, index) => ({
      id: `INV-${String(index + 1).padStart(3, "0")}`,
      client: `Client ${index + 1}`,
      amount: (index + 1) * 100,
    }));
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={pageRows}
        getRowId={(row) => row.id}
        pageSize={10}
        page={1}
        onPageChange={onPageChange}
        manualPagination
        rowCount={95}
        searchable
      />,
    );

    expect(screen.getByText("95 results")).toBeInTheDocument();
    expect(screen.getByText("Showing 1–10 of 95")).toBeInTheDocument();
    expect(screen.getByRole("table").querySelectorAll("tbody tr")).toHaveLength(10);

    await user.click(screen.getByRole("button", { name: "Page 2" }));
    expect(onPageChange).toHaveBeenLastCalledWith(2);
  });

  it("does not reorder rows in manual sorting mode", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        manualSorting
        onSortChange={onSortChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /invoice/i }));
    expect(onSortChange).toHaveBeenLastCalledWith("id", "asc");
    expect(rowIds()).toEqual(["INV-003", "INV-001", "INV-002"]);
  });

  it("does not filter rows in manual filtering mode", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        searchable
        manualFiltering
        onSearchChange={onSearchChange}
      />,
    );

    await user.type(screen.getByLabelText("Search table"), "zzz");
    expect(onSearchChange).toHaveBeenLastCalledWith("zzz");
    expect(rowIds()).toEqual(["INV-003", "INV-001", "INV-002"]);
  });

  it("sticks the header when requested", () => {
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={rows}
        pageSize={0}
        stickyHeader
      />,
    );

    expect(screen.getByRole("columnheader", { name: /invoice/i }).className).toContain(
      "sticky",
    );
  });

  it("renders only one page for a large dataset", async () => {
    const user = userEvent.setup();
    const many = Array.from({ length: 5000 }, (_, index) => ({
      id: `INV-${String(index + 1).padStart(5, "0")}`,
      client: `Row ${index + 1}`,
      amount: index + 1,
    }));
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={many}
        getRowId={(row) => row.id}
        pageSize={10}
        searchable
      />,
    );

    expect(screen.getByRole("table").querySelectorAll("tbody tr")).toHaveLength(10);
    expect(screen.getByText("5000 of 5000")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Search table"), "Row 4999");
    expect(screen.getByRole("table").querySelectorAll("tbody tr")).toHaveLength(1);
    expect(screen.getByRole("cell", { name: "Row 4999" })).toBeInTheDocument();
  });

  it("hides columns through controlled visibility", () => {
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        columnVisibility={{ client: false }}
      />,
    );

    expect(screen.queryByRole("columnheader", { name: /client/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("cell", { name: "Acme Studio" })).not.toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /invoice/i })).toBeInTheDocument();
  });

  it("toggles columns from the column menu", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        columnMenu
      />,
    );

    await user.click(screen.getByRole("button", { name: "Columns" }));
    await user.click(await screen.findByRole("checkbox", { name: "Client" }));
    expect(screen.queryByRole("columnheader", { name: /client/i })).not.toBeInTheDocument();
  });

  it("supports multi-column sorting with shift-click", () => {
    const onSortingChange = vi.fn();
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        multiSort
        onSortingChange={onSortingChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /invoice/i }));
    fireEvent.click(screen.getByRole("button", { name: /client/i }), {
      shiftKey: true,
    });

    expect(onSortingChange).toHaveBeenLastCalledWith([
      { key: "id", direction: "asc" },
      { key: "client", direction: "asc" },
    ]);
    expect(screen.getByRole("columnheader", { name: /invoice/i })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
    expect(screen.getByRole("columnheader", { name: /client/i })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
  });

  it("accepts a controlled multi-sort list", () => {
    render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        pageSize={0}
        sorting={[
          { key: "amount", direction: "desc" },
          { key: "client", direction: "asc" },
        ]}
      />,
    );

    expect(rowIds()).toEqual(["INV-003", "INV-001", "INV-002"]);
    expect(screen.getByRole("columnheader", { name: /amount/i })).toHaveAttribute(
      "aria-sort",
      "descending",
    );
  });

  it("wraps the table in a fixed-height virtualized area", () => {
    const many = Array.from({ length: 100 }, (_, index) => ({
      id: `INV-${String(index + 1).padStart(3, "0")}`,
      client: `Row ${index + 1}`,
      amount: index + 1,
    }));
    const { container } = render(
      <DataTable
        caption="Invoices"
        columns={columns}
        rows={many}
        getRowId={(row) => row.id}
        pageSize={0}
        virtualized
        virtualHeight={200}
        estimateRowHeight={40}
      />,
    );

    const scroller = container.querySelector('[data-virtualized="true"]');
    expect(scroller).toBeInTheDocument();
    expect(scroller).toHaveStyle({ height: "200px" });
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
