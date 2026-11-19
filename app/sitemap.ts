import type { MetadataRoute } from "next";
import { editionPath } from "@/lib/edition";
import { LOCALES } from "@/lib/i18n";
import { JOURNAL } from "@/lib/journal";
import { absoluteUrl, languageAlternates, siteCoverPath, siteUpdatedAt } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = ["", "/articles"];
  return LOCALES.flatMap((locale) => [
    ...sections.map((path) => ({
      url: absoluteUrl(editionPath(locale, path)),
      lastModified: siteUpdatedAt,
      alternates: { languages: languageAlternates(path) },
      images: [absoluteUrl(siteCoverPath)],
    })),
    ...JOURNAL.map((article) => {
      const path = `/articles/${article.id}`;
      return {
        url: absoluteUrl(editionPath(locale, path)),
        lastModified: article.date,
        alternates: { languages: languageAlternates(path) },
      };
    }),
  ]);
}
