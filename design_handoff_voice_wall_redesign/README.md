# Handoff: Voice Wall 视觉重设计（极客 · 反抗 · 艺术 · 自由）

## Overview
对现有 Next.js 项目 **voice-wall**（单页发声/控诉网站）的视觉重设计。方向：地下朋克拼贴 + 粗野主义编辑排版。保留原有的页面结构与全部 i18n 文案（zh/en/es），提亮主色，加入等宽字体的极客细节、旋转的印章/胶带元素、硬阴影按钮，并将首屏背景升级为「视频/图片位」、表情包升级为「后台可配置的图片位」。

## About the Design Files
本包中的 `Voice Wall.dc.html` 是 **HTML 设计参考稿**（原型），不是可直接搬运的生产代码。任务是：在目标代码库 **voice-wall（Next.js App Router + Tailwind CSS v4）** 中，沿用其既有模式（`app/globals.css` 的 `@theme` 变量、组件目录 `components/`、`lib/i18n.ts` 字典）**重新实现**这份设计。原项目的数据层（`/api/comments`、Supabase、4 秒轮询）保持不变——本次只改视觉与少量结构。

## Fidelity
**High-fidelity（高保真）**。所有颜色、字号、间距、字体均为最终值，应按下述规格逐项落实。

## 逐文件改动清单

### 1. `app/globals.css`
- 主色提亮：`--accent: #e5484d` → **`#ff3341`**；`--accent-dim` 可改为 `#8f1d24`。
- 背景微调：`--background: #0a0a0b` → `#09090a`（可选，差异极小）。
- 新增等宽字体工具类（或经 layout 注入变量）：
  ```css
  .font-mono-geek { font-family: var(--font-plex-mono), "IBM Plex Mono", monospace; }
  ```
- 保留：`.grain`（噪点）、`.marquee-track`、`.stamp`（印章 mask）、`.hl`（红色斜切高亮）、`.reveal`、`.feed-scroll`、`slide-in` 动画——全部继续使用，无需改动。

### 2. `app/layout.tsx`
- 除 Archivo Black 外，新增 Google 字体 **IBM Plex Mono**（weights 400/500/700），注入 CSS 变量 `--font-plex-mono`。
- 中文正文字体栈不变（PingFang SC / Noto Sans SC…）。

### 3. `components/Hero.tsx`
- **背景视频位**：在最底层加
  ```tsx
  {videoUrl
    ? <video src={videoUrl} autoPlay muted loop playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-55" />
    : /* 现有 hero-bg.jpg / hero-bg.svg 背景图逻辑保持 */}
  ```
  `videoUrl` 建议来自环境变量 `NEXT_PUBLIC_HERO_VIDEO_URL`（留空则回退到背景图）。
- 顶部品牌条：红色小方块改为 `rotate-45`（菱形，14×14px）；右侧新增等宽字体标签 `VOICE_WALL // v2`（11px, letter-spacing 0.3em, #6b6b6b）；eyebrow 文案在最右侧再显示一次（等宽 11px）。
- 背景巨字 `NO.`：字号从 26vw → **27vw**，颜色 `text-white/[0.045]`。
- eyebrow：改用等宽字体（IBM Plex Mono 13px, bold, tracking 0.55em, accent 色），前置横线 52×2px。
- H1：`font-size: clamp(56px, 10.5vw, 148px)`，weight 900，line-height 1.02，letter-spacing -0.02em。高亮块 `.hl` 不变。
- 副标语：左边框加粗为 `border-l-[3px] border-accent`（不再 /60），padding-left 22px，字号 `clamp(16px, 1.4vw, 21px)`，行高 1.8，色 #c9c9c7。
- **CTA 按钮（朋克化）**：
  - 主按钮：accent 底 + 2px accent 边框，padding 18px 38px，14px/900/tracking 0.3em，默认 `rotate(-0.5deg)`；hover：转正 + `translateY(-3px)` + **硬阴影 `6px 6px 0 rgba(255,255,255,0.9)`**（替换原来的红色柔光阴影）。
  - 次按钮：2px 边框 `rgba(255,255,255,0.35)`，默认 `rotate(0.5deg)`；hover 转正、边框与文字变 accent。
- 印章：位置 `bottom-[190px]`，`right: clamp(24px, 8vw, 120px)`，其余不变；副行改等宽字体。
- 滚动横幅：上下边框改为 **2px solid accent**（原为 1px white/10），`///` 分隔符用等宽字体。

