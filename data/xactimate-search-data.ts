export interface XactimateLineItemRecord {
  code: string;
  description: string;
  trade: string;
  category: string;
  unit: string;
  damageTypes: string[];
  typicalRange: string;
  notes: string;
  tags: string[];
}

export interface XactimateCategoryRecord {
  categoryCode: string;
  trade: string;
  topic: string;
  damageTypes: string[];
  commonItems: XactimateLineItemRecord[];
  relatedChecks: string[];
  scopeNotes: string[];
  oftenMissed: string[];
}

export const xactimateLineItems: XactimateLineItemRecord[] = [
  // ROOFING
  { code: "RFG 240", description: "Roofing — arch comp shingles (30yr)", trade: "Roofing", category: "RFG", unit: "SQ", damageTypes: ["hail", "wind", "age"], typicalRange: "$180–$280/SQ", notes: "Most common shingle code. Verify grade matches existing materials.", tags: ["shingles", "replacement", "architectural"] },
  { code: "RFG 242", description: "Roofing — arch comp shingles (40-50yr)", trade: "Roofing", category: "RFG", unit: "SQ", damageTypes: ["hail", "wind"], typicalRange: "$210–$320/SQ", notes: "Premium grade. Supplement from RFG 240 if existing were premium.", tags: ["shingles", "premium", "architectural"] },
  { code: "RFG 226", description: "Starter — comp shingles", trade: "Roofing", category: "RFG", unit: "LF", damageTypes: ["hail", "wind"], typicalRange: "$2.50–$4.50/LF", notes: "Frequently omitted. Required at all eaves and rakes.", tags: ["starter", "eave", "often-missed"] },
  { code: "RFG 252", description: "Ridge cap — comp shingles", trade: "Roofing", category: "RFG", unit: "LF", damageTypes: ["hail", "wind"], typicalRange: "$4.50–$8.00/LF", notes: "Separate from field shingles. Often under-counted.", tags: ["ridge", "cap", "often-missed"] },
  { code: "RFG 180", description: "Remove roofing — comp shingles (1 layer)", trade: "Roofing", category: "RFG", unit: "SQ", damageTypes: ["hail", "wind", "fire"], typicalRange: "$45–$95/SQ", notes: "Standard single-layer tear-off.", tags: ["tear-off", "removal", "demo"] },
  { code: "RFG 181", description: "Remove roofing — comp shingles (2 layers)", trade: "Roofing", category: "RFG", unit: "SQ", damageTypes: ["hail", "wind"], typicalRange: "$75–$140/SQ", notes: "Higher labor for multi-layer. Document layer count in photos.", tags: ["tear-off", "removal", "demo", "multi-layer"] },
  { code: "RFG 188", description: "Haul debris", trade: "Roofing", category: "RFG", unit: "SQ", damageTypes: ["hail", "wind", "fire"], typicalRange: "$25–$45/SQ", notes: "Disposal separate from removal in most markets.", tags: ["disposal", "debris", "haul"] },
  { code: "RFG 356", description: "Synthetic underlayment", trade: "Roofing", category: "RFG", unit: "SQ", damageTypes: ["hail", "wind"], typicalRange: "$18–$35/SQ", notes: "Code upgrade if existing was felt paper. Often missed.", tags: ["underlayment", "code-upgrade", "often-missed"] },
  { code: "RFG 358", description: "Ice & water shield", trade: "Roofing", category: "RFG", unit: "SQ", damageTypes: ["hail", "wind", "water"], typicalRange: "$55–$85/SQ", notes: "Required at eaves, valleys, skylights per local code.", tags: ["ice-water-shield", "code-upgrade", "often-missed"] },
  { code: "RFG 270", description: "Drip edge — aluminum", trade: "Roofing", category: "RFG", unit: "LF", damageTypes: ["hail", "wind"], typicalRange: "$1.50–$3.50/LF", notes: "All eaves and rakes. Code requirement. Frequently omitted.", tags: ["drip-edge", "code-upgrade", "often-missed"] },
  { code: "RFG 281", description: "Flashing — step flashing", trade: "Roofing", category: "RFG", unit: "LF", damageTypes: ["hail", "wind", "water"], typicalRange: "$4.00–$8.50/LF", notes: "All wall intersections. Count from site photos.", tags: ["flashing", "step", "wall"] },
  { code: "RFG 290", description: "Pipe flashing — lead or rubber", trade: "Roofing", category: "RFG", unit: "EA", damageTypes: ["hail", "wind"], typicalRange: "$35–$65/EA", notes: "Each pipe penetration. Often under-counted.", tags: ["pipe", "boot", "penetration", "often-missed"] },
  { code: "RFG 310", description: "Ridge vent", trade: "Roofing", category: "RFG", unit: "LF", damageTypes: ["hail", "wind"], typicalRange: "$5.00–$9.00/LF", notes: "Required by most shingle manufacturers for warranty.", tags: ["vent", "ridge", "ventilation"] },
  // SIDING
  { code: "SID 160", description: "Vinyl siding — double 4\"", trade: "Siding", category: "SID", unit: "SF", damageTypes: ["hail", "wind"], typicalRange: "$2.50–$5.50/SF", notes: "Most common profile. Measure all affected elevations.", tags: ["vinyl", "siding", "double-4"] },
  { code: "SID 204", description: "Fiber cement siding — lap", trade: "Siding", category: "SID", unit: "SF", damageTypes: ["hail", "wind", "fire"], typicalRange: "$4.00–$7.50/SF", notes: "Hardie board and similar. Higher cost than vinyl.", tags: ["fiber-cement", "hardie", "siding"] },
  { code: "SID 180", description: "Corner post — vinyl", trade: "Siding", category: "SID", unit: "LF", damageTypes: ["hail", "wind"], typicalRange: "$2.50–$5.00/LF", notes: "All exterior corners. Frequently omitted.", tags: ["corner", "post", "vinyl", "often-missed"] },
  { code: "SID 270", description: "Soffit — vinyl vented", trade: "Siding", category: "SID", unit: "SF", damageTypes: ["hail", "wind"], typicalRange: "$3.00–$6.00/SF", notes: "All soffit areas — separate from wall siding.", tags: ["soffit", "vinyl", "often-missed"] },
  { code: "SID 275", description: "Fascia — aluminum wrap", trade: "Siding", category: "SID", unit: "LF", damageTypes: ["hail", "wind"], typicalRange: "$3.50–$7.00/LF", notes: "All fascia linear footage.", tags: ["fascia", "aluminum", "wrap"] },
  // DRYWALL
  { code: "DRY 200", description: "Drywall 1/2\" — hung, taped, floated, ready for paint", trade: "Drywall", category: "DRY", unit: "SF", damageTypes: ["water", "fire"], typicalRange: "$2.50–$4.50/SF", notes: "Standard residential — complete system to paint-ready.", tags: ["drywall", "install", "half-inch"] },
  { code: "DRY 120", description: "Remove drywall", trade: "Drywall", category: "DRY", unit: "SF", damageTypes: ["water", "fire"], typicalRange: "$0.75–$1.50/SF", notes: "Full panel removal. Measure all removed areas.", tags: ["drywall", "demo", "removal"] },
  { code: "DRY 121", description: "Remove drywall — flood cut", trade: "Drywall", category: "DRY", unit: "SF", damageTypes: ["water"], typicalRange: "$0.60–$1.20/SF", notes: "Partial height removal for water damage.", tags: ["drywall", "flood-cut", "water"] },
  { code: "DRY 320", description: "Texture drywall — light orange peel", trade: "Drywall", category: "DRY", unit: "SF", damageTypes: ["water", "fire"], typicalRange: "$0.45–$0.90/SF", notes: "Most common texture. Often omitted entirely.", tags: ["texture", "orange-peel", "often-missed"] },
  { code: "DRY 330", description: "Texture drywall — skip trowel", trade: "Drywall", category: "DRY", unit: "SF", damageTypes: ["water", "fire"], typicalRange: "$0.75–$1.50/SF", notes: "Hand-applied — higher labor cost.", tags: ["texture", "skip-trowel"] },
  // PAINT
  { code: "PNT 175", description: "Paint wall — two coats", trade: "Painting", category: "PNT", unit: "SF", damageTypes: ["water", "fire", "smoke"], typicalRange: "$0.65–$1.25/SF", notes: "Include entire room, not just repaired area.", tags: ["paint", "wall", "two-coat"] },
  { code: "PNT 180", description: "Paint ceiling — two coats", trade: "Painting", category: "PNT", unit: "SF", damageTypes: ["water", "fire", "smoke"], typicalRange: "$0.70–$1.35/SF", notes: "Ceiling separate from wall in most estimates.", tags: ["paint", "ceiling", "two-coat"] },
  { code: "PNT 192", description: "Shellac-based primer/sealer — one coat", trade: "Painting", category: "PNT", unit: "SF", damageTypes: ["fire", "smoke"], typicalRange: "$0.55–$1.10/SF", notes: "Required for smoke odor sealing. Frequently omitted.", tags: ["primer", "shellac", "smoke", "often-missed"] },
  { code: "PNT 194", description: "Drywall primer — one coat", trade: "Painting", category: "PNT", unit: "SF", damageTypes: ["water", "fire"], typicalRange: "$0.35–$0.70/SF", notes: "Required over new or repaired drywall before finish coat.", tags: ["primer", "drywall", "often-missed"] },
  // FLOORING
  { code: "FLR 130", description: "Carpet — remove", trade: "Flooring", category: "FLR", unit: "SF", damageTypes: ["water", "fire"], typicalRange: "$0.20–$0.45/SF", notes: "Including pad removal as separate line.", tags: ["carpet", "removal", "demo"] },
  { code: "FLR 135", description: "Carpet pad — remove", trade: "Flooring", category: "FLR", unit: "SF", damageTypes: ["water", "fire"], typicalRange: "$0.15–$0.35/SF", notes: "Separate from carpet removal. Often merged incorrectly.", tags: ["carpet-pad", "removal", "often-missed"] },
  { code: "FLR 200", description: "Carpet — install", trade: "Flooring", category: "FLR", unit: "SF", damageTypes: ["water", "fire"], typicalRange: "$2.50–$5.50/SF", notes: "Installed cost including materials — verify matching.", tags: ["carpet", "install", "replacement"] },
  { code: "FLR 300", description: "Hardwood — remove", trade: "Flooring", category: "FLR", unit: "SF", damageTypes: ["water"], typicalRange: "$1.25–$2.50/SF", notes: "Photo in-place before removal.", tags: ["hardwood", "removal", "demo"] },
  { code: "FLR 305", description: "Hardwood — install", trade: "Flooring", category: "FLR", unit: "SF", damageTypes: ["water"], typicalRange: "$6.00–$12.00/SF", notes: "Verify matching — discontinued species require full room replacement.", tags: ["hardwood", "install", "matching"] },
  // WATER MITIGATION
  { code: "WTR DEH", description: "Dehumidifier — LGR (per day)", trade: "Water Mitigation", category: "WTR", unit: "DAY", damageTypes: ["water"], typicalRange: "$85–$140/DAY", notes: "Document placement location with photos for each unit.", tags: ["dehumidifier", "LGR", "equipment", "drying"] },
  { code: "WTR AIR", description: "Air mover (per day)", trade: "Water Mitigation", category: "WTR", unit: "DAY", damageTypes: ["water"], typicalRange: "$35–$55/DAY", notes: "Document placement per IICRC S500 standards.", tags: ["air-mover", "equipment", "drying"] },
  { code: "WTR MON", description: "Daily monitoring visit", trade: "Water Mitigation", category: "WTR", unit: "EA", damageTypes: ["water"], typicalRange: "$50–$95/EA", notes: "Photograph all readings during each visit.", tags: ["monitoring", "readings", "documentation"] },
  { code: "WTR ANT", description: "Antimicrobial — spray application", trade: "Water Mitigation", category: "WTR", unit: "SF", damageTypes: ["water"], typicalRange: "$0.18–$0.45/SF", notes: "All affected structural surfaces. Required for Cat 2/3.", tags: ["antimicrobial", "treatment", "often-missed"] },
];

