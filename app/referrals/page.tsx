'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Gift, Copy, Check, Users, Clock, Star, ChevronDown, ChevronUp,
  ArrowRight, TrendingUp, Zap
} from 'lucide-react';
import { useReferralDashboard } from '@/hooks/useBilling';
import type { ReferralDashboardEntry, ReferralStatus } from '@/types/billing';

// ─── Status helpers ───────────────────────────────────────────

const STATUS_LABEL: Record<ReferralStatus, string> = {
  pending_signup:    'Pending Signup',
  signed_up:         'Signed Up',
  active_paid_period:'Active — Qualifying',
  completed:         'Completed',
  failed:            'Failed',
  canceled:          'Canceled',
  fraud_hold:        'On Hold',
};

const STATUS_COLOR: Record<ReferralStatus, string> = {
  pending_signup:    'bg-slate-100 text-slate-600',
  signed_up:         'bg-blue-50 text-blue-600',
  active_paid_period:'bg-teal-50 text-teal-700',
  completed:         'bg-green-50 text-green-700',
  failed:            'bg-red-50 text-red-600',
  canceled:          'bg-orange-50 text-orange-600',
  fraud_hold:        'bg-yellow-50 text-yellow-700',
};

const FAQS = [
  {
    q: 'When do I get my credits?',
    a: 'You receive 5 credits once your referred friend completes 30 consecutive days on an active paid LossStack plan. Your friend gets 1 credit immediately after signing up and 2 more after the same 30-day qualification period.',
  },
  {
    q: 'What counts as "active"?',
    a: 'An active paid plan means a subscription in good standing — not canceled, past due, or on a free plan. Both monthly and annual plans qualify.',
  },
  {
    q: 'What happens if they cancel before 30 days?',
    a: 'If your referred friend cancels their subscription before completing 30 consecutive days, the referral will not qualify and the delayed credits will not be awarded to either party.',
  },
  {
    q: 'Is there a cap on referrals?',
    a: 'No cap. You can refer as many people as you like and earn credits for each qualifying referral.',
  },
];

// ─── Page ─────────────────────────────────────────────────────

