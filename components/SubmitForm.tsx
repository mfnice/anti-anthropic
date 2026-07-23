"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { useI18n } from "./LanguageProvider";
import StickerPicker from "./StickerPicker";
import Sticker from "./Sticker";

const inputCls =
  "w-full border-0 border-b border-white/20 bg-transparent px-1 py-3 text-base outline-none transition placeholder:text-neutral-600 focus:border-accent";

const labelCls =
  "font-mono-geek mb-1 block text-[11px] font-bold tracking-[0.2em] text-neutral-400";

export default function SubmitForm() {
  const { t } = useI18n();
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [stickers, setStickers] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  function toggleSticker(id: string) {
    setStickers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname,
          message,
          email: email || undefined,
          stickers,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? t.form.genericErr);
        return;
      }

      setStatus("ok");
      setMessage("");
      setStickers([]);
      // 昵称和邮箱保留，方便连续发言
    } catch {
      setStatus("error");
      setErrorMsg(t.form.networkErr);
    }
  }

  return (
    <section
      id="speak"
      className="relative border-t border-white/5 bg-white/[0.015] py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 md:grid-cols-[1fr_1.2fr] md:px-10">
        <Reveal>
          <p className="font-mono-geek mb-3 text-[12px] tracking-[0.4em] text-accent">
            03 — {t.form.kicker}
          </p>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            {t.form.titlePre}
            <span className="text-accent">{t.form.titleAccent}</span>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-400">
            {t.form.description}
          </p>

          <ul className="mt-10 space-y-4 text-sm text-neutral-500">
            {t.form.bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 text-accent">—</span>
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="nickname" className={labelCls}>
                  {t.form.nickLabel} <span className="text-accent">*</span>
                </label>
                <input
                  id="nickname"
                  type="text"
                  required
                  maxLength={20}
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder={t.form.nickPlaceholder}
                  className={inputCls}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelCls}>
                  {t.form.emailLabel}{" "}
                  <span className="text-neutral-600">{t.form.emailHint}</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.form.emailPlaceholder}
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className={labelCls}>
                {t.form.messageLabel} <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                required
                maxLength={200}
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.form.messagePlaceholder}
                className={`${inputCls} resize-none`}
              />

              {/* 表情包：选择器 + 已选（点一下移除） */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StickerPicker selected={stickers} onToggle={toggleSticker} />
                {stickers.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleSticker(id)}
                    title={t.form.removeSticker}
                    className="group relative flex h-9 w-9 items-center justify-center border border-white/[0.14] bg-white/[0.03] transition hover:border-accent"
                  >
                    <span className="transition group-hover:opacity-0">
                      <Sticker id={id} size={20} />
                    </span>
                    <span className="absolute text-accent opacity-0 transition group-hover:opacity-100">
                      ✕
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group flex w-full items-center justify-center gap-3 border-2 border-accent bg-accent py-4 text-sm font-black tracking-[0.3em] text-white transition duration-200 rotate-[-0.4deg] hover:rotate-0 hover:-translate-y-[2px] hover:shadow-[6px_6px_0_rgba(255,255,255,0.9)] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:rotate-[-0.4deg] disabled:hover:shadow-none"
            >
              {status === "sending" ? t.form.submitting : t.form.submit}
              <span className="transition-transform group-hover:translate-x-1.5">
                →
              </span>
            </button>

            {status === "ok" && (
              <p className="text-center text-sm text-green-400">{t.form.okMsg}</p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-accent">{errorMsg}</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
