import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "on-first-retry",
    reducedMotion: "reduce",
  },
  webServer: {
    command: "npm run start -w @nphuonha/ui-demo",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: !process.env.CI,
    cwd: "../..",
    timeout: 120_000,
  },
  projects: [{ name: "chromium", use: { browserName: "chromium", viewport: { width: 1280, height: 900 } } }],
});
