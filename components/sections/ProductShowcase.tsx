"use client";

import { motion } from "framer-motion";
import { ExternalLink, Check, Zap, Shield, Clock } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";

const products = [
  {
    id: "appraisly",
    name: "Appraisly",
    badge: "Claims Intelligence",
    tagline: "AI-powered appraisal workflows for claims professionals.",
    color: "#3B82F6",
    bg: "#EFF6FF",
    borderColor: "#BFDBFE",
    url: "https://appraislyai.com",
    logoSrc: "/Appraisly Logo.png",
    logoDark: false,
    benefits: [
      { icon: Zap, text: "Generate professional claim narratives in minutes, not hours" },
      { icon: Shield, text: "Side-by-side estimate comparison with variance analysis" },
      { icon: Clock, text: "Structured review workflows from FNOL to final resolution" },
    ],
    mock: "appraisly",
  },
  {
    id: "imagelablr",
    name: "ImageLablr",
    badge: "Photo Intelligence",
    tagline: "Intelligent photo labeling for claims documentation.",
    color: "#0D9488",
    bg: "#F0FDFA",
    borderColor: "#99F6E4",
    url: "https://www.imagelablr.com",
    logoSrc: "/Imagelablr Vector Dark.svg",
    logoDark: false,
    benefits: [
      { icon: Zap, text: "Label hundreds of claim photos quickly and consistently" },
      { icon: Shield, text: "Organized by room, elevation, and damage category" },
      { icon: Clock, text: "Export-ready photo packages for reports in one click" },
    ],
    mock: "imagelablr",
  },
  {
    id: "restorecam",
    name: "RestoreCam",
    badge: "Field Operations",
    tagline: "Field-first documentation for restoration professionals.",
    color: "#F59E0B",
    bg: "#FFFBEB",
    borderColor: "#FDE68A",
    url: "https://www.restorecam.com",
    logoSrc: "/RestoreCam Logo Bottom .png",
    logoDark: false,
    benefits: [
      { icon: Zap, text: "Mobile-first capture for moisture readings and jobsite photos" },
      { icon: Shield, text: "Equipment tracking with full chain-of-custody documentation" },
      { icon: Clock, text: "Daily progress reports and completion summaries for carriers" },
    ],
    mock: "restorecam",
  },
];

