"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, BarChart2, LayoutGrid } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0f1e3c] px-6 py-20 lg:py-28">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute -top-20 -right-20 w-100 h-100 rounded-full bg-blue-600/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-15 left-1/5 w-75 h-75 rounded-full bg-teal-500/15 blur-[80px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-blue-200 text-xs font-medium tracking-wide uppercase">
            The AI-Powered Claims & Restoration Suite
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-4xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6"
        >
          Your claims and
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-teal-400">
            documentation stack,
          </span>
          <br />
          unified.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-blue-200/80 text-lg lg:text-xl max-w-2xl leading-relaxed mb-10"
        >
          Stack smarter. Work faster. Run every claim workflow from one
          ecosystem — AI-powered appraisal, intelligent photo documentation,
          and field-ready restoration tools, purpose-built for insurance and
          restoration professionals.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap gap-3"
        >
          <Link
            href="/apps"
            className="flex items-center gap-2 bg-white text-[#0f1e3c] font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-all duration-150 shadow-sm text-sm"
          >
            <LayoutGrid className="w-4 h-4" />
            View Apps
          </Link>
          <Link
            href="/compare"
            className="flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/15 transition-all duration-150 text-sm"
          >
            <BarChart2 className="w-4 h-4" />
            Compare Plans
          </Link>
          <Link
            href="/pricing"
            className="flex items-center gap-2 bg-linear-to-r from-teal-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-teal-400 hover:to-blue-500 transition-all duration-150 shadow-sm text-sm"
          >
            <Layers className="w-4 h-4" />
            Build Your Stack
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/10"
        >
          {[
            { value: "3", label: "Specialized Apps" },
            { value: "25%", label: "Max Bundle Savings" },
            { value: "AI-First", label: "Built for Claims Teams" },
            { value: "1", label: "Unified Ecosystem" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-blue-300/70 text-sm mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
