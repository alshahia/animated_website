"use client";
import { useEffect, useState } from "react";

const MAX_VISIBLE_MS = 5000;

/**
 * kind-vi building block. Per 06_kind-vi_preloader.md: the 2026 default is
 * to NOT ship a preloader; only mount this when a real asset (glTF, video,
 * large hero) genuinely takes >1s to load. Dismisses on window.load OR the
 * 5s hard ceiling, whichever comes first — never blocks longer than that.
 */
export function Preloader({ children }: { children: React.ReactNode }) {
  const [dismissed, setDismissed] = useState(false);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    document.body.classList.add("loading");

    const dismiss = () => {
      setDismissed(true);
      document.body.classList.remove("loading");
    };

    if (document.readyState === "complete") {
      dismiss();
      return;
    }

    window.addEventListener("load", dismiss);
    const ceiling = setTimeout(dismiss, MAX_VISIBLE_MS);

    return () => {
      window.removeEventListener("load", dismiss);
      clearTimeout(ceiling);
      document.body.classList.remove("loading");
    };
  }, []);

  return (
    <>
      {!dismissed && (
        <div
          id="preloader"
          role="status"
          aria-busy="true"
          aria-label="Loading"
          data-testid="preloader"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--color-bg)",
            transition: reduced
              ? "none"
              : "opacity var(--motion-duration-base) var(--motion-ease-exit)",
          }}
        >
          <div className="bar" />
        </div>
      )}
      {/* Real content is always in DOM order beneath the preloader, so
          <noscript> readers and bots see it regardless of JS execution. */}
      {children}
    </>
  );
}
