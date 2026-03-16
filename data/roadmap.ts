export type RoadmapStatus = "shipped" | "in_progress" | "coming_soon" | "planned";

export interface RoadmapItem {
  id: string;
  app: "appraisly" | "imagelablr" | "restorecam" | "lossstack";
  title: string;
  description: string;
  status: RoadmapStatus;
  quarter?: string; // e.g. "Q2 2026"
}

// ─── EDIT THIS to update the public roadmap ────────────────────────────────
export const roadmapItems: RoadmapItem[] = [
  // Shipped
  {
    id: "r-001",
    app: "appraisly",
    title: "AppraislyScope AI Narrative Generation",
    description: "Generate professional claim narratives from structured scope input in seconds.",
    status: "shipped",
  },
  {
    id: "r-002",
    app: "imagelablr",
    title: "AI Batch Photo Labeling",
    description: "Automatically label and categorize hundreds of claim photos at once.",
    status: "shipped",
  },
  {
    id: "r-003",
    app: "restorecam",
    title: "Moisture Documentation & Job Tracking",
    description: "Room-level moisture logs, psychrometrics, and job progress tracking.",
    status: "shipped",
  },
  // In Progress
  {
    id: "r-004",
    app: "lossstack",
    title: "LossStack Subscriber Dashboard",
    description: "Central portal to launch all three apps from one place.",
    status: "in_progress",
    quarter: "Q2 2026",
  },
  {
    id: "r-005",
    app: "appraisly",
    title: "Mail Merge & Document Automation",
    description: "Populate claim letters, reports, and templates automatically from scope data.",
    status: "in_progress",
    quarter: "Q2 2026",
  },
  // Coming Soon
  {
    id: "r-006",
    app: "imagelablr",
    title: "Xactimate Export Integration",
    description: "Export labeled photo packages directly in Xactimate-compatible format.",
    status: "coming_soon",
    quarter: "Q2 2026",
  },
  {
    id: "r-007",
    app: "restorecam",
    title: "Equipment Placement & Chain of Custody",
    description: "Track equipment serial numbers, placement, and daily readings per room.",
    status: "coming_soon",
    quarter: "Q2 2026",
  },
  // Planned
  {
    id: "r-008",
    app: "lossstack",
    title: "Native iOS & Android Apps",
    description: "All three apps available on the App Store and Google Play.",
    status: "planned",
    quarter: "Q3 2026",
  },
  {
    id: "r-009",
    app: "appraisly",
    title: "Carrier Estimate Integration",
    description: "Direct import of carrier estimates for side-by-side comparison workflows.",
    status: "planned",
    quarter: "Q3 2026",
  },
  {
    id: "r-010",
    app: "imagelablr",
    title: "Video Damage Documentation",
    description: "Upload and annotate video walkthroughs alongside photo documentation.",
    status: "planned",
    quarter: "Q3 2026",
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
