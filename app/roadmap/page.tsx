import Footer from "@/components/sections/Footer";
import { CheckCircle, Loader2, Sparkles, Calendar } from "lucide-react";
import { roadmapItems, statusConfig, type RoadmapStatus } from "@/data/roadmap";

export const metadata = {
  title: "Roadmap | LossStack",
  description: "See what's shipped, in progress, and coming soon across the LossStack suite.",
};

const appConfig = {
  appraisly:  { label: "Appraisly",  color: "#3B82F6", bg: "bg-blue-50",   border: "border-blue-100"  },
  imagelablr: { label: "ImageLablr", color: "#0D9488", bg: "bg-teal-50",   border: "border-teal-100"  },
  restorecam: { label: "RestoreCam", color: "#F59E0B", bg: "bg-amber-50",  border: "border-amber-100" },
  lossstack:  { label: "LossStack",  color: "#6366F1", bg: "bg-indigo-50", border: "border-indigo-100" },
};

const statusOrder: RoadmapStatus[] = ["in_progress", "coming_soon", "planned", "shipped"];

const statusIcons: Record<RoadmapStatus, React.ReactNode> = {
  shipped:     <CheckCircle className="w-4 h-4 text-teal-500" />,
  in_progress: <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />,
  coming_soon: <Sparkles className="w-4 h-4 text-amber-500" />,
  planned:     <Calendar className="w-4 h-4 text-slate-400" />,
};

export default function RoadmapPage() {
  const grouped = statusOrder.map((status) => ({
    status,
    items: roadmapItems.filter((i) => i.status === status),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header */}
      <div className="bg-[#0f1e3c] px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-blue-300/70 text-xs font-semibold uppercase tracking-wide mb-2">Product Roadmap</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">What we&apos;re building</h1>
          <p className="text-blue-200/60 text-base max-w-xl">
            Shipped features, work in progress, and what&apos;s coming next across all three apps.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {grouped.map(({ status, items }) => {
          const cfg = statusConfig[status];
          return (
            <section key={status}>
              {/* Section heading */}
              <div className="flex items-center gap-3 mb-5">
                {statusIcons[status]}
                <h2 className={`text-base font-bold ${cfg.color}`}>{cfg.label}</h2>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                  {items.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item) => {
                  const app = appConfig[item.app];
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <span
                          className="text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0"
                          style={{ backgroundColor: `${app.color}15`, color: app.color }}
                        >
                          {app.label}
                        </span>
                        {item.quarter && (
                          <span className="text-xs text-slate-400 shrink-0">{item.quarter}</span>
                        )}
                      </div>
                      <h3 className="font-bold text-[#0f1e3c] text-sm mb-1">{item.title}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <div className="bg-[#0f1e3c] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <div className="text-white font-bold text-base mb-1">Have a feature request?</div>
            <p className="text-blue-200/60 text-sm">We&apos;d love to hear what would make LossStack better for your workflow.</p>
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
