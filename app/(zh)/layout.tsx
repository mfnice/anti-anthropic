import type { Metadata } from "next";
import SiteDocument from "@/components/SiteDocument";
import { buildPageMetadata } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = buildPageMetadata("zh");

export default function ChineseRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument lang="zh-CN">{children}</SiteDocument>;
}
