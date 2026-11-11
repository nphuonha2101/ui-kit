import { test, expect } from "@playwright/test";

test("upgrading: sorts a migration table and opens row detail", async ({ page }) => {
  await page.goto("/docs/upgrading");

  await expect(page.getByRole("table").first()).toBeVisible();

  const surfaceHeader = page.getByRole("columnheader", { name: "Surface" }).first();
  await expect(surfaceHeader).toHaveAttribute("aria-sort", "ascending");
  await surfaceHeader.getByRole("button").click();
  await expect(surfaceHeader).toHaveAttribute("aria-sort", "descending");

  await page.getByRole("button", { name: "View detail" }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Before");
  await expect(dialog).toContainText("After");
  await expect(dialog).toContainText("Find");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("upgrading: From narrows the release list oldest-first", async ({ page }) => {
  await page.goto("/docs/upgrading");

  await page.getByLabel("Installed version").click();
  await page.getByRole("option", { name: "v0.12.0" }).click();

  await expect(page.locator("#v-0-12-0")).toBeVisible();
  await expect(page.locator("#v-0-4-0")).toBeHidden();
  await expect(page.getByText("oldest → newest").first()).toBeVisible();
});
