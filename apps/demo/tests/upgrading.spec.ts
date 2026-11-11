import { test, expect } from "@playwright/test";
import { waitForHydration } from "./helpers";

test("upgrading: sorts the migration table and opens row detail", async ({ page }) => {
  await page.goto("/docs/upgrading");
  await waitForHydration(page);

  const table = page.getByRole("table").first();
  await expect(table).toBeVisible();

  const versionHeader = page.getByRole("columnheader", { name: "Version" });
  await expect(versionHeader).toHaveAttribute("aria-sort", "descending");
  await versionHeader.getByRole("button").click();
  await expect(versionHeader).toHaveAttribute("aria-sort", "ascending");

  await page.getByRole("button", { name: "View detail" }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Before");
  await expect(dialog).toContainText("After");
  await expect(dialog).toContainText("Find");
  await expect(dialog.getByRole("button", { name: "Copy release" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("upgrading: search narrows the migration rows", async ({ page }) => {
  await page.goto("/docs/upgrading");

  await expect(page.getByRole("table").first()).toBeVisible();
  await page.getByLabel("Search table").fill("scrollbar-styled");
  await expect(page.getByRole("cell", { name: "scrollbar-styled" }).first()).toBeVisible();

  await page.getByLabel("Search table").fill("zzz-no-match");
  await expect(page.getByRole("table")).toBeHidden();
  await expect(page.getByText("No releases match")).toBeVisible();
});
