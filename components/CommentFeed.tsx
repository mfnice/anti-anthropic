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

/**
 * 右上角"直播式"评论框：每 4 秒轮询一次最新评论。
 * 之后接入 Supabase Realtime 可以改为推送，见 README。
 */
export default function CommentFeed() {
  const { t } = useI18n();
  const [comments, setComments] = useState<Comment[]>([]);
  const knownIds = useRef(new Set<string>());
  const [newIds, setNewIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch("/api/comments", { cache: "no-store" });
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as { comments: Comment[] };

        const fresh = new Set<string>();
        for (const c of data.comments) {
          if (!knownIds.current.has(c.id)) {
            knownIds.current.add(c.id);
            fresh.add(c.id);
          }
        }
        if (!cancelled) {
          setComments(data.comments);
          setNewIds(fresh);
        }
      } catch {
        // 网络抖动忽略，下一轮再试
      }
    }

    poll();
    const timer = setInterval(poll, 4000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  return (
    <aside className="fixed right-4 top-4 z-50 w-56 max-w-[70vw] md:w-64">
      <div className="overflow-hidden border border-white/[0.12] bg-black/[0.08] shadow-[3px_3px_0_rgba(255,51,65,0.65)]">
        <div className="flex items-center gap-2.5 border-b border-white/[0.1] bg-black/[0.16] px-4 py-3">
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
          <span className="font-mono-geek ml-auto text-xs tabular-nums text-neutral-500">
            {comments.length}
          </span>
        </div>

        <ul className="feed-scroll relative max-h-72 space-y-1.5 overflow-y-auto p-2.5">
          {comments.length === 0 && (
            <li className="py-8 text-center text-sm text-neutral-500">
              {t.feed.empty}
            </li>
          )}
          {comments.map((c) => (
            <li
              key={c.id}
              className={`flex gap-2.5 rounded-lg bg-black/[0.16] px-2.5 py-2 transition hover:bg-black/[0.28] ${
                newIds.has(c.id) ? "comment-enter" : ""
              }`}
            >
              <span
                aria-hidden
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center text-xs font-bold text-white"
                style={{
                  background: `hsl(${hueOf(c.nickname)} 60% 45%)`,
                }}
              >
                {c.nickname.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <p className="flex items-baseline gap-2">
                  <span className="truncate text-xs font-semibold text-neutral-300">
                    {c.nickname}
                  </span>
                  <span className="shrink-0 text-[10px] text-neutral-600">
                    {timeAgo(c.created_at, t.feed)}
                  </span>
                </p>
                <p className="break-words text-sm leading-snug text-neutral-100">
                  {c.message}
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

        {/* 底部渐隐 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </aside>
  );
}
