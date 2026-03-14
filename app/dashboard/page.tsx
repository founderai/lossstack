"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/sections/Footer";

const portalApps = [
  {
    id: "appraisly",
    name: "Appraisly",
    badge: "Claims Intelligence",
    tagline: "AI-powered appraisal workflows for insurance professionals.",
    accentColor: "#3B82F6",
    launchUrl: "https://appraislyai.com",
    icon: (
      <Image
        src="/Appraisly Icon.png"
        alt="Appraisly"
        width={48}
        height={48}
        className="w-12 h-12 object-contain rounded-xl"
      />
    ),
  },
  {
    id: "imagelablr",
    name: "ImageLablr",
    badge: "Photo Intelligence",
    tagline: "AI photo labeling and documentation for claims.",
    accentColor: "#0D9488",
    launchUrl: "https://www.imagelablr.com",
    icon: (
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm"
        style={{ backgroundColor: "#0D948818", color: "#0D9488" }}
      >
        IL
      </div>
    ),
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
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header */}
      <div className="bg-[#0f1e3c] px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-5">
              <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide">App Portal</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Your LossStack Suite</h1>
            <p className="text-blue-200/60 text-base max-w-xl">
              Select an app to open it. Each app handles its own login.
            </p>
          </motion.div>
        </div>
      </div>

      {/* App Tabs */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {portalApps.map((app, i) => (
            <motion.a
              key={app.id}
              href={app.launchUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center gap-4 group cursor-pointer hover:shadow-md transition-shadow"
            >
              {app.icon}
              <div>
                <div className="font-bold text-[#0f1e3c] text-base mb-1">{app.name}</div>
                <div className="text-slate-400 text-xs leading-relaxed">{app.tagline}</div>
              </div>
              <div
                className="flex items-center gap-1.5 text-xs font-semibold mt-auto"
                style={{ color: app.accentColor }}
              >
                Open App <ExternalLink className="w-3 h-3" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bundle CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
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
