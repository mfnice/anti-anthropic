"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  DICTS,
  type Dict,
  type Locale,
} from "@/lib/i18n";

const STORAGE_KEY = "voice-wall-locale";
const HTML_LANG: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
  es: "es",
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // URL 决定首屏语言，确保搜索引擎和用户看到同一版本。
  useEffect(() => {
    if (initialLocale !== locale) setLocaleState(initialLocale);
    document.documentElement.lang = HTML_LANG[initialLocale];
  }, [initialLocale, locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.documentElement.lang = HTML_LANG[l];
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.cookie = `${STORAGE_KEY}=${l}; Max-Age=31536000; Path=/; SameSite=Lax`;
    } catch {
      // 隐私模式下 localStorage 可能不可用，忽略
    }
  }, []);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: DICTS[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n 必须在 LanguageProvider 内使用");
  return ctx;
}
