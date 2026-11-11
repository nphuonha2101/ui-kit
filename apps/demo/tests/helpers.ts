import type { Page } from "@playwright/test";

/**
 * Static exports render markup before React hydrates. Interacting earlier can
 * silently do nothing (controlled inputs reset), so wait until React has
 * attached its fiber to the first table.
 */
export async function waitForHydration(page: Page) {
  await page.waitForFunction(() => {
    const element = document.querySelector("table");
    if (!element) return false;
    return Object.keys(element).some((key) => key.startsWith("__reactFiber$"));
  });
}
