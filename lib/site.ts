import type { Metadata } from "next";
import { JOURNAL_UPDATED_AT, type JournalEntry } from "./journal";
import { edition, editionPath } from "./edition";
import type { Locale } from "./i18n";

export { localePath } from "./edition";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://anti-anthropic.vercel.app";

export const siteName = "Voice Wall";
export const siteUpdatedAt = JOURNAL_UPDATED_AT;
export const siteCoverPath = "/media/voice-wall-cover.jpg";

export const localeHtmlLang: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
  es: "es",
};

const openGraphLocales: Record<Locale, string> = {
  zh: "zh_CN",
  en: "en_US",
  es: "es_ES",
};

export const siteLocaleCopy: Record<
  Locale,
  { title: string; description: string; ogDescription: string }
> = {
  zh: {
    title: "Voice Wall 发声墙｜迈阿密特刊",
    description:
      "阅读 AI 发展手记与 Anthropic 抗议档案，查阅 Claude 争议的一手资料，参与公众留言与联署。",
    ogDescription: "迈阿密特刊收录 AI 发展手记、Anthropic 抗议档案与公众发声。",
  },
  en: {
    title: "Voice Wall · Miami Edition",
    description:
      "An independent AI journal and home of the Anthropic Protest File. Read original reporting, follow sources in the Claude archive, and add your voice to the wall.",
    ogDescription: "The Miami edition of Voice Wall brings together the AI journal, the Anthropic Protest File and public voices.",
  },
  es: {
    title: "Voice Wall · Edición Miami",
    description:
      "Revista independiente de IA y archivo de las protestas sobre Anthropic. Lee los artículos, consulta las fuentes sobre Claude y participa en el muro de voces.",
    ogDescription: "La edición Miami de Voice Wall reúne la revista de IA, el archivo de Anthropic y las voces del público.",
  },
};

export const siteTitle = siteLocaleCopy.zh.title;
export const siteDescription = siteLocaleCopy.zh.description;

export const siteKeywords = [
  "Voice Wall", "Anthropic Protest File", "Anthropic", "Claude", "Claude Code",
  "AI safety", "AI ethics", "AI training data", "OpenAI", "Gemini", "DeepSeek", "Kimi", "Qwen",
  "发声墙", "Anthropic 争议", "Claude 封号", "AI 新闻", "中国大模型",
];

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

export function languageAlternates(path = "") {
  const chineseUrl = absoluteUrl(editionPath("zh", path));
  return {
    "zh-CN": chineseUrl,
    en: absoluteUrl(editionPath("en", path)),
    es: absoluteUrl(editionPath("es", path)),
    "x-default": chineseUrl,
  };
}

function localizedMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  socialDescription = description,
  publishedDate?: string,
): Metadata {
  const canonical = absoluteUrl(editionPath(locale, path));
  const ogLocale = openGraphLocales[locale];
  const cover = {
    url: absoluteUrl(siteCoverPath),
    width: 1200,
    height: 630,
    alt: siteLocaleCopy[locale].title,
  };

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: siteKeywords,
    applicationName: siteName,
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: "technology",
    alternates: {
      canonical,
      languages: languageAlternates(path),
      types: { "application/rss+xml": absoluteUrl("/feed.xml") },
    },
    openGraph: {
      ...(publishedDate
        ? { type: "article", publishedTime: publishedDate, authors: [siteName] }
        : { type: "website" }),
      url: canonical,
      siteName,
      title,
      description: socialDescription,
      locale: ogLocale,
      alternateLocale: Object.values(openGraphLocales).filter((value) => value !== ogLocale),
      images: [cover],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: socialDescription,
      images: [cover],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function buildPageMetadata(locale: Locale): Metadata {
  const copy = siteLocaleCopy[locale];
  return localizedMetadata(locale, "", copy.title, copy.description, copy.ogDescription);
}

export function buildJournalMetadata(locale: Locale, article?: JournalEntry): Metadata {
  if (article) {
    const { title, summary } = article.copy[locale];
    return localizedMetadata(locale, `/articles/${article.id}`, `${title} · ${siteName}`, summary, summary, article.date);
  }
  const { articleIndex, indexIntro } = edition[locale];
  return localizedMetadata(locale, "/articles", `${articleIndex} · ${siteName}`, indexIntro);
}
