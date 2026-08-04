import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Cross-cutting accessibility gate. Per 03_build_guides.md §6:
 * axe-core (MPL-2.0) checks serious/critical issues on every page.
 */
test("home page has no serious or critical axe violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .include("body")
    .analyze();

  const serious = results.violations.filter(
    (v) => v.impact === "serious" || v.impact === "critical"
  );
  if (serious.length) {
    console.log(JSON.stringify(serious, null, 2));
  }
  expect(serious).toEqual([]);
});
