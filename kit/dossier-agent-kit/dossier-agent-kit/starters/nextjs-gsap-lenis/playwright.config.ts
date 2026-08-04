import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    {
      name: "chromium-reduced-motion",
      use: {
        ...devices["Desktop Chrome"],
        contextOptions: { reducedMotion: "reduce" },
      },
    },
    {
      name: "mobile-chrome-touch",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
