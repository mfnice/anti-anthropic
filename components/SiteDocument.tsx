import { Archivo_Black, IBM_Plex_Mono } from "next/font/google";
import type { ReactNode } from "react";

const archivo = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export default function SiteDocument({
  children,
  lang,
}: {
  children: ReactNode;
  lang: string;
}) {
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`h-full antialiased ${archivo.variable} ${plexMono.variable}`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0f0d] text-neutral-100">
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
