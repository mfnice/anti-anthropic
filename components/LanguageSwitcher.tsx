"use client";

import { LOCALES, LOCALE_LABELS } from "@/lib/i18n";
import { useI18n } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="font-mono-geek fixed bottom-5 left-5 z-50 flex items-center gap-0.5 border border-white/[0.14] bg-[#0e0e10]/85 p-[3px] backdrop-blur-xl">
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`px-3 py-1.5 text-xs font-bold tracking-wide transition ${
            locale === l
              ? "bg-accent text-white"
              : "text-neutral-400 hover:text-neutral-100"
          }`}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
