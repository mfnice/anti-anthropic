import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import {
  addPetitionSignature,
  countPetitionSignatures,
  listPetitionSignatures,
} from "@/lib/memory-store";
import { checkAndRecordPost, getClientMeta } from "@/lib/request-guard";
import type { Comment } from "@/lib/types";

const PETITION_MARKER = "[petition-signature]";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECENT_SELECT = "id, nickname, created_at";

export const dynamic = "force-dynamic";

function publicRecent(rows: Array<Pick<Comment, "id" | "nickname" | "created_at">>) {
  return rows.map(({ id, nickname, created_at }) => ({ id, nickname, created_at }));
}

async function getPetitionData() {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error, count } = await supabase
      .from("comments")
      .select(RECENT_SELECT, { count: "exact" })
      .eq("message", PETITION_MARKER)
      .order("created_at", { ascending: false })
      .limit(12);

    if (error) throw error;
    return {
      count: count ?? data?.length ?? 0,
      recent: publicRecent((data ?? []) as Comment[]),
    };
  }

  return {
    count: countPetitionSignatures(),
    recent: publicRecent(listPetitionSignatures()),
  };
}

export async function GET() {
  try {
    return NextResponse.json(await getPetitionData());
  } catch (error) {
    const message = error instanceof Error ? error.message : "无法读取联署";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "无效的请求体" }, { status: 400 });
  }

  const { nickname, email, contact_opt_in: contactOptIn } = (body ?? {}) as Record<
    string,
    unknown
  >;
  const nick = typeof nickname === "string" ? nickname.trim() : "";
  const mail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!nick || nick.length > 20) {
    return NextResponse.json(
      { error: "名字或昵称必填，且不超过 20 个字符" },
      { status: 400 }
    );
  }
  if (mail && !EMAIL_RE.test(mail)) {
    return NextResponse.json({ error: "邮箱格式不正确" }, { status: 400 });
  }
  if (mail && contactOptIn !== true) {
    return NextResponse.json(
      { error: "留下邮箱前，请确认同意接收本次行动的后续联系" },
      { status: 400 }
    );
  }

  const clientMeta = await getClientMeta(request);
  const rateLimitError = checkAndRecordPost(
    clientMeta.ip_hash,
    `${PETITION_MARKER}:${mail || nick.toLowerCase()}`
  );
  if (rateLimitError) {
    return NextResponse.json({ error: rateLimitError }, { status: 429 });
  }

  const supabase = getSupabase();
  if (supabase) {
    const duplicateQuery = supabase
      .from("comments")
      .select("id")
      .eq("message", PETITION_MARKER)
      .limit(1);
    const { data: duplicate, error: duplicateError } = mail
      ? await duplicateQuery.eq("email", mail)
      : await duplicateQuery.eq("ip_hash", clientMeta.ip_hash);

    if (duplicateError) {
      return NextResponse.json({ error: duplicateError.message }, { status: 500 });
    }
    if (duplicate?.length) {
      return NextResponse.json({ error: "你已经加入过这份联署" }, { status: 409 });
    }

    const { error } = await supabase.from("comments").insert({
      nickname: nick,
      message: PETITION_MARKER,
      email: mail || null,
      stickers: [],
      ...clientMeta,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    addPetitionSignature({
      nickname: nick,
      message: PETITION_MARKER,
      email: mail || null,
      ...clientMeta,
    });
  }

  return NextResponse.json(await getPetitionData(), { status: 201 });
}
