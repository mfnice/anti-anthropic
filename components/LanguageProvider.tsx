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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // 首次挂载：优先读 localStorage，否则按浏览器语言探测
  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? (window.localStorage.getItem(STORAGE_KEY) as Locale | null)
        : null;
    const initial =
      saved && saved in DICTS ? saved : detectLocale();
    setLocaleState(initial);
    document.documentElement.lang = initial;
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.documentElement.lang = l;
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
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
