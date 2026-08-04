import { test, expect } from "@playwright/test";

test.describe("kind-ix ambient canvas", () => {
  test("canvas host has aria-hidden and is not interactive", async ({ page }) => {
    await page.goto("/");
    const canvas = page.getByTestId("ambient-canvas");
    await expect(canvas).toHaveAttribute("aria-hidden", "true");
    const pointerEvents = await canvas.evaluate((el) => getComputedStyle(el).pointerEvents);
    expect(pointerEvents).toBe("none");
  });

  test("ambient canvas is never the LCP element", async ({ page }) => {
    await page.goto("/");
    const lcpTag = await page.evaluate(() => {
      return new Promise<string | null>((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const last = entries[entries.length - 1] as any;
          resolve(last?.element?.tagName ?? null);
        }).observe({ type: "largest-contentful-paint", buffered: true });
        setTimeout(() => resolve(null), 2000);
      });
    });
    if (lcpTag) expect(lcpTag).not.toBe("CANVAS");
  });

  test("only one full-viewport canvas is mounted at a time", async ({ page }) => {
    await page.goto("/");
    const count = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("canvas")).filter((c) => {
        const s = getComputedStyle(c);
        return s.position === "fixed" && s.inset === "0px";
      }).length;
    });
    expect(count).toBeLessThanOrEqual(1);
  });
});

test.describe("kind-ix reduced motion + hidden tab", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("no animation loop runs after initial paint under reduced motion", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);
    // heuristic: two screenshots of the canvas region taken 500ms apart
    // should be pixel-identical when the loop is stopped
    const canvas = page.getByTestId("ambient-canvas");
    const shot1 = await canvas.screenshot();
    await page.waitForTimeout(500);
    const shot2 = await canvas.screenshot();
    expect(shot1.equals(shot2)).toBe(true);
  });
});
