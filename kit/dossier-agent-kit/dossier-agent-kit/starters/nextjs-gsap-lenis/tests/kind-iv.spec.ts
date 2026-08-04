import { test, expect } from "@playwright/test";

test.describe("kind-iv cursor tracking", () => {
  test("no pointermove-driven transform on coarse pointer devices", async ({ browser }) => {
    const context = await browser.newContext({ hasTouch: true, isMobile: true });
    const page = await context.newPage();
    await page.goto("/cta");
    const button = page.getByTestId("magnetic-button");
    const before = await button.evaluate((el) => getComputedStyle(el).transform);
    await button.tap();
    const after = await button.evaluate((el) => getComputedStyle(el).transform);
    expect(after).toBe(before);
    await context.close();
  });

  test("touch target meets minimum 44x44px regardless of magnetic offset", async ({ page }) => {
    await page.goto("/cta");
    const box = await page.getByTestId("magnetic-button").boundingBox();
    expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  });

  test("focus-visible ring works independent of pointer motion", async ({ page }) => {
    await page.goto("/cta");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus-visible").first();
    await expect(focused).toBeVisible();
  });
});

test.describe("kind-iv reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("button does not move when pointer hovers", async ({ page }) => {
    await page.goto("/cta");
    const button = page.getByTestId("magnetic-button");
    const box = await button.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2 + 20, box.y + box.height / 2 + 20);
    }
    const transform = await button.evaluate((el) => getComputedStyle(el).transform);
    expect(["none", "matrix(1, 0, 0, 1, 0, 0)"]).toContain(transform);
  });
});
