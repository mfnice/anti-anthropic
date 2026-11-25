import { createElement } from "react";
import Script from "next/script";
import type { Locale } from "@/lib/i18n";

const labels = {
  zh: { title: "Anthropic 股价", source: "Cboe One 延迟行情 · 美元", fallback: "前往 TradingView 查看 ANT 行情" },
  en: { title: "Anthropic share price", source: "Delayed Cboe One quote · USD", fallback: "View ANT on TradingView" },
  es: { title: "Acciones de Anthropic", source: "Cotización diferida de Cboe One · USD", fallback: "Ver ANT en TradingView" },
};

export default function StockQuote({ locale }: { locale: Locale }) {
  const copy = labels[locale];
  const language = locale === "zh" ? "zh_CN" : locale;
  const url = "https://www.tradingview.com/symbols/NASDAQ-ANT/";

  return (
    <section className="stock-quote" aria-labelledby="stock-quote-title">
      <div>
        <h2 id="stock-quote-title">{copy.title}</h2>
        <p>{copy.source} · <a href={url}>TradingView ↗</a></p>
      </div>
      {createElement("tv-single-ticker", { symbol: "NASDAQ:ANT", theme: "light" },
        <a className="text-link" href={url}>{copy.fallback} ↗</a>
      )}
      <Script type="module" src={`https://widgets.tradingview-widget.com/w/${language}/tv-single-ticker.js`} />
    </section>
  );
}
