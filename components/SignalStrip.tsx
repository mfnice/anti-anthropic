"use client";

import { AI_NEWS_ITEMS } from "@/lib/ai-news";
import { useI18n } from "./LanguageProvider";

const copy = {
  zh: {
    label: "公共监督仪表",
    nav: [
      ["最新简报", "#ai-news"],
      ["证据档案", "#facts"],
      ["加入联署", "#petition"],
      ["公开发声", "#speak"],
    ],
    stats: [
      [String(AI_NEWS_ITEMS.length).padStart(2, "0"), "AI 新闻 / 本期"],
      ["10+", "事实证据 / 持续核验"],
      ["7 天", "公开留言 / 自动隐藏"],
      ["SSE", "留言流 / 实时连接"],
    ],
  },
  en: {
    label: "PUBLIC ACCOUNTABILITY DESK",
    nav: [
      ["Latest briefing", "#ai-news"],
      ["Evidence file", "#facts"],
      ["Sign petition", "#petition"],
      ["Speak out", "#speak"],
    ],
    stats: [
      [String(AI_NEWS_ITEMS.length).padStart(2, "0"), "AI stories / edition"],
      ["10+", "Evidence files / verified"],
      ["7 days", "Public notes / visible"],
      ["SSE", "Comment stream / live"],
    ],
  },
  es: {
    label: "MESA DE VIGILANCIA PÚBLICA",
    nav: [
      ["Último informe", "#ai-news"],
      ["Archivo de pruebas", "#facts"],
      ["Firmar petición", "#petition"],
      ["Tomar la palabra", "#speak"],
    ],
    stats: [
      [String(AI_NEWS_ITEMS.length).padStart(2, "0"), "Noticias IA / edición"],
      ["10+", "Pruebas / verificadas"],
      ["7 días", "Mensajes / visibles"],
      ["SSE", "Comentarios / en vivo"],
    ],
  },
} as const;

export default function SignalStrip() {
  const { locale } = useI18n();
  const content = copy[locale];

  return (
    <section className="signal-strip" aria-label={content.label}>
      <div className="signal-strip__top">
        <p className="signal-strip__label">
          <span className="signal-led" aria-hidden />
          {content.label}
        </p>
        <nav className="signal-strip__nav" aria-label={content.label}>
          {content.nav.map(([label, href], index) => (
            <a key={href} href={href}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {label}
            </a>
          ))}
        </nav>
      </div>
      <div className="signal-strip__stats">
        {content.stats.map(([value, label], index) => (
          <article key={label} className="signal-stat">
            <span className="signal-stat__index">0{index + 1}</span>
            <strong>{value}</strong>
            <p>{label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
