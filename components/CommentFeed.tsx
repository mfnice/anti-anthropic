"use client";

import { useEffect, useRef, useState } from "react";
import type { Comment } from "@/lib/types";
import type { Dict } from "@/lib/i18n";
import { useI18n } from "./LanguageProvider";
import Sticker from "./Sticker";

/** 昵称哈希出一个稳定的头像色相 */
function hueOf(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
}


function timeAgo(iso: string, feed: Dict["feed"]) {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return feed.now;
  if (min < 60) return feed.minutesAgo(min);
  const hr = Math.floor(min / 60);
  if (hr < 24) return feed.hoursAgo(hr);
  return feed.daysAgo(Math.floor(hr / 24));
}

/** 右上角直播评论框：优先使用 SSE，连接失败时退回普通轮询。 */
export default function CommentFeed() {
  const { locale, t } = useI18n();
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [transport, setTransport] = useState<"connecting" | "sse" | "poll">(
    "connecting"
  );
  const knownIds = useRef(new Set<string>());
  const [newIds, setNewIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
    let controller: AbortController | undefined;
    let source: EventSource | undefined;
    const desktopQuery = window.matchMedia("(min-width: 640px)");

    function applyPayload(data: { comments: Comment[]; count?: number }) {
      if (cancelled) return;
      const fresh = new Set<string>();
      for (const c of data.comments) {
        if (!knownIds.current.has(c.id)) {
          knownIds.current.add(c.id);
          fresh.add(c.id);
        }
      }
      setComments(data.comments);
      setTotal(data.count ?? data.comments.length);
      setNewIds(fresh);
    }

    async function poll() {
      controller?.abort();
      controller = new AbortController();
      try {
        const res = await fetch("/api/comments", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!res.ok || cancelled) return;
        applyPayload(
          (await res.json()) as { comments: Comment[]; count?: number }
        );
      } catch {
        // 网络抖动忽略，下一轮再试
      }
    }

    function startPolling() {
      source?.close();
      source = undefined;
      if (timer) return;
      setTransport("poll");
      void poll();
      timer = setInterval(poll, 8000);
    }

    function startConnection() {
      if (document.hidden || !desktopQuery.matches || source || timer) return;

      if (!("EventSource" in window)) {
        startPolling();
        return;
      }

      setTransport("connecting");
      source = new EventSource("/api/comments/stream");
      source.addEventListener("comments", (event) => {
        try {
          applyPayload(
            JSON.parse(event.data) as { comments: Comment[]; count?: number }
          );
        } catch {
          // 忽略单次格式异常，EventSource 会继续接收下一条快照。
        }
      });
      source.onopen = () => {
        if (fallbackTimer) clearTimeout(fallbackTimer);
        fallbackTimer = undefined;
        setTransport("sse");
      };
      source.onerror = () => {
        if (!cancelled) setTransport("connecting");
      };

      // 首次连接失败时自动退回普通轮询。
      fallbackTimer = setTimeout(() => {
        if (source?.readyState !== EventSource.OPEN) startPolling();
      }, 6500);
    }

    function stopConnection() {
      if (timer) clearInterval(timer);
      timer = undefined;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      fallbackTimer = undefined;
      controller?.abort();
      source?.close();
      source = undefined;
    }

    function handleVisibilityChange() {
      if (document.hidden || !desktopQuery.matches) stopConnection();
      else startConnection();
    }

    startConnection();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    desktopQuery.addEventListener("change", handleVisibilityChange);
    return () => {
      cancelled = true;
      stopConnection();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      desktopQuery.removeEventListener("change", handleVisibilityChange);
    };
  }, []);

  return (
    <aside className="live-wall fixed right-4 top-4 z-50 hidden w-72 max-w-[78vw] sm:block md:w-80">
      <div className="live-wall__panel relative overflow-hidden border border-accent/55 bg-[#09090a]/94 backdrop-blur-xl">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
        />
        <div className="flex items-center gap-2.5 border-b border-white/[0.12] bg-white/[0.035] px-4 py-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono-geek text-[10px] font-bold tracking-[0.3em] text-accent">
            LIVE
          </span>
          <span className="text-sm font-semibold text-neutral-200">
            {t.feed.title}
          </span>
          <span className="font-mono-geek ml-auto border border-accent/40 bg-accent/10 px-2 py-1 text-[9px] font-bold tabular-nums text-accent">
            {transport === "sse"
              ? `SSE · ${t.feed.live}`
              : transport === "poll"
                ? `SYNC · ${t.feed.live}`
                : "LINKING…"}
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-end border-b border-white/[0.1] px-4 py-4">
          <div>
            <p className="font-mono-geek text-[9px] font-bold tracking-[0.25em] text-neutral-500">
              {t.feed.countLabel}
            </p>
            <p className="font-display mt-1 text-5xl leading-none tabular-nums text-white">
              {total.toLocaleString(locale === "zh" ? "zh-CN" : locale)}
            </p>
          </div>
          <p className="pb-1 text-right text-[10px] leading-4 text-neutral-500">
            {t.feed.latestLabel(
              comments.filter((comment) => !comment.is_placeholder).length
            )}
          </p>
        </div>

        <ul className="feed-scroll relative max-h-80 space-y-2 overflow-y-auto p-3">
          {comments.length === 0 && (
            <li className="py-8 text-center text-sm text-neutral-500">
              {t.feed.empty}
            </li>
          )}
          {comments.map((c) => (
            <li
              key={c.id}
              className={`flex gap-3 border px-3 py-2.5 transition ${
                c.is_placeholder
                  ? "border-dashed border-white/[0.1] bg-white/[0.018]"
                  : "border-white/[0.08] bg-white/[0.035] hover:border-accent/35 hover:bg-accent/[0.04]"
              } ${
                newIds.has(c.id) && !c.is_placeholder ? "comment-enter" : ""
              }`}
            >
              <span
                aria-hidden
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-white/20 text-xs font-bold text-white shadow-[2px_2px_0_rgba(255,255,255,0.15)]"
                style={{
                  background: `hsl(${hueOf(c.nickname)} 60% 45%)`,
                }}
              >
                {c.nickname.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <p className="flex items-baseline gap-2">
                  <span className="truncate text-xs font-bold text-neutral-200">
                    {c.is_placeholder ? t.feed.placeholderAuthor : c.nickname}
                  </span>
                  {c.is_placeholder && (
                    <span className="shrink-0 border border-white/[0.12] px-1.5 py-0.5 font-mono-geek text-[8px] tracking-[0.12em] text-neutral-500">
                      {t.feed.placeholderLabel}
                    </span>
                  )}
                  <span className="shrink-0 font-mono-geek text-[9px] text-neutral-600">
                    {timeAgo(c.created_at, t.feed)}
                  </span>
                </p>
                <p className="mt-0.5 break-words text-sm leading-relaxed text-neutral-100">
                  {c.is_placeholder
                    ? (t.feed.placeholderMessages[c.id] ?? c.message)
                    : c.message}
                </p>
                {c.stickers?.length > 0 && (
                  <div className="mt-1 flex flex-wrap items-center gap-1">
                    {c.stickers.map((id, idx) => (
                      <Sticker key={`${id}-${idx}`} id={id} size={22} />
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="h-1 bg-[linear-gradient(90deg,#ff3341_0_62%,rgba(255,255,255,.12)_62%)]" />
      </div>
    </aside>
  );
}
