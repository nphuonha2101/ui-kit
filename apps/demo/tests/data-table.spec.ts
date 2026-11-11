import { test, expect } from "@playwright/test";

test("data-table docs demo: search, sort, paginate", async ({ page }) => {
  await page.goto("/docs/components/data-table");

  const table = page.getByRole("table").first();
  await expect(table).toBeVisible();

  const search = page.getByLabel("Search table").first();
  await search.fill("kite");
  await expect(table.getByRole("cell", { name: "Kite & Co." })).toBeVisible();
  await expect(table.getByRole("cell", { name: "Acme Studio" })).toBeHidden();
  await search.fill("");
  await expect(table.getByRole("cell", { name: "Acme Studio" })).toBeVisible();

  const invoiceHeader = table.getByRole("columnheader", { name: "Invoice" });
  await invoiceHeader.getByRole("button").click();
  await expect(invoiceHeader).toHaveAttribute("aria-sort", "ascending");
  await expect(table.getByRole("row").nth(1).getByRole("cell").first()).toHaveText(
    "INV-001",
  );

  await page.getByRole("button", { name: "Page 2" }).click();
  await expect(table.getByRole("row")).toHaveCount(3);
});

test("data-table docs demo: selection reflects in the readout", async ({ page }) => {
  await page.goto("/docs/components/data-table");

  const selectionTable = page.getByRole("table").nth(1);
  await expect(selectionTable).toBeVisible();
  await selectionTable.getByRole("checkbox", { name: "Select row INV-001" }).click();
  await expect(page.getByText("Selected: INV-001")).toBeVisible();

  await selectionTable
    .getByRole("checkbox", { name: "Select all rows on this page" })
    .click();
  await expect(
    selectionTable.getByRole("checkbox", { name: "Select all rows on this page" }),
  ).toBeChecked();
});

test("upgrading table: search + dialog copy buttons", async ({ page }) => {
  await page.goto("/docs/upgrading");

  const table = page.getByRole("table").first();
  await expect(table).toBeVisible();

  await page.getByLabel("Search table").fill("DataTable");
  await expect(table.getByRole("cell", { name: "DataTable" }).first()).toBeVisible();
  await expect(table.getByRole("row")).toHaveCount(2);

  await page.getByRole("button", { name: "View detail" }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: /Copy after snippet/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});
