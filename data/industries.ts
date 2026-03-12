export interface Industry {
  slug: string;
  name: string;
  plural: string;
  title: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
  problems: { heading: string; body: string }[];
  apps: ("imagelablr" | "restorecam" | "appraisly")[];
}

export const industries: Industry[] = [
  {
    slug: "software-for-roofers",
    name: "Roofer",
    plural: "Roofers",
    title: "Best Software for Roofers — Photo Labeling, Documentation & Estimates | LossStack",
    metaDescription: "LossStack gives roofers AI-powered tools to document damage, label photos, and compare insurance estimates. Save hours per job. Built for roofing professionals.",
    heroHeading: "Software Built for Roofing Professionals",
    heroSubheading: "Stop losing money to poor documentation. LossStack gives roofers the tools to capture, organize, and present damage evidence that gets claims approved faster.",
    problems: [
      { heading: "Disorganized photos cost roofers claims", body: "When adjusters can't match photos to damage locations, supplements get denied. Most roofers lose thousands of dollars per year to documentation gaps that are completely avoidable." },
      { heading: "Manual estimate comparison wastes hours", body: "Comparing your scope to the adjuster's Xactimate line by line takes hours. Missed line items mean money left on the table — on every single job." },
      { heading: "No standardized field documentation process", body: "Every crew documents differently. That inconsistency leads to disputes, delays, and unpaid supplements." },
    ],
    apps: ["imagelablr", "restorecam", "appraisly"],
  },
  {
    slug: "software-for-restoration-companies",
    name: "Restoration Company",
    plural: "Restoration Companies",
    title: "Best Software for Restoration Companies — Documentation & Claims Tools | LossStack",
    metaDescription: "LossStack helps restoration companies document jobs faster, organize photo evidence, and process insurance claims more efficiently. Purpose-built for restoration pros.",
    heroHeading: "Software Built for Restoration Companies",
    heroSubheading: "From first response to final invoice — LossStack gives restoration teams the documentation tools to get paid faster and close more claims without the paperwork headaches.",
    problems: [
      { heading: "Job documentation takes too long", body: "Walking every room, capturing every detail, and organizing it into a readable report takes hours your team doesn't have — especially on multi-day mitigation jobs." },
      { heading: "Photo evidence gets lost or mislabeled", body: "Hundreds of photos per job, disorganized in a camera roll. When an adjuster asks for documentation of a specific area, finding the right photo wastes everyone's time." },
      { heading: "Estimates don't reflect the true scope of damage", body: "Insurance adjusters routinely under-scope restoration jobs. Without a systematic way to compare your scope to theirs, you leave money on every job." },
    ],
    apps: ["imagelablr", "restorecam", "appraisly"],
  },
  {
    slug: "software-for-insurance-adjusters",
    name: "Insurance Adjuster",
    plural: "Insurance Adjusters",
    title: "Best Software for Insurance Adjusters — Photo, Documentation & Estimate Tools | LossStack",
    metaDescription: "LossStack gives insurance adjusters AI-powered photo labeling, field documentation, and estimate comparison tools. Close claims faster with better evidence.",
    heroHeading: "Software Built for Insurance Adjusters",
    heroSubheading: "Close more claims, faster. LossStack gives adjusters the tools to capture organized photo evidence, document field conditions, and compare estimates with precision.",
    problems: [
      { heading: "Unorganized photo submissions delay claims", body: "When contractors submit hundreds of unlabeled photos, adjusters waste hours trying to match images to damage locations before they can even begin scoping." },
      { heading: "Field documentation is inconsistent across claims", body: "Every contractor documents differently. Standardizing what you receive — and what you capture yourself — is the key to faster claim cycles." },
      { heading: "Estimate discrepancies are hard to track", body: "Comparing a contractor's scope to your internal estimate line by line is tedious and error-prone. Missed discrepancies slow approvals and create disputes." },
    ],
    apps: ["imagelablr", "restorecam", "appraisly"],
  },
  {
    slug: "software-for-contractors",
    name: "Contractor",
    plural: "Contractors",
    title: "Best Software for Contractors — Insurance Claims Documentation Tools | LossStack",
    metaDescription: "LossStack helps contractors document damage, organize photo evidence, and compare insurance estimates to get claims approved and paid faster.",
    heroHeading: "Software Built for Contractors Working Insurance Claims",
    heroSubheading: "Every dollar you leave on the table comes from documentation gaps. LossStack gives contractors the tools to capture, organize, and present airtight claims packages.",
    problems: [
      { heading: "Insurance adjusters reject under-documented claims", body: "If you can't show exactly where the damage is, how extensive it is, and what it will cost to repair — the adjuster will lowball the scope. Documentation is your leverage." },
      { heading: "Organizing job photos is a full-time job", body: "Most contractors spend hours after every job just sorting photos. That time is unbillable, and it still results in disorganized submissions that slow approvals." },
      { heading: "You're leaving money in estimates you can't verify", body: "Without a way to compare your scope to the adjuster's Xactimate line by line, you can't know what's missing. Most contractors lose 10–20% of potential revenue this way." },
    ],
    apps: ["imagelablr", "restorecam", "appraisly"],
  },
  {
    slug: "software-for-public-adjusters",
    name: "Public Adjuster",
    plural: "Public Adjusters",
    title: "Best Software for Public Adjusters — Claims Documentation & Estimate Tools | LossStack",
    metaDescription: "LossStack gives public adjusters AI-powered tools to document losses, organize photo evidence, and compare estimates to maximize claim settlements.",
    heroHeading: "Software Built for Public Adjusters",
    heroSubheading: "Your value is in finding what the insurance company missed. LossStack gives you the documentation and estimate tools to prove it — and get your clients paid.",
    problems: [
      { heading: "Every undocumented item is lost settlement money", body: "Public adjusters win on details. Every photo without a label, every damage item without documentation, every line item not captured is money your client won't recover." },
      { heading: "Building a compelling claim package takes too long", body: "Assembling organized photo evidence, damage notes, and scope comparisons by hand is the most time-consuming part of the job — and it shouldn't be." },
      { heading: "Estimate gaps are hard to identify and prove", body: "Proving that an insurance company under-scoped a loss requires a systematic, side-by-side comparison. Doing that manually is slow and easy to miss things." },
    ],
    apps: ["imagelablr", "restorecam", "appraisly"],
  },
  {
    slug: "software-for-mitigation-companies",
    name: "Mitigation Company",
    plural: "Mitigation Companies",
    title: "Best Software for Mitigation Companies — Water & Fire Damage Documentation | LossStack",
    metaDescription: "LossStack gives mitigation companies tools to document water and fire damage, organize photo evidence, and process insurance claims faster. Purpose-built for mitigation pros.",
    heroHeading: "Software Built for Mitigation Companies",
    heroSubheading: "Mitigation jobs move fast. Your documentation needs to keep up. LossStack gives mitigation teams the tools to capture complete evidence from day one — before anything dries out.",
    problems: [
      { heading: "Mitigation documentation windows are short", body: "Water damage evidence disappears as jobs progress. If you don't capture organized, labeled documentation at every stage — from initial response to final dry-out — you can't prove your scope." },
      { heading: "Equipment logs and monitoring data aren't connected to photo evidence", body: "Disconnected documentation means adjusters question your equipment placement, drying times, and scope. Every gap is a reason to cut your invoice." },
      { heading: "Getting paid for the full mitigation scope is a fight", body: "Insurance companies routinely challenge mitigation invoices without detailed documentation to back every line item. The companies that get paid are the ones who document everything." },
    ],
    apps: ["imagelablr", "restorecam", "appraisly"],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
