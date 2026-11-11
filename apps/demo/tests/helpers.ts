import type { Page } from "@playwright/test";

/**
 * Static exports render markup before React hydrates. Interacting earlier can
 * silently do nothing (controlled inputs reset), so wait until React has
 * attached its fiber to a rendered element.
 */
export async function waitForHydration(page: Page, selector = "table") {
  await page.waitForFunction((target) => {
    const element = document.querySelector(target);
    if (!element) return false;
    return Object.keys(element).some((key) => key.startsWith("__reactFiber$"));
  }, selector);
}
