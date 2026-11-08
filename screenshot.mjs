import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1.5 });

async function shot(path, name, fullPage = true) {
  await page.goto(`http://localhost:3100${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `/tmp/opencode/docs-${name}.png`, fullPage });
}

await shot("/", "home");
await shot("/docs", "intro");
await shot("/docs/components", "components");
await shot("/docs/components/button", "button");
await shot("/docs/theming", "theming");

await page.goto("http://localhost:3100/docs", { waitUntil: "networkidle" });
await page.keyboard.press("Control+K");
await page.waitForTimeout(600);
await page.screenshot({ path: "/tmp/opencode/docs-search.png", fullPage: false });

await browser.close();
console.log("done");
