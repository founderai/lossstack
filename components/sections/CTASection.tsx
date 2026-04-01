"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { apps } from "@/data/apps";

const appLogos: Record<string, string> = {
  appraisly: "/Appraisly Logo.png",
  imagelablr: "/Imagelablr Vector.svg",
  restorecam: "/RestoreCam Logo Bottom .png",
};

export default function CTASection() {
  return (
    <section className="bg-[#0f1e3c] px-6 py-16 lg:py-20">
      <div className="max-w-5xl mx-auto">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-blue-200/70 text-lg max-w-2xl mx-auto mb-8">
            One subscription. All three apps. Pick the plan that fits your workflow and scale as you grow.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="flex items-center gap-2 bg-white text-[#0f1e3c] font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors text-sm shadow-sm"
            >
              View Pricing
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/15 transition-colors text-sm"
            >
              Request a Demo
            </Link>
          </div>
        </motion.div>

        {/* Explore each product */}
        <div>
          <h3 className="text-center text-white/60 text-sm font-semibold uppercase tracking-widest mb-6">
            Explore Each Product
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {apps.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-150 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-20 h-10 rounded-xl flex items-center justify-center bg-[#0a1628] border border-white/10">
                    <Image
                      src={appLogos[app.id]}
                      alt={app.name}
                      width={90}
                      height={32}
                      className="max-w-16 max-h-8 w-auto h-auto object-contain"
                    />
                  </div>
                  <Link
                    href={app.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300/60 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
                <div className="font-bold text-white text-base mb-1">{app.name}</div>
                <p className="text-blue-200/60 text-sm leading-relaxed mb-4">{app.tagline}</p>
                <Link
                  href={app.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                  style={{ color: app.accentColor }}
                >
                  Visit {app.name}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
