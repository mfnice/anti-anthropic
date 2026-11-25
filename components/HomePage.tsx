import type { Locale } from "@/lib/i18n";
import { editionPath } from "@/lib/edition";
import { JOURNAL } from "@/lib/journal";
import { absoluteUrl, localeHtmlLang, siteLocaleCopy, siteName, siteUpdatedAt } from "@/lib/site";
import { LanguageProvider } from "./LanguageProvider";
import Masthead from "./Masthead";
import Hero from "./Hero";
import StockQuote from "./StockQuote";
import Lineup from "./Lineup";
import CommunityArchive from "./CommunityArchive";
import Footer from "./Footer";

export default function HomePage({ locale }: { locale: Locale }) {
  const url = absoluteUrl(editionPath(locale));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url,
    name: siteLocaleCopy[locale].title,
    inLanguage: localeHtmlLang[locale],
    dateModified: siteUpdatedAt,
    publisher: { "@type": "Organization", name: siteName },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: JOURNAL.map((entry, index) => ({
        "@type": "ListItem", position: index + 1,
        url: absoluteUrl(editionPath(locale, `/articles/${entry.id}`)),
        name: entry.copy[locale].title,
      })),
    },
  };
  return (
    <LanguageProvider initialLocale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Masthead locale={locale} />
      <main id="content">
        <Hero locale={locale} />
        <StockQuote locale={locale} />
        <Lineup locale={locale} />
        <CommunityArchive />
      </main>
      <Footer locale={locale} />
    </LanguageProvider>
  );
}
