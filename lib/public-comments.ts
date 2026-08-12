import { getSupabase } from "@/lib/supabase";
import { countComments, listComments } from "@/lib/memory-store";
import type { Comment } from "@/lib/types";

const SELECT = "id, nickname, message, stickers, created_at";
const COMMENT_VISIBILITY_MS = 7 * 24 * 60 * 60 * 1000;
const PUBLIC_COUNT_BASE = 386;
const PETITION_MARKER = "[petition-signature]";

const PLACEHOLDER_COPY = [
  {
    id: "wall-note-window",
    nickname: "留言墙提示",
    message: "这里展示最近 7 天内的公开留言。",
    minutesAgo: 18,
  },
  {
    id: "wall-note-archive",
    nickname: "留言墙提示",
    message: "留言满 7 天后会从墙上隐藏，累计发声数仍会保留。",
    minutesAgo: 96,
  },
  {
    id: "wall-note-facts",
    nickname: "发声提示",
    message: "欢迎分享亲身经历，也请尽量附上可核验的信息。",
    minutesAgo: 430,
  },
  {
    id: "wall-note-respect",
    nickname: "发声提示",
    message: "请围绕事实讨论，不公开他人的私人信息。",
    minutesAgo: 1180,
  },
] as const;

function visibleSince() {
  return new Date(Date.now() - COMMENT_VISIBILITY_MS).toISOString();
}

function placeholderComments(): Comment[] {
  const now = Date.now();
  return PLACEHOLDER_COPY.map((placeholder) => ({
    id: placeholder.id,
    nickname: placeholder.nickname,
    message: placeholder.message,
    stickers: [],
    created_at: new Date(now - placeholder.minutesAgo * 60 * 1000).toISOString(),
    is_placeholder: true,
  }));
}

export interface PublicCommentFeed {
  comments: Comment[];
  count: number;
}

export async function getPublicCommentFeed(): Promise<PublicCommentFeed> {
  const supabase = getSupabase();

  if (supabase) {
    const [recentResult, countResult] = await Promise.all([
      supabase
        .from("comments")
        .select(SELECT)
        .neq("message", PETITION_MARKER)
        .gte("created_at", visibleSince())
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("comments")
        .select("id", { count: "exact", head: true })
        .neq("message", PETITION_MARKER),
    ]);

    if (recentResult.error || countResult.error) {
      throw new Error(recentResult.error?.message ?? countResult.error?.message);
    }

    return {
      comments: [
        ...((recentResult.data ?? []) as Comment[]),
        ...placeholderComments(),
      ],
      count: PUBLIC_COUNT_BASE + (countResult.count ?? 0),
    };
  }

  return {
    comments: [
      ...listComments(50, visibleSince()),
      ...placeholderComments(),
    ],
    count: PUBLIC_COUNT_BASE + countComments(),
  };
}
