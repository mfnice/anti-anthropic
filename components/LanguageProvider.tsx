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
  detectLocale,
  isLocale,
  type Dict,
  type Locale,
} from "@/lib/i18n";

const STORAGE_KEY = "voice-wall-locale";

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

  // 首次挂载：服务端已按 cookie / Accept-Language 选择；客户端只兜底校正。
  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? (window.localStorage.getItem(STORAGE_KEY) as Locale | null)
        : null;
    const initial = isLocale(saved) ? saved : initialLocale ?? detectLocale();
    if (initial !== locale) setLocaleState(initial);
    document.documentElement.lang = initial;
  }, [initialLocale, locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.documentElement.lang = l;
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
