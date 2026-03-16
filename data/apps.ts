export interface AppFeature {
  title: string;
  description: string;
}

export interface App {
  id: string;
  name: string;
  tagline: string;
  description: string;
  idealUser: string;
  useCases: string[];
  features: AppFeature[];
  accentColor: string;
  accentColorDark: string;
  iconBg: string;
  externalUrl: string;
  badge?: string;
}

export const apps: App[] = [
  {
    id: "appraisly",
    name: "Appraisly",
    tagline: "AI-powered appraisal workflows for claims professionals.",
    description:
      "Appraisly streamlines the appraisal and claims documentation process with intelligent narrative generation, estimate comparison, and multi-party review workflows — purpose-built for insurance professionals.",
    idealUser: "Public adjusters, independent appraisers, claims managers, and carrier desk reviewers.",
    useCases: [
      "Generate professional claim narratives in minutes",
      "Compare carrier vs. insured estimates side-by-side",
      "Organize and manage all claim documentation",
      "Produce polished, professional reports for submission",
    ],
    features: [
      {
        title: "AI Narrative Generation",
        description:
          "Automatically generate detailed, professional claim narratives from structured input — saving hours of manual writing.",
      },
      {
        title: "Estimate Comparison Tools",
        description:
          "Side-by-side comparison of carrier, insured, and appraiser estimates with variance analysis and line-item breakdowns.",
      },
      {
        title: "Multi-Party Review Workflows",
        description:
          "Structured review and approval flows for carrier vs. insured vs. appraiser perspectives with version tracking.",
      },
      {
        title: "Scope Analysis Assistance",
        description:
          "AI-assisted scope of loss review to identify gaps, inconsistencies, or missing line items in claim estimates.",
      },
      {
        title: "Professional Report Generation",
        description:
          "Export polished, branded appraisal reports ready for submission, mediation, or arbitration.",
      },
      {
        title: "Claim Documentation Organization",
        description:
          "Centralized document management for all claim files, correspondence, photos, and supporting evidence.",
      },
      {
        title: "Professional Output Formatting",
        description:
          "Consistent, court-ready formatting across all generated documents and exported reports.",
      },
      {
        title: "Fast Appraisal Support Workflows",
        description:
          "Guided step-by-step workflows that keep appraisers on track from first notice of loss to final resolution.",
      },
    ],
    accentColor: "#3B82F6",
    accentColorDark: "#1D4ED8",
    iconBg: "bg-blue-100",
    externalUrl: "https://appraislyai.com",
    badge: "Claims Intelligence",
  },
  {
    id: "imagelablr",
    name: "ImageLablr",
    tagline: "Intelligent photo labeling for claims documentation.",
    description:
      "ImageLablr gives adjusters and field teams a faster, smarter way to label and organize large sets of claims photos — ensuring consistent, export-ready photo documentation every time.",
    idealUser: "Adjusters, appraisers, restoration companies, and field inspectors managing high photo volumes.",
    useCases: [
      "Batch label hundreds of claim photos quickly and consistently",
      "Organize photos by room, elevation, or damage category",
      "Export photo sets in structured formats for reports",
      "Reduce admin time spent sorting and naming photos",
    ],
    features: [
      {
        title: "Smart Photo Labeling",
        description:
          "Quickly label photo contents — damage type, location, severity — with a streamlined workflow built for claims documentation.",
      },
      {
        title: "Batch Photo Processing",
        description:
          "Upload and process hundreds of photos at once with a structured categorization workflow built for speed.",
      },
      {
        title: "Room / Elevation / Category Tagging",
        description:
          "Tag by room type, elevation (front, rear, left, right), and damage category for precise, consistent organization.",
      },
      {
        title: "Export-Ready Organization",
        description:
          "Produce neatly structured photo packages ready for Xactimate, claim reports, or litigation support.",
      },
      {
        title: "Fast Claims Photo Documentation",
        description:
          "Cut hours off photo review with a faster, more structured labeling workflow that keeps your team consistent.",
      },
      {
        title: "Consistent Labeling at Scale",
        description:
          "Eliminate inconsistent naming conventions — every photo set follows a standardized structure regardless of who took the photos.",
      },
      {
        title: "Reduced Admin Time",
        description:
          "Free your team from manual photo sorting so they focus on higher-value claim review and resolution work.",
      },
      {
        title: "Better Photo Search & Organization",
        description:
          "Find any photo instantly by searching across labels, tags, rooms, and damage types.",
      },
    ],
    accentColor: "#0D9488",
    accentColorDark: "#0F766E",
    iconBg: "bg-teal-100",
    externalUrl: "https://www.imagelablr.com",
    badge: "Photo Intelligence",
  },
  {
    id: "restorecam",
    name: "RestoreCam",
    tagline: "AI-powered field documentation for restoration professionals.",
    description:
      "RestoreCam gives restoration technicians and project managers a structured, mobile-first tool to capture, organize, and report on jobsite conditions — with AI-assisted pricing lookups and photo labeling that keep your team ahead of competitors still working off spreadsheets.",
    idealUser: "Water mitigation techs, restoration PMs, contents specialists, and field crews on active jobs.",
    useCases: [
      "AI-assisted pricing lookups for accurate, fast line-item estimates",
      "AI photo labeling — auto-tag jobsite photos by room, phase, and damage type",
      "Document moisture readings and drying progress by room",
      "Generate progress and completion reports for carriers",
    ],
    features: [
      {
        title: "AI Photo Labeling",
        description:
          "AI automatically tags jobsite photos by room, job phase, and damage type — cutting the time your techs spend organizing documentation in the field.",
      },
      {
        title: "AI-Assisted Pricing",
        description:
          "Pull accurate restoration pricing on the fly with AI-powered lookups — so your estimates stay competitive and defensible without manual rate research.",
      },
      {
        title: "Restoration Photo Documentation",
        description:
          "Structured photo capture designed for restoration workflows — before, during, and after documentation tied to specific job phases.",
      },
      {
        title: "Moisture & Jobsite Documentation",
        description:
          "Log moisture readings, psychrometrics, and environmental data with room-level granularity and date-stamped records.",
      },
      {
        title: "Technician Field Capture Tools",
        description:
          "Mobile-optimized capture tools that work in the field — designed for speed, reliability, and offline use.",
      },
      {
        title: "Timeline & Room-Based Organization",
        description:
          "Every photo, reading, and note is organized by room and date — building a clear, defensible timeline of work performed.",
      },
      {
        title: "Reporting Support",
        description:
          "Generate structured daily reports, moisture logs, and job completion summaries for carriers and property owners.",
      },
      {
        title: "Job Progress Tracking",
        description:
          "Visual job dashboard tracking drying goals, open tasks, equipment status, and completion milestones across active jobs.",
      },
      {
        title: "Equipment & Room Documentation",
        description:
          "Track equipment placement, serial numbers, and daily readings per room — ensuring full chain-of-custody documentation.",
      },
      {
        title: "Admin & Field Collaboration",
        description:
          "Real-time sync between field techs and back-office staff so everyone has current job status without phone calls or email chains.",
      },
    ],
    accentColor: "#F59E0B",
    accentColorDark: "#D97706",
    iconBg: "bg-amber-100",
    externalUrl: "https://www.restorecam.com",
    badge: "Field Operations",
  },
];

export function getAppById(id: string): App | undefined {
  return apps.find((a) => a.id === id);
}
