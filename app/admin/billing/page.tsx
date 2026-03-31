'use client';
// =============================================================
// Admin Billing Debug Page
// Protected by ADMIN_PASSWORD header.
// Access at /admin/billing
// =============================================================

import { useState } from 'react';
import { Search, RefreshCw, CreditCard, Receipt, Users, AlertCircle } from 'lucide-react';
import type {
  UserWallet, CreditLedgerRow, ReportUsageEvent,
  SubscriptionStateRow, ReferralRow,
} from '@/types/billing';

interface AdminData {
  wallet: UserWallet;
  ledger: CreditLedgerRow[];
  usage: ReportUsageEvent[];
  subscription: SubscriptionStateRow | null;
  referrals: ReferralRow[];
}

const ADMIN_PASSWORD = 'I$aacFou0der2026!';

export default function AdminBillingPage() {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    if (!userId.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/billing/admin?userId=${encodeURIComponent(userId.trim())}`, {
        headers: { 'x-admin-password': ADMIN_PASSWORD },
      });
      if (!res.ok) {
        const j = await res.json();
        throw new Error(j.error ?? `${res.status}`);
      }
      setData(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0f1e3c] mb-1">Billing Debug</h1>
          <p className="text-slate-500 text-sm">Inspect wallet, ledger, and referral state for any user.</p>
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-8">
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchUser()}
            placeholder="Clerk User ID (user_...)"
            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            onClick={fetchUser}
            disabled={loading}
            className="flex items-center gap-2 bg-[#0f1e3c] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#1a3060] transition-colors disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Lookup
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {data && (
          <div className="space-y-6">

            {/* ── Wallet snapshot ── */}
            <Section title="Wallet" icon={CreditCard}>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {[
                  { label: 'Balance',          value: data.wallet.current_balance },
                  { label: 'Lifetime Earned',  value: data.wallet.lifetime_credits_earned },
                  { label: 'Lifetime Spent',   value: data.wallet.lifetime_credits_spent },
                  { label: 'Overage Reports',  value: data.wallet.lifetime_overage_reports },
                  { label: 'Plan',             value: data.subscription?.current_plan_code ?? 'free' },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl border border-slate-100 p-4">
                    <div className="text-xs text-slate-400 mb-1">{s.label}</div>
                    <div className="text-xl font-bold text-[#0f1e3c]">{s.value}</div>
                  </div>
                ))}
              </div>

              {data.subscription && (
                <div className="mt-4 bg-white rounded-xl border border-slate-100 p-4 text-sm grid grid-cols-2 gap-2">
                  <Row label="Status"        value={data.subscription.subscription_status} />
                  <Row label="Customer ID"   value={data.subscription.billing_customer_id ?? '—'} />
                  <Row label="Sub ID"        value={data.subscription.billing_subscription_id ?? '—'} />
                  <Row label="Period End"    value={data.subscription.current_period_end
                    ? new Date(data.subscription.current_period_end).toLocaleDateString() : '—'} />
                  <Row label="Seats Purchased" value={String(data.subscription.seats_purchased)} />
                  <Row label="Storage Addon"   value={data.subscription.storage_addon_active ? 'Yes' : 'No'} />
                </div>
              )}
            </Section>

            {/* ── Ledger ── */}
            <Section title="Last 20 Ledger Entries" icon={Receipt}>
              <LedgerTable entries={data.ledger} />
            </Section>

            {/* ── Report usage ── */}
            <Section title="Last 20 Report Usage Events" icon={Receipt}>
              <UsageTable events={data.usage} />
            </Section>

            {/* ── Referrals ── */}
            <Section title="Referrals" icon={Users}>
              {data.referrals.length === 0 ? (
                <p className="text-slate-400 text-sm">No referrals found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-slate-400 uppercase tracking-wide text-xs border-b border-slate-100">
                        <th className="text-left py-2 pr-3">Role</th>
                        <th className="text-left py-2 pr-3">Status</th>
                        <th className="text-left py-2 pr-3">Code</th>
                        <th className="text-left py-2 pr-3">Referrer</th>
                        <th className="text-left py-2 pr-3">Referred</th>
                        <th className="text-left py-2 pr-3">Signed Up</th>
                        <th className="text-left py-2 pr-3">Sub Started</th>
                        <th className="text-left py-2">Rewarded</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {data.referrals.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50">
                          <td className="py-2 pr-3 font-mono text-slate-500">
                            {r.referrer_user_id === userId ? 'referrer' : 'referred'}
                          </td>
                          <td className="py-2 pr-3">
                            <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-xs">{r.status}</span>
                          </td>
                          <td className="py-2 pr-3 font-mono">{r.referral_code}</td>
                          <td className="py-2 pr-3 font-mono text-slate-400">{r.referrer_user_id.slice(0, 12)}…</td>
                          <td className="py-2 pr-3 font-mono text-slate-400">{r.referred_user_id.slice(0, 12)}…</td>
                          <td className="py-2 pr-3">{r.signed_up_at ? new Date(r.signed_up_at).toLocaleDateString() : '—'}</td>
                          <td className="py-2 pr-3">{r.subscription_started_at ? new Date(r.subscription_started_at).toLocaleDateString() : '—'}</td>
                          <td className="py-2">{r.rewarded_at ? new Date(r.rewarded_at).toLocaleDateString() : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Section>

          </div>
        )}
      </div>
    </div>
  );
}

// ─── Small helpers ────────────────────────────────────────────

function Section({ title, icon: Icon, children }: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-5">
        <Icon className="w-4 h-4 text-slate-400" />
        <h2 className="font-semibold text-[#0f1e3c] text-sm">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-slate-400">{label}: </span>
      <span className="font-medium text-[#0f1e3c] font-mono">{value}</span>
    </div>
  );
}

function LedgerTable({ entries }: { entries: CreditLedgerRow[] }) {
  if (!entries.length) return <p className="text-slate-400 text-sm">No ledger entries.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-slate-400 uppercase tracking-wide text-xs border-b border-slate-100">
            <th className="text-left py-2 pr-3">Date</th>
            <th className="text-left py-2 pr-3">Type</th>
            <th className="text-left py-2 pr-3">Dir</th>
            <th className="text-left py-2 pr-3">Amt</th>
            <th className="text-left py-2 pr-3">App</th>
            <th className="text-left py-2">Idempotency Key</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {entries.map((e) => (
            <tr key={e.id} className="hover:bg-slate-50">
              <td className="py-2 pr-3">{new Date(e.created_at).toLocaleDateString()}</td>
              <td className="py-2 pr-3 font-mono">{e.transaction_type}</td>
              <td className="py-2 pr-3">
                <span className={e.direction === 'credit' ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
                  {e.direction === 'credit' ? '+' : '-'}{e.amount}
                </span>
              </td>
              <td className="py-2 pr-3">{e.amount}</td>
              <td className="py-2 pr-3">{e.source_app ?? '—'}</td>
              <td className="py-2 font-mono text-slate-400 max-w-xs truncate">{e.idempotency_key}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UsageTable({ events }: { events: ReportUsageEvent[] }) {
  if (!events.length) return <p className="text-slate-400 text-sm">No usage events.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-slate-400 uppercase tracking-wide text-xs border-b border-slate-100">
            <th className="text-left py-2 pr-3">Date</th>
            <th className="text-left py-2 pr-3">App</th>
            <th className="text-left py-2 pr-3">Action</th>
            <th className="text-left py-2 pr-3">Outcome</th>
            <th className="text-left py-2">Overage $</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {events.map((e) => (
            <tr key={e.id} className="hover:bg-slate-50">
              <td className="py-2 pr-3">{new Date(e.created_at).toLocaleDateString()}</td>
              <td className="py-2 pr-3">{e.source_app}</td>
              <td className="py-2 pr-3 font-mono">{e.action_key}</td>
              <td className="py-2 pr-3">
                <span className={
                  e.billing_outcome === 'consumed_credit' ? 'text-green-600' :
                  e.billing_outcome === 'billed_overage'  ? 'text-amber-600' :
                  'text-red-500'
                }>
                  {e.billing_outcome}
                </span>
              </td>
              <td className="py-2">
                {e.overage_price_cents
                  ? `$${(e.overage_price_cents / 100).toFixed(2)}`
                  : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
