"use client";

import Reveal from "./Reveal";
import { useI18n } from "./LanguageProvider";

const toneClasses = {
  alert: {
    dot: "bg-accent",
    label: "border-accent/50 bg-accent/10 text-accent",
    edge: "group-hover:border-accent/70",
  },
  watch: {
    dot: "bg-amber-300",
    label: "border-amber-300/40 bg-amber-300/10 text-amber-200",
    edge: "group-hover:border-amber-300/60",
  },
  verified: {
    dot: "bg-cyan-300",
    label: "border-cyan-300/40 bg-cyan-300/10 text-cyan-200",
    edge: "group-hover:border-cyan-300/60",
  },
} as const;

export default function LatestBriefing() {
  const { t } = useI18n();

  return (
    <section
      aria-labelledby="latest-briefing-title"
      className="briefing-section relative overflow-hidden border-b border-white/[0.08] bg-[#0d0d0f] py-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:36px_36px]"
      />
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -right-5 top-0 select-none text-[15vw] leading-none text-white/[0.025]"
      >
        LIVE
      </span>

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono-geek flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] text-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {t.briefing.kicker}
            </p>
            <span className="font-mono-geek border border-white/15 px-2.5 py-1 text-[10px] tracking-[0.16em] text-neutral-500">
              {t.briefing.updated}
            </span>
          </div>

          <div className="mt-5 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <h2
              id="latest-briefing-title"
              className="max-w-4xl font-black tracking-tight"
              style={{ fontSize: "clamp(38px, 5vw, 70px)", lineHeight: 1.02 }}
            >
              {t.briefing.title}
            </h2>
            <p className="border-l-2 border-accent pl-5 text-sm leading-7 text-neutral-400">
              {t.briefing.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px bg-white/[0.12] p-px md:grid-cols-2">
          {t.briefing.items.map((item, index) => {
            const tone = toneClasses[item.tone];

            return (
              <Reveal
                key={`${item.date}-${item.title}`}
                delay={index * 80}
                className={index === 0 ? "md:col-span-2" : undefined}
              >
                <article
                  className={`group relative h-full overflow-hidden border border-transparent bg-[#111114] p-6 transition duration-300 md:p-8 ${
                    index === 0
                      ? "border-accent/55 bg-[linear-gradient(115deg,rgba(255,51,65,.1),#111114_48%)]"
                      : ""
                  } ${tone.edge}`}
                >
                  {index === 0 && (
                    <span
                      aria-hidden
                      className="font-display pointer-events-none absolute -right-3 -top-5 text-[110px] leading-none text-white/[0.035]"
                    >
                      NEW
                    </span>
                  )}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono-geek text-[11px] font-bold tracking-[0.2em] text-neutral-500">
                      {item.date}
                    </p>
                    <span
                      className={`font-mono-geek inline-flex items-center gap-2 border px-2.5 py-1 text-[9px] font-bold tracking-[0.16em] ${tone.label}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                      {item.status}
                    </span>
                  </div>

                  <div
                    className={
                      index === 0
                        ? "mt-7 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
                        : ""
                    }
                  >
                    <div>
                      <p className="font-display text-[46px] leading-none text-white/[0.055]">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="-mt-4 max-w-xl text-xl font-black leading-snug text-neutral-100 md:text-2xl">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-neutral-400 lg:mt-0">
                      {item.detail}
                    </p>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[0.08] pt-5">
                    <span className="font-mono-geek text-[9px] font-bold tracking-[0.22em] text-neutral-600">
                      {t.briefing.sourceLabel}
                    </span>
                    {item.sources.map((source) => (
                      <a
                        key={source.url}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono-geek text-[10px] font-bold tracking-[0.14em] text-neutral-400 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-accent"
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
