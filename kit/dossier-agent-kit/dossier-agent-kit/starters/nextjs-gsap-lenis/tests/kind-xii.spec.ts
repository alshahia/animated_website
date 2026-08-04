import { test, expect } from "@playwright/test";

test.describe("kind-xii AI live motion", () => {
  test("no inference call fires on page load without user submit", async ({ page }) => {
    let requestFired = false;
    await page.route("**/api/ai-hero", (route) => {
      requestFired = true;
      route.fulfill({ body: '["#111111"]' });
    });
    await page.goto("/ai-hero-demo");
    await page.waitForTimeout(500);
    expect(requestFired).toBe(false);
  });

  test("second Generate click is blocked while first is in-flight", async ({ page }) => {
    await page.route("**/api/ai-hero", async (route) => {
      await new Promise((r) => setTimeout(r, 1000));
      route.fulfill({ body: '["#222222"]' });
    });
    await page.goto("/ai-hero-demo");
    await page.locator('input[placeholder="Describe your hero..."]').fill("ocean sunset");
    await page.getByTestId("ai-generate").click();
    const disabled = await page.getByTestId("ai-generate").isDisabled();
    expect(disabled).toBe(true);
  });

  test("Cancel button appears during inference and aborts the request", async ({ page }) => {
    await page.route("**/api/ai-hero", async (route) => {
      await new Promise((r) => setTimeout(r, 2000));
      route.fulfill({ body: '["#333333"]' });
    });
    await page.goto("/ai-hero-demo");
    await page.locator('input[placeholder="Describe your hero..."]').fill("ocean sunset");
    await page.getByTestId("ai-generate").click();
    const cancelBtn = page.getByTestId("ai-cancel");
    await expect(cancelBtn).toBeVisible();
    await cancelBtn.click();
    await expect(page.getByTestId("ai-generate")).toBeEnabled({ timeout: 1000 });
  });

  test("noscript fallback references a static hero", async ({ page }) => {
    await page.goto("/ai-hero-demo");
    const noscriptHtml = await page.locator("noscript").innerHTML();
    expect(noscriptHtml).toContain("static-hero");
  });
});

test.describe("kind-xii reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("palette applies with 0ms transition", async ({ page }) => {
    await page.route("**/api/ai-hero", (route) => route.fulfill({ body: '["#444444"]' }));
    await page.goto("/ai-hero-demo");
    const visual = page.getByTestId("ai-hero-visual");
    const duration = await visual.evaluate((el) => getComputedStyle(el).transitionDuration);
    expect(["0s", ""]).toContain(duration);
  });
});
