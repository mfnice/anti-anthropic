import { LanguageProvider } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Facts from "@/components/Facts";
import Petition from "@/components/Petition";
import SubmitForm from "@/components/SubmitForm";
import CommentFeed from "@/components/CommentFeed";
import Footer from "@/components/Footer";
import { cookies, headers } from "next/headers";
import { isLocale, localeFromLanguage, type Locale } from "@/lib/i18n";
import { siteDescription, siteKeywords, siteName, siteTitle, siteUrl } from "@/lib/site";

const LOCALE_COOKIE = "voice-wall-locale";

async function getInitialLocale(): Promise<Locale> {
  const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  const acceptLanguage = (await headers()).get("accept-language");
  return localeFromLanguage(acceptLanguage);
}

export default async function Home() {
  const initialLocale = await getInitialLocale();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteTitle,
    alternateName: [siteName, "Anthropic 抗议档案", "Claude Code Protest File"],
    url: siteUrl,
    inLanguage: ["zh-CN", "en", "es"],
    description: siteDescription,
    keywords: siteKeywords.join(", "),
    about: [
      "Anthropic",
      "Claude Code",
      "Cursor",
      "AI training data",
      "Chinese internet content",
      "AI ethics",
      "anti-ethical AI conduct",
      "web scraping",
    ],
  };

  return (
    <LanguageProvider initialLocale={initialLocale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        <CommentFeed />
        <LanguageSwitcher />
        <Hero />
        <Manifesto />
        <Facts />
        <Petition />
        <SubmitForm />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
