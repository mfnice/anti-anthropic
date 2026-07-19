export interface Comment {
  id: string;
  nickname: string;
  message: string;
  /** 携带的表情包 id 列表（对应 lib/stickers.ts） */
  stickers: string[];
  created_at: string;
}

export interface NewComment {
  nickname: string;
  message: string;
  stickers?: string[];
  /** 选填，仅存库，永不对外展示 */
  email?: string | null;
  /** 请求来源风控字段，仅存库，永不对外展示 */
  ip_hash?: string;
  ip_country?: string | null;
  user_agent?: string | null;
}
