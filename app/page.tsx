import HeroSection from "@/components/sections/HeroSection";
import AppCard from "@/components/sections/AppCard";
import ProductShowcase from "@/components/sections/ProductShowcase";
import IndustrySection from "@/components/sections/IndustrySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import { apps } from "@/data/apps";
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
