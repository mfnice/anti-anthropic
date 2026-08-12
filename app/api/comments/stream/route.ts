import { getPublicCommentFeed } from "@/lib/public-comments";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const encoder = new TextEncoder();

export async function GET(request: Request) {
  let interval: ReturnType<typeof setInterval> | undefined;
  let lifetime: ReturnType<typeof setTimeout> | undefined;
  let closed = false;

  const stream = new ReadableStream({
    async start(controller) {
      function close() {
        if (closed) return;
        closed = true;
        if (interval) clearInterval(interval);
        if (lifetime) clearTimeout(lifetime);
        try {
          controller.close();
        } catch {
          // 客户端已断开。
        }
      }

      async function sendSnapshot() {
        if (closed) return;
        try {
          const payload = await getPublicCommentFeed();
          if (closed) return;
          controller.enqueue(
            encoder.encode(`event: comments\ndata: ${JSON.stringify(payload)}\n\n`)
          );
        } catch {
          if (!closed) controller.enqueue(encoder.encode(": keep-alive\n\n"));
        }
      }

      request.signal.addEventListener("abort", close, { once: true });
      await sendSnapshot();
      interval = setInterval(() => void sendSnapshot(), 7000);
      // 短连接可适配无状态部署；EventSource 会自动重连。
      lifetime = setTimeout(close, 28000);
    },
    cancel() {
      closed = true;
      if (interval) clearInterval(interval);
      if (lifetime) clearTimeout(lifetime);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
