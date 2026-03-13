"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Zap, Package, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { apps } from "@/data/apps";
import { appPricingData, pricingConfig } from "@/data/pricing";
import { cn } from "@/lib/utils";

const appIconMap: Record<string, string> = {
  appraisly: "AP",
  imagelablr: "IL",
  restorecam: "RC",
};

export default function PricingBuilder() {
  // Track which apps are toggled in, and which tier is selected per app
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<Record<string, number>>({
    appraisly: 0,
    imagelablr: 0,
    restorecam: 0,
  });

  const toggleApp = (appId: string) => {
    setSelectedApps((prev) =>
      prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]
    );
  };

  const setTier = (appId: string, tierIndex: number) => {
    setSelectedTiers((prev) => ({ ...prev, [appId]: tierIndex }));
  };

  const getTierPrice = (appId: string): number => {
    const appData = appPricingData.find((a) => a.appId === appId);
    if (!appData) return 0;
    const tier = appData.tiers[selectedTiers[appId] ?? 0];
    return typeof tier?.price === "number" ? tier.price : 0;
  };

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const selections = selectedApps.map((appId) => ({
        appId,
        tierName: appPricingData.find((a) => a.appId === appId)!.tiers[selectedTiers[appId] ?? 0].name,
      }));
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selections }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setCheckoutError("Something went wrong. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const selectedCount = selectedApps.length;
  const discountPercent =
    selectedCount === 2
      ? pricingConfig.twoAppDiscountPercent
      : selectedCount >= 3
      ? pricingConfig.threeAppDiscountPercent
      : 0;

  const subtotal = selectedApps.reduce((sum, id) => sum + getTierPrice(id), 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100) * 100) / 100;
  const total = Math.round((subtotal - discountAmount) * 100) / 100;

  return (
    <div className="space-y-6">
      {/* Instruction text */}
      <div className="text-center">
        <p className="text-slate-500 text-sm">
          Toggle apps in or out, then pick a plan tier for each. Bundle discounts apply automatically.
        </p>
      </div>

      {/* App selection cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {apps.map((app) => {
          const selected = selectedApps.includes(app.id);
          const appData = appPricingData.find((a) => a.appId === app.id)!;
          const currentTierIndex = selectedTiers[app.id] ?? 0;
          const currentTier = appData.tiers[currentTierIndex];
          const currentPrice = typeof currentTier.price === "number" ? currentTier.price : null;

          return (
            <div
              key={app.id}
              className={cn(
                "rounded-xl border-2 bg-white overflow-hidden transition-all duration-150",
                selected
                  ? "border-[#0f1e3c] shadow-md"
                  : "border-slate-200 opacity-70 hover:opacity-90"
              )}
            >
              {/* Card header — click to toggle */}
              <button
                onClick={() => toggleApp(app.id)}
                className="w-full text-left p-5 pb-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {app.id === "appraisly" ? (
                      <Image src="/Appraisly Icon.png" alt="Appraisly" width={40} height={40} className="w-10 h-10 object-contain rounded-xl shrink-0" />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0"
                        style={{ backgroundColor: `${app.accentColor}18`, color: app.accentColor }}
                      >
                        {appIconMap[app.id]}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-[#0f1e3c] text-base leading-tight">{app.name}</div>
                      <div className="text-slate-400 text-xs">{app.badge}</div>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                      selected
                        ? "bg-[#0f1e3c] border-[#0f1e3c]"
                        : "border-slate-300"
                    )}
                  >
                    {selected && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>

                {/* Current price display */}
                <div className="mt-3 flex items-baseline gap-1">
                  {currentPrice !== null ? (
                    <>
                      <span className="text-2xl font-bold text-[#0f1e3c]">
                        ${currentPrice}
                      </span>
                      <span className="text-slate-400 text-xs">/mo</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-slate-500">Custom</span>
                  )}
                  {discountPercent > 0 && selected && currentPrice !== null && (
                    <span className="ml-2 text-xs font-semibold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded-full">
                      −{discountPercent}%
                    </span>
                  )}
                </div>
              </button>

              {/* Tier selector */}
              <div className="px-5 pb-4">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Plan</div>
                <div className="flex flex-wrap gap-1.5">
                  {appData.tiers.map((tier, i) => (
                    <button
                      key={tier.name}
                      onClick={() => {
                        setTier(app.id, i);
                        if (!selected) setSelectedApps((prev) => [...prev, app.id]);
                      }}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all duration-100",
                        currentTierIndex === i && selected
                          ? "border-transparent text-white"
                          : currentTierIndex === i
                          ? "border-slate-300 text-slate-600 bg-slate-100"
                          : "border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                      )}
                      style={
                        currentTierIndex === i && selected
                          ? { backgroundColor: app.accentColor }
                          : {}
                      }
                    >
                      {tier.name}
                      {typeof tier.price === "number" ? ` · $${tier.price}` : " · Custom"}
                    </button>
                  ))}
                </div>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  {currentTier.description}
                </p>

                <Link
                  href={appData.pricingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3" />
                  Full pricing details
                </Link>

                {/* Corporate pricing */}
                <a
                  href="mailto:founderai@pm.me?subject=Corporate Pricing Inquiry&body=Hi, I'm interested in corporate pricing for LossStack."
                  onClick={(e) => e.stopPropagation()}
                  className="mt-3 flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold text-slate-500">E</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-600">Corporate</div>
                    <div className="text-[10px] text-slate-400">Contact us for custom pricing</div>
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bundle summary */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0f1e3c] rounded-xl p-6 text-white"
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {selectedCount >= 3 ? (
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ) : (
                    <Package className="w-4 h-4 text-teal-400" />
                  )}
                  <span className="font-bold text-base">
                    {selectedCount === 1
                      ? "Single App"
                      : selectedCount === 2
                      ? "2-App Stack"
                      : "Full LossStack Suite"}
                  </span>
                  {selectedCount >= 3 && (
                    <span className="bg-amber-400 text-[#0f1e3c] text-xs font-bold px-2 py-0.5 rounded-full">
                      Best Value
                    </span>
                  )}
                </div>
                <p className="text-blue-300/70 text-sm">
                  {discountPercent > 0
                    ? `${discountPercent}% bundle discount applied`
                    : "Add a second app to unlock bundle savings."}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  ${total}
                  <span className="text-blue-300/70 text-sm font-normal">/mo</span>
                </div>
                {discountPercent > 0 && (
                  <div className="text-teal-400 text-xs font-semibold mt-0.5">
                    Saving ${discountAmount}/mo
                  </div>
                )}
              </div>
            </div>

            {/* Line items */}
            <div className="space-y-2 mb-4 pb-4 border-b border-white/10">
              {selectedApps.map((appId) => {
                const app = apps.find((a) => a.id === appId)!;
                const appData = appPricingData.find((a) => a.appId === appId)!;
                const tierIndex = selectedTiers[appId] ?? 0;
                const tier = appData.tiers[tierIndex];
                const price = getTierPrice(appId);
                return (
                  <div key={appId} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-200">{app.name}</span>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded font-medium"
                        style={{ backgroundColor: `${app.accentColor}30`, color: app.accentColor }}
                      >
                        {tier.name}
                      </span>
                    </div>
                    <span className="text-white font-medium">
                      {typeof tier.price === "number" ? `$${price}/mo` : "Custom"}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Subtotal / discount / total */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-blue-200">
                <span>Subtotal</span>
                <span>${subtotal}/mo</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-teal-400 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    Bundle discount ({discountPercent}% off)
                  </span>
                  <span>−${discountAmount}/mo</span>
                </div>
              )}
              <div className="flex justify-between text-white font-bold text-base pt-1 border-t border-white/10">
                <span>Total</span>
                <span>${total}/mo</span>
              </div>
            </div>

            {/* Savings callout */}
            {discountPercent > 0 && (
              <div className="mt-4 bg-teal-500/15 border border-teal-400/25 rounded-lg px-4 py-2.5 text-teal-300 text-sm font-medium">
                You save ${discountAmount}/mo with the {selectedCount}-app bundle — that&apos;s ${Math.round(discountAmount * 12)}/year.
              </div>
            )}

            {/* Checkout CTA */}
            <div className="mt-5 space-y-2">
              {selectedCount === 1 ? (
                <p className="text-blue-300/60 text-xs text-center">
                  Add a second app to unlock bundle pricing and checkout.
                </p>
              ) : (
                <>
                  <button
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-colors"
                  >
                    {checkoutLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Redirecting to checkout…
                      </>
                    ) : (
                      <>
                        Subscribe — ${total}/mo
                        {discountPercent > 0 && (
                          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold">
                            {discountPercent}% off
                          </span>
                        )}
                      </>
                    )}
                  </button>
                  {checkoutError && (
                    <p className="text-red-400 text-xs text-center">{checkoutError}</p>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {selectedCount === 0 && (
        <div className="text-center py-8 text-slate-400 text-sm">
          Toggle one or more apps above and choose a plan to see your pricing.
        </div>
      )}
    </div>
  );
}
