-- 在 Supabase Dashboard 的 SQL Editor 里执行这个文件

create extension if not exists pgcrypto;

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  nickname text not null check (char_length(nickname) between 1 and 20),
  message text not null check (char_length(message) between 1 and 200),
  -- 邮箱选填：为了隐私允许 NULL，且 API 查询时永远不返回该字段
  email text,
  -- 风控字段：只存哈希，不存明文 IP；API 查询时永远不返回这些字段
  ip_hash text,
  ip_country text,
  user_agent text,
  -- 携带的表情包 id 列表（对应 lib/stickers.ts；服务端已按白名单校验）
  stickers text[] not null default '{}',
  created_at timestamptz not null default now()
);

-- 若表已存在（老库），补列：
-- alter table public.comments add column if not exists stickers text[] not null default '{}';
alter table public.comments add column if not exists ip_hash text;
alter table public.comments add column if not exists ip_country text;
alter table public.comments add column if not exists user_agent text;

create index if not exists comments_created_at_idx
  on public.comments (created_at desc);
create index if not exists comments_ip_hash_created_at_idx
  on public.comments (ip_hash, created_at desc);

-- 开启行级安全：默认拒绝一切直连访问。
-- 本项目的读写都走服务端 API（service_role key），不受 RLS 限制，
-- 所以不需要给 anon 开任何权限，email 也就不可能被前端直接读到。
alter table public.comments enable row level security;
