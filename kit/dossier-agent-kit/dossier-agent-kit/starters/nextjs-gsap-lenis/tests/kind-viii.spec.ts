import { test, expect } from "@playwright/test";

test.describe("kind-viii microinteraction", () => {
  test("all :hover rules are gated behind (hover:hover) and (pointer:fine)", async ({ page }) => {
    await page.goto("/");
    const bareHoverFound = await page.evaluate(() => {
      let found = false;
      for (const sheet of Array.from(document.styleSheets)) {
        let rules: CSSRuleList;
        try {
          rules = sheet.cssRules;
        } catch {
          continue;
        }
        const walk = (list: CSSRuleList) => {
          for (const rule of Array.from(list)) {
            if (rule instanceof CSSMediaRule) {
              // only recurse into non-hover-gated media blocks
              if (!/hover/.test(rule.conditionText)) walk(rule.cssRules);
              continue;
            }
            if (rule instanceof CSSStyleRule && rule.selectorText.includes(":hover")) {
              found = true;
            }
          }
        };
        walk(rules);
      }
      return found;
    });
    expect(bareHoverFound).toBe(false);
  });

  test("touch device: hover styles do not apply", async ({ browser }) => {
    const context = await browser.newContext({ hasTouch: true, isMobile: true });
    const page = await context.newPage();
    await page.goto("/");
    const card = page.getByTestId("hover-card").first();
    const before = await card.evaluate((el) => getComputedStyle(el).transform);
    await card.tap();
    const after = await card.evaluate((el) => getComputedStyle(el).transform);
    expect(after).toBe(before);
    await context.close();
  });

  test("focus-visible ring is present and independent of motion", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus-visible").first();
    const outline = await focused.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).not.toBe("none");
  });

  test("touch targets measure at least 44x44px", async ({ page }) => {
    await page.goto("/");
    const cards = page.getByTestId("hover-card");
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const box = await cards.nth(i).boundingBox();
      expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
  });
});
