"use client";

import Reveal from "./Reveal";
import { useI18n } from "./LanguageProvider";

export default function Facts() {
  const { t } = useI18n();

  return (
    <section id="facts" className="relative mx-auto w-full max-w-6xl px-6 py-28 md:px-10">
      {/* 背景装饰英文 */}
      <span
        aria-hidden
        className="font-display pointer-events-none absolute right-0 top-10 select-none text-[11vw] leading-none text-white/[0.035]"
      >
        EVIDENCE
      </span>

      <Reveal>
        <p className="font-mono-geek mb-3 text-[12px] tracking-[0.4em] text-accent">
          01 — {t.facts.kicker}
        </p>
        <h2
          className="font-black tracking-tight"
          style={{ fontSize: "clamp(36px, 4.5vw, 62px)", lineHeight: 1.05 }}
        >
          {t.facts.titlePre}
          <span className="text-accent">{t.facts.titleAccent}</span>
          {t.facts.titlePost}
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#8a8a88]">
          {t.facts.description}
        </p>
      </Reveal>

      {/* 共享边框布局 */}
      <div
        className="mt-16 grid border border-white/[0.14]"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {t.facts.items.map((fact, i) => (
          <Reveal key={i} delay={i * 120}>
            <article className="group relative h-full overflow-hidden border-r border-white/[0.14] bg-white/[0.02] px-8 pb-[46px] pt-[38px] transition duration-300 hover:-translate-y-1 hover:bg-[rgba(255,51,65,0.07)]">
              {/* 大编号水印 */}
              <span
                aria-hidden
                className="font-display pointer-events-none absolute -right-[10px] -top-[22px] select-none text-white/[0.05]"
                style={{ fontSize: "110px", lineHeight: 1 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <p className="font-mono-geek inline-block border border-accent/50 px-2.5 py-1 text-[11px] font-bold tracking-[0.25em] text-accent">
                {t.facts.evidence} {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-mono-geek mt-6 text-xs tracking-[0.2em] text-[#6b6b6b]">
                {fact.date}
              </p>
              <h3 className="mt-2 text-xl font-bold">{fact.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#a3a3a1]">
                {fact.detail}
              </p>
              {fact.sourceUrl && (
                <a
                  href={fact.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono-geek mt-6 inline-flex text-[11px] font-bold tracking-[0.22em] text-accent transition hover:text-white"
                >
                  SOURCE: {fact.sourceLabel ?? "LINK"} ↗
                </a>
              )}

              <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
