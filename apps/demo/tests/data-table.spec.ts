import { test, expect } from "@playwright/test";
import { waitForHydration } from "./helpers";

test("data-table docs demo: search, sort, paginate", async ({ page }) => {
  await page.goto("/docs/components/data-table");
  await waitForHydration(page);

  const table = page.getByRole("table").first();
  await expect(table).toBeVisible();

  // Clicking a sort header first proves React has hydrated before we type
  // into the controlled search input.
  const invoiceHeader = table.getByRole("columnheader", { name: "Invoice" });
  await invoiceHeader.getByRole("button").click();
  await expect(invoiceHeader).toHaveAttribute("aria-sort", "ascending");
  await expect(table.getByRole("row").nth(1).getByRole("cell").first()).toHaveText(
    "INV-001",
  );

  const search = page.getByLabel("Search table").first();
  await search.fill("kite");
  await expect(table.getByRole("cell", { name: "Kite & Co." })).toBeVisible();
  await expect(table.getByRole("cell", { name: "Acme Studio" })).toBeHidden();
  await search.fill("");
  await expect(table.getByRole("cell", { name: "Acme Studio" })).toBeVisible();

  await page.getByRole("button", { name: "Page 2" }).click();
  await expect(table.getByRole("row")).toHaveCount(3);
});

test("data-table docs demo: selection reflects in the readout", async ({ page }) => {
  await page.goto("/docs/components/data-table");
  await waitForHydration(page);

  const selectionTable = page.getByRole("table").nth(1);
  await expect(selectionTable).toBeVisible();

  const rowCheckbox = selectionTable.getByRole("checkbox", { name: "Select row INV-001" });
  await rowCheckbox.click();
  await expect(rowCheckbox).toBeChecked();
  await expect(page.getByText("Selected: INV-001")).toBeVisible();

  const selectAll = selectionTable.getByRole("checkbox", {
    name: "Select all rows on this page",
  });
  await selectAll.click();
  await expect(selectAll).toBeChecked();
});

test("upgrading table: search + dialog copy buttons", async ({ page }) => {
  await page.goto("/docs/upgrading");
  await waitForHydration(page);

  const table = page.getByRole("table").first();
  await expect(table).toBeVisible();

  // Sort first to wait for hydration before typing.
  const versionHeader = table.getByRole("columnheader", { name: "Version" });
  await versionHeader.getByRole("button").click();
  await expect(versionHeader).toHaveAttribute("aria-sort", "ascending");

  await page.getByLabel("Search table").fill("DataTable");
  await expect(table.getByRole("cell", { name: "DataTable" }).first()).toBeVisible();
  await expect(table.getByRole("row")).toHaveCount(2);

  await page.getByRole("button", { name: "View detail" }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Copy after" })).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Copy release" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("data-table docs demo: keyboard sorting and selection", async ({ page }) => {
  await page.goto("/docs/components/data-table");
  await waitForHydration(page);

  const table = page.getByRole("table").first();
  const header = table.getByRole("columnheader", { name: "Invoice" });
  await header.getByRole("button").focus();
  await page.keyboard.press("Enter");
  await expect(header).toHaveAttribute("aria-sort", "ascending");

  const selectionTable = page.getByRole("table").nth(1);
  const checkbox = selectionTable.getByRole("checkbox", {
    name: "Select row INV-002",
  });
  await checkbox.focus();
  await page.keyboard.press("Space");
  await expect(checkbox).toBeChecked();
});

test("data-table async example: loads server data and searches", async ({ page }) => {
  await page.goto("/docs/components/data-table");
  await waitForHydration(page);

  const table = page.getByRole("table").nth(3);
  await expect(table).toBeVisible();
  await expect(page.getByText("5000 results")).toBeVisible({ timeout: 8000 });

  await page.getByLabel("Search table").nth(1).fill("Client 4999");
  await expect(table.getByRole("cell", { name: "Client 4999" })).toBeVisible({
    timeout: 8000,
  });
  await expect(page.getByText("1 result")).toBeVisible({ timeout: 8000 });
});

test("data-table docs demo: column menu hides a column", async ({ page }) => {
  await page.goto("/docs/components/data-table");
  await waitForHydration(page);

  await page.getByRole("button", { name: "Columns" }).click();
  await page.getByRole("checkbox", { name: "Status" }).click();
  await expect(
    page.getByRole("table").first().getByRole("columnheader", { name: "Status" }),
  ).toBeHidden();
});

test("data-table docs demo: shift-click multi-sort", async ({ page }) => {
  await page.goto("/docs/components/data-table");
  await waitForHydration(page);

  const table = page.getByRole("table").first();
  const invoice = table.getByRole("columnheader", { name: "Invoice" });
  const client = table.getByRole("columnheader", { name: "Client" });
  await invoice.getByRole("button").click();
  await page.keyboard.down("Shift");
  await client.getByRole("button").click();
  await page.keyboard.up("Shift");

  await expect(invoice).toHaveAttribute("aria-sort", "ascending");
  await expect(client).toHaveAttribute("aria-sort", "ascending");
});

test("data-table virtualized example renders a window and scrolls", async ({ page }) => {
  await page.goto("/docs/components/data-table");
  await waitForHydration(page);

  const scroller = page.locator('[data-virtualized="true"]');
  await expect(scroller).toBeVisible();
  const table = scroller.getByRole("table");
  const mounted = await table.locator("tbody tr").count();
  expect(mounted).toBeLessThan(100);
  await expect(table.getByRole("cell", { name: "Client 1", exact: true })).toBeVisible();

  await scroller.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });
  await expect(table.getByRole("cell", { name: "Client 1000", exact: true })).toBeVisible({
    timeout: 5000,
  });
});
