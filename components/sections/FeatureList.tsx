"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { App } from "@/data/apps";

interface FeatureListProps {
  app: App;
}

export default function FeatureList({ app }: FeatureListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {app.features.map((feature, i) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" as const }}
          className="flex gap-3 p-4 bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all duration-150"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{ backgroundColor: `${app.accentColor}18` }}
          >
            <Check className="w-3.5 h-3.5" style={{ color: app.accentColor }} />
          </div>
          <div>
            <div className="text-[#0f1e3c] font-semibold text-sm mb-0.5">{feature.title}</div>
            <div className="text-slate-500 text-sm leading-relaxed">{feature.description}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
