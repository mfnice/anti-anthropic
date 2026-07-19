import { STICKER_MAP } from "@/lib/stickers";

/** 渲染单个表情包：emoji 型用字符，图片型用 <img>。未知 id 返回 null。 */
export default function Sticker({
  id,
  size = 24,
}: {
  id: string;
  size?: number;
}) {
  const s = STICKER_MAP[id];
  if (!s) return null;

  if ("emoji" in s && s.emoji) {
    return (
      <span
        className="inline-block select-none align-middle leading-none"
        style={{ fontSize: size }}
        title={s.label}
      >
        {s.emoji}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={s.src}
      alt={s.label}
      title={s.label}
      width={size}
      height={size}
      className="inline-block align-middle object-contain"
      style={{ width: size, height: size }}
    />
  );
}