export default function ReferralsPage() {
  const { data, loading, error } = useReferralDashboard();
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCopy = () => {
    if (!data?.referral_url) return;
    navigator.clipboard.writeText(data.referral_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8]">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-[#0f1e3c] px-6 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-5">
              <Gift className="w-3.5 h-3.5 text-teal-300" />
              <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Referral Program</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Earn Free Credits<br className="hidden lg:block" /> with LossStack
            </h1>
            <p className="text-blue-200/70 text-lg max-w-xl mx-auto mb-8">
              Invite a colleague. When they join and stay active for 30 days, you both earn credits toward reports.
            </p>

            {/* Copy link */}
            {loading ? (
              <div className="h-14 w-full max-w-md mx-auto bg-white/10 rounded-xl animate-pulse" />
            ) : error ? (
              <p className="text-red-300 text-sm">Sign in to get your referral link.</p>
            ) : (
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-3 max-w-md mx-auto">
                <span className="flex-1 text-sm text-white/80 truncate font-mono">
                  {data?.referral_url ?? 'lossstack.com/sign-up?ref=...'}
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-400 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────── */}
      <section className="px-6 py-14 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f1e3c] text-center mb-10">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '1', icon: Copy,       title: 'Share your link', desc: 'Copy your unique referral link and share it with colleagues or on social media.' },
              { step: '2', icon: Users,      title: 'They join & stay active', desc: 'Your friend signs up and remains on an active paid plan for 30 consecutive days.' },
              { step: '3', icon: Zap,        title: 'You both earn credits', desc: 'Once they qualify, you get 5 credits and they get 2 more — automatically.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 bg-[#f5f0e8] rounded-2xl"
              >
                <div className="w-10 h-10 rounded-full bg-[#0f1e3c] text-white flex items-center justify-center font-bold text-sm mb-4">
                  {item.step}
                </div>
                <item.icon className="w-6 h-6 text-teal-600 mb-3" />
                <div className="font-semibold text-[#0f1e3c] mb-2">{item.title}</div>
                <div className="text-slate-500 text-sm leading-relaxed">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reward summary ────────────────────────────────────── */}
      <section className="px-6 py-14 bg-[#f5f0e8]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f1e3c] text-center mb-8">What you earn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">You (referrer)</div>
              <div className="text-4xl font-bold text-[#0f1e3c] mb-1">5 credits</div>
              <div className="text-slate-500 text-sm">Awarded after your friend completes 30 days on a paid plan.</div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Them (referred)</div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold text-[#0f1e3c]">1 credit</span>
                <span className="text-sm text-teal-600 font-semibold">at signup</span>
              </div>
              <div className="text-slate-500 text-sm">Plus 2 more credits after 30 days on a paid plan.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Referral dashboard ────────────────────────────────── */}
      <section className="px-6 py-14 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f1e3c] mb-8">Your Referrals</h2>

          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center text-red-600 text-sm">
              {error}
            </div>
          ) : !data ? null : (
            <>
              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Credits Earned', value: data.total_referral_credits_earned, color: 'text-teal-600' },
                  { label: 'Pending',         value: data.pending_count,                 color: 'text-blue-600' },
                  { label: 'Completed',       value: data.completed_count,               color: 'text-green-600' },
                  { label: 'Canceled',        value: data.failed_count,                  color: 'text-red-500' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#f5f0e8] rounded-xl p-4">
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Copy link again */}
              <div className="flex items-center gap-2 bg-[#f5f0e8] border border-slate-200 rounded-xl px-4 py-3 mb-6">
                <span className="flex-1 text-sm text-slate-600 truncate font-mono">{data.referral_url}</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 bg-[#0f1e3c] hover:bg-[#1a3060] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>

              {/* Referred users table */}
              {data.referrals.length === 0 ? (
                <div className="bg-[#f5f0e8] rounded-xl p-10 text-center">
                  <Users className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">No referrals yet. Share your link to get started.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs uppercase tracking-wide text-slate-400 border-b border-slate-100">
                        <th className="text-left py-3 pr-4">User</th>
                        <th className="text-left py-3 pr-4">Status</th>
                        <th className="text-left py-3 pr-4">Signed Up</th>
                        <th className="text-left py-3 pr-4">Sub Started</th>
                        <th className="text-left py-3">Progress</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {data.referrals.map((r) => (
                        <ReferralRow key={r.id} r={r} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="px-6 py-14 bg-[#f5f0e8]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f1e3c] text-center mb-8">Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-semibold text-[#0f1e3c] text-sm">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// ─── Referral table row ───────────────────────────────────────

function ReferralRow({ r }: { r: ReferralDashboardEntry }) {
  const statusClass = STATUS_COLOR[r.status] ?? 'bg-slate-100 text-slate-600';
  const label = STATUS_LABEL[r.status] ?? r.status;

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="py-3 pr-4 font-mono text-xs text-slate-500">{r.referred_masked_email}</td>
      <td className="py-3 pr-4">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
          {label}
        </span>
      </td>
      <td className="py-3 pr-4 text-slate-500 text-xs">
        {r.signed_up_at ? new Date(r.signed_up_at).toLocaleDateString() : '—'}
      </td>
      <td className="py-3 pr-4 text-slate-500 text-xs">
        {r.subscription_started_at ? new Date(r.subscription_started_at).toLocaleDateString() : '—'}
      </td>
      <td className="py-3 text-xs">
        {r.status === 'completed' && r.rewarded_at ? (
          <span className="text-green-600 font-semibold">Rewarded {new Date(r.rewarded_at).toLocaleDateString()}</span>
        ) : r.days_remaining_until_completion !== null ? (
          <span className="text-teal-600 font-semibold">
            <Clock className="w-3 h-3 inline mr-1" />
            {r.days_remaining_until_completion}d remaining
          </span>
        ) : '—'}
      </td>
    </tr>
  );
}
