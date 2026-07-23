"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";
import { useI18n } from "./LanguageProvider";

interface RecentSigner {
  id: string;
  nickname: string;
  created_at: string;
}

interface PetitionPayload {
  count: number;
  recent: RecentSigner[];
}

const inputCls =
  "w-full border border-white/20 bg-black/25 px-4 py-3.5 text-base outline-none transition placeholder:text-neutral-600 focus:border-accent";

function nextMilestone(count: number) {
  if (count < 50) return 50;
  if (count < 100) return 100;
  if (count < 250) return 250;
  if (count < 500) return 500;
  if (count < 1000) return 1000;
  return Math.ceil((count + 1) / 1000) * 1000;
}

function signerInitial(name: string) {
  return Array.from(name.trim())[0]?.toUpperCase() ?? "?";
}

export default function Petition() {
  const { locale, t } = useI18n();
  const [data, setData] = useState<PetitionPayload>({ count: 0, recent: [] });
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "signed" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const goal = useMemo(() => nextMilestone(data.count), [data.count]);
  const progress = Math.min(100, Math.max(3, (data.count / goal) * 100));

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/petition", { cache: "no-store" });
      if (!response.ok) return;
      setData((await response.json()) as PetitionPayload);
    } catch {
      // 下一轮自动重试，不打断用户填写。
    }
  }, []);

  useEffect(() => {
    load();
    const timer = window.setInterval(load, 20000);
    return () => window.clearInterval(timer);
  }, [load]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const response = await fetch("/api/petition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname,
          email: email || undefined,
          contact_opt_in: email ? consent : false,
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMsg(payload.error ?? t.petition.genericErr);
        return;
      }

      setData({ count: payload.count, recent: payload.recent });
      setStatus("signed");
      setNickname("");
      setEmail("");
      setConsent(false);
    } catch {
      setStatus("error");
      setErrorMsg(t.petition.networkErr);
    }
  }

  async function sharePetition() {
    const url = `${window.location.origin}${window.location.pathname}#petition`;
    const shareData = { title: document.title, text: t.petition.statement, url };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // 用户取消时保留复制链接这个降级路径。
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section
      id="petition"
      className="relative overflow-hidden border-y border-accent/30 bg-[#120d0f] py-24"
    >
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -right-8 top-6 select-none text-[15vw] leading-none text-white/[0.035]"
      >
        SIGN
      </span>

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="font-mono-geek mb-3 text-[12px] font-bold tracking-[0.38em] text-accent">
            02 — {t.petition.kicker}
          </p>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h2
                className="max-w-3xl font-black tracking-tight"
                style={{ fontSize: "clamp(38px, 5.4vw, 74px)", lineHeight: 1.02 }}
              >
                {t.petition.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-400">
                {t.petition.description}
              </p>
            </div>

            <div className="border border-accent/45 bg-black/25 p-5 shadow-[8px_8px_0_rgba(255,51,65,0.18)]">
              <p className="font-mono-geek text-[10px] font-bold tracking-[0.3em] text-neutral-500">
                {t.petition.countLabel}
              </p>
              <p className="mt-2 flex items-end gap-3">
                <span className="font-display text-6xl leading-none text-white md:text-7xl">
                  {data.count.toLocaleString(locale === "zh" ? "zh-CN" : locale)}
                </span>
                <span className="pb-1 text-sm text-neutral-500">
                  {t.petition.countUnit}
                </span>
              </p>
              <div className="mt-5 h-2 overflow-hidden bg-white/10">
                <div
                  className="petition-progress h-full bg-accent"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="font-mono-geek mt-2 text-[10px] tracking-[0.18em] text-neutral-500">
                {t.petition.nextGoal(goal)}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <article className="border border-white/15 bg-black/25 p-6 md:p-8">
              <p className="font-mono-geek text-[11px] font-bold tracking-[0.3em] text-accent">
                {t.petition.statementLabel}
              </p>
              <p className="mt-5 text-lg font-semibold leading-8 text-neutral-100">
                {t.petition.statement}
              </p>

              <p className="font-mono-geek mt-9 text-[11px] font-bold tracking-[0.3em] text-neutral-500">
                {t.petition.demandsTitle}
              </p>
              <ol className="mt-4 space-y-4">
                {t.petition.demands.map((demand, index) => (
                  <li key={demand} className="flex gap-4 text-sm leading-6 text-neutral-300">
                    <span className="font-mono-geek flex h-7 w-7 shrink-0 items-center justify-center bg-accent text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    {demand}
                  </li>
                ))}
              </ol>

              <div className="mt-9 border-t border-white/10 pt-6">
                <p className="font-mono-geek text-[10px] font-bold tracking-[0.28em] text-neutral-500">
                  {t.petition.recentTitle}
                </p>
                {data.recent.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2" aria-live="polite">
                    {data.recent.map((signer) => (
                      <span
                        key={signer.id}
                        className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-3 text-xs text-neutral-300"
                      >
                        <span className="flex h-6 w-6 items-center justify-center bg-accent/85 text-[10px] font-black text-white">
                          {signerInitial(signer.nickname)}
                        </span>
                        {signer.nickname}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-neutral-500">{t.petition.emptyRecent}</p>
                )}
              </div>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative border-2 border-accent bg-[#0b0b0c] p-6 md:p-8">
              <div className="absolute -right-2 -top-3 rotate-2 bg-accent px-3 py-1 font-mono-geek text-[10px] font-bold tracking-[0.22em] text-white">
                NO CONSENT / NO SILENCE
              </div>

              {status === "signed" ? (
                <div className="flex min-h-[390px] flex-col items-center justify-center text-center">
                  <span className="petition-signed-mark flex h-24 w-24 rotate-[-5deg] items-center justify-center border-4 border-accent text-5xl font-black text-accent">
                    ✓
                  </span>
                  <h3 className="mt-7 text-3xl font-black">{t.petition.signedTitle}</h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-neutral-400">
                    {t.petition.signedBody}
                  </p>
                  <button
                    type="button"
                    onClick={sharePetition}
                    className="mt-8 border-2 border-white/30 px-7 py-3 text-xs font-black tracking-[0.2em] transition hover:border-accent hover:text-accent"
                  >
                    {copied ? t.petition.copied : t.petition.share} ↗
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="petition-nickname"
                      className="font-mono-geek mb-2 block text-[11px] font-bold tracking-[0.2em] text-neutral-400"
                    >
                      {t.petition.nickLabel} <span className="text-accent">*</span>
                    </label>
                    <input
                      id="petition-nickname"
                      type="text"
                      required
                      maxLength={20}
                      autoComplete="nickname"
                      value={nickname}
                      onChange={(event) => setNickname(event.target.value)}
                      placeholder={t.petition.nickPlaceholder}
                      className={inputCls}
                    />
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="petition-email"
                      className="font-mono-geek mb-2 block text-[11px] font-bold tracking-[0.2em] text-neutral-400"
                    >
                      {t.petition.emailLabel}{" "}
                      <span className="text-neutral-600">{t.petition.emailHint}</span>
                    </label>
                    <input
                      id="petition-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        if (!event.target.value) setConsent(false);
                      }}
                      placeholder={t.petition.emailPlaceholder}
                      className={inputCls}
                    />
                  </div>

                  <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6 text-neutral-400">
                    <input
                      type="checkbox"
                      checked={consent}
                      disabled={!email}
                      required={Boolean(email)}
                      onChange={(event) => setConsent(event.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 accent-[#ff3341] disabled:opacity-35"
                    />
                    <span>{t.petition.consent}</span>
                  </label>

                  <p className="mt-3 text-xs leading-5 text-neutral-600">
                    {t.petition.privacy}
                  </p>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-8 flex w-full items-center justify-center gap-3 border-2 border-accent bg-accent py-4 text-sm font-black tracking-[0.26em] text-white transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(255,255,255,0.9)] disabled:opacity-50"
                  >
                    {status === "sending" ? t.petition.submitting : t.petition.submit}
                    <span>→</span>
                  </button>

                  {status === "error" && (
                    <p aria-live="polite" className="mt-4 text-center text-sm text-accent">
                      {errorMsg}
                    </p>
                  )}
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
