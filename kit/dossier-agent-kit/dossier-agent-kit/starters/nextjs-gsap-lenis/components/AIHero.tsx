"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";

/**
 * kind-xii building block. Per 12_kind-xii_ai_live_motion.md: three hard
 * constraints distinguish this from every other kind - (1) single-flight
 * lock, (2) user-cancellable via AbortController, (3) schema-validated
 * output before it's ever applied to the DOM. Never auto-invoked on mount.
 */
function safeParsePalette(raw: string): string[] | null {
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((c) => typeof c === "string")) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function AIHero() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [palette, setPalette] = useState<string[] | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // single-flight lock: block a second concurrent generation
    setIsLoading(true);
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      const res = await fetch("/api/ai-hero", {
        method: "POST",
        body: JSON.stringify({ prompt: input }),
        signal: controller.signal,
      });
      const text = await res.text();
      const parsed = safeParsePalette(text);
      if (parsed) setPalette(parsed);
    } catch {
      // aborted or failed; leave prior palette in place
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    controllerRef.current?.abort();
    setIsLoading(false);
  };

  return (
    <section>
      <motion.div
        data-testid="ai-hero-visual"
        animate={{ background: palette?.[0] ?? "var(--color-bg)" }}
        transition={{ duration: reduced ? 0 : 0.22 }}
      />
      <form onSubmit={onSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your hero..."
        />
        <button type="submit" disabled={isLoading} data-testid="ai-generate">
          Generate
        </button>
        {isLoading && (
          <button type="button" onClick={onCancel} data-testid="ai-cancel">
            Cancel
          </button>
        )}
      </form>
      <noscript>
        This hero requires JavaScript. <a href="/static-hero">View static version</a>
      </noscript>
    </section>
  );
}
