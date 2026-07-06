import type { Metadata } from "next";
import "@bowpi/design-system/styles/globals-app.css";
import "@bowpi/design-system/styles/globals-auth.css";

export const metadata: Metadata = {
  title: "Bowpi Enterprise — Matilda",
  description: "Plataforma de configuración e implementación del motor de decisión crediticia de Bowpi.",
};

/**
 * data-theme / data-accent live on <html>. Default light + cyan per
 * cursor_handoff/README.md — client-side theme changes update this
 * dataset directly (see components/shell/Shell.tsx and the store).
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="light" data-accent="cyan">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,550;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
