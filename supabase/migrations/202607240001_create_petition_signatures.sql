begin;

create extension if not exists pgcrypto;

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

create unique index if not exists petition_signatures_email_unique_idx
  on public.petition_signatures (lower(email))
  where email is not null;

create unique index if not exists petition_signatures_anonymous_ip_unique_idx
  on public.petition_signatures (ip_hash)
  where email is null and ip_hash is not null;

alter table public.petition_signatures enable row level security;

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

commit;
