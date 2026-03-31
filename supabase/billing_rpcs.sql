-- =============================================================
-- LossStack Billing RPCs
-- Run after billing_migration.sql
-- These replace direct UPDATE statements to ensure atomicity.
-- =============================================================

-- ─── increment_wallet_balance ─────────────────────────────────
create or replace function increment_wallet_balance(p_user_id text, p_amount integer)
returns void language plpgsql as $$
begin
  update user_wallets
  set
    current_balance         = current_balance + p_amount,
    lifetime_credits_earned = lifetime_credits_earned + p_amount,
    updated_at              = now()
  where user_id = p_user_id;
end;
$$;

-- ─── decrement_wallet_balance ─────────────────────────────────
create or replace function decrement_wallet_balance(p_user_id text, p_amount integer)
returns void language plpgsql as $$
begin
  update user_wallets
  set
    current_balance        = greatest(0, current_balance - p_amount),
    lifetime_credits_spent = lifetime_credits_spent + p_amount,
    updated_at             = now()
  where user_id = p_user_id;
end;
$$;

-- ─── increment_overage_counter ────────────────────────────────
create or replace function increment_overage_counter(p_user_id text)
returns void language plpgsql as $$
begin
  update user_wallets
  set
    lifetime_overage_reports = lifetime_overage_reports + 1,
    updated_at               = now()
  where user_id = p_user_id;
end;
$$;

-- ─── pg_advisory_xact_lock wrapper ───────────────────────────
-- Supabase doesn't expose pg_advisory_xact_lock directly via rpc,
-- so we wrap it. This lock is released automatically at tx end.
create or replace function pg_advisory_xact_lock(key bigint)
returns void language plpgsql as $$
begin
  perform pg_advisory_xact_lock(key);
end;
$$;
