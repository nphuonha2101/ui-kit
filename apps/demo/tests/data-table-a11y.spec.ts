import { test, expect } from "@playwright/test";
import { waitForHydration } from "./helpers";

const routes = ["/docs/components/data-table", "/docs/upgrading"];

// Pre-existing site-wide hydration warning (#418) on component docs pages.
// It reproduces on /docs/components/button, so it is not DataTable-specific.
const knownNoise = (text: string) =>
  text.includes("cloudflareinsights.com") ||
  text.includes("ERR_FAILED") ||
  text.includes("React error #418");

for (const route of routes) {
  test(`no new console errors or horizontal overflow: ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error" && !knownNoise(message.text())) {
        errors.push(message.text());
      }
    });
    page.on("pageerror", (error) => {
      if (!knownNoise(String(error))) errors.push(String(error));
    });

    await page.goto(route);
  await waitForHydration(page);
    await expect(page.getByRole("table").first()).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);

    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await expect(page.getByRole("table").first()).toBeVisible();
    const darkOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(darkOverflow).toBeLessThanOrEqual(0);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();
    await expect(page.getByRole("table").first()).toBeVisible();
    const mobileOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(mobileOverflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}
