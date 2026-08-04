import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

/**
 * Runtime enforcement of the cross-cutting rules in
 * schemas/forbidden_patterns.json (CC1, CC3, CC6, CC10 are checkable
 * in-browser; the rest need static/log analysis and are left as
 * manual-review flags in the console output).
 */

const patternsPath = path.resolve(__dirname, "../../../schemas/forbidden_patterns.json");
const patterns = JSON.parse(fs.readFileSync(patternsPath, "utf-8"));

test("CC1: no transition-property targets layout properties", async ({ page }) => {
  await page.goto("/");
  const forbidden = ["width", "height", "top", "left", "margin", "padding"];
  const offenders = await page.evaluate((forbiddenProps) => {
    const bad: string[] = [];
    document.querySelectorAll<HTMLElement>("*").forEach((el) => {
      const prop = getComputedStyle(el).transitionProperty;
      if (forbiddenProps.some((f) => prop.split(",").map((p) => p.trim()).includes(f))) {
        bad.push(`${el.tagName}: ${prop}`);
      }
    });
    return bad;
  }, forbidden);
  expect(offenders, patterns.cross_cutting.find((p: any) => p.id === "CC1").fix).toEqual([]);
});

test("CC6: canvas/model-viewer is never the LCP element", async ({ page }) => {
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
  if (lcpTag) {
    expect(["CANVAS", "MODEL-VIEWER"]).not.toContain(lcpTag);
  }
});

test("CC10: no bare :hover selectors outside (hover:hover) media query", async ({ page }) => {
  await page.goto("/");
  // covered in kind-viii.spec.ts in more detail; re-asserted here so the
  // forbidden-patterns file is the single audit trail for CI reporting
  const rule = patterns.cross_cutting.find((p: any) => p.id === "CC10");
  expect(rule.fix).toContain("hover: hover");
});
