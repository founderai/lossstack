"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";
import { App } from "@/data/apps";
import { cn } from "@/lib/utils";

interface AppCardProps {
  app: App;
  index?: number;
  variant?: "grid" | "featured";
}

export default function AppCard({ app, index = 0, variant = "grid" }: AppCardProps) {
  const appIconMap: Record<string, string> = {
    appraisly: "A",
    imagelablr: "IL",
    restorecam: "RC",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.45, ease: "easeOut" as const }}
      className={cn(
        "group bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden",
        variant === "featured" && "lg:flex"
      )}
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: app.accentColor }}
      />

      <div className={cn("p-6", variant === "featured" && "lg:flex-1")}>
        {/* App icon + badge */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: `${app.accentColor}18`, color: app.accentColor }}
          >
            {appIconMap[app.id] ?? app.name.slice(0, 2).toUpperCase()}
          </div>
          {app.badge && (
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: `${app.accentColor}18`, color: app.accentColor }}
            >
              {app.badge}
            </span>
          )}
        </div>

        {/* Name + tagline */}
        <h3 className="text-[#0f1e3c] font-bold text-lg mb-1">{app.name}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">{app.tagline}</p>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-5">{app.description}</p>

        {/* Use cases */}
        <ul className="space-y-1.5 mb-6">
          {app.useCases.slice(0, 3).map((uc, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span
                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: app.accentColor }}
              />
              {uc}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          <Link
            href={app.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all duration-150"
            style={{ backgroundColor: app.accentColor }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Visit Website
          </Link>
          <Link
            href={`/apps#${app.id}`}
            className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-[#0f1e3c] transition-colors"
          >
            Learn More
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
