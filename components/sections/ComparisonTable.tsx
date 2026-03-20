"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { apps } from "@/data/apps";
import { cn } from "@/lib/utils";

const capabilities = [
  { label: "AI-powered document generation", appraisly: true, imagelablr: false, restorecam: false },
  { label: "Estimate comparison & scope analysis", appraisly: true, imagelablr: false, restorecam: false },
  { label: "Multi-party review workflows", appraisly: true, imagelablr: false, restorecam: false },
  { label: "Professional report export", appraisly: true, imagelablr: true, restorecam: true },
  { label: "AI photo labeling & categorization", appraisly: false, imagelablr: true, restorecam: false },
  { label: "Batch photo processing", appraisly: false, imagelablr: true, restorecam: false },
  { label: "Room / elevation tagging", appraisly: false, imagelablr: true, restorecam: true },
  { label: "Export-ready photo packages", appraisly: false, imagelablr: true, restorecam: false },
  { label: "Field capture & mobile tools", appraisly: false, imagelablr: false, restorecam: true },
  { label: "Moisture & jobsite documentation", appraisly: false, imagelablr: false, restorecam: true },
  { label: "Equipment tracking & logging", appraisly: false, imagelablr: false, restorecam: true },
  { label: "Job progress & timeline tracking", appraisly: false, imagelablr: false, restorecam: true },
  { label: "Admin & field team collaboration", appraisly: false, imagelablr: false, restorecam: true },
  { label: "Claims documentation organization", appraisly: true, imagelablr: true, restorecam: true },
];

const appColors: Record<string, string> = {
  appraisly: "#3B82F6",
  imagelablr: "#0D9488",
  restorecam: "#F59E0B",
};

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <motion.table
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="w-full min-w-170 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
      >
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left px-5 py-4 text-slate-500 font-medium text-sm w-[40%]">
              Capability
            </th>
            {apps.map((app) => (
              <th key={app.id} className="px-4 py-4 text-center w-[20%]">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: `${appColors[app.id]}18`,
                      color: appColors[app.id],
                    }}
                  >
                    {app.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[#0f1e3c] font-bold text-sm">{app.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {capabilities.map((cap, i) => (
            <tr
              key={cap.label}
              className={cn(
                "hover:bg-slate-50/50 transition-colors",
                i % 2 === 0 ? "bg-white" : "bg-slate-50/30"
              )}
            >
              <td className="px-5 py-3 text-slate-600 text-sm">{cap.label}</td>
              {apps.map((app) => {
                const included = cap[app.id as keyof typeof cap] as boolean;
                return (
                  <td key={app.id} className="px-4 py-3 text-center">
                    {included ? (
                      <div className="flex justify-center">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${appColors[app.id]}18` }}
                        >
                          <Check
                            className="w-3 h-3"
                            style={{ color: appColors[app.id] }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <Minus className="w-4 h-4 text-slate-200" />
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="border-t-2 border-slate-200 bg-white">
            <td className="px-5 py-3 text-slate-700 font-semibold text-sm">Best for</td>
            <td className="px-4 py-3 text-center text-slate-500 text-xs">Adjusters & Appraisers</td>
            <td className="px-4 py-3 text-center text-slate-500 text-xs">Claims Documentation Teams</td>
            <td className="px-4 py-3 text-center text-slate-500 text-xs">Restoration Contractors</td>
          </tr>
        </tfoot>
      </motion.table>
    </div>
  );
}
