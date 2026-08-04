import "@/styles/tokens.css";
import "@/styles/micro-interactions.css";

export const metadata = {
  title: "Dossier Starter — GSAP + Lenis",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
