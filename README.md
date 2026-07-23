# 发声墙 Voice Wall

一个单页发声/控诉页面：背景图/视频 + 大标语 + 事实列表 + 联署请愿 + 留言表单（带表情包）+ 右上角直播式评论框。三语（中/EN/ES），左下角可切换。

## 本地跑起来

```bash
npm install
npm run dev
```

不配置任何东西就能跑：留言存在内存里（重启丢失），适合先看效果。

## 接入 Supabase（正式使用）

1. 在 [supabase.com](https://supabase.com) 建一个免费项目
2. 在 Dashboard → SQL Editor 里执行 `supabase/schema.sql`
3. 复制 `.env.example` 为 `.env.local`，填入 Dashboard → Settings → API 里的 URL 和 `service_role` key
4. 重启 `npm run dev`，留言自动落库

## 需要你替换的占位内容

| 位置 | 改什么 |
|---|---|
| `lib/i18n.ts` | 大标语、副标语、事实列表——三种语言各一份 |
| `public/hero-bg.jpg` | 首屏背景图（放进去自动生效，现在是深红渐变占位） |
| `NEXT_PUBLIC_HERO_VIDEO_URL` | 想用视频背景就填这个环境变量，留空用背景图 |

## 表情包库（站长自管，无用户上传）

- 目录：`lib/stickers.ts`，emoji 型直接写字符，图片型放 `public/stickers/` 再加一行 `{ id, label, src }`
- 用户在留言框点「表情包」选择，随评论一起显示在右上角评论墙
- 服务端按白名单校验 id、去重、上限 8 个，改造/删减库不影响老数据

## 隐私设计

- 邮箱**选填**，数据库允许 NULL
- 联署签名与留言复用同一张表，以内部标记区分；公开接口只返回联署人数、昵称和时间
- 联署邮箱只有在用户明确勾选后才会保存，仅用于本次行动的后续联系
- API 查询评论时只返回 `id / nickname / message / stickers / created_at`，**email 永远不出库**
- comments 表开启了 RLS 且不给 anon 任何策略，前端无法直连数据库读到邮箱

## 以后可以升级的

- 评论实时推送：现在是 4 秒轮询，接入 Supabase Realtime 可改为即时推送
- 防刷：给 POST 加频率限制（如 Upstash Ratelimit）或 Cloudflare Turnstile 人机验证
- 敏感词过滤 / 举报按钮
# anti-anthropic
