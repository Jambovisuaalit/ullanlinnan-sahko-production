import { defineConfig } from "@playwright/test";

const port = 4173;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/visual",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      maxDiffPixelRatio: 0.01
    }
  },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [["line"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],
  snapshotPathTemplate: "{testDir}/__snapshots__/{projectName}/{testFilePath}/{arg}{ext}",
  use: {
    baseURL,
    browserName: "chromium",
    colorScheme: "light",
    locale: "fi-FI",
    timezoneId: "Europe/Helsinki",
    serviceWorkers: "block",
    trace: "retain-on-failure",
    screenshot: "only-on-failure"
  },
  webServer: {
    command: `npm run build:preview && npm run start -- -p ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000
  },
  projects: [
    {
      name: "mobile-320",
      use: {
        viewport: { width: 320, height: 740 },
        deviceScaleFactor: 1,
        isMobile: true,
        hasTouch: true
      }
    },
    {
      name: "tablet-768",
      use: {
        viewport: { width: 768, height: 1024 },
        deviceScaleFactor: 1,
        hasTouch: true
      }
    },
    {
      name: "desktop-1440",
      use: {
        viewport: { width: 1440, height: 1000 },
        deviceScaleFactor: 1
      }
    }
  ]
});
