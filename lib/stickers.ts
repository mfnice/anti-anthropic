/**
 * 表情包库（站长自管，无需用户上传）。
 *
 * 两种表情包：
 *  - emoji 型：直接用 Unicode 字符，零素材、跨平台好看。
 *  - 图片型：src 指向 public/stickers/ 下的图片（svg/png/webp 均可）。
 *
 * 要添加你自己设计的表情包：
 *  1. 把图片放到 public/stickers/xxx.svg
 *  2. 在下面 STICKERS 数组加一条 { id, label, src: "/stickers/xxx.svg" }
 *  （id 必须唯一、简短；提交到评论区时只存 id，服务端会按白名单校验）
 */
export type Sticker = { id: string; label: string } & (
  | { emoji: string; src?: never }
  | { src: string; emoji?: never }
);

export const STICKERS: Sticker[] = [
  // —— emoji 型（开箱即用）——
  { id: "fist", label: "举拳", emoji: "✊" },
  { id: "fire", label: "火", emoji: "🔥" },
  { id: "mega", label: "喇叭", emoji: "📣" },
  { id: "eyes", label: "盯着", emoji: "👀" },
  { id: "100", label: "满分", emoji: "💯" },
  { id: "clap", label: "鼓掌", emoji: "👏" },
  { id: "angry", label: "愤怒", emoji: "😡" },
  { id: "cry", label: "流泪", emoji: "😭" },
  { id: "skull", label: "无语", emoji: "💀" },
  { id: "clown", label: "小丑", emoji: "🤡" },
  { id: "check", label: "属实", emoji: "✅" },
  { id: "heart", label: "声援", emoji: "❤️" },
  // —— 图片型（站长自制示例，展示如何扩展）——
  { id: "cunzheng", label: "存证", src: "/stickers/cunzheng.svg" },
  { id: "no", label: "拒绝", src: "/stickers/no.svg" },
  { id: "shichui", label: "实锤", src: "/stickers/shichui.svg" },
];

/** 一次评论最多携带的表情包数量 */
export const MAX_STICKERS = 8;

export const STICKER_MAP: Record<string, Sticker> = Object.fromEntries(
  STICKERS.map((s) => [s.id, s])
);

/** 服务端校验用：合法的表情包 id 集合 */
export const STICKER_IDS = new Set(STICKERS.map((s) => s.id));

/** 过滤出合法且去重的 id 列表，并截断到上限 */
export function sanitizeStickerIds(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  for (const raw of input) {
    if (typeof raw === "string" && STICKER_IDS.has(raw)) seen.add(raw);
    if (seen.size >= MAX_STICKERS) break;
  }
  return [...seen];
}
