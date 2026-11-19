"use client";

import { useEffect, useRef, useState } from "react";
import { STICKERS, MAX_STICKERS } from "@/lib/stickers";
import Sticker from "./Sticker";
import { useI18n } from "./LanguageProvider";
import styles from "./CommunityArchive.module.css";

export default function StickerPicker({
  selected, onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onOutside(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    }
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className={styles.picker}>
      <button type="button" ref={trigger} onClick={() => setOpen(!open)} aria-expanded={open}>
        <span aria-hidden="true">☺</span> {t.form.addSticker}
      </button>
      {open && (
        <div className={styles.tray} role="group" aria-label={t.form.stickerPanelTitle}>
          <p>{t.form.stickerPanelTitle} <span>{selected.length}/{MAX_STICKERS}</span></p>
          <div>
            {STICKERS.map((sticker) => {
              const chosen = selected.includes(sticker.id);
              return (
                <button key={sticker.id} type="button" title={sticker.label}
                  aria-pressed={chosen} aria-label={sticker.label}
                  disabled={!chosen && selected.length >= MAX_STICKERS}
                  onClick={() => onToggle(sticker.id)}>
                  <Sticker id={sticker.id} size={22} />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
