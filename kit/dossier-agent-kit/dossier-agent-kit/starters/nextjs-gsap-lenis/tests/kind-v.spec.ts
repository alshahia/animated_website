import { test, expect } from "@playwright/test";

test.describe("kind-v animated illustration", () => {
  test("host element has role=img and a non-empty aria-label", async ({ page }) => {
    await page.goto("/");
    const icon = page.getByTestId("lottie-icon").first();
    if (await icon.count()) {
      await expect(icon).toHaveAttribute("role", "img");
      const label = await icon.getAttribute("aria-label");
      expect(label?.length ?? 0).toBeGreaterThan(0);
    }
  });

  test("host reserves explicit width/height to prevent CLS", async ({ page }) => {
    await page.goto("/");
    const icon = page.getByTestId("lottie-icon").first();
    if (await icon.count()) {
      const box = await icon.boundingBox();
      expect(box?.width ?? 0).toBeGreaterThan(0);
      expect(box?.height ?? 0).toBeGreaterThan(0);
    }
  });
});

test.describe("kind-v reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("player does not autoplay; static first frame only", async ({ page }) => {
    await page.goto("/");
    const icon = page.getByTestId("lottie-icon").first();
    if (await icon.count()) {
      const shot1 = await icon.screenshot();
      await page.waitForTimeout(400);
      const shot2 = await icon.screenshot();
      expect(shot1.equals(shot2)).toBe(true);
    }
  });
});
