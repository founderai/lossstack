"use client";

import { motion } from "framer-motion";
import { Scale, HardHat, ClipboardList, Search, Briefcase, Users } from "lucide-react";

const industries = [
  {
    icon: Scale,
    title: "Public Adjusters",
    description: "Manage appraisals, generate narratives, and compare estimates — all in one workflow.",
    color: "#3B82F6",
    apps: ["Appraisly"],
  },
  {
    icon: HardHat,
    title: "Restoration Contractors",
    description: "Document jobsite conditions, track moisture drying, and deliver carrier-ready reports.",
    color: "#F59E0B",
    apps: ["RestoreCam", "ImageLablr"],
  },
  {
    icon: ClipboardList,
    title: "Independent Appraisers",
    description: "Produce professional appraisal reports fast with AI-assisted scope and narrative generation.",
    color: "#3B82F6",
    apps: ["Appraisly"],
  },
  {
    icon: Search,
    title: "Field Inspectors",
    description: "Capture and organize photo evidence with AI-powered labeling the moment you're on site.",
    color: "#0D9488",
    apps: ["ImageLablr", "RestoreCam"],
  },
  {
    icon: Briefcase,
    title: "Claims Managers",
    description: "Standardize documentation across your entire team with consistent, defensible workflows.",
    color: "#3B82F6",
    apps: ["Appraisly", "ImageLablr"],
  },
  {
    icon: Users,
    title: "Inspection Teams",
    description: "Run multi-party reviews, track versions, and keep every stakeholder aligned on scope.",
    color: "#0D9488",
    apps: ["Appraisly", "ImageLablr", "RestoreCam"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const appColors: Record<string, string> = {
  Appraisly: "#3B82F6",
  ImageLablr: "#0D9488",
  RestoreCam: "#F59E0B",
};

export default function IndustrySection() {
  return (
    <section className="px-6 py-16 lg:py-24 bg-[#f5f0e8]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-4">
            <span className="text-slate-600 text-xs font-semibold uppercase tracking-wide">Built For</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0f1e3c] mb-4">
            Who uses LossStack?
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Professionals across the claims and restoration industry rely on LossStack apps to move faster, document better, and close more.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {industries.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${item.color}12` }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>

              {/* Title + description */}
              <div className="font-bold text-[#0f1e3c] text-base mb-2">{item.title}</div>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.description}</p>

              {/* App tags */}
              <div className="flex flex-wrap gap-1.5">
                {item.apps.map((app) => (
                  <span
                    key={app}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${appColors[app]}15`, color: appColors[app] }}
                  >
                    {app}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
