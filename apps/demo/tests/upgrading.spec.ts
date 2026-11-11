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

test("upgrading: detail dialog fits the viewport and scrolls on small screens", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 640 });
  await page.goto("/docs/upgrading");
  await waitForHydration(page);

  await page.getByRole("button", { name: "View detail" }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const box = await dialog.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.y + box!.height).toBeLessThanOrEqual(640);

  const body = dialog.locator("div.overflow-y-auto").first();
  // The long release summary belongs to the scrollable content, not the header.
  await expect(body).toContainText("Additive release: DataTable brings sorting");
  const { clientHeight, scrollHeight } = await body.evaluate((element) => ({
    clientHeight: element.clientHeight,
    scrollHeight: element.scrollHeight,
  }));
  expect(scrollHeight).toBeGreaterThan(clientHeight);
  await body.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });

  // Code snippets keep their line breaks instead of collapsing into a paragraph.
  await expect(dialog.locator("code").nth(1)).toHaveCSS("white-space", "pre-wrap");
  await expect(dialog.getByRole("button", { name: "Copy release" })).toBeVisible();
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
