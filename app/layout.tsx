import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "发声墙 | Voice Wall",
  description: "把事实摆出来，让每个人都能说话。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`h-full antialiased ${archivo.variable} ${plexMono.variable}`}
    >
      <body className="min-h-full flex flex-col bg-[#09090a] text-neutral-100">
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
