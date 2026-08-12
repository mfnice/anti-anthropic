import { AI_NEWS_ITEMS } from "@/lib/ai-news";
import type { Locale } from "@/lib/i18n";
import {
  absoluteUrl,
  localeHtmlLang,
  localePath,
  siteDescription,
  siteLocaleCopy,
  siteName,
  siteUpdatedAt,
  siteUrl,
} from "@/lib/site";
import AINews from "./AINews";
import CommentFeed from "./CommentFeed";
import Facts from "./Facts";
import Footer from "./Footer";
import Hero from "./Hero";
import LanguageSwitcher from "./LanguageSwitcher";
import { LanguageProvider } from "./LanguageProvider";
import LatestBriefing from "./LatestBriefing";
import Manifesto from "./Manifesto";
import Petition from "./Petition";
import SignalStrip from "./SignalStrip";
import SubmitForm from "./SubmitForm";

function structuredData(locale: Locale) {
  const pageUrl = absoluteUrl(localePath[locale]);
  const copy = siteLocaleCopy[locale];
  const newsList = {
    "@type": "ItemList",
    "@id": `${pageUrl}#ai-news`,
    name:
      locale === "zh"
        ? "每日 AI 新闻"
        : locale === "en"
          ? "Daily AI news"
          : "Noticias diarias de IA",
    numberOfItems: AI_NEWS_ITEMS.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: AI_NEWS_ITEMS.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: item.sources[0]?.url,
      name: item.copy[locale].title,
    })),
  };

  const graph: Record<string, unknown>[] = [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: copy.title,
      description: copy.description,
      inLanguage: localeHtmlLang[locale],
      isPartOf: { "@id": `${siteUrl}/#website` },
      dateModified: `${siteUpdatedAt}T00:00:00+08:00`,
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl("/og-v2.png"),
        width: 1734,
        height: 907,
      },
      about: [
        { "@type": "Thing", name: "Anthropic" },
        { "@type": "Thing", name: "Claude" },
        { "@type": "Thing", name: "Claude Code" },
        { "@type": "Thing", name: "AI safety" },
        { "@type": "Thing", name: "AI ethics" },
        { "@type": "Thing", name: "Chinese foundation models" },
      ],
      mainEntity: { "@id": `${pageUrl}#ai-news` },
    },
    newsList,
  ];

  if (locale === "zh") {
    graph.unshift({
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: siteName,
      alternateName: "Anthropic 抗议档案",
      description: siteDescription,
      inLanguage: ["zh-CN", "en", "es"],
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export default function HomePage({ locale }: { locale: Locale }) {
  const jsonLd = JSON.stringify(structuredData(locale)).replace(/</g, "\\u003c");

  return (
    <LanguageProvider initialLocale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <main className="site-shell">
        <CommentFeed />
        <LanguageSwitcher />
        <Hero />
        <SignalStrip />
        <LatestBriefing />
        <AINews />
        <Manifesto />
        <Facts />
        <Petition />
        <SubmitForm />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
