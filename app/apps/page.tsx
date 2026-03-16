"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, ChevronRight } from "lucide-react";
import Image from "next/image";
import FeatureList from "@/components/sections/FeatureList";
import Footer from "@/components/sections/Footer";
import { apps } from "@/data/apps";
import { roadmapItems, statusConfig } from "@/data/roadmap";
import { cn } from "@/lib/utils";

const ROADMAP_PREVIEW_STATUSES = ["in_progress", "coming_soon"] as const;

function RoadmapStrip() {
  const preview = roadmapItems
    .filter((i) => ROADMAP_PREVIEW_STATUSES.includes(i.status as "in_progress" | "coming_soon"))
    .slice(0, 4);

  const appColors: Record<string, string> = {
    appraisly: "#3B82F6",
    imagelablr: "#0D9488",
    restorecam: "#F59E0B",
    lossstack: "#6366F1",
  };
  const appLabels: Record<string, string> = {
    appraisly: "Appraisly",
    imagelablr: "ImageLablr",
    restorecam: "RestoreCam",
    lossstack: "LossStack",
  };

  return (
    <div className="bg-[#0f1e3c] px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-blue-300/70 text-xs font-semibold uppercase tracking-wide mb-1">Roadmap</div>
            <h2 className="text-white font-bold text-xl">What&apos;s coming next</h2>
          </div>
          <Link
            href="/roadmap"
            className="text-blue-300 hover:text-white text-sm font-semibold transition-colors"
          >
            View full roadmap →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {preview.map((item) => {
            const cfg = statusConfig[item.status];
            const color = appColors[item.app];
            const label = appLabels[item.app];
            return (
              <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${color}25`, color }}
                  >
                    {label}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                    {cfg.label}
                  </span>
                </div>
                <div className="text-white text-sm font-semibold leading-snug">{item.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const appIconMap: Record<string, string> = {
  appraisly: "A",
  imagelablr: "IL",
  restorecam: "RC",
};

export default function AppsPage() {
  const [activeApp, setActiveApp] = useState(apps[0].id);
  const currentApp = apps.find((a) => a.id === activeApp)!;

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Page header */}
      <div className="bg-[#0f1e3c] px-6 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-5">
              <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide">App Overview</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Every tool your team needs.<br />
              <span className="text-blue-300/80">Nothing you don&apos;t.</span>
            </h1>
            <p className="text-blue-200/70 text-lg max-w-2xl">
              Three purpose-built apps for insurance claims, photo documentation, and restoration field operations. Explore each one below.
            </p>
          </motion.div>
        </div>
      </div>

      {/* App tabs */}
      <div className="sticky top-16 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => setActiveApp(app.id)}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-150",
                  activeApp === app.id
                    ? "text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                )}
                style={
                  activeApp === app.id
                    ? { backgroundColor: app.accentColor }
                    : {}
                }
              >
                <span
                  className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold overflow-hidden"
                  style={
                    activeApp === app.id
                      ? { backgroundColor: "rgba(255,255,255,0.25)", color: "white" }
                      : { backgroundColor: `${app.accentColor}18`, color: app.accentColor }
                  }
                >
                  {app.id === "appraisly" ? (
                    <Image src="/Appraisly Icon.png" alt="Appraisly" width={20} height={20} className="w-5 h-5 object-cover rounded" />
                  ) : (
                    appIconMap[app.id]
                  )}
                </span>
                {app.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* App detail */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.div
          key={currentApp.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* App hero */}
          <div
            id={currentApp.id}
            className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 shadow-sm"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {currentApp.id !== "appraisly" && (
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-base"
                      style={{
                        backgroundColor: `${currentApp.accentColor}18`,
                        color: currentApp.accentColor,
                      }}
                    >
                      {appIconMap[currentApp.id]}
                    </div>
                  )}
                  <div>
                    {currentApp.id === "appraisly" ? (
                      <Image src="/Appraisly Logo.png" alt="Appraisly" width={200} height={52} className="h-10 w-auto object-contain" />
                    ) : (
                      <h2 className="text-2xl font-bold text-[#0f1e3c]">{currentApp.name}</h2>
                    )}
                    {currentApp.badge && (
                      <span
                        className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${currentApp.accentColor}18`,
                          color: currentApp.accentColor,
                        }}
                      >
                        {currentApp.badge}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-slate-600 text-base leading-relaxed mb-5">
                  {currentApp.description}
                </p>

                <div className="bg-slate-50 rounded-xl p-4 mb-5">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Ideal For</div>
                  <p className="text-slate-600 text-sm">{currentApp.idealUser}</p>
                </div>

                <div className="mb-6">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Key Use Cases</div>
                  <ul className="space-y-2">
                    {currentApp.useCases.map((uc, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <ChevronRight
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: currentApp.accentColor }}
                        />
                        {uc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={currentApp.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg text-white transition-all duration-150 shadow-sm hover:opacity-90"
                    style={{ backgroundColor: currentApp.accentColor }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Visit {currentApp.name} Website
                  </Link>
                  <Link
                    href="/pricing"
                    className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all duration-150"
                  >
                    Add to Bundle
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-[#0f1e3c] font-bold text-xl mb-5">
              {currentApp.name} Features
            </h3>
            <FeatureList app={currentApp} />
          </div>
        </motion.div>
      </div>

      {/* Other apps strip */}
      <div className="bg-white border-t border-slate-200 px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-[#0f1e3c] font-bold text-base mb-6">Also in the LossStack Suite</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apps
              .filter((a) => a.id !== activeApp)
              .map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    setActiveApp(app.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-150 text-left"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      backgroundColor: `${app.accentColor}18`,
                      color: app.accentColor,
                    }}
                  >
                    {appIconMap[app.id]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#0f1e3c] text-sm">{app.name}</div>
                    <div className="text-slate-400 text-xs truncate">{app.tagline}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Roadmap teaser */}
      <RoadmapStrip />

      <Footer />
    </div>
  );
}
