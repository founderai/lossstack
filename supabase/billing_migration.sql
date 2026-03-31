-- =============================================================
-- LossStack Billing System Migration
-- Run in Supabase SQL Editor after schema.sql
-- =============================================================

-- ─── ENUMS ────────────────────────────────────────────────────

do $$ begin
  create type transaction_type_enum as enum (
    'monthly_allocation',
    'referral_signup_bonus',
    'referral_delayed_bonus',
    'report_debit',
    'report_reversal',
    'admin_adjustment',
    'promo_credit',
    'expiration',
    'migration_adjustment'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type direction_enum as enum ('credit', 'debit');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type source_surface_enum as enum ('desktop', 'mobile', 'api', 'admin', 'system');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type source_app_enum as enum (
    'lossstack', 'appraisly', 'imagelablr', 'restorecam', 'skymeasure'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type referral_status_enum as enum (
    'pending_signup',
    'signed_up',
    'active_paid_period',
    'completed',
    'failed',
    'canceled',
    'fraud_hold'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type billing_outcome_enum as enum (
    'consumed_credit',
    'billed_overage',
    'blocked_free_no_credit',
    'blocked_plan'
  );
exception when duplicate_object then null;
end $$;

-- ─── 1. user_wallets ──────────────────────────────────────────

create table if not exists user_wallets (
  user_id                   text        primary key,
  current_balance           integer     not null default 0 check (current_balance >= 0),
  lifetime_credits_earned   integer     not null default 0,
  lifetime_credits_spent    integer     not null default 0,
  lifetime_overage_reports  integer     not null default 0,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

alter table user_wallets enable row level security;
create policy "service_wallets" on user_wallets for all using (true) with check (true);

-- ─── 2. credit_ledger ─────────────────────────────────────────

create table if not exists credit_ledger (
  id                uuid                  primary key default gen_random_uuid(),
  user_id           text                  not null references user_wallets(user_id) on delete cascade,
  transaction_type  transaction_type_enum not null,
  direction         direction_enum        not null,
  amount            integer               not null check (amount > 0),
  source_surface    source_surface_enum   null,
  source_app        source_app_enum       null,
  action_key        text                  null,
  reference_type    text                  null,
  reference_id      text                  null,
  idempotency_key   text                  unique not null,
  metadata          jsonb                 not null default '{}',
  created_at        timestamptz           not null default now()
);

create index if not exists idx_ledger_user        on credit_ledger(user_id);
create index if not exists idx_ledger_created     on credit_ledger(created_at desc);
create index if not exists idx_ledger_idempotency on credit_ledger(idempotency_key);

alter table credit_ledger enable row level security;
create policy "service_ledger" on credit_ledger for all using (true) with check (true);

-- ─── 3. referrals ─────────────────────────────────────────────

create table if not exists referrals (
  id                                uuid                 primary key default gen_random_uuid(),
  referrer_user_id                  text                 not null,
  referred_user_id                  text                 not null unique,
  referral_code                     text                 not null,
  status                            referral_status_enum not null default 'pending_signup',
  signed_up_at                      timestamptz          null,
  subscription_started_at           timestamptz          null,
  qualified_at                      timestamptz          null,
  rewarded_at                       timestamptz          null,
  immediate_signup_credit_awarded   boolean              not null default false,
  delayed_credit_awarded            boolean              not null default false,
  referrer_credit_amount            integer              not null default 5,
  referred_immediate_credit_amount  integer              not null default 1,
  referred_delayed_credit_amount    integer              not null default 2,
  created_at                        timestamptz          not null default now(),
  updated_at                        timestamptz          not null default now()
);

create index if not exists idx_referrals_referrer on referrals(referrer_user_id);
create index if not exists idx_referrals_status   on referrals(status);

alter table referrals enable row level security;
create policy "service_referrals" on referrals for all using (true) with check (true);

-- ─── 4. referral_codes ────────────────────────────────────────

create table if not exists referral_codes (
  id         uuid        primary key default gen_random_uuid(),
  user_id    text        not null unique,
  code       text        unique not null,
  active     boolean     not null default true,
  created_at timestamptz not null default now()
);

create index if not exists idx_referral_codes_code on referral_codes(code);

alter table referral_codes enable row level security;
create policy "service_referral_codes" on referral_codes for all using (true) with check (true);

-- ─── 5. plan_entitlements ─────────────────────────────────────

create table if not exists plan_entitlements (
  plan_code                       text    primary key,
  included_monthly_credits        integer not null default 0,
  per_report_overage_price_cents  integer null,
  seats_included                  integer not null,
  storage_included                boolean not null default false,
  can_use_bulk_workflows          boolean not null default false,
  can_use_priority_processing     boolean not null default false,
  can_use_cross_app_integrations  boolean not null default false,
  created_at                      timestamptz not null default now(),
  updated_at                      timestamptz not null default now()
);

alter table plan_entitlements enable row level security;
create policy "service_plan_entitlements" on plan_entitlements for all using (true) with check (true);

-- Seed plan entitlements
insert into plan_entitlements
  (plan_code, included_monthly_credits, per_report_overage_price_cents, seats_included,
   storage_included, can_use_bulk_workflows, can_use_priority_processing, can_use_cross_app_integrations)
values
  ('free', 0,  null, 1, false, false, false, false),
  ('core', 0,  1499, 1, false, false, false, false),
  ('pro',  10, 1299, 3, true,  true,  false, true),
  ('firm', 25, 999,  5, true,  true,  true,  true)
on conflict (plan_code) do update set
  included_monthly_credits       = excluded.included_monthly_credits,
  per_report_overage_price_cents = excluded.per_report_overage_price_cents,
  seats_included                 = excluded.seats_included,
  storage_included               = excluded.storage_included,
  can_use_bulk_workflows         = excluded.can_use_bulk_workflows,
  can_use_priority_processing    = excluded.can_use_priority_processing,
  can_use_cross_app_integrations = excluded.can_use_cross_app_integrations,
  updated_at                     = now();

-- ─── 6. subscription_state ────────────────────────────────────

create table if not exists subscription_state (
  user_id                   text        primary key,
  current_plan_code         text        not null default 'free' references plan_entitlements(plan_code),
  subscription_status       text        not null default 'inactive'
                            check (subscription_status in ('active','trialing','past_due','canceled','unpaid','inactive')),
  billing_customer_id       text        null,
  billing_subscription_id   text        null,
  current_period_start      timestamptz null,
  current_period_end        timestamptz null,
  storage_addon_active      boolean     not null default false,
  seats_purchased           integer     not null default 0,
  updated_at                timestamptz not null default now()
);

create index if not exists idx_sub_state_customer on subscription_state(billing_customer_id);
create index if not exists idx_sub_state_sub_id   on subscription_state(billing_subscription_id);

alter table subscription_state enable row level security;
create policy "service_sub_state" on subscription_state for all using (true) with check (true);

-- ─── 7. report_usage_events ───────────────────────────────────

create table if not exists report_usage_events (
  id                  uuid                 primary key default gen_random_uuid(),
  user_id             text                 not null,
  source_surface      source_surface_enum  not null,
  source_app          source_app_enum      not null,
  action_key          text                 not null,
  report_type         text                 not null,
  billing_outcome     billing_outcome_enum not null,
  credit_ledger_id    uuid                 null references credit_ledger(id),
  overage_price_cents integer              null,
  idempotency_key     text                 unique not null,
  metadata            jsonb                not null default '{}',
  created_at          timestamptz          not null default now()
);

create index if not exists idx_usage_user    on report_usage_events(user_id);
create index if not exists idx_usage_created on report_usage_events(created_at desc);
create index if not exists idx_usage_app     on report_usage_events(source_app);

alter table report_usage_events enable row level security;
create policy "service_report_usage" on report_usage_events for all using (true) with check (true);

-- ─── HELPER FUNCTION: ensure_wallet ───────────────────────────
-- Creates wallet + subscription_state rows if missing.
-- Called before any wallet mutation.

create or replace function ensure_user_billing_rows(p_user_id text)
returns void language plpgsql as $$
begin
  insert into user_wallets (user_id) values (p_user_id)
  on conflict (user_id) do nothing;

  insert into subscription_state (user_id) values (p_user_id)
  on conflict (user_id) do nothing;
end;
$$;

-- ─── HELPER FUNCTION: updated_at trigger ─────────────────────

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_wallets_updated_at on user_wallets;
create trigger trg_wallets_updated_at
  before update on user_wallets
  for each row execute function set_updated_at();

drop trigger if exists trg_referrals_updated_at on referrals;
create trigger trg_referrals_updated_at
  before update on referrals
  for each row execute function set_updated_at();

drop trigger if exists trg_sub_state_updated_at on subscription_state;
create trigger trg_sub_state_updated_at
  before update on subscription_state
  for each row execute function set_updated_at();

drop trigger if exists trg_plan_ent_updated_at on plan_entitlements;
create trigger trg_plan_ent_updated_at
  before update on plan_entitlements
  for each row execute function set_updated_at();