function AppraislyMock({ color }: { color: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden text-xs shadow-sm">
      {/* Top bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border-b border-slate-100">
        <div className="w-2 h-2 rounded-full bg-red-300" />
        <div className="w-2 h-2 rounded-full bg-amber-300" />
        <div className="w-2 h-2 rounded-full bg-green-300" />
        <span className="ml-2 text-slate-400 text-[10px]">Appraisly — Claim #4821</span>
      </div>
      <div className="p-3 space-y-2">
        {/* Claim row */}
        {["Hail Damage · 3841 Mesa Dr", "Wind Damage · 112 Oak Ave", "Water Loss · 9 Birch Ct"].map((row, i) => (
          <div key={row} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-600 font-medium">{row}</span>
            <span
              className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
              style={{
                backgroundColor: i === 0 ? `${color}18` : "#F1F5F9",
                color: i === 0 ? color : "#94A3B8",
              }}
            >
              {i === 0 ? "In Review" : i === 1 ? "Draft" : "Complete"}
            </span>
          </div>
        ))}
        {/* AI narrative preview */}
        <div className="mt-1 p-2 rounded-lg border border-slate-100 bg-slate-50">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
            <span className="text-[10px] font-semibold" style={{ color }}>AI Narrative · Generating…</span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 bg-slate-200 rounded-full w-full" />
            <div className="h-1.5 bg-slate-200 rounded-full w-4/5" />
            <div className="h-1.5 bg-slate-100 rounded-full w-3/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageLablrMock({ color }: { color: string }) {
  const labels = ["Roof · Hail", "Soffit · Damage", "Gutter · Bent", "Interior · Water", "Window · Crack", "Siding · Impact"];
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden text-xs shadow-sm">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border-b border-slate-100">
        <div className="w-2 h-2 rounded-full bg-red-300" />
        <div className="w-2 h-2 rounded-full bg-amber-300" />
        <div className="w-2 h-2 rounded-full bg-green-300" />
        <span className="ml-2 text-slate-400 text-[10px]">ImageLablr — 48 photos</span>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-3 gap-1.5">
          {labels.map((label, i) => (
            <div key={label} className="relative aspect-square rounded-lg overflow-hidden border border-slate-100">
              <div
                className="absolute inset-0"
                style={{ backgroundColor: `${color}${10 + i * 4}` }}
              />
              <div className="absolute inset-0 flex items-end p-1">
                <span
                  className="text-[8px] font-semibold px-1 py-0.5 rounded"
                  style={{ backgroundColor: `${color}22`, color }}
                >
                  {label}
                </span>
              </div>
              <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white/80 flex items-center justify-center">
                <Check className="w-2 h-2" style={{ color }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between px-1">
          <span className="text-slate-400 text-[10px]">6 of 48 labeled</span>
          <span className="text-[10px] font-semibold" style={{ color }}>Labeled</span>
        </div>
      </div>
    </div>
  );
}

function RestoreCamMock({ color }: { color: string }) {
  const rooms = [
    { name: "Kitchen", reading: "18.2%", goal: "16%", status: "drying" },
    { name: "Living Room", reading: "14.1%", goal: "16%", status: "done" },
    { name: "Master Bath", reading: "24.8%", goal: "16%", status: "high" },
  ];
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden text-xs shadow-sm">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border-b border-slate-100">
        <div className="w-2 h-2 rounded-full bg-red-300" />
        <div className="w-2 h-2 rounded-full bg-amber-300" />
        <div className="w-2 h-2 rounded-full bg-green-300" />
        <span className="ml-2 text-slate-400 text-[10px]">RestoreCam — Job #1047 · Day 3</span>
      </div>
      <div className="p-3 space-y-1.5">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-slate-700">Moisture Readings</span>
          <span className="text-[10px] text-slate-400">Day 3 of 5</span>
        </div>
        {rooms.map((room) => (
          <div key={room.name} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-slate-50 border border-slate-100">
            <div>
              <div className="font-medium text-slate-700">{room.name}</div>
              <div className="text-[10px] text-slate-400">Goal: {room.goal}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold" style={{ color: room.status === "done" ? "#22C55E" : room.status === "high" ? "#EF4444" : color }}>
                {room.reading}
              </span>
              <span
                className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                style={{
                  backgroundColor: room.status === "done" ? "#DCFCE7" : room.status === "high" ? "#FEE2E2" : `${color}18`,
                  color: room.status === "done" ? "#16A34A" : room.status === "high" ? "#DC2626" : color,
                }}
              >
                {room.status === "done" ? "Dry" : room.status === "high" ? "High" : "Drying"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ProductShowcase() {
  return (
    <section className="px-6 py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-4">
            <span className="text-blue-600 text-xs font-semibold uppercase tracking-wide">The Apps</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0f1e3c] mb-4">
            Purpose-built for every stage.
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Each app is a specialist tool. No bloat, no overlap — just the right capabilities for the right job.
          </p>
        </motion.div>

        {/* Product cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-10"
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ y: -2 }}
              className="rounded-2xl border overflow-hidden shadow-sm transition-shadow hover:shadow-md"
              style={{ borderColor: product.borderColor, backgroundColor: product.bg }}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                {/* Content side */}
                <div className={`p-8 lg:p-10 ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  {/* Logo */}
                  <div className="mb-5">
                    <NextImage
                      src={product.logoSrc}
                      alt={product.name}
                      width={400}
                      height={120}
                      className="h-14 w-auto object-contain"
                    />
                    <div className="text-xs font-semibold mt-2" style={{ color: product.color }}>{product.badge}</div>
                  </div>

                  <p className="text-slate-600 text-base leading-relaxed mb-6">{product.tagline}</p>

                  {/* Benefits */}
                  <ul className="space-y-3 mb-8">
                    {product.benefits.map((benefit) => (
                      <li key={benefit.text} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: `${product.color}18` }}
                        >
                          <Check className="w-3 h-3" style={{ color: product.color }} />
                        </div>
                        <span className="text-slate-600 text-sm leading-relaxed">{benefit.text}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-xl text-white text-sm transition-all hover:opacity-90 shadow-sm"
                    style={{ backgroundColor: product.color }}
                  >
                    Explore {product.name}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Mock UI side */}
                <div className={`flex items-center justify-center p-8 lg:p-10 ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="w-full max-w-sm">
                    {product.mock === "appraisly" && <AppraislyMock color={product.color} />}
                    {product.mock === "imagelablr" && <ImageLablrMock color={product.color} />}
                    {product.mock === "restorecam" && <RestoreCamMock color={product.color} />}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
