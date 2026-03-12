"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AppCTAProps {
  app: "imagelablr" | "restorecam" | "appraisly";
  context?: string;
}

const appConfig = {
  imagelablr: {
    name: "ImageLablr",
    tagline: "AI-powered photo labeling for claims professionals.",
    url: "https://imagelablr.com",
    color: "#00c9c9",
    bg: "bg-[#e6fafa]",
    border: "border-[#00c9c9]/30",
    btnBg: "bg-[#00c9c9]",
    btnHover: "hover:bg-[#00b0b0]",
    description: "Stop spending hours sorting job photos. ImageLablr automatically labels, organizes, and packages your photos into adjuster-ready submissions.",
  },
  restorecam: {
    name: "RestoreCam",
    tagline: "Field documentation software for restoration professionals.",
    url: "https://restorecam.com",
    color: "#0B4DA2",
    bg: "bg-[#e8f0fb]",
    border: "border-[#0B4DA2]/30",
    btnBg: "bg-[#0B4DA2]",
    btnHover: "hover:bg-[#0a3d80]",
    description: "Capture GPS-tagged photos, voice notes, and room-by-room condition reports from the field. Build professional documentation packages in minutes.",
  },
  appraisly: {
    name: "Appraisly",
    tagline: "AI-powered estimate comparison for insurance claims.",
    url: "https://appraislyai.com",
    color: "#2563eb",
    bg: "bg-[#eff6ff]",
    border: "border-[#2563eb]/30",
    btnBg: "bg-[#2563eb]",
    btnHover: "hover:bg-[#1d4ed8]",
    description: "Compare your estimate to the insurance company's Xactimate scope line by line. Find missing items, identify discrepancies, and supplement with confidence.",
  },
};

export default function InternalCTA({ app, context }: AppCTAProps) {
  const cfg = appConfig[app];
  return (
    <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-6 flex flex-col md:flex-row items-start md:items-center gap-4`}>
      <div className="flex-1">
        <div className="font-bold text-[#0f1e3c] text-lg mb-1">{cfg.name}</div>
        <p className="text-slate-600 text-sm leading-relaxed">{context || cfg.description}</p>
      </div>
      <Link
        href={cfg.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`shrink-0 inline-flex items-center gap-2 ${cfg.btnBg} ${cfg.btnHover} text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors`}
      >
        Try {cfg.name} Free
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
