import localFont from "next/font/local";
import type { ReactNode } from "react";

const display = localFont({
  src: "../app/fonts/BarlowCondensed-Black.woff2",
  weight: "900",
  variable: "--font-display",
  display: "swap",
});

const script = localFont({
  src: "../app/fonts/Explora-Regular.woff2",
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export default function SiteDocument({ children, lang }: { children: ReactNode; lang: string }) {
  return (
    <html lang={lang} className={`${display.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
