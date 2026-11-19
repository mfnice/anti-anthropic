"use client";

import { useState } from "react";
import CommentFeed from "./CommentFeed";
import styles from "./CommunityArchive.module.css";
import { STICKER_MAP } from "@/lib/stickers";
import { useI18n } from "./LanguageProvider";
import StickerPicker from "./StickerPicker";
import Sticker from "./Sticker";

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

      document.dispatchEvent(new Event("voice-wall:message-posted"));
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
    <section id="speak" className={styles.speak} aria-labelledby="speak-title">
      <div className={styles.inner}>
        <h2 id="speak-title" className={styles.heading}>{t.form.titlePre}{t.form.titleAccent}</h2>
        <p className={styles.intro}>{t.form.description}</p>
        <div className={styles.wallGrid}>
          <div className={styles.sheet}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <label htmlFor="nickname">{t.form.nickLabel}
                  <input id="nickname" type="text" required maxLength={20} autoComplete="nickname"
                    value={nickname} onChange={(event) => setNickname(event.target.value)} placeholder={t.form.nickPlaceholder} />
                </label>
                <label htmlFor="email">{t.form.emailLabel} <small>{t.form.emailHint}</small>
                  <input id="email" type="email" autoComplete="email" value={email}
                    onChange={(event) => setEmail(event.target.value)} placeholder={t.form.emailPlaceholder} />
                </label>
              </div>
              <label htmlFor="message">{t.form.messageLabel}
                <textarea id="message" required maxLength={200} rows={4} value={message}
                  onChange={(event) => setMessage(event.target.value)} placeholder={t.form.messagePlaceholder} />
              </label>
              <div className={styles.stickers}>
                <StickerPicker selected={stickers} onToggle={toggleSticker} />
                {stickers.map((id) => (
                  <button type="button" key={id} onClick={() => toggleSticker(id)}
                    className={styles.chosen} aria-label={t.form.removeSticker + " " + STICKER_MAP[id].label}>
                    <Sticker id={id} size={20} />
                  </button>
                ))}
              </div>
              <button type="submit" disabled={status === "sending"} className={styles.submit}>
                {status === "sending" ? t.form.submitting : t.form.submit} <b aria-hidden="true">→</b>
              </button>
              {status === "ok" && <p role="status">{t.form.okMsg}</p>}
              {status === "error" && <p role="alert" className={styles.error}>{errorMsg}</p>}
            </form>
          </div>
          <CommentFeed />
        </div>
      </div>
    </section>
  );
}
