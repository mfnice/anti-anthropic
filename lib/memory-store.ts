import type {
  Comment,
  NewComment,
  NewPetitionSignature,
  PetitionSignature,
} from "./types";

/**
 * 内存降级存储：没有配置 Supabase 时使用。
 * 重启进程数据会丢失，只用于本地开发预览。
 */
const comments: Comment[] = [];

const petitionSignatures: PetitionSignature[] = [];

export function listComments(limit = 50, createdAfter?: string): Comment[] {
  const visibleComments = createdAfter
    ? comments.filter((comment) => comment.created_at >= createdAfter)
    : comments;
  return visibleComments.slice(-limit).reverse();
}

export function countComments(): number {
  return comments.length;
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

export function listPetitionSignatures(limit = 12): PetitionSignature[] {
  return petitionSignatures.slice(-limit).reverse();
}

export function countPetitionSignatures(): number {
  return petitionSignatures.length;
}

export function addPetitionSignature(
  input: NewPetitionSignature
): PetitionSignature {
  const signature: PetitionSignature = {
    id: crypto.randomUUID(),
    nickname: input.nickname,
    created_at: new Date().toISOString(),
  };
  petitionSignatures.push(signature);
  return signature;
}