### 4. `components/Facts.tsx`
- kicker 改为等宽字体并加序号：**`01 — THE FACTS`**（12px, tracking 0.4em, accent）。
- H2：`clamp(36px, 4.5vw, 62px)`，weight 900。
- **卡片网格改为「共享边框」布局**：外层 `border border-white/[0.14]`，`gap-0`，每张卡 `border-r border-white/[0.14]`，`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`。
- 卡片：padding `38px 32px 46px`，底 `bg-white/[0.02]`；hover：`bg-[rgba(255,51,65,0.07)]` + `-translate-y-1`（不再改边框色）。
- 编号水印：110px，`text-white/[0.05]`，位置 right -10px / top -22px。
- 「证据 01」标签、日期改等宽字体。底部 3px 红色进度线保留（hover 时从左展开）。

### 5. `components/MemeSlot.tsx` — 后台可配置
- 图片来源改为**可配置**而非硬编码 `/meme.png`：读环境变量 `NEXT_PUBLIC_MEME_URL`，回退 `/meme.png`。（若需要真正的"后台上传"，建议在 Supabase 建 `site_assets` storage bucket + 一条配置记录，前端按 key 取 URL——留作后续任务。）
- 视觉不变：旋转 -2°、双胶带、EXHIBIT A 底标（等宽字体）；占位框文案提示「拖入/配置图片」。
- 图片展示尺寸：`width: min(440px, 72vw); height: 320px; object-fit: contain`。

### 6. `components/CommentFeed.tsx`
- 容器：**去掉圆角**（`rounded-xl` → 直角），加**硬阴影** `shadow-[0_16px_50px_rgba(0,0,0,0.55),4px_4px_0_var(--accent)]`，底色 `bg-[#0e0e10]/85`，边框 `border-white/[0.14]`。
- 头部：LIVE 标签用等宽字体；ping 圆点动画保留；计数用等宽 tabular-nums。
- 头像方块：**去掉圆角**（`rounded-full` → 方形 28×28），颜色 `hsl(h 60% 45%)`（原 45% 38%，更亮）。
- 列表行、滚动条样式保留。

### 7. `components/LanguageSwitcher.tsx`
- 胶囊形 → **直角**：容器 `border border-white/[0.14] bg-[#0e0e10]/85 p-[3px]`（无 rounded），按钮无 rounded，等宽字体 12px/700，选中态 accent 底白字。

### 8. `components/SubmitForm.tsx`
- kicker：**`02 — SPEAK UP`**（等宽，同 Facts）。
- label 改等宽字体（11px/700/tracking 0.2em）。
- 输入框：下边框式样保留；focus 边框色为新 accent。
- 提交按钮：同 Hero 主按钮——2px accent 边框、`rotate(-0.4deg)`，hover 转正 + `translateY(-2px)` + 硬阴影 `6px 6px 0 rgba(255,255,255,0.9)`。
- 成功/错误提示样式不变。

### 9. `components/Footer.tsx`
- 不变（VOICE WALL 行确保等宽字体）。

### 10. `lib/i18n.ts`
- 仅一处文案微调（三语）：`meme.placeholderLine1/2` 改为提示「配置图片 URL / 拖入图片」而非「放到 public/meme.png」。其余文案全部不变。

## Interactions & Behavior
- 滚动 reveal（`Reveal.tsx`）、4 秒评论轮询、评论 slide-in 飘入、marquee 22s 循环——全部保持现状。
- 新增 hover 行为：按钮 rotate→0 + 硬白阴影（transition 0.2s）；facts 卡 hover 红色染底。
- 30 秒刷新一次相对时间戳（原实现已随轮询刷新，可不动）。

## Design Tokens
- 颜色：背景 `#09090a`；前景 `#f5f5f4`；**accent `#ff3341`**；卡底 `rgba(255,255,255,0.02)`；边框 `rgba(255,255,255,0.14)`；次级文字 `#a3a3a1` / `#8a8a88` / `#6b6b6b` / `#5c5c5a`；成功 `#4ade80`。
- 字体：正文 Noto Sans SC / PingFang SC；展示英文 Archivo Black；**极客等宽 IBM Plex Mono**。
- 字号：H1 `clamp(56px,10.5vw,148px)`；H2 `clamp(36px,4.5vw,62px)`；副标语 `clamp(16px,1.4vw,21px)`；mono 标签 10–13px。
- 圆角：**0**（全站直角；feed 头像也是方形）。ping 圆点除外。
- 阴影：硬阴影 `6px 6px 0 rgba(255,255,255,0.9)`（按钮 hover）、`4px 4px 0 var(--accent)`（feed 面板）；照片卡 `0 24px 70px rgba(0,0,0,0.6)`。
- 旋转：按钮 ±0.4–0.5°，照片卡 -2°，印章 12°，品牌方块 45°。

## Assets
- 无新增位图资产。噪点、印章 mask 均为内联 SVG data-URI（已在 `globals.css`）。
- 首屏视频、表情包由站长配置（环境变量 / Supabase storage）。

## Files
- `Voice Wall.dc.html` — 完整高保真设计参考稿（含三语字典、全部交互）。在浏览器打开即可对照。
