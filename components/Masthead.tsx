import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { edition, editionPath } from "@/lib/edition";
import LanguageSwitcher from "./LanguageSwitcher";
import SoundToggle from "./SoundToggle";

export function Wordmark() {
  return <span className="wordmark" lang="en">voicewall<span>.</span></span>;
}

export default function Masthead({ locale, path = "" }: { locale: Locale; path?: string }) {
  const copy = edition[locale];
  const home = editionPath(locale);

  return (
    <header className="masthead" id="top">
      <a href="#content" className="skip-link">{copy.skip}</a>
      <Link href={home} aria-label={`Voice Wall · ${copy.home}`}><Wordmark /></Link>
      <nav className="masthead-nav" aria-label={copy.nav}>
        <Link href={home} aria-current={!path ? "page" : undefined}>{copy.home}</Link>
        <Link href={editionPath(locale, "/articles")} aria-current={path ? "location" : undefined}>{copy.articles}</Link>
        <a href={home + "#facts"}>{copy.archive}</a>
        <a href={home + "#speak"}>{copy.voice}</a>
      </nav>
      <div className="masthead-tools"><SoundToggle /><LanguageSwitcher path={path} /></div>
    </header>
  );
}
