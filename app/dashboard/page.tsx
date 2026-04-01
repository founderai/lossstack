"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Footer from "@/components/sections/Footer";

const portalApps = [
  {
    id: "appraisly",
    name: "Appraisly",
    tagline: "AI-powered appraisal workflows for insurance professionals.",
    accentColor: "#3B82F6",
    launchUrl: "https://appraislyai.com/appraisly",
    logo: (
      <div className="flex items-center justify-center w-full h-24">
        <Image
          src="/Appraisly Logo.png"
          alt="Appraisly"
          width={200}
          height={80}
          className="max-w-40 max-h-20 w-auto h-auto object-contain"
        />
      </div>
    ),
  },
  {
    id: "imagelablr",
    name: "ImageLablr",
    tagline: "AI photo labeling and documentation for claims.",
    accentColor: "#0D9488",
    launchUrl: "https://www.imagelablr.com/dashboard",
    logo: (
      <div className="flex items-center justify-center w-full h-24">
        <Image
          src="/Imagelablr Vector.svg"
          alt="ImageLablr"
          width={200}
          height={80}
          className="max-w-40 max-h-20 w-auto h-auto object-contain"
        />
      </div>
    ),
  },
  {
    id: "restorecam",
    name: "RestoreCam",
    tagline: "Field-first documentation for restoration professionals.",
    accentColor: "#F59E0B",
    launchUrl: "https://www.restorecam.com/contents",
    logo: (
      <div className="flex items-center justify-center w-full h-24">
        <Image
          src="/RestoreCam Logo Bottom .png"
          alt="RestoreCam"
          width={200}
          height={80}
          className="max-w-40 max-h-20 w-auto h-auto object-contain"
        />
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
              Select an app to open it. You&apos;re already signed in.
            </p>
          </motion.div>
        </div>
      </div>

      {/* App Tabs */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {portalApps.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              onClick={() => window.open(app.launchUrl, "_blank", "noopener,noreferrer")}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center gap-4 group cursor-pointer hover:shadow-md transition-shadow"
            >
              {app.logo}
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
            </motion.div>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  );
}
