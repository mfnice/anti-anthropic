"use client";

import { LOCALES, LOCALE_LABELS } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { edition, editionPath } from "@/lib/edition";
import { useI18n } from "./LanguageProvider";

export default function LanguageSwitcher({ path = "" }: { path?: string }) {
  const { locale, setLocale } = useI18n();

  return (
    <label className="language-choice">
      <select
        aria-label={edition[locale].language}
        value={locale}
        onChange={(event) => {
          const nextLocale = event.target.value as Locale;
          setLocale(nextLocale);
          window.location.assign(editionPath(nextLocale, path) + window.location.hash);
        }}
      >
        {LOCALES.map((item) => <option key={item} value={item}>{LOCALE_LABELS[item]}</option>)}
      </select>
      <span aria-hidden>⌄</span>
    </label>
  );
}
