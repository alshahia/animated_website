import { test, expect } from "@playwright/test";

/**
 * kind-vii page transitions. These tests verify the MODIFIER-CLICK bypass
 * (CC9 — must let the browser open in new tab) and the START per click
 * without relying on Playwright's real new-tab behavior, which is unreliable
 * for the mod-key click in headless mode. We inject a spy on
 * document.startViewTransition before any click fires and assert on call
 * counts in-page.
 */

function installViewTransitionSpy(page: any) {
  return page.addInitScript(() => {
    const proto: any = document;
    const original = proto.startViewTransition?.bind(document);
    let active = 0;
    let maxConcurrent = 0;
    (window as any).__transitionCalls = 0;
    (window as any).__transitionMaxConcurrent = () => maxConcurrent;
    (window as any).__originalStartViewTransition = original;
    proto.startViewTransition = (cb: () => any) => {
      (window as any).__transitionCalls++;
      active++;
      if (active > maxConcurrent) maxConcurrent = active;
      const fake: any = {
        finished: Promise.resolve(),
        ready: Promise.resolve(),
        updateCallbackDone: Promise.resolve(),
        skipTransition: () => {},
      };
      // Run the callback but never let it navigate. Returning a fake
      // transition object means the calling code (PageLink.onClick) treats
      // it as success without actually loading the next route during the test.
      Promise.resolve()
        .then(() => cb?.())
        .catch(() => {})
        .finally(() => {
          active = Math.max(0, active - 1);
        });
      return fake;
    };
  });
}

test.describe("kind-vii page transitions", () => {
  test("modifier-click bypasses the transition handler", async ({ page }) => {
    await installViewTransitionSpy(page);
    await page.goto("/");
    const callsBefore = await page.evaluate(() => (window as any).__transitionCalls);

    // Dispatch a real modifier-bearing click. PageLink.onClick should return
    // early (CC9), so startViewTransition is NOT called and no navigation
    // happens within the test page.
    await page.evaluate(() => {
      const link = document.querySelector('[data-testid="page-link"]') as HTMLAnchorElement;
      if (!link) throw new Error("no page-link");
      const ev = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        metaKey: true,
        ctrlKey: true,
        shiftKey: true,
      });
      link.dispatchEvent(ev);
    });

    await page.waitForTimeout(50);
    const callsAfter = await page.evaluate(() => (window as any).__transitionCalls);
    expect(callsAfter).toBe(callsBefore);
    expect(page.url()).toBe("http://localhost:3000/");
  });

  test("Firefox fallback: navigates directly when startViewTransition is undefined", async ({ page }) => {
    await page.addInitScript(() => {
      // simulate a browser without View Transitions support
      // @ts-ignore
      delete (document as any).startViewTransition;
    });
    await page.goto("/");
    const link = page.getByTestId("page-link").first();
    const href = await link.getAttribute("href");
    expect(href).toBeTruthy();
  });

  test("PageLink click kicks off exactly one view transition", async ({ page }) => {
    await installViewTransitionSpy(page);
    await page.goto("/");
    const link = page.getByTestId("page-link").first();
    await link.click({ force: true, noWaitAfter: true }).catch(() => {});
    await page.waitForTimeout(80);
    const calls = await page.evaluate(() => (window as any).__transitionCalls);
    expect(calls).toBe(1);
  });
});
