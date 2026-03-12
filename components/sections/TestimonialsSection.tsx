"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const appColors: Record<string, string> = {
  appraisly: "#3B82F6",
  imagelablr: "#0D9488",
  restorecam: "#F59E0B",
};

export default function TestimonialsSection() {
  return (
    <section className="px-6 py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-4">
            <span className="text-blue-600 text-xs font-semibold uppercase tracking-wide">Testimonials</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0f1e3c] mb-4">
            Trusted by claims professionals
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            From independent adjusters to full restoration teams — LossStack apps are used by professionals who demand precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => {
            const accentColor = t.appId ? appColors[t.appId] : "#0f1e3c";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-[#f5f0e8] rounded-xl p-6 border border-slate-200/60 hover:shadow-sm transition-all duration-150 relative"
              >
                <Quote
                  className="absolute top-5 right-5 w-6 h-6 opacity-10"
                  style={{ color: accentColor }}
                />
                {t.appId && (
                  <div
                    className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full mb-4"
                    style={{
                      backgroundColor: `${accentColor}15`,
                      color: accentColor,
                    }}
                  >
                    {t.appId.charAt(0).toUpperCase() + t.appId.slice(1)} user
                  </div>
                )}
                {!t.appId && (
                  <div className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full mb-4 bg-slate-100 text-slate-500">
                    Full Suite user
                  </div>
                )}
                <blockquote className="text-slate-700 text-sm leading-relaxed mb-5">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    {t.name.slice(0, 1)}
                  </div>
                  <div>
                    <div className="text-[#0f1e3c] font-semibold text-sm">{t.name}</div>
                    <div className="text-slate-400 text-xs">{t.title} · {t.company}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
