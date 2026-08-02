"use client";

import {
  AI_NEWS_ITEMS,
  AI_NEWS_SECTION,
  AI_NEWS_UPDATED_AT,
  type AINewsCategory,
} from "@/lib/ai-news";
import Reveal from "./Reveal";
import { useI18n } from "./LanguageProvider";

const categoryClasses: Record<AINewsCategory, string> = {
  openai: "border-cyan-300/45 bg-cyan-300/10 text-cyan-200",
  china: "border-amber-300/45 bg-amber-300/10 text-amber-200",
  industry: "border-white/25 bg-white/[0.06] text-neutral-300",
};

function displayDate(value: string) {
  return value.replaceAll("-", ".");
}

export default function AINews() {
  const { locale } = useI18n();
  const section = AI_NEWS_SECTION[locale];

  return (
    <section
      id="ai-news"
      aria-labelledby="ai-news-title"
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#080b0f] py-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_18%_15%,rgba(34,211,238,.15),transparent_30%),radial-gradient(circle_at_84%_70%,rgba(251,191,36,.1),transparent_32%)]"
      />
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -right-4 top-3 select-none text-[13vw] leading-none text-white/[0.025]"
      >
        WIRE
      </span>

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono-geek flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] text-cyan-300">
              <span className="h-2 w-2 bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,.8)]" />
              {section.kicker}
            </p>
            <div className="flex flex-wrap items-center gap-2 font-mono-geek text-[9px] font-bold tracking-[0.16em] text-neutral-500">
              <span className="border border-white/15 px-2.5 py-1">
                {section.updatedLabel} {displayDate(AI_NEWS_UPDATED_AT)}
              </span>
              <span className="border border-cyan-300/25 bg-cyan-300/[0.06] px-2.5 py-1 text-cyan-200/75">
                {section.cadence}
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h2
              id="ai-news-title"
              className="max-w-4xl font-black tracking-tight"
              style={{ fontSize: "clamp(38px, 5vw, 70px)", lineHeight: 1.02 }}
            >
              {section.title}
            </h2>
            <p className="border-l-2 border-cyan-300 pl-5 text-sm leading-7 text-neutral-400">
              {section.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {AI_NEWS_ITEMS.map((item, index) => {
            const copy = item.copy[locale];

            return (
              <Reveal
                key={item.id}
                delay={Math.min(index * 70, 280)}
                className={index === 0 ? "md:col-span-2" : undefined}
              >
                <article
                  className={`group relative h-full overflow-hidden border bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.045] md:p-7 ${
                    index === 0
                      ? "border-cyan-300/45 bg-[linear-gradient(120deg,rgba(34,211,238,.09),rgba(255,255,255,.025)_55%)]"
                      : "border-white/[0.11] hover:border-white/25"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span
                      className={`font-mono-geek border px-2.5 py-1 text-[9px] font-bold tracking-[0.16em] ${categoryClasses[item.category]}`}
                    >
                      {section.categories[item.category]}
                    </span>
                    <time
                      dateTime={item.date}
                      className="font-mono-geek text-[10px] tracking-[0.18em] text-neutral-600"
                    >
                      {displayDate(item.date)}
                    </time>
                  </div>

                  <div
                    className={
                      index === 0
                        ? "mt-7 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
                        : "mt-7"
                    }
                  >
                    <div>
                      <p className="font-display text-5xl leading-none text-white/[0.055]">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="-mt-4 text-xl font-black leading-snug text-neutral-100 md:text-2xl">
                        {copy.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-neutral-400 lg:mt-0">
                      {copy.summary}
                    </p>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[0.08] pt-5">
                    <span className="font-mono-geek text-[9px] font-bold tracking-[0.22em] text-neutral-600">
                      {section.sourceLabel}
                    </span>
                    {item.sources.map((source) => (
                      <a
                        key={source.url}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono-geek text-[10px] font-bold tracking-[0.12em] text-neutral-400 underline decoration-white/20 underline-offset-4 transition hover:text-cyan-200 hover:decoration-cyan-300"
                      >
                        {source.label} ↗
                      </a>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
