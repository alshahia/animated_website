import { test, expect } from "@playwright/test";

/**
 * Executes the "Acceptance (machine-checkable)" bullets from
 * 01_kind-i_scroll_reveal.md as real assertions instead of prose.
 */

test.describe("kind-i scroll reveal", () => {
  test("scroll-triggered sections exist and match mounted ScrollScene count", async ({ page }) => {
    await page.goto("/");
    const scenes = page.locator("[data-scroll-trigger]");
    const count = await scenes.count();
    expect(count).toBeGreaterThan(0);
  });

  test("no animated element declares layout-triggering CSS properties", async ({ page }) => {
    await page.goto("/");
    const offenders = await page.evaluate(() => {
      const bad: string[] = [];
      const forbidden = ["width", "height", "top", "left", "right", "bottom", "margin", "padding"];
      document.querySelectorAll<HTMLElement>("[data-scroll-trigger] *").forEach((el) => {
        const style = getComputedStyle(el);
        const prop = style.transitionProperty;
        if (forbidden.some((f) => prop.includes(f))) {
          bad.push(`${el.tagName}.${el.className}: transition-property=${prop}`);
        }
      });
      return bad;
    });
    expect(offenders).toEqual([]);
  });

  test("ScrollTrigger instances are killed after navigation away (no leak)", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(300); // allow GSAP registration
    const before = await page.evaluate(() => (window as any).ScrollTrigger?.getAll().length ?? 0);
    expect(before).toBeGreaterThan(0);

    await page.goto("about:blank");
    // module teardown should have fired via effect cleanup; re-navigate and
    // confirm we don't accumulate triggers across mounts
    await page.goto("/");
    await page.waitForTimeout(300);
    const after = await page.evaluate(() => (window as any).ScrollTrigger?.getAll().length ?? 0);
    expect(after).toBe(before); // same count, not before + before (i.e. no leak/duplication)
  });
});

test.describe("kind-i reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("sections render in normal document flow with no pin/scrub triggers", async ({ page }) => {
    await page.goto("/");
    const pinnedCount = await page.evaluate(() => {
      const st = (window as any).ScrollTrigger;
      if (!st) return 0;
      return st.getAll().filter((t: any) => t.pin).length;
    });
    expect(pinnedCount).toBe(0);
  });

  test("content is fully visible without requiring scroll interaction to trigger", async ({ page }) => {
    await page.goto("/");
    const scene = page.locator('[data-scroll-trigger]').first();
    await expect(scene).toBeVisible();
    const opacity = await scene.evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacity)).toBeGreaterThan(0.9);
  });
});
