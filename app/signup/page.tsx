"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Check, Users, Zap,
  HardDrive, Building2, Mail, User, Loader2,
  Star, Shield
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { unifiedPlans } from "@/data/pricing";
import { PLAN_CONFIG, type PlanId } from "@/lib/planConfig";
import { cn } from "@/lib/utils";

const PLAN_COLORS: Record<string, { accent: string; bg: string; border: string }> = {
  free:  { accent: "#94A3B8", bg: "#F8FAFC", border: "#E2E8F0" },
  core:  { accent: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE" },
  pro:   { accent: "#0D9488", bg: "#F0FDFA", border: "#99F6E4" },
  firm:  { accent: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A" },
};

type Step = "plan" | "account" | "org" | "done";

const STEPS: Step[] = ["plan", "account", "org", "done"];
const STEP_LABELS = ["Choose Plan", "Your Account", "Your Organization", "You're In"];

export default function SignupPage() {
  const [step, setStep] = useState<Step>("plan");
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreeToAI, setAgreeToAI] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);

  const stepIndex = STEPS.indexOf(step);
  const paidPlans = unifiedPlans.filter((p) => p.id !== "free");

  const goNext = () => setStep(STEPS[stepIndex + 1]);
  const goBack = () => { setError(""); setStep(STEPS[stepIndex - 1]); };

  const validateAccount = () => {
    if (!firstName.trim()) { setError("Enter your first name"); return false; }
    if (!email.trim() || !email.includes("@")) { setError("Enter a valid email address"); return false; }
    if (!agreeToAI) { setError("You must acknowledge the AI-generated content notice to continue"); return false; }
    return true;
  };

  const handleCreateAccount = () => {
    setError("");
    if (!validateAccount()) return;
    goNext();
  };

  const handleFinish = async () => {
    if (!orgName.trim()) { setError("Enter your organization name"); return; }
    setLoading(true);
    setError("");

    // If free plan, skip org creation
    if (selectedPlan === "free") {
      localStorage.setItem("lossstack_owner_email", email.toLowerCase().trim());
      setLoading(false);
      setStep("done");
      return;
    }

    try {
      const res = await fetch("/api/org", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerEmail: email.toLowerCase().trim(),
          orgName: orgName.trim(),
          plan: selectedPlan,
        }),
      });
      const data = await res.json();

      if (res.status === 409) {
        // Org already exists — that's fine, just proceed
        localStorage.setItem("lossstack_owner_email", email.toLowerCase().trim());
        setStep("done");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError(data.error ?? "Failed to create organization. Please try again.");
        setLoading(false);
        return;
      }

      localStorage.setItem("lossstack_owner_email", email.toLowerCase().trim());
      setStep("done");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedPlanData = unifiedPlans.find((p) => p.id === selectedPlan);
  const planColor = PLAN_COLORS[selectedPlan]?.accent ?? "#3B82F6";

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex flex-col">

      {/* Top nav */}
      <div className="bg-[#0f1e3c] px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/LossStackLogoSide.png" alt="LossStack" width={120} height={32} className="h-8 w-auto" />
        </Link>
        <Link href="/pricing" className="text-blue-300/70 hover:text-white text-sm transition-colors">
          Compare plans
        </Link>
      </div>

      {/* Step progress */}
      {step !== "done" && (
        <div className="bg-white border-b border-slate-100 px-6 py-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              {STEPS.slice(0, 3).map((s, i) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                        stepIndex > i
                          ? "bg-teal-500 text-white"
                          : stepIndex === i
                          ? "bg-[#0f1e3c] text-white"
                          : "bg-slate-100 text-slate-400"
                      )}
                    >
                      {stepIndex > i ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <span className={cn(
                      "text-xs font-semibold hidden sm:block",
                      stepIndex === i ? "text-[#0f1e3c]" : stepIndex > i ? "text-teal-600" : "text-slate-400"
                    )}>
                      {STEP_LABELS[i]}
                    </span>
                  </div>
                  {i < 2 && <div className="flex-1 h-px bg-slate-200 mx-2" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">

            {/* ── Step 1: Plan ── */}
            {step === "plan" && (
              <motion.div
                key="plan"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-2xl font-bold text-[#0f1e3c] mb-1">Choose your plan</h1>
                <p className="text-slate-400 text-sm mb-6">All plans include access to Appraisly, ImageLablr & RestoreCam.</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {paidPlans.map((plan) => {
                    const colors = PLAN_COLORS[plan.id];
                    const isSelected = selectedPlan === plan.id;
                    const planCfg = PLAN_CONFIG[plan.id as PlanId];
                    return (
                      <button
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={cn(
                          "relative text-left rounded-2xl border-2 p-5 transition-all duration-150",
                          isSelected
                            ? "border-[#0f1e3c] shadow-lg scale-[1.02]"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        )}
                        style={isSelected ? { backgroundColor: colors.bg, borderColor: colors.accent } : {}}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <div className="flex items-center gap-1 bg-[#0D9488] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                              <Star className="w-2.5 h-2.5 fill-white" /> Most Popular
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded-md"
                            style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}
                          >
                            {plan.name}
                          </span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="flex items-baseline gap-1 mb-3">
                          <span className="text-2xl font-bold text-[#0f1e3c]">${plan.monthlyPrice}</span>
                          <span className="text-slate-400 text-xs">/mo</span>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs text-slate-600">
                            <Users className="w-3 h-3 shrink-0" style={{ color: colors.accent }} />
                            {planCfg.includedSeats} seat{planCfg.includedSeats > 1 ? "s" : ""} included
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-600">
                            <Zap className="w-3 h-3 shrink-0" style={{ color: colors.accent }} />
                            ${plan.reportPrice}/report
                          </div>
                          {plan.storageIncluded && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-600">
                              <HardDrive className="w-3 h-3 shrink-0 text-teal-500" />
                              Storage included
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Free plan option */}
                <button
                  onClick={() => setSelectedPlan("free")}
                  className={cn(
                    "w-full flex items-center justify-between border-2 rounded-xl px-5 py-3.5 text-sm transition-all mb-6",
                    selectedPlan === "free"
                      ? "border-slate-400 bg-slate-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {selectedPlan === "free"
                      ? <div className="w-5 h-5 rounded-full bg-slate-500 flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>
                      : <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                    }
                    <span className="font-semibold text-slate-600">Free — try the platform, no credit card required</span>
                  </div>
                  <span className="text-slate-400 text-xs font-semibold">3 one-time credits</span>
                </button>

                <button
                  onClick={goNext}
                  className="w-full flex items-center justify-center gap-2 bg-[#0f1e3c] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#1a2f5a] transition-colors"
                >
                  Continue with {selectedPlanData?.name} <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* ── Step 2: Account ── */}
            {step === "account" && (
              <motion.div
                key="account"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8"
              >
                <button onClick={goBack} className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 text-xs mb-5 transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[#0f1e3c] text-lg">Create your account</h2>
                    <p className="text-slate-400 text-xs">
                      Signing up for{" "}
                      <span className="font-semibold" style={{ color: planColor }}>
                        {selectedPlanData?.name}
                        {selectedPlan !== "free" && ` — $${selectedPlanData?.monthlyPrice}/mo`}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">First name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); setError(""); }}
                      placeholder="Jane"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-[#0f1e3c] placeholder:text-slate-300 focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Last name <span className="font-normal text-slate-400">(optional)</span></label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Smith"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-[#0f1e3c] placeholder:text-slate-300 focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    <Mail className="w-3 h-3 inline mr-1" />Work email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleCreateAccount()}
                    placeholder="jane@company.com"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-[#0f1e3c] placeholder:text-slate-300 focus:outline-none focus:border-blue-400"
                  />
                  <p className="text-slate-400 text-xs mt-1.5">
                    This email becomes your login and org owner identity.
                  </p>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 mb-5">
                  {/* AI-generated content acknowledgement */}
                  <button
                    type="button"
                    onClick={() => { setAgreeToAI(!agreeToAI); setError(""); }}
                    className={cn(
                      "w-full flex items-start gap-3 text-left border-2 rounded-xl px-4 py-3 transition-all",
                      agreeToAI
                        ? "border-teal-400 bg-teal-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border-2 transition-all",
                      agreeToAI
                        ? "bg-teal-500 border-teal-500"
                        : "border-slate-300 bg-white"
                    )}>
                      {agreeToAI && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0f1e3c] mb-0.5">
                        I understand this platform uses AI-generated content
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Reports, narratives, and summaries generated by LossStack apps are AI-assisted.
                        I accept responsibility for reviewing all outputs before use in professional or legal contexts.
                      </p>
                    </div>
                  </button>

                  {/* Newsletter subscription */}
                  <button
                    type="button"
                    onClick={() => setSubscribeNewsletter(!subscribeNewsletter)}
                    className={cn(
                      "w-full flex items-start gap-3 text-left border-2 rounded-xl px-4 py-3 transition-all",
                      subscribeNewsletter
                        ? "border-blue-400 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border-2 transition-all",
                      subscribeNewsletter
                        ? "bg-blue-500 border-blue-500"
                        : "border-slate-300 bg-white"
                    )}>
                      {subscribeNewsletter && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0f1e3c] mb-0.5">
                        Subscribe to LossStack updates <span className="text-slate-400 font-normal">(recommended)</span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Get notified about new app features, system updates, beta releases, and product news.
                        Unsubscribe anytime.
                      </p>
                    </div>
                  </button>
                </div>

                {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

                <button
                  onClick={handleCreateAccount}
                  className="w-full flex items-center justify-center gap-2 bg-[#0f1e3c] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#1a2f5a] transition-colors"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-slate-400 text-xs mt-4">
                  Already have an account?{" "}
                  <Link href="/team" className="text-blue-500 hover:text-blue-600 font-semibold">Sign in</Link>
                </p>
              </motion.div>
            )}

            {/* ── Step 3: Org ── */}
            {step === "org" && (
              <motion.div
                key="org"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8"
              >
                <button onClick={goBack} className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 text-xs mb-5 transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[#0f1e3c] text-lg">
                      {selectedPlan === "free" ? "Almost done" : "Set up your organization"}
                    </h2>
                    <p className="text-slate-400 text-xs">
                      {selectedPlan === "free"
                        ? "One last step before you start."
                        : "Your team will be grouped under this workspace."}
                    </p>
                  </div>
                </div>

                {/* Summary card */}
                <div
                  className="rounded-xl border p-4 mb-5 text-sm"
                  style={{ backgroundColor: PLAN_COLORS[selectedPlan]?.bg, borderColor: PLAN_COLORS[selectedPlan]?.border }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-[#0f1e3c]">{selectedPlanData?.name} Plan</span>
                    <span className="font-bold" style={{ color: planColor }}>
                      {selectedPlan === "free" ? "Free" : `$${selectedPlanData?.monthlyPrice}/mo`}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {selectedPlan !== "free"
                        ? `${PLAN_CONFIG[selectedPlan as PlanId].includedSeats} seat${PLAN_CONFIG[selectedPlan as PlanId].includedSeats > 1 ? "s" : ""} included`
                        : "1 user"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      ${selectedPlanData?.reportPrice}/report
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      {email}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    {selectedPlan === "free" ? "Your name or company (optional)" : "Organization / company name"}
                  </label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => { setOrgName(e.target.value); setError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleFinish()}
                    placeholder={selectedPlan === "free" ? "Acme Adjusters (optional)" : "Acme Adjusters"}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-[#0f1e3c] placeholder:text-slate-300 focus:outline-none focus:border-blue-400"
                  />
                  {selectedPlan !== "free" && (
                    <p className="text-slate-400 text-xs mt-1.5">
                      You can invite teammates from the Team dashboard after signing up.
                    </p>
                  )}
                </div>

                {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

                <button
                  onClick={handleFinish}
                  disabled={loading || (selectedPlan !== "free" && !orgName.trim())}
                  className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-teal-500 transition-colors disabled:opacity-60"
                >
                  {loading
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <><Check className="w-4 h-4" /> Create Account</>
                  }
                </button>
              </motion.div>
            )}

            {/* ── Step 4: Done ── */}
            {step === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-8 h-8 text-teal-500" />
                </div>
                <h1 className="text-2xl font-bold text-[#0f1e3c] mb-2">You&apos;re in, {firstName}!</h1>
                <p className="text-slate-400 text-sm mb-2">
                  Account created for <span className="font-semibold text-[#0f1e3c]">{email}</span>
                </p>
                <p className="text-slate-400 text-sm mb-8">
                  {selectedPlan !== "free"
                    ? `Your ${selectedPlanData?.name} organization is ready. Head to your dashboard to start using LossStack.`
                    : "Your free account is ready. You have 3 report credits to get started."}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 bg-[#0f1e3c] text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-[#1a2f5a] transition-colors"
                  >
                    Go to Dashboard <ArrowRight className="w-4 h-4" />
                  </Link>
                  {selectedPlan !== "free" && (
                    <Link
                      href="/team"
                      className="flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-600 font-semibold px-6 py-3 rounded-xl text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors"
                    >
                      <Users className="w-4 h-4" /> Manage Team
                    </Link>
                  )}
                </div>

                {selectedPlan !== "free" && (
                  <p className="text-slate-400 text-xs mt-6">
                    Payment will be collected when you activate your subscription.{" "}
                    <Link href="/pricing" className="text-blue-500 hover:text-blue-600">View billing details</Link>
                  </p>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
