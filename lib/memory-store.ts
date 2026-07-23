import type { Comment, NewComment } from "./types";

/**
 * 内存降级存储：没有配置 Supabase 时使用。
 * 重启进程数据会丢失，只用于本地开发预览。
 */
const comments: Comment[] = [
  {
    id: "seed-1",
    nickname: "路人甲",
    message: "支持！把事实说清楚。",
    stickers: ["fist", "fire"],
    created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
  },
  {
    id: "seed-2",
    nickname: "围观群众",
    message: "已转发，让更多人看到。",
    stickers: ["mega"],
    created_at: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
  },
];

const petitionSignatures: Comment[] = [];

export function listComments(limit = 50): Comment[] {
  return comments.slice(-limit).reverse();
}

export function addComment(input: NewComment): Comment {
  const comment: Comment = {
    id: crypto.randomUUID(),
    nickname: input.nickname,
    message: input.message,
    stickers: input.stickers ?? [],
    created_at: new Date().toISOString(),
  };
  comments.push(comment);
  return comment;
}

export function listPetitionSignatures(limit = 12): Comment[] {
  return petitionSignatures.slice(-limit).reverse();
}

export function countPetitionSignatures(): number {
  return petitionSignatures.length;
}

export function addPetitionSignature(input: NewComment): Comment {
  const signature: Comment = {
    id: crypto.randomUUID(),
    nickname: input.nickname,
    message: input.message,
    stickers: [],
    created_at: new Date().toISOString(),
  };
  petitionSignatures.push(signature);
  return signature;
}
