"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

interface Props {
  userEmail?: string;
}

export default function CourtesyCredit({ userEmail = "" }: Props) {
  const [email, setEmail] = useState(userEmail);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ monthlyUsed: number; monthlyLimit: number } | null>(null);

  const handleSubmit = async () => {
    if (!email.trim() || !description.trim()) {
      setError("Please enter your email and describe what went wrong.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request", email, description }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setSuccess({ monthlyUsed: data.monthlyUsed, monthlyLimit: data.monthlyLimit });
        setDescription("");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg">
      <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Support</div>
      <h3 className="font-bold text-[#0f1e3c] text-lg mb-1">Request a Courtesy Credit</h3>
      <p className="text-blue-600 text-sm leading-relaxed mb-5">
        If a report did not process correctly, submit a brief description. Credits are reviewed and issued for verified processing errors.
      </p>

      {success ? (
        <div className="flex items-start gap-3 bg-teal-50 border border-teal-200 rounded-xl p-4">
          <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-teal-800 text-sm mb-0.5">Request submitted</div>
            <p className="text-teal-700 text-xs">
              We&apos;ll review your request and issue credits if the error is confirmed. You&apos;ve used{" "}
              <strong>{success.monthlyUsed}/{success.monthlyLimit}</strong> requests this month.
            </p>
            <button
              onClick={() => setSuccess(null)}
              className="text-teal-600 text-xs underline mt-2"
            >
              Submit another request
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Monthly usage bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span>Monthly requests used</span>
              <span>— / 3</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full">
              <div className="h-1.5 bg-blue-400 rounded-full" style={{ width: "0%" }} />
            </div>
            <p className="text-slate-400 text-[11px] mt-1.5">
              Resets on the 1st of each month · 2 credits per request · max 3 requests/month
            </p>
          </div>

          {/* Email field — only shown if not pre-filled */}
          {!userEmail && (
            <input
              type="email"
              placeholder="Your account email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0f1e3c] mb-3"
            />
          )}

          <textarea
            rows={4}
            placeholder="Describe what went wrong — e.g. 'The report generated but the output was blank' or 'The job timed out and no file was created.'"
            value={description}
            onChange={(e) => { setDescription(e.target.value); setError(""); }}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0f1e3c] resize-none mb-4"
          />

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-xs mb-3">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 bg-[#3B82F6] hover:bg-blue-600 disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Request Courtesy Credit
          </button>
        </>
      )}
    </div>
  );
}
