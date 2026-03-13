export type StatusLevel = "operational" | "degraded" | "down" | "maintenance";

export interface AppStatus {
  appId: string;
  name: string;
  url: string;
  status: StatusLevel;
  note?: string;
}

export interface Incident {
  id: string;
  date: string; // ISO date string e.g. "2026-04-01"
  title: string;
  body: string;
  affected: string[]; // appIds affected, or ["all"]
  resolved: boolean;
}

// ─── EDIT THIS to update live status ───────────────────────────────────────
export const appStatuses: AppStatus[] = [
  {
    appId: "appraisly",
    name: "Appraisly",
    url: "https://appraislyai.com",
    status: "operational",
  },
  {
    appId: "imagelablr",
    name: "ImageLablr",
    url: "https://www.imagelablr.com",
    status: "operational",
  },
  {
    appId: "restorecam",
    name: "RestoreCam",
    url: "https://www.restorecam.com",
    status: "operational",
  },
  {
    appId: "lossstack",
    name: "LossStack Platform",
    url: "https://lossstack.com",
    status: "operational",
  },
];

// ─── EDIT THIS to add/remove incidents ─────────────────────────────────────
export const incidents: Incident[] = [
  // Example (delete this when you post real ones):
  // {
  //   id: "inc-001",
  //   date: "2026-04-01",
  //   title: "Appraisly narrative generation delayed",
  //   body: "We are investigating reports of slow response times on Appraisly AI narrative generation. All other features are unaffected.",
  //   affected: ["appraisly"],
  //   resolved: false,
  // },
];

export const lastUpdated = "2026-03-13";
