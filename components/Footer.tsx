import Link from "next/link";
import { edition, editionPath } from "@/lib/edition";
import type { Locale } from "@/lib/i18n";
import { Wordmark } from "./Masthead";

export default function Footer({ locale }: { locale: Locale }) {
  const copy = edition[locale];
  return (
    <footer className="colophon">
      <div><Link href={editionPath(locale)}><Wordmark /></Link><p>{copy.footer}</p></div>
      <div className="colophon-links"><Link href={editionPath(locale, "/articles")}>{copy.articles}</Link><a href={editionPath(locale) + "#petition"}>{locale === "zh" ? "加入联署" : locale === "en" ? "Petition" : "Petición"}</a><a href="/feed.xml">RSS ↗</a><a href="#top">{copy.backTop} ↑</a></div>
    </footer>
  );
}
