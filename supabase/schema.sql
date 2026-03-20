-- LossStack Org System — Run this in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard → your project → SQL Editor → New Query → paste + run

-- Organizations
create table if not exists organizations (
  id            uuid        primary key default gen_random_uuid(),
  name          text        not null,
  owner_id      text        not null,          -- email (will be Clerk userId once integrated)
  plan          text        default 'core' check (plan in ('core', 'pro', 'firm')),
  included_seats integer    default 1,
  seat_price    integer     default 2900,       -- cents per extra seat/mo
  created_at    timestamptz default now()
);

-- Organization members
create table if not exists organization_users (
  id         uuid        primary key default gen_random_uuid(),
  org_id     uuid        references organizations(id) on delete cascade,
  user_id    text        not null,              -- email (will be Clerk userId once integrated)
  role       text        default 'member' check (role in ('owner', 'admin', 'member')),
  created_at timestamptz default now(),
  unique(org_id, user_id)
);

-- Stripe seat subscriptions
create table if not exists org_subscriptions (
  id                       uuid        primary key default gen_random_uuid(),
  org_id                   uuid        references organizations(id) on delete cascade,
  stripe_subscription_id   text,
  stripe_seat_item_id      text,                -- line item ID for seat quantity updates
  seat_count               integer     default 0, -- extra seats above included
  created_at               timestamptz default now(),
  unique(org_id)
);

-- Indexes
create index if not exists idx_org_users_org    on organization_users(org_id);
create index if not exists idx_org_users_user   on organization_users(user_id);
create index if not exists idx_orgs_owner       on organizations(owner_id);
create index if not exists idx_org_subs_org     on org_subscriptions(org_id);

-- Row Level Security (API routes use service role key which bypasses RLS)
alter table organizations      enable row level security;
alter table organization_users enable row level security;
alter table org_subscriptions  enable row level security;

-- Open policies for service role (app validates access in route logic)
create policy "service_orgs"      on organizations      for all using (true) with check (true);
create policy "service_org_users" on organization_users for all using (true) with check (true);
create policy "service_org_subs"  on org_subscriptions  for all using (true) with check (true);
