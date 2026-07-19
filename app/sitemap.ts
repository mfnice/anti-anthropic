import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-07-06T00:00:00.000Z"),
      changeFrequency: "daily",
      priority: 1,
      images: [`${siteUrl}/dario.webp`, `${siteUrl}/logo.svg`],
    },
  ];
}
