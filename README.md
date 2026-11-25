# 发声墙 Voice Wall

迈阿密特刊收录 AI 发展报道、Anthropic 争议档案、联署与公众留言。中文、英语和西班牙语版共用一套版式。页眉可切换语言和音效。

文章栏目位于 `/articles`、`/en/articles` 和 `/es/articles`，每篇文章有独立地址。`lib/ai-articles.ts` 存放三语正文、事件日期和一手来源。`lib/journal.ts` 将本期文章与 `lib/ai-news.ts` 内的历史报道按日期合并，供列表、RSS 和站点地图使用。

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

## 视觉与音频素材

- 首页背景与交互短音取自随项目提供的 `Oliver_Miami_Opening.mp4`。`NEXT_PUBLIC_HERO_VIDEO_URL` 可覆盖首屏背景。
- [Kevin Ache 的服务器机架摄影](https://unsplash.com/photos/a-rack-of-servers-in-a-server-room-2JJ3wBHu4_0) 用于文章栏目配图。
- 字体及许可位于 `app/fonts/`。

## 表情包库（站长自管，无用户上传）

- 目录：`lib/stickers.ts`，emoji 型直接写字符，图片型放 `public/stickers/` 再加一行 `{ id, label, src }`
- 用户在留言框点「表情包」选择，随评论一起显示在表单旁的留言墙
- 服务端按白名单校验 id、去重、上限 8 个，改造/删减库不影响老数据

## 隐私设计

- 邮箱**选填**，数据库允许 NULL
- 联署使用独立的 `petition_signatures` 表，与公开留言内容分开存储
- 公开接口只返回联署人数、昵称和时间，不返回邮箱或风控字段
- 联署邮箱只有在用户明确勾选后才会保存，仅用于本次行动的后续联系
- API 从数据库查询评论时只读取 `id / nickname / message / stickers / created_at`，**email 永远不出库**
- 公开留言墙只展示最近 7 天的用户留言；到期后仅从墙上隐藏，不删除数据
- 留言墙中标记为“提示”的占位内容由接口补充，不写入数据库，也不计入真实留言数

已有远程 Supabase 项目升级时，在 SQL Editor 执行
`supabase/migrations/202607240001_create_petition_signatures.sql`。迁移会把早期联署记录
从 `comments` 移到独立表，并清理内部标记。
- comments 表开启了 RLS 且不给 anon 任何策略，前端无法直连数据库读到邮箱

## 以后可以升级的

- 敏感词过滤 / 举报按钮
