import { test, expect } from "@playwright/test";

test.describe("kind-iii shader background", () => {
  test("shader canvas host is aria-hidden and non-interactive", async ({ page }) => {
    await page.goto("/shader-demo");
    const host = page.getByTestId("shader-canvas-host");
    if (await host.count()) {
      await expect(host).toHaveAttribute("aria-hidden", "true");
      const pe = await host.evaluate((el) => getComputedStyle(el).pointerEvents);
      expect(pe).toBe("none");
    }
  });

  test("only one full-viewport WebGL canvas exists on the page", async ({ page }) => {
    await page.goto("/shader-demo");
    const count = await page.evaluate(
      () =>
        Array.from(document.querySelectorAll("canvas")).filter((c) => {
          const s = getComputedStyle(c);
          return s.position === "fixed" && s.inset === "0px";
        }).length
    );
    expect(count).toBeLessThanOrEqual(1);
  });
});

test.describe("kind-iii reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("static gradient fallback renders instead of canvas", async ({ page }) => {
    await page.goto("/shader-demo");
    const fallback = page.getByTestId("shader-fallback-gradient");
    await expect(fallback).toBeVisible();
    const canvasHost = page.getByTestId("shader-canvas-host");
    await expect(canvasHost).toHaveCount(0);
  });
});
