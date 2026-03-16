import Footer from "@/components/sections/Footer";
import { Sparkles } from "lucide-react";
import { readFileSync } from "fs";
import { join } from "path";

export const metadata = {
  title: "Roadmap | LossStack",
  description: "See what's coming next across the LossStack suite.",
};

export const revalidate = 0;

const appConfig: Record<string, { label: string; color: string }> = {
  appraisly:  { label: "Appraisly",  color: "#3B82F6" },
  imagelablr: { label: "ImageLablr", color: "#0D9488" },
  restorecam: { label: "RestoreCam", color: "#F59E0B" },
  lossstack:  { label: "All Apps",   color: "#6366F1" },
};

interface RoadmapItem {
  id: string;
  app: string;
  title: string;
  description: string;
  status: string;
  quarter?: string;
}

function getRoadmapItems(): RoadmapItem[] {
  try {
    const file = join(process.cwd(), "data", "roadmap.json");
    return JSON.parse(readFileSync(file, "utf-8"));
  } catch {
    return [];
  }
}

export default function RoadmapPage() {
  const roadmapItems = getRoadmapItems();

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header */}
      <div className="bg-[#0f1e3c] px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-blue-300/70 text-xs font-semibold uppercase tracking-wide mb-2">Product Roadmap</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Coming Soon</h1>
          <p className="text-blue-200/60 text-base max-w-xl">
            Here&apos;s what we&apos;re building next across the LossStack suite.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {roadmapItems.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            Nothing announced yet — check back soon.
          </div>
        ) : (
          <div className="space-y-4">
            {roadmapItems.map((item) => {
              const app = appConfig[item.app] ?? { label: item.app, color: "#6366F1" };
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-start gap-4"
                >
                  <div
                    className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${app.color}15` }}
                  >
                    <Sparkles className="w-4 h-4" style={{ color: app.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-[#0f1e3c] text-sm">{item.title}</h3>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
                        style={{ backgroundColor: `${app.color}15`, color: app.color }}
                      >
                        {app.label}
                      </span>
                      {item.quarter && (
                        <span className="text-xs text-slate-400 shrink-0">{item.quarter}</span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="bg-[#0f1e3c] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-5 mt-10">
          <div>
            <div className="text-white font-bold text-base mb-1">Have a feature request?</div>
            <p className="text-blue-200/60 text-sm">We&apos;d love to hear what would make LossStack better.</p>
          </div>
          <a
            href="mailto:founderai@pm.me?subject=LossStack Feature Request"
            className="flex items-center gap-2 bg-white text-[#0f1e3c] font-bold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors text-sm shrink-0"
          >
            Send a Request
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
