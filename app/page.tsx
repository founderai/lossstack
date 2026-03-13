import HeroSection from "@/components/sections/HeroSection";
import AppCard from "@/components/sections/AppCard";
import WorkflowSection from "@/components/sections/WorkflowSection";
import ProductShowcase from "@/components/sections/ProductShowcase";
import IndustrySection from "@/components/sections/IndustrySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import { apps } from "@/data/apps";
import { appPricingData, pricingConfig } from "@/data/pricing";
import Link from "next/link";
import { Layers, ArrowRight, Zap, Shield, BarChart2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroSection />

      {/* Apps overview */}
      <section className="px-6 py-16 lg:py-20 bg-[#f5f0e8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-4">
              <span className="text-blue-600 text-xs font-semibold uppercase tracking-wide">The Suite</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0f1e3c] mb-4">
              Three apps. One ecosystem.
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Each app in the LossStack suite is purpose-built for a specific stage of the claims and restoration workflow — and they stack seamlessly together.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {apps.map((app, i) => (
              <AppCard key={app.id} app={app} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Workflow diagram */}
      <WorkflowSection />

      {/* Why stack section */}
      <section className="px-6 py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-full px-4 py-1.5 mb-5">
                <span className="text-teal-600 text-xs font-semibold uppercase tracking-wide">Why Stack</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0f1e3c] mb-5 leading-tight">
                The whole is greater than the sum of its parts.
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-6">
                Claims and restoration workflows don&apos;t happen in isolation. Photo documentation feeds appraisal. Field data feeds reporting. When your tools are built to work together, the entire workflow accelerates.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                LossStack is designed so that each app solves its own problem well — and when stacked, eliminates the handoff friction that slows most claims teams down.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-[#0f1e3c] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1a3060] transition-colors text-sm"
              >
                <Layers className="w-4 h-4" />
                Build Your Stack
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  icon: Zap,
                  title: "Faster from loss to resolution",
                  description: "Combine AI-powered narrative generation, organized photo documentation, and field-captured job data to cut claim cycle time significantly.",
                  color: "#3B82F6",
                },
                {
                  icon: Shield,
                  title: "Consistent, defensible documentation",
                  description: "Every claim, every job — documented the same way. Standardized workflows across your team with no gaps, no guesswork.",
                  color: "#0D9488",
                },
                {
                  icon: BarChart2,
                  title: "Better outcomes at every stage",
                  description: "From first notice of loss to final completion report — LossStack gives every stakeholder the right data at the right time.",
                  color: "#F59E0B",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 bg-[#f5f0e8] rounded-xl border border-slate-200/60">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.color}18` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0f1e3c] text-sm mb-1">{item.title}</div>
                    <div className="text-slate-500 text-sm leading-relaxed">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product deep-dives */}
      <ProductShowcase />

      {/* Industry credibility */}
      <IndustrySection />

      {/* Bundle savings — real pricing visual */}
      <section className="px-6 py-16 lg:py-20 bg-[#0f1e3c]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-4">
              <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Bundle Savings</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              Stack and save up to 25%.
            </h2>
            <p className="text-blue-200/70 text-lg max-w-xl mx-auto">
              Subscribe to each app individually — or bundle two or three and unlock automatic discounts.
            </p>
          </div>

          {/* Individual price cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {appPricingData.map((appData) => {
              const app = apps.find((a) => a.id === appData.appId)!;
              const lowestPaid = appData.tiers.find((t) => typeof t.price === "number");
              return (
                <div key={appData.appId} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ backgroundColor: `${app.accentColor}22`, color: app.accentColor }}
                    >
                      {app.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="font-bold text-white">{app.name}</div>
                  </div>
                  <div className="text-blue-200/60 text-xs mb-3">Starting at</div>
                  <div className="text-3xl font-bold text-white mb-1">
                    ${lowestPaid?.price}<span className="text-blue-300/60 text-sm font-normal">/mo</span>
                  </div>
                  <div className="text-blue-200/50 text-xs">{lowestPaid?.description}</div>
                </div>
              );
            })}
          </div>

          {/* Bundle comparison row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 2-app bundle */}
            <div className="bg-white/8 border border-white/15 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-white">2-App Bundle</div>
                <div className="bg-blue-500/30 text-blue-300 text-xs font-bold px-2.5 py-1 rounded-full">
                  {pricingConfig.twoAppDiscountPercent}% OFF
                </div>
              </div>
              <p className="text-blue-200/60 text-sm mb-4">
                Pick any two apps — discount applies automatically at checkout.
              </p>
              <Link
                href="/pricing"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
              >
                <Layers className="w-4 h-4" />
                Calculate my savings
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 3-app bundle */}
            <div className="bg-teal-500/15 border border-teal-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-white">Full Suite — 3 Apps</div>
                <div className="bg-teal-400/30 text-teal-300 text-xs font-bold px-2.5 py-1 rounded-full">
                  {pricingConfig.threeAppDiscountPercent}% OFF
                </div>
              </div>
              <p className="text-teal-200/70 text-sm mb-4">
                The complete LossStack suite — RestoreCam + ImageLablr + Appraisly.
              </p>
              <Link
                href="/pricing"
                className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
              >
                <Layers className="w-4 h-4" />
                Build full stack
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA / Explore products */}
      <CTASection />

      {/* FAQs */}
      <FAQSection />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
