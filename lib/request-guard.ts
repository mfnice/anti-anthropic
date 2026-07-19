interface ClientState {
  windowStart: number;
  count: number;
  lastPostAt: number;
  recentMessages: Map<string, number>;
}

export interface ClientMeta {
  ip_hash: string;
  ip_country: string | null;
  user_agent: string | null;
}

const WINDOW_MS = 60_000;
const MAX_POSTS_PER_WINDOW = 5;
const MIN_POST_INTERVAL_MS = 5_000;
const DUPLICATE_WINDOW_MS = 10 * 60_000;
const states = new Map<string, ClientState>();

function firstHeaderValue(value: string | null): string {
  return value?.split(",")[0]?.trim() ?? "";
}

function extractIp(request: Request): string {
  const headers = request.headers;
  const ip =
    firstHeaderValue(headers.get("x-forwarded-for")) ||
    firstHeaderValue(headers.get("x-real-ip")) ||
    firstHeaderValue(headers.get("cf-connecting-ip")) ||
    firstHeaderValue(headers.get("true-client-ip"));

  return ip || "unknown";
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function cleanupMessages(state: ClientState, now: number) {
  for (const [key, ts] of state.recentMessages) {
    if (now - ts > DUPLICATE_WINDOW_MS) state.recentMessages.delete(key);
  }
}

export async function getClientMeta(request: Request): Promise<ClientMeta> {
  const ip = extractIp(request);
  const salt =
    process.env.IP_HASH_SALT ??
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    "voice-wall-dev-salt";
  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry");
  const userAgent = request.headers.get("user-agent");

  return {
    ip_hash: await sha256Hex(`${salt}:${ip}`),
    ip_country: country?.slice(0, 8) ?? null,
    user_agent: userAgent?.slice(0, 240) ?? null,
  };
}

export function checkAndRecordPost(
  ipHash: string,
  message: string
): string | null {
  const now = Date.now();
  let state = states.get(ipHash);

  if (!state || now - state.windowStart > WINDOW_MS) {
    state = {
      windowStart: now,
      count: 0,
      lastPostAt: 0,
      recentMessages: new Map(),
    };
    states.set(ipHash, state);
  }

  cleanupMessages(state, now);

  if (state.count >= MAX_POSTS_PER_WINDOW) {
    return "发言太频繁了，请稍后再试";
  }
  if (now - state.lastPostAt < MIN_POST_INTERVAL_MS) {
    return "请稍等几秒再发言";
  }

  const messageKey = message.toLowerCase();
  if (state.recentMessages.has(messageKey)) {
    return "请不要重复发送相同内容";
  }

  state.count += 1;
  state.lastPostAt = now;
  state.recentMessages.set(messageKey, now);
  return null;
}
