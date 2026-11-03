import type { Metadata } from "next";
import type { Locale } from "./i18n";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://anti-anthropic.vercel.app";

export const siteName = "Anthropic Protest File";
export const siteUpdatedAt = "2026-11-03";

export const localePath: Record<Locale, string> = {
  zh: "/",
  en: "/en",
  es: "/es",
};

export const localeHtmlLang: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
  es: "es",
};

export const siteLocaleCopy: Record<
  Locale,
  { title: string; description: string; ogDescription: string }
> = {
  zh: {
    title: "Anthropic 与 Claude 争议档案｜AI 新闻、证据与用户发声",
    description:
      "持续核验 Anthropic、Claude 与 Claude Code 的安全、隐私、计费、封号和训练数据争议；汇总 OpenAI、中国大模型每日新闻、公开证据、联署与最近 7 天用户留言。",
    ogDescription:
      "Anthropic 与 Claude 争议的公开证据档案，兼顾每日 AI 新闻、联署行动与实时用户发声。",
  },
  en: {
    title: "Anthropic & Claude Controversies: Evidence, AI News & Voices",
    description:
      "A sourced public record of Anthropic, Claude, and Claude Code controversies covering safety, privacy, billing, account bans, and training data—plus daily OpenAI and Chinese AI news, a petition, and public voices.",
    ogDescription:
      "A sourced public record of Anthropic and Claude controversies, with daily AI news, evidence, a petition, and live public voices.",
  },
  es: {
    title: "Controversias de Anthropic y Claude: pruebas, noticias y voces",
    description:
      "Archivo público con fuentes sobre Anthropic, Claude y Claude Code: seguridad, privacidad, cobros, bloqueos y datos de entrenamiento; además de noticias diarias de OpenAI y modelos chinos, petición y voces públicas.",
    ogDescription:
      "Archivo público de controversias de Anthropic y Claude, con noticias de IA, pruebas, petición y voces en directo.",
  },
};

export const siteTitle = siteLocaleCopy.zh.title;
export const siteDescription = siteLocaleCopy.zh.description;

export const siteKeywords = [
  "Anthropic",
  "Claude",
  "Claude Code",
  "Anthropic controversy",
  "Claude privacy",
  "Claude account ban",
  "AI safety",
  "AI ethics",
  "AI training data",
  "OpenAI news",
  "Chinese AI models",
  "DeepSeek",
  "Kimi",
  "Qwen",
  "Anthropic 争议",
  "Claude 封号",
  "AI 新闻",
  "中国大模型",
];

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

export function languageAlternates() {
  return {
    "zh-CN": absoluteUrl(localePath.zh),
    en: absoluteUrl(localePath.en),
    es: absoluteUrl(localePath.es),
    "x-default": absoluteUrl(localePath.zh),
  };
}

export function buildPageMetadata(locale: Locale): Metadata {
  const copy = siteLocaleCopy[locale];
  const canonical = absoluteUrl(localePath[locale]);

  return {
    metadataBase: new URL(siteUrl),
    title: copy.title,
    description: copy.description,
    keywords: siteKeywords,
    applicationName: siteName,
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: "technology",
    alternates: {
      canonical,
      languages: languageAlternates(),
      types: {
        "application/rss+xml": absoluteUrl("/feed.xml"),
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName,
      title: copy.title,
      description: copy.ogDescription,
      locale: locale === "zh" ? "zh_CN" : locale === "en" ? "en_US" : "es_ES",
      alternateLocale: ["zh_CN", "en_US", "es_ES"],
      images: [
        {
          url: absoluteUrl("/og-v2.png"),
          width: 1734,
          height: 907,
          alt: "Anthropic Protest File — public record, AI news and voice wall",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.ogDescription,
      images: [absoluteUrl("/og-v2.png")],
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
