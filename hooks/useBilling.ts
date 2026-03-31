'use client';
// =============================================================
// Client-side billing hooks.
// These call the internal API routes and cache results.
// =============================================================

import { useState, useEffect, useCallback } from 'react';
import type {
  UserWallet,
  SubscriptionStateRow,
  CreditLedgerRow,
  EntitlementCheckResult,
  ReferralDashboardData,
} from '@/types/billing';

// ─── useWallet ────────────────────────────────────────────────

export interface WalletState {
  wallet: UserWallet | null;
  subscription: Pick<SubscriptionStateRow,
    'current_plan_code' | 'subscription_status' | 'current_period_end' | 'seats_purchased'
  > | null;
  history: CreditLedgerRow[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useWallet(includeHistory = false): WalletState {
  const [wallet, setWallet] = useState<UserWallet | null>(null);
  const [subscription, setSubscription] = useState<WalletState['subscription']>(null);
  const [history, setHistory] = useState<CreditLedgerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `/api/billing/wallet${includeHistory ? '?history=true' : ''}`;
      const res = await window.fetch(url);
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setWallet(data.wallet);
      setSubscription(data.subscription);
      setHistory(data.history ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load wallet');
    } finally {
      setLoading(false);
    }
  }, [includeHistory]);

  useEffect(() => { fetch(); }, [fetch]);

  return { wallet, subscription, history, loading, error, refetch: fetch };
}

// ─── useReferralDashboard ─────────────────────────────────────

export interface ReferralDashboardState {
  data: ReferralDashboardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useReferralDashboard(): ReferralDashboardState {
  const [data, setData] = useState<ReferralDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await window.fetch('/api/billing/referrals');
      if (!res.ok) throw new Error(`${res.status}`);
      setData(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load referral data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// ─── useEntitlementCheck ──────────────────────────────────────

export interface EntitlementState {
  result: EntitlementCheckResult | null;
  loading: boolean;
  error: string | null;
}

export function useEntitlementCheck(
  actionKey: string,
  sourceApp = 'lossstack',
  sourceSurface = 'desktop'
): EntitlementState {
  const [result, setResult] = useState<EntitlementCheckResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!actionKey) return;
    setLoading(true);
    window.fetch(
      `/api/billing/entitlement?action=${encodeURIComponent(actionKey)}&surface=${sourceSurface}&app=${sourceApp}`
    )
      .then((res) => res.json())
      .then(setResult)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [actionKey, sourceApp, sourceSurface]);

  return { result, loading, error };
}
