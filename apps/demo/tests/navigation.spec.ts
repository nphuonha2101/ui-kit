import { test, expect } from "@playwright/test";
import { waitForHydration } from "./helpers";

test("shows the logo loading state when a navigation is slow", async ({ page }) => {
  await page.goto("/docs");
  await waitForHydration(page, "header");

  await page.route(/.*_rsc=.*/, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    await route.continue();
  });

  await page
    .locator("aside nav")
    .getByRole("link", { name: "Button", exact: true })
    .first()
    .click();

  const logo = page
    .locator("header")
    .getByRole("link", { name: "nphuonha UI home" });
  await expect(logo).toHaveAttribute("data-route-loading", "true");
  await expect(page.getByRole("heading", { level: 1, name: "Button" })).toBeVisible();
  await expect(logo).toHaveAttribute("data-route-loading", "false");
});
