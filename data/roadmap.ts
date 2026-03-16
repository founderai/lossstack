export type RoadmapStatus = "shipped" | "in_progress" | "coming_soon" | "planned";

export interface RoadmapItem {
  id: string;
  app: "appraisly" | "imagelablr" | "restorecam" | "lossstack";
  title: string;
  description: string;
  status: RoadmapStatus;
  quarter?: string; // e.g. "Q2 2026"
}

// ─── EDIT THIS (or use the Admin page) to update the public roadmap ──────────
export const roadmapItems: RoadmapItem[] = [
  {
    id: "r-001",
    app: "imagelablr",
    title: "Video Damage Documentation",
    description: "Upload and annotate video walkthroughs alongside photo documentation.",
    status: "coming_soon",
  },
  {
    id: "r-002",
    app: "lossstack",
    title: "Native iOS & Android Apps",
    description: "All three apps available on the App Store and Google Play.",
    status: "coming_soon",
  },
];

export const statusConfig: Record<RoadmapStatus, { label: string; color: string; bg: string; border: string }> = {
  shipped: {
    label: "Shipped",
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-200",
  },
  in_progress: {
    label: "In Progress",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  coming_soon: {
    label: "Coming Soon",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  planned: {
    label: "Planned",
    color: "text-slate-600",
    bg: "bg-slate-50",
    border: "border-slate-200",
  },
};
