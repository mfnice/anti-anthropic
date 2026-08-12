import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  languageAlternates,
  localePath,
  siteUpdatedAt,
} from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(localePath).map((path, index) => ({
      url: absoluteUrl(path),
      lastModified: new Date(`${siteUpdatedAt}T00:00:00+08:00`),
      changeFrequency: "daily",
      priority: index === 0 ? 1 : 0.9,
      alternates: { languages: languageAlternates() },
      images: [absoluteUrl("/og-v2.png"), absoluteUrl("/dario.webp")],
    }));
}
