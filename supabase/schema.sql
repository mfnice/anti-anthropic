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

-- 联署使用独立表：公开昵称与私密联系信息物理上独立于留言内容。
create table if not exists public.petition_signatures (
  id uuid primary key default gen_random_uuid(),
  nickname text not null check (char_length(nickname) between 1 and 20),
  email text,
  contact_opt_in boolean not null default false,
  ip_hash text,
  ip_country text,
  user_agent text,
  created_at timestamptz not null default now(),
  constraint petition_email_requires_consent
    check (email is null or contact_opt_in = true)
);

create index if not exists petition_signatures_created_at_idx
  on public.petition_signatures (created_at desc);

-- 有邮箱的联署按邮箱去重；不留邮箱的联署按匿名 IP 哈希去重。
create unique index if not exists petition_signatures_email_unique_idx
  on public.petition_signatures (lower(email))
  where email is not null;
create unique index if not exists petition_signatures_anonymous_ip_unique_idx
  on public.petition_signatures (ip_hash)
  where email is null and ip_hash is not null;

alter table public.petition_signatures enable row level security;

-- 将早期暂存在 comments 表的联署迁入独立表，随后清理内部标记记录。
insert into public.petition_signatures (
  id,
  nickname,
  email,
  contact_opt_in,
  ip_hash,
  ip_country,
  user_agent,
  created_at
)
select
  id,
  nickname,
  email,
  email is not null,
  ip_hash,
  ip_country,
  user_agent,
  created_at
from public.comments
where message = '[petition-signature]'
on conflict do nothing;

delete from public.comments
where message = '[petition-signature]';
