import type { Metadata } from "next";
import SiteDocument from "@/components/SiteDocument";
import { buildPageMetadata } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = buildPageMetadata("en");

export default function EnglishRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument lang="en">{children}</SiteDocument>;
}
