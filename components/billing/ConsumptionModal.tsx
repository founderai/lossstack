'use client';
// =============================================================
// ConsumptionModal — reusable paywall/overage/feature-lock modal.
// Import openConsumptionModal() to trigger from anywhere.
// =============================================================

import { useState, useEffect, useCallback } from 'react';
import { X, Zap, TrendingUp, Lock, Users, HardDrive, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { EntitlementCheckResult } from '@/types/billing';

// ─── Global modal state (singleton) ──────────────────────────

type ModalState = {
  open: boolean;
  entitlement: EntitlementCheckResult | null;
  actionKey: string;
  sourceApp: string;
  reportType: string;
  onConfirm?: () => void;
};

let _setState: ((s: ModalState) => void) | null = null;

export function openConsumptionModal(params: {
  actionKey: string;
  sourceApp: string;
  reportType: string;
  onConfirm?: () => void;
}) {
  fetch(
    `/api/billing/entitlement?action=${encodeURIComponent(params.actionKey)}&surface=desktop&app=${params.sourceApp}`
  )
    .then((r) => r.json())
    .then((entitlement: EntitlementCheckResult) => {
      _setState?.({
        open: true,
        entitlement,
        actionKey: params.actionKey,
        sourceApp: params.sourceApp,
        reportType: params.reportType,
        onConfirm: params.onConfirm,
      });
    });
}

// ─── Modal component ──────────────────────────────────────────

export function ConsumptionModal() {
  const [state, setState] = useState<ModalState>({
    open: false,
    entitlement: null,
    actionKey: '',
    sourceApp: '',
    reportType: '',
  });

  useEffect(() => {
    _setState = setState;
    return () => { _setState = null; };
  }, []);

  const close = useCallback(() =>
    setState((s) => ({ ...s, open: false })), []);

  const confirm = useCallback(() => {
    state.onConfirm?.();
    close();
  }, [state, close]);

  if (!state.open || !state.entitlement) return null;

  const e = state.entitlement;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
        {/* Close */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ── Free user: no credits ─────────────────────────── */}
        {e.reason === 'blocked_free_no_credit' && (
          <FreeBlockedState e={e} onClose={close} />
        )}

        {/* ── Paid overage confirmation ─────────────────────── */}
        {e.reason === 'allowed_paid_overage' && (
          <OverageConfirmState e={e} onConfirm={confirm} onClose={close} />
        )}

        {/* ── Feature locked ────────────────────────────────── */}
        {e.reason === 'blocked_feature_not_in_plan' && (
          <FeatureLockedState e={e} onClose={close} />
        )}

        {/* ── Seat limit ────────────────────────────────────── */}
        {e.reason === 'blocked_seat_limit' && (
          <SeatLimitState e={e} onClose={close} />
        )}
      </div>
    </div>
  );
}

// ─── Sub-states ───────────────────────────────────────────────

function FreeBlockedState({ e, onClose }: { e: EntitlementCheckResult; onClose: () => void }) {
  return (
    <>
      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
        <Zap className="w-5 h-5 text-amber-500" />
      </div>
      <h2 className="text-lg font-bold text-[#0f1e3c] mb-2">Out of Credits</h2>
      <p className="text-slate-500 text-sm mb-6">
        You have <span className="font-semibold text-[#0f1e3c]">0 credits</span> remaining.
        Upgrade your plan to get monthly credits, or earn free credits by referring a friend.
      </p>
      <div className="flex flex-col gap-3">
        <Link
          href="/pricing"
          onClick={onClose}
          className="flex items-center justify-center gap-2 bg-[#0f1e3c] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#1a3060] transition-colors"
        >
          <TrendingUp className="w-4 h-4" />
          Upgrade Plan
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/referrals"
          onClick={onClose}
          className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
        >
          Earn Free Credits via Referrals
        </Link>
      </div>
      <p className="text-xs text-slate-400 text-center mt-4">
        Current plan: <span className="font-medium capitalize">{e.current_plan_code}</span> ·{' '}
        {e.current_credit_balance} credit{e.current_credit_balance !== 1 ? 's' : ''} remaining
      </p>
    </>
  );
}

function OverageConfirmState({
  e, onConfirm, onClose,
}: {
  e: EntitlementCheckResult;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const price = e.overage_price_cents
    ? `$${(e.overage_price_cents / 100).toFixed(2)}`
    : null;

  return (
    <>
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
        <TrendingUp className="w-5 h-5 text-blue-500" />
      </div>
      <h2 className="text-lg font-bold text-[#0f1e3c] mb-2">No Credits Remaining</h2>
      <p className="text-slate-500 text-sm mb-2">
        You&apos;ve used all your included credits for this billing period.
      </p>
      {price && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-[#0f1e3c] font-medium">
            This report will be billed at the overage rate:
          </p>
          <p className="text-2xl font-bold text-[#0f1e3c] mt-1">{price} <span className="text-sm font-normal text-slate-400">/ report</span></p>
        </div>
      )}
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 border border-slate-200 text-slate-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-[#0f1e3c] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#1a3060] transition-colors"
        >
          Confirm & Continue
        </button>
      </div>
    </>
  );
}

function FeatureLockedState({ e, onClose }: { e: EntitlementCheckResult; onClose: () => void }) {
  return (
    <>
      <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
        <Lock className="w-5 h-5 text-purple-500" />
      </div>
      <h2 className="text-lg font-bold text-[#0f1e3c] mb-2">Feature Not in Your Plan</h2>
      <p className="text-slate-500 text-sm mb-6">
        This feature is included in <span className="font-semibold">Pro and above</span>.
        Upgrade your plan to unlock it.
      </p>
      <Link
        href="/pricing"
        onClick={onClose}
        className="flex items-center justify-center gap-2 bg-[#0f1e3c] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#1a3060] transition-colors"
      >
        View Upgrade Options
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
      <p className="text-xs text-slate-400 text-center mt-4">
        Current plan: <span className="font-medium capitalize">{e.current_plan_code}</span>
      </p>
    </>
  );
}

function SeatLimitState({ e, onClose }: { e: EntitlementCheckResult; onClose: () => void }) {
  return (
    <>
      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4">
        <Users className="w-5 h-5 text-red-500" />
      </div>
      <h2 className="text-lg font-bold text-[#0f1e3c] mb-2">Seat Limit Reached</h2>
      <p className="text-slate-500 text-sm mb-6">
        You&apos;ve reached the maximum number of seats for your plan.
        Upgrade to add more team members.
      </p>
      <Link
        href="/pricing"
        onClick={onClose}
        className="flex items-center justify-center gap-2 bg-[#0f1e3c] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#1a3060] transition-colors"
      >
        Upgrade Plan
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
      <p className="text-xs text-slate-400 text-center mt-4">
        Current plan: <span className="font-medium capitalize">{e.current_plan_code}</span>
      </p>
    </>
  );
}
