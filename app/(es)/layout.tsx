import type { Metadata } from "next";
import SiteDocument from "@/components/SiteDocument";
import { buildPageMetadata } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = buildPageMetadata("es");

export default function SpanishRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument lang="es">{children}</SiteDocument>;
}