export const xactimateCategories: XactimateCategoryRecord[] = [
  {
    categoryCode: "RFG",
    trade: "Roofing",
    topic: "roof replacement",
    damageTypes: ["hail", "wind"],
    commonItems: xactimateLineItems.filter((i) => i.category === "RFG"),
    relatedChecks: [
      "Verify pitch adder is applied at the correct measured pitch",
      "Count all pipe penetrations from photos — compare to estimate",
      "Measure ridge cap footage from sketch — often under-counted",
      "Confirm drip edge is included on all eaves and rakes",
      "Check if ice & water shield coverage matches local code",
    ],
    scopeNotes: [
      "Any roof over 6/12 requires a steep slope labor adder",
      "Multi-layer tear-off requires a different code than single-layer",
      "Synthetic underlayment is now code-required in most jurisdictions",
      "Pipe boots should always be replaced with a new roof",
    ],
    oftenMissed: ["RFG 226 — Starter shingles", "RFG 270 — Drip edge", "RFG 358 — Ice & water shield", "RFG 356 — Synthetic underlayment upgrade", "RFG 290 — Pipe boots (under-counted)"],
  },
  {
    categoryCode: "SID",
    trade: "Siding",
    topic: "siding damage",
    damageTypes: ["hail", "wind"],
    commonItems: xactimateLineItems.filter((i) => i.category === "SID"),
    relatedChecks: [
      "Document all four elevations — don't allow adjuster to scope only one side",
      "Research matching availability before accepting partial scope",
      "Verify soffit and fascia are separate line items",
      "Include J-channel and corner posts for all affected areas",
    ],
    scopeNotes: [
      "Matching provision applies when damaged sections cannot match existing",
      "Fiber cement siding requires different codes from vinyl — verify correct code",
      "Soffit and fascia are separate line items from wall siding",
    ],
    oftenMissed: ["SID 180 — Corner posts", "SID 182 — J-channel", "SID 270 — Soffit", "SID 275 — Fascia wrap", "Matching provision on discontinued colors"],
  },
  {
    categoryCode: "DRY",
    trade: "Drywall",
    topic: "drywall repair",
    damageTypes: ["water", "fire"],
    commonItems: xactimateLineItems.filter((i) => i.category === "DRY"),
    relatedChecks: [
      "Verify texture code matches actual texture type on site",
      "Confirm ceiling drywall is a separate line item from walls",
      "Include corner bead on all outside corners",
      "Check framing repair when studs were visibly water-damaged",
    ],
    scopeNotes: [
      "Texture matching is the most frequently omitted drywall item",
      "Flood cut measurement must accurately reflect the actual cut height",
      "5/8\" type X is required in fire-rated assemblies — higher cost code",
    ],
    oftenMissed: ["DRY 320/330 — Texture matching", "Corner bead", "Ceiling drywall separate line", "Framing repair for wet studs"],
  },
  {
    categoryCode: "PNT",
    trade: "Painting",
    topic: "interior painting",
    damageTypes: ["water", "fire", "smoke"],
    commonItems: xactimateLineItems.filter((i) => i.category === "PNT"),
    relatedChecks: [
      "Apply paint scope to full rooms — matching provision applies",
      "Include primer as separate line item over all new drywall",
      "Add shellac sealer for all smoke-affected surfaces in fire claims",
      "Include trim and door painting as separate line items",
    ],
    scopeNotes: [
      "Painting entire room is required when any wall surface is repainted for matching",
      "Fire damage requires shellac-based sealer before any finish coat",
      "Three coats are required over new drywall — not two",
    ],
    oftenMissed: ["PNT 192 — Shellac primer for smoke", "PNT 194 — Drywall primer", "Trim and door painting", "Full room scope vs patch-only"],
  },
  {
    categoryCode: "FLR",
    trade: "Flooring",
    topic: "flooring replacement",
    damageTypes: ["water", "fire"],
    commonItems: xactimateLineItems.filter((i) => i.category === "FLR"),
    relatedChecks: [
      "Confirm carpet pad is a separate line item from carpet",
      "Check matching availability before accepting partial replacement",
      "Document subfloor condition if flooring was removed",
      "Verify species match for hardwood — discontinued species = full room",
    ],
    scopeNotes: [
      "Carpet pad removal is a separate line item — often merged",
      "Hardwood matching provision: if species is discontinued, full replacement required",
      "Subfloor moisture damage is a separate scope item",
    ],
    oftenMissed: ["FLR 135 — Carpet pad separate from carpet", "Subfloor damage documentation", "Matching provisions for discontinued products"],
  },
  {
    categoryCode: "WTR",
    trade: "Water Mitigation",
    topic: "water mitigation",
    damageTypes: ["water"],
    commonItems: xactimateLineItems.filter((i) => i.category === "WTR"),
    relatedChecks: [
      "Photograph every piece of equipment in place",
      "Document daily moisture readings for every monitoring visit",
      "Verify equipment types in estimate match actual equipment placed",
      "Confirm antimicrobial is included for Category 2/3 losses",
    ],
    scopeNotes: [
      "IICRC S500 placement standards determine equipment count — 1 air mover per 50 SF",
      "Category 2 and 3 water losses require antimicrobial treatment",
      "Daily monitoring documentation is required to defend drying duration",
    ],
    oftenMissed: ["WTR ANT — Antimicrobial treatment", "Contents manipulation line item", "Daily monitoring visits", "Correct equipment category (LGR vs conventional)"],
  },
];

export const tradeOptions = [...new Set(xactimateLineItems.map((i) => i.trade))];
export const categoryOptions = [...new Set(xactimateLineItems.map((i) => i.category))];
export const damageTypeOptions = [...new Set(xactimateLineItems.flatMap((i) => i.damageTypes))];
