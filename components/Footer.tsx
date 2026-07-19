"use client";

import { useI18n } from "./LanguageProvider";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="flex flex-col items-center gap-2 border-t border-white/5 py-10 text-center">
      <img src="/logo.svg" alt="" className="h-8 w-8 opacity-70" />
      <p className="font-mono-geek text-[10px] tracking-[0.4em] text-neutral-600">
        ANTHROPIC_PROTEST_FILE
      </p>
      <p className="text-xs text-neutral-600">{t.footer}</p>
    </footer>
  );
}
