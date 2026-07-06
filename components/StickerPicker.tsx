"use client";

import { useEffect, useRef, useState } from "react";
import { STICKERS, MAX_STICKERS } from "@/lib/stickers";
import Sticker from "./Sticker";
import { useI18n } from "./LanguageProvider";

export default function StickerPicker({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 点击外部关闭
  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const atLimit = selected.length >= MAX_STICKERS;

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`font-mono-geek flex items-center gap-1.5 border px-3 py-2 text-[12px] font-bold tracking-wide transition ${
          open
            ? "border-accent text-accent"
            : "border-white/[0.18] text-neutral-300 hover:border-accent hover:text-accent"
        }`}
      >
        <span className="text-base leading-none">☺</span>
        {t.form.addSticker}
      </button>

      {open && (
        <div className="absolute bottom-full left-0 z-30 mb-2 w-80 max-w-[86vw] border border-white/[0.14] bg-[#0e0e10] p-3 shadow-[0_16px_50px_rgba(0,0,0,0.55),4px_4px_0_var(--accent)]">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono-geek text-[11px] font-bold tracking-[0.2em] text-neutral-400">
              {t.form.stickerPanelTitle}
            </span>
            <span className="font-mono-geek text-[11px] tabular-nums text-neutral-600">
              {selected.length}/{MAX_STICKERS}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {STICKERS.map((s) => {
              const isOn = selected.includes(s.id);
              const disabled = !isOn && atLimit;
              return (
                <button
                  key={s.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => onToggle(s.id)}
                  title={s.label}
                  className={`flex aspect-square items-center justify-center border transition ${
                    isOn
                      ? "border-accent bg-accent/15"
                      : "border-transparent hover:border-white/20 hover:bg-white/5"
                  } ${disabled ? "cursor-not-allowed opacity-30" : ""}`}
                >
                  <Sticker id={s.id} size={22} />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
