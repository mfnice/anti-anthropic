"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "./LanguageProvider";
import styles from "./SoundToggle.module.css";

const preferenceKey = "voice-wall-sound";
const labels = { zh: "音效", en: "Sound", es: "Sonido" };

export default function SoundToggle({ className = "" }: { className?: string }) {
  const { locale } = useI18n();
  const [enabled, setEnabled] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const sounds = useRef<Partial<Record<"ident" | "tap", HTMLAudioElement>>>({});

  function play(cue: "ident" | "tap") {
    const audio = sounds.current[cue] ??= new Audio(`/audio/miami-${cue}.mp3`);
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  }

  useEffect(() => {
    try {
      setEnabled(localStorage.getItem(preferenceKey) === "on");
    } catch {
      // The control also works for the current page when storage is unavailable.
    }
    const clips = sounds.current;
    return () => Object.values(clips).forEach((audio) => audio.pause());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element) || button.current?.contains(event.target)) return;
      const action = event.target.closest("a[href], button, summary, [role='button']");
      if (action && !action.matches(":disabled, [aria-disabled='true']")) play("tap");
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [enabled]);

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    if (next) play("ident");
    else Object.values(sounds.current).forEach((audio) => audio.pause());
    try {
      localStorage.setItem(preferenceKey, next ? "on" : "off");
    } catch {
      // An unavailable storage area should not interrupt playback.
    }
  }

  return (
    <button
      className={`${styles.control} ${className}`}
      type="button"
      ref={button}
      aria-label={labels[locale]}
      aria-pressed={enabled}
      title={labels[locale]}
      onClick={toggle}
    >
      <span className={styles.bars} aria-hidden="true"><i /><i /><i /><i /></span>
      <span className={styles.label}>{labels[locale]}</span>
    </button>
  );
}
