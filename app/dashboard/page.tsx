"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/sections/Footer";

interface FeatureHighlight {
  label: string;
  description: string;
}

interface PortalApp {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  accentColor: string;
  launchUrl: string;
  icon: React.ReactNode;
  highlights: FeatureHighlight[];
  note?: string;
}

const portalApps: PortalApp[] = [
  {
    id: "appraisly",
    name: "Appraisly",
    badge: "Claims Intelligence",
    tagline: "AI-powered appraisal workflows and scope generation.",
    accentColor: "#3B82F6",
    launchUrl: "https://appraislyai.com/dashboard",
    icon: (
      <Image
        src="/Appraisly Icon.png"
        alt="Appraisly"
        width={48}
        height={48}
        className="w-12 h-12 object-contain rounded-xl"
      />
    ),
    highlights: [
      {
        label: "AppraislyScope",
        description: "Generate scopes and push directly to the mail merge workflow for professional document output.",
      },
      {
        label: "Mail Merge",
        description: "Populate claim documents, letters, and reports automatically from scope data.",
      },
      {
        label: "Estimate Comparison",
        description: "Side-by-side carrier vs. insured estimate review with variance analysis.",
      },
    ],
  },
  {
    id: "imagelablr",
    name: "ImageLablr",
    badge: "Photo Intelligence",
    tagline: "AI photo labeling and documentation for claims.",
    accentColor: "#0D9488",
    launchUrl: "https://www.imagelablr.com/dashboard",
    icon: (
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm"
        style={{ backgroundColor: "#0D948818", color: "#0D9488" }}
      >
        IL
      </div>
    ),
    highlights: [
      {
        label: "Photo Viewer",
        description: "View and manage all uploaded claim photos organized by job, room, and category.",
      },
      {
        label: "AI Labeling via AppraislyScope",
        description: "Automatically label and categorize photos using AppraislyScope's scope intelligence.",
      },
      {
        label: "Upload & Organize",
        description: "Upload new photos directly and have them labeled, tagged, and sorted in seconds.",
      },
    ],
    note: "Uses AppraislyScope for AI labeling — requires an active Appraisly subscription.",
  },
  {
    id: "restorecam",
    name: "RestoreCam",
    badge: "Field Operations",
    tagline: "Field-first documentation for restoration professionals.",
    accentColor: "#F59E0B",
    launchUrl: "https://www.restorecam.com",
    icon: (
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm"
        style={{ backgroundColor: "#F59E0B18", color: "#F59E0B" }}
      >
        RC
      </div>
    ),
    highlights: [
      {
        label: "Moisture Documentation",
        description: "Log readings, psychrometrics, and environmental data with room-level granularity.",
      },
      {
        label: "Field Photo Capture",
        description: "Structured before/during/after documentation tied to specific job phases.",
      },
      {
        label: "Job Progress Reports",
        description: "Generate daily reports, moisture logs, and completion summaries for carriers.",
      },
    ],
    note: "Live PWA — fully operational and in active use.",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header */}
      <div className="bg-[#0f1e3c] px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-5">
              <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide">App Portal</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              Your LossStack Suite
            </h1>
            <p className="text-blue-200/60 text-base max-w-xl">
              Launch any app directly. Each app handles its own login — sign in once per app and you&apos;re in.
            </p>
          </motion.div>
        </div>
      </div>

      {/* App Cards */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {portalApps.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden"
            >
              {/* Card header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  {app.icon}
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${app.accentColor}15`, color: app.accentColor }}
                  >
                    {app.badge}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-[#0f1e3c] mb-1">{app.name}</h2>
                <p className="text-slate-400 text-xs leading-relaxed">{app.tagline}</p>
              </div>

              {/* Feature highlights */}
              <div className="px-6 pb-4 flex-1">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  Available Features
                </div>
                <ul className="space-y-3">
                  {app.highlights.map((h) => (
                    <li key={h.label} className="flex items-start gap-2.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: app.accentColor }}
                      />
                      <div>
                        <div className="text-xs font-semibold text-[#0f1e3c]">{h.label}</div>
                        <div className="text-xs text-slate-400 leading-relaxed">{h.description}</div>
                      </div>
                    </li>
                  ))}
                </ul>

                {app.note && (
                  <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                    <p className="text-xs text-slate-400 leading-relaxed">{app.note}</p>
                  </div>
                )}
              </div>

              {/* Launch button */}
              <div className="p-6 pt-4 border-t border-slate-100">
                <a
                  href={app.launchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: app.accentColor }}
                >
                  Open {app.name}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bundle CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-[#0f1e3c] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Package className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <div className="text-white font-bold text-lg mb-1">Not subscribed to all three?</div>
              <p className="text-blue-200/60 text-sm max-w-md">
                Bundle any 2 apps and save 15%, or all 3 for 25% off — billed monthly, cancel anytime.
              </p>
            </div>
          </div>
          <Link
            href="/pricing"
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm shrink-0"
          >
            View Bundle Pricing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
