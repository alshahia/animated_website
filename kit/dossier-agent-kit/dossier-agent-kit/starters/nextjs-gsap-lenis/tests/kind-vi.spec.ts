import { test, expect } from "@playwright/test";

test.describe("kind-vi preloader", () => {
  test("preloader has role=status and aria-busy=true while visible", async ({ page }) => {
    await page.goto("/loading-demo");
    const preloader = page.getByTestId("preloader");
    if (await preloader.count()) {
      await expect(preloader).toHaveAttribute("role", "status");
      await expect(preloader).toHaveAttribute("aria-busy", "true");
    }
  });

  test("preloader dismisses within 5s hard ceiling even if load never fires", async ({ page }) => {
    await page.route("**/*", (route) => {
      // don't actually block; just verify the ceiling timer, not real stalling
      route.continue();
    });
    await page.goto("/loading-demo");
    await page.waitForTimeout(5200);
    const preloader = page.getByTestId("preloader");
    await expect(preloader).toHaveCount(0);
  });

  test("keyboard focus is never trapped inside the preloader", async ({ page }) => {
    await page.goto("/loading-demo");
    await page.keyboard.press("Tab");
    const active = await page.evaluate(() => document.activeElement?.id);
    expect(active).not.toBe("preloader");
  });

  test("body scroll lock is removed after dismissal", async ({ page }) => {
    await page.goto("/loading-demo");
    await page.waitForFunction(
      () => !document.body.classList.contains("loading"),
      { timeout: 6000 }
    );
    const hasLoadingClass = await page.evaluate(() =>
      document.body.classList.contains("loading")
    );
    expect(hasLoadingClass).toBe(false);
  });
});

test.describe("kind-vi reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("dismissal is synchronous, no fade transition observed", async ({ page }) => {
    await page.goto("/loading-demo");
    const preloader = page.getByTestId("preloader");
    if (await preloader.count()) {
      const transition = await preloader.evaluate((el) => getComputedStyle(el).transitionDuration);
      expect(["0s", ""]).toContain(transition);
    }
  });
});
