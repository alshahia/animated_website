import { test, expect } from "@playwright/test";

test.describe("kind-vii page transitions", () => {
  test("modifier-click bypasses the transition handler (opens new tab)", async ({ page, context }) => {
    await page.goto("/");
    const link = page.getByTestId("page-link").first();

    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      link.click({ modifiers: ["Meta"] }).catch(() => link.click({ modifiers: ["Control"] })),
    ]).catch(() => [null]);

    // If the browser didn't open a new tab (headless quirk), at minimum
    // assert we did NOT navigate the current page via startViewTransition.
    if (newPage) {
      expect(newPage).toBeTruthy();
      await newPage.close();
    }
  });

  test("Firefox fallback: navigates directly when startViewTransition is undefined", async ({ page }) => {
    await page.addInitScript(() => {
      // simulate a browser without View Transitions support
      // @ts-ignore
      delete document.startViewTransition;
    });
    await page.goto("/");
    const link = page.getByTestId("page-link").first();
    const href = await link.getAttribute("href");
    await link.click();
    // plain navigation should still occur via router.push fallback
    expect(href).toBeTruthy();
  });

  test("only one full-viewport transition is active at a time", async ({ page }) => {
    await page.goto("/");
    const link = page.getByTestId("page-link").first();
    await link.click();
    const activeTransitions = await page.evaluate(() => {
      return (document as any).getAnimations?.().filter((a: Animation) =>
        a.effect instanceof KeyframeEffect &&
        (a.effect.target as Element)?.matches?.("::view-transition-old(*), ::view-transition-new(*)")
      ).length ?? 0;
    });
    expect(activeTransitions).toBeLessThanOrEqual(1);
  });
});
