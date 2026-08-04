"use client";
import { useRouter } from "next/navigation";

/**
 * kind-vii building block. View Transitions API with Firefox fallback and
 * modifier-click passthrough, per 07_kind-vii_page_transitions.md's minimal
 * snippet shape.
 */
export function PageLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const onClick = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return; // CC9: let the browser handle new-tab
    e.preventDefault();
    if (!(document as any).startViewTransition) {
      router.push(href);
      return;
    }
    (document as any).startViewTransition(() => router.push(href));
  };

  return (
    <a href={href} onClick={onClick} data-testid="page-link">
      {children}
    </a>
  );
}
