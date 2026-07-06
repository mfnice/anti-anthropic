"use client";

import Reveal from "./Reveal";
import { useI18n } from "./LanguageProvider";

export default function Manifesto() {
  const { t } = useI18n();

  return (
    <section className="relative border-y border-white/[0.08] bg-[#111113] py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-10">
        <Reveal>
          <p className="font-mono-geek mb-3 text-[12px] font-bold tracking-[0.34em] text-accent">
            {t.manifesto.kicker}
          </p>
          <h2
            className="max-w-xl font-black"
            style={{ fontSize: "clamp(34px, 4.6vw, 66px)", lineHeight: 1.04 }}
          >
            {t.manifesto.title}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="border-l-[3px] border-accent pl-5 text-base leading-8 text-neutral-300 md:text-lg">
            {t.manifesto.body}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {t.manifesto.points.map((point, index) => (
              <div
                key={point}
                className="border border-white/[0.12] bg-black/[0.2] px-4 py-4"
              >
                <p className="font-mono-geek mb-2 text-[11px] font-bold tracking-[0.24em] text-accent">
                  NO. {String(index + 1).padStart(2, "0")}
                </p>
                <p className="text-sm leading-6 text-neutral-300">{point}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
