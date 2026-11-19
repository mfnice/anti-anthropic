"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./CommunityArchive.module.css";
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

function nextMilestone(count: number) {
  if (count < 50) return 50;
  if (count < 100) return 100;
  if (count < 250) return 250;
  if (count < 500) return 500;
  if (count < 1000) return 1000;
  return Math.ceil((count + 1) / 1000) * 1000;
}

export default function Petition() {
  const { locale, t } = useI18n();
  const [data, setData] = useState<PetitionPayload | null>(null);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "signed" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const goal = nextMilestone(data?.count ?? 0);

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
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setShareUrl(url);
    }
  }

  return (
    <section id="petition" className={styles.petition} aria-labelledby="petition-title">
      <div className={styles.twoColumns}>
        <div>
          <h2 id="petition-title" className={styles.heading}>{t.petition.title}</h2>
          <p className={styles.intro}>{t.petition.description}</p>
          <div className={styles.count}>
            <strong>{data?.count.toLocaleString(locale) ?? "—"}</strong> <span>{t.petition.countLabel}</span>
          </div>
          {data && (
            <>
              <progress className={styles.progress} value={data.count} max={goal} aria-label={t.petition.nextGoal(goal)} />
              <p className={styles.meta}>{t.petition.nextGoal(goal)}</p>
            </>
          )}
          <details className={styles.statement}>
            <summary>{t.petition.statementLabel}</summary>
            <p>{t.petition.statement}</p>
            <h3>{t.petition.demandsTitle}</h3>
            <ol className={styles.demands}>
              {t.petition.demands.map((demand) => <li key={demand}>{demand}</li>)}
            </ol>
          </details>
          {data && <details className={styles.statement}>
            <summary>{t.petition.recentTitle}</summary>
            {data.recent.length ? (
              <ul className={styles.signers}>
                {data.recent.map((signer) => <li key={signer.id}>{signer.nickname}</li>)}
              </ul>
            ) : <p>{t.petition.emptyRecent}</p>}
          </details>}
        </div>
        <div className={styles.sheet}>
          {status === "signed" ? (
            <div className={styles.success} role="status">
              <span aria-hidden="true">✓</span>
              <h3>{t.petition.signedTitle}</h3>
              <p>{t.petition.signedBody}</p>
              <button type="button" onClick={sharePetition} className={styles.submit}>
                {copied ? t.petition.copied : t.petition.share} <b aria-hidden="true">↗</b>
              </button>
              {shareUrl && <input aria-label={t.petition.share} readOnly value={shareUrl} onFocus={(event) => event.target.select()} />}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <label htmlFor="petition-nickname">{t.petition.nickLabel}
                <input id="petition-nickname" type="text" required maxLength={20}
                  autoComplete="nickname" value={nickname} onChange={(event) => setNickname(event.target.value)}
                  placeholder={t.petition.nickPlaceholder} />
              </label>
              <label htmlFor="petition-email">{t.petition.emailLabel} <small>{t.petition.emailHint}</small>
                <input id="petition-email" type="email" autoComplete="email" value={email}
                  onChange={(event) => { setEmail(event.target.value); if (!event.target.value) setConsent(false); }}
                  placeholder={t.petition.emailPlaceholder} />
              </label>
              {email && <label className={styles.checkbox}>
                <input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} />
                {t.petition.consent}
              </label>}
              <p className={styles.hint}>{t.petition.privacy}</p>
              <button type="submit" disabled={status === "sending"} className={styles.submit}>
                {status === "sending" ? t.petition.submitting : t.petition.submit} <b aria-hidden="true">→</b>
              </button>
              {status === "error" && <p role="alert" className={styles.error}>{errorMsg}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
