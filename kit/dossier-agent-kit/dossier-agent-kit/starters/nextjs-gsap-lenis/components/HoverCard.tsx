"use client";

/**
 * kind-viii baseline microinteraction. CSS-only per the dossier default;
 * no JS animation library needed for this class of feedback.
 * Styling lives in styles/micro-interactions.css (hover:hover gated,
 * :focus-visible only, transform+opacity only).
 */
export function HoverCard({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const Tag = href ? "a" : "div";
  return (
    <Tag
      className="hover-target"
      href={href}
      data-testid="hover-card"
    >
      {children}
    </Tag>
  );
}
