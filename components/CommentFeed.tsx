"use client";

import { useEffect, useState } from "react";
import type { Comment } from "@/lib/types";
import type { Dict } from "@/lib/i18n";
import { useI18n } from "./LanguageProvider";
import Sticker from "./Sticker";
import styles from "./CommunityArchive.module.css";

function timeAgo(iso: string, feed: Dict["feed"]) {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return feed.now;
  if (min < 60) return feed.minutesAgo(min);
  const hr = Math.floor(min / 60);
  if (hr < 24) return feed.hoursAgo(hr);
  return feed.daysAgo(Math.floor(hr / 24));
}


export default function CommentFeed() {
  const { t } = useI18n();
  const [comments, setComments] = useState<Comment[]>([]);
  const [transport, setTransport] = useState<"connecting" | "sse" | "poll">(
    "connecting"
  );
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
    let controller: AbortController | undefined;
    let source: EventSource | undefined;

    function applyPayload(data: { comments: Comment[]; count?: number }) {
      if (cancelled) return;
      setComments(data.comments);
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
      if (document.hidden || source || timer) return;

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
      if (document.hidden) stopConnection();
      else startConnection();
    }

    startConnection();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("voice-wall:message-posted", poll);
    return () => {
      cancelled = true;
      stopConnection();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("voice-wall:message-posted", poll);
    };
  }, []);

  const messages = comments.filter((comment) => !comment.is_placeholder);
  const notices = comments.filter((comment) => comment.is_placeholder);

  return (
    <aside className={styles.feed} aria-labelledby="feed-title">
      <div className={styles.feedHeader}>
        <h3 id="feed-title">{t.feed.title}</h3>
        {transport !== "connecting" && <small className={styles.live}>{t.feed.live}</small>}
      </div>
      <p className={styles.meta}>{t.feed.latestLabel(messages.length)}</p>
      {messages.length > 0 ? (
        <ul className={styles.messages} tabIndex={0} aria-labelledby="feed-title">
          {messages.map((message) => (
            <li key={message.id}>
              <div className={styles.messageHead}>
                <strong>{message.nickname}</strong>
                <time dateTime={message.created_at}>{timeAgo(message.created_at, t.feed)}</time>
              </div>
              <p>{message.message}</p>
              {message.stickers?.length > 0 && (
                <div className={styles.stickers}>
                  {message.stickers.map((id) => <Sticker key={id} id={id} size={22} />)}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : <p className={styles.empty}>{t.feed.empty}</p>}
      <details className={styles.statement}>
        <summary>{t.feed.placeholderAuthor}</summary>
        <ul className={styles.bullets}>
          {t.form.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
          {notices.map((note) => <li key={note.id}>{t.feed.placeholderMessages[note.id] ?? note.message}</li>)}
        </ul>
      </details>
    </aside>
  );
}
