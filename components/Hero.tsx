"use client";

import Image from "next/image";
import { useI18n } from "./LanguageProvider";

// 站长可配置的首屏视频位；留空则回退到 hero-bg.jpg / hero-bg.svg
const videoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL;

export default function Hero() {
  const { locale, t } = useI18n();
  const titleLines = t.hero.titlePre.split("\n");
  const isZh = locale === "zh";
  const verdictLines = titleLines.map((line) =>
    line.replace(/[✕✓]/g, "").trim()
  );
  const isVerdictTitle = t.hero.titleHighlight.trim() === "✓";

  return (
    <section className="hero-editorial relative flex min-h-screen flex-col overflow-hidden">
      {/* 背景：视频位优先，否则背景图 */}
      {videoUrl ? (
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/hero-bg.jpg'), url('/hero-bg.svg')",
            backgroundSize: "cover, cover",
            backgroundPosition: "center, center",
          }}
        />
      )}

      {/* 暗角遮罩 + 底部渐隐，衔接下一屏 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.78)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#09090a]" />

      {/* 顶部品牌条 */}
      <header className="hero-nav relative z-10 flex items-center gap-3 px-6 py-5 md:px-10">
        <span className="hero-nav__mark">
          <Image src="/logo.svg" alt="" width={26} height={26} />
        </span>
        <span className="text-sm font-black tracking-widest">{t.brand}</span>
        <span className="font-mono-geek hero-nav__edition hidden text-[10px] tracking-[0.28em] sm:inline">
          INDEPENDENT FILE / 2026
        </span>
        <nav className="hero-nav__links ml-auto hidden items-center gap-5 lg:flex" aria-label="Primary">
          <a href="#ai-news">AI WIRE</a>
          <a href="#facts">EVIDENCE</a>
          <a href="#petition">PETITION</a>
          <a href="#speak">VOICE</a>
        </nav>
        <span className="font-mono-geek hero-nav__live ml-auto inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] lg:ml-5">
          <span className="signal-led" aria-hidden /> LIVE
        </span>
      </header>

      {/* 背景装饰英文 */}
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -left-6 top-1/2 -translate-y-1/2 select-none text-[27vw] leading-none text-white/[0.045]"
      >
        NO.
      </span>

      <div className="relative z-10 grid flex-1 items-center gap-10 px-6 py-10 md:px-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-20">
        <div className="max-w-4xl">
          <p className="font-mono-geek mb-8 flex max-w-full items-center gap-4 text-[13px] font-bold tracking-[0.32em] text-accent md:tracking-[0.55em]">
            <span className="inline-block h-0.5 w-[52px] bg-accent" />
            <span className="min-w-0 break-words">{t.hero.eyebrow}</span>
          </p>

          {/* 大标语：判定牌式对照，避免符号贴片感 */}
          {isVerdictTitle ? (
            <h1
              className="hero-verdict max-w-full font-black"
              style={{
                fontSize: isZh
                  ? "clamp(56px, 9.6vw, 132px)"
                  : "clamp(40px, 6.8vw, 88px)",
                lineHeight: 1,
                letterSpacing: 0,
              }}
            >
              <span className="verdict-row verdict-row--false">
                <span className="verdict-word">{verdictLines[0]}</span>
                <span className="verdict-mark verdict-mark--cross">✕</span>
              </span>
              <span className="verdict-row verdict-row--true">
                <span className="hl verdict-word">{verdictLines[1]}</span>
                <span className="verdict-mark verdict-mark--check">✓</span>
              </span>
            </h1>
          ) : (
            <h1
              className="max-w-full break-words font-black"
              style={{
                fontSize: isZh
                  ? "clamp(56px, 10.5vw, 148px)"
                  : "clamp(42px, 7.2vw, 96px)",
                lineHeight: isZh ? 1.02 : 1.06,
                letterSpacing: 0,
              }}
            >
              {titleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))}
              <span className="hl">{t.hero.titleHighlight}</span>
            </h1>
          )}

          {/* 副标语 */}
          <p
            className="mt-8 max-w-xl border-l-[3px] border-accent pl-[22px] text-[#c9c9c7]"
            style={{ fontSize: "clamp(16px, 1.4vw, 21px)", lineHeight: 1.8 }}
          >
            {t.hero.subtitle}
          </p>

          <div className="hero-actions mt-12 flex flex-wrap gap-4">
            <a
              href="#petition"
              className="border-2 border-accent bg-accent px-[38px] py-[18px] text-[14px] font-black tracking-[0.3em] text-white transition duration-200 rotate-[-0.5deg] hover:rotate-0 hover:-translate-y-[3px] hover:shadow-[6px_6px_0_rgba(255,255,255,0.9)]"
            >
              {t.hero.ctaPetition}
            </a>
            <a
              href="#facts"
              className="border-2 border-white/35 px-[38px] py-[18px] text-[14px] font-black tracking-[0.3em] text-neutral-200 backdrop-blur-sm transition duration-200 rotate-[0.5deg] hover:rotate-0 hover:border-accent hover:text-accent"
            >
              {t.hero.ctaFacts}
            </a>
            <a
              href="#speak"
              className="px-3 py-[18px] text-[12px] font-bold tracking-[0.24em] text-neutral-400 transition hover:text-accent"
            >
              {t.hero.ctaSpeak} →
            </a>
          </div>
        </div>

        <aside className="hero-dossier relative hidden self-center lg:block">
          <div className="hero-dossier__orbit absolute -inset-4 rotate-2" />
          <figure className="hero-dossier__card relative overflow-hidden border-2 border-white/25 bg-black rotate-[-1.5deg]">
            <Image
              src="/dario.webp"
              alt="Dario Amodei"
              width={1200}
              height={663}
              sizes="360px"
              loading="eager"
              className="h-[460px] w-full object-cover grayscale contrast-125"
            />
            <figcaption className="font-mono-geek absolute inset-x-0 bottom-0 border-t border-accent/60 bg-black/78 px-4 py-3 text-[11px] font-bold tracking-[0.22em] text-neutral-300 backdrop-blur-sm">
              DARIO AMODEI / ANTHROPIC CEO
            </figcaption>
          </figure>
          <div className="hero-dossier__meta font-mono-geek">
            <span>CASE 24—0813</span>
            <span>STATUS / OPEN</span>
            <span>PUBLIC RECORD</span>
          </div>
        </aside>
      </div>

      {/* 红色印章 */}
      <div
        aria-hidden
        className="stamp absolute bottom-[190px] z-10 hidden max-w-[150px] rotate-12 px-4 py-3 text-center opacity-80 md:block"
        style={{ right: "clamp(18px, 5vw, 82px)" }}
      >
        <p className="text-xl font-black tracking-[0.12em] text-accent">
          {t.hero.stampTop}
        </p>
        <p className="font-mono-geek mt-1 break-words text-[9px] tracking-[0.16em] text-accent/80">
          {t.hero.stampSub}
        </p>
      </div>

      {/* 底部滚动横幅 */}
      <div className="ticker-acid relative z-10 overflow-hidden border-y-2 border-accent bg-black/45 py-3 backdrop-blur-sm">
        <div className="marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="whitespace-nowrap px-6 text-sm font-semibold tracking-[0.3em] text-neutral-400"
            >
              {t.hero.marquee}{" "}
              <span className="font-mono-geek text-accent">///</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
