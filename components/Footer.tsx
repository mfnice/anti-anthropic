"use client";

import { useI18n } from "./LanguageProvider";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="flex flex-col items-center gap-2 border-t border-white/5 py-10 text-center">
      <p className="font-mono-geek text-[10px] tracking-[0.4em] text-neutral-600">
        VOICE_WALL
      </p>
      <p className="text-xs text-neutral-600">{t.footer}</p>
    </footer>
  );
}
