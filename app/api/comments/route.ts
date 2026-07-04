import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { addComment, listComments } from "@/lib/memory-store";
import { checkAndRecordPost, getClientMeta } from "@/lib/request-guard";
import { sanitizeStickerIds } from "@/lib/stickers";
import type { Comment } from "@/lib/types";

const SELECT = "id, nickname, message, stickers, created_at";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  const supabase = getSupabase();

  if (supabase) {
    // 只查公开字段，email 永远不出库
    const { data, error } = await supabase
      .from("comments")
      .select(SELECT)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ comments: data as Comment[] });
  }

  return NextResponse.json({ comments: listComments() });
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
