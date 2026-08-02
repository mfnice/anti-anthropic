import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { addComment, countComments, listComments } from "@/lib/memory-store";
import { checkAndRecordPost, getClientMeta } from "@/lib/request-guard";
import { sanitizeStickerIds } from "@/lib/stickers";
import type { Comment } from "@/lib/types";

const SELECT = "id, nickname, message, stickers, created_at";
const COMMENT_VISIBILITY_MS = 7 * 24 * 60 * 60 * 1000;
const PUBLIC_COUNT_BASE = 386;

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

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PETITION_MARKER = "[petition-signature]";

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

function publicFeed(comments: Comment[], realCount: number) {
  return {
    comments: [...comments, ...placeholderComments()],
    count: PUBLIC_COUNT_BASE + realCount,
  };
}

export async function GET() {
  const supabase = getSupabase();

  if (supabase) {
    // 公开墙只查最近 7 天；累计数保留全部历史留言。
    // 两个查询都不读 email 或风控字段。
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
      return NextResponse.json(
        { error: recentResult.error?.message ?? countResult.error?.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      publicFeed(
        (recentResult.data ?? []) as Comment[],
        countResult.count ?? 0
      )
    );
  }

  return NextResponse.json(
    publicFeed(listComments(50, visibleSince()), countComments())
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "无效的请求体" }, { status: 400 });
  }

  const { nickname, message, email, stickers } = (body ?? {}) as Record<
    string,
    unknown
  >;

  const nick = typeof nickname === "string" ? nickname.trim() : "";
  const msg = typeof message === "string" ? message.trim() : "";
  const mail = typeof email === "string" ? email.trim() : "";
  // 服务端按白名单过滤/去重/截断，前端传什么都无所谓
  const stk = sanitizeStickerIds(stickers);

  if (!nick || nick.length > 20) {
    return NextResponse.json(
      { error: "昵称必填，且不超过 20 个字符" },
      { status: 400 }
    );
  }
  if (!msg || msg.length > 200) {
    return NextResponse.json(
      { error: "内容必填，且不超过 200 个字符" },
      { status: 400 }
    );
  }
  if (msg === PETITION_MARKER) {
    return NextResponse.json({ error: "无效的留言内容" }, { status: 400 });
  }
  if (mail && !EMAIL_RE.test(mail)) {
    return NextResponse.json({ error: "邮箱格式不正确" }, { status: 400 });
  }

  const clientMeta = await getClientMeta(request);
  const rateLimitError = checkAndRecordPost(clientMeta.ip_hash, msg);
  if (rateLimitError) {
    return NextResponse.json({ error: rateLimitError }, { status: 429 });
  }

  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("comments")
      .insert({
        nickname: nick,
        message: msg,
        email: mail || null,
        stickers: stk,
        ...clientMeta,
      })
      .select(SELECT)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ comment: data as Comment }, { status: 201 });
  }

  const comment = addComment({
    nickname: nick,
    message: msg,
    stickers: stk,
    ...clientMeta,
  });
  return NextResponse.json({ comment }, { status: 201 });
}
