import { test, expect } from "@playwright/test";
import { waitForHydration } from "./helpers";

test("theme toggle flips the dark class and cleans the transition guard", async ({
  page,
}) => {
  await page.goto("/docs");
  await waitForHydration(page, "header");

  const html = page.locator("html");
  const toggle = page.getByRole("button", { name: "Toggle color theme" });

  await expect(html).not.toHaveClass(/dark/);
  await toggle.click();
  await expect(html).toHaveClass(/dark/);
  await expect(html).not.toHaveClass(/theme-switching/, { timeout: 2000 });

  await toggle.click();
  await expect(html).not.toHaveClass(/dark/);
});

test("rapid double click toggles back to the original theme", async ({ page }) => {
  await page.goto("/docs");
  await waitForHydration(page, "header");

  const html = page.locator("html");
  const toggle = page.getByRole("button", { name: "Toggle color theme" });
  await toggle.dblclick();
  await expect(html).not.toHaveClass(/dark/);
});

test("dark preference paints the right icon before hydration", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("ui-kit-theme", "dark");
  });
  await page.goto("/docs");

  const html = page.locator("html");
  await expect(html).toHaveClass(/dark/);

  const toggle = page.getByRole("button", { name: "Toggle color theme" });
  await expect(toggle.locator("svg").first()).toBeHidden();
  await expect(toggle.locator("svg").nth(1)).toBeVisible();
});

test("portals inherit the live accent instead of resetting it", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("ui-kit-accent", "#0d9488");
  });
  await page.goto("/docs/components/dialog");
  await waitForHydration(page, "header");

  const rootAccent = () =>
    page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--primary").trim(),
    );
  await expect.poll(rootAccent).not.toBe("#4f46e5");
  const accent = await rootAccent();

  await page.getByRole("button", { name: "Open dialog" }).click();
  const popup = page.getByRole("dialog");
  await expect(popup).toBeVisible();

  const popupAccent = await popup.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--primary").trim(),
  );
  expect(popupAccent).toBe(accent);
});
