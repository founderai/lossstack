export interface XactimateLineItem {
  code: string;
  description: string;
  unit: string;
  notes: string;
}

export interface XactimateSection {
  heading: string;
  body: string;
  lineItems: XactimateLineItem[];
}

export interface XactimateGuide {
  slug: string;
  title: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
  trade: string;
  intro: string;
  sections: XactimateSection[];
  supplementTips: string[];
  commonMisses: string[];
}

export const xactimateGuides: XactimateGuide[] = [
  {
    slug: "xactimate-roofing-line-items",
    title: "Xactimate Roofing Line Items — Complete Guide for Roofers & Adjusters | LossStack",
    metaDescription: "Complete guide to Xactimate roofing line items. Learn the codes adjusters use, what gets missed, and how to supplement for a fully-scoped roof replacement claim.",
    heroHeading: "Xactimate Roofing Line Items: Complete Guide",
    heroSubheading: "Understanding Xactimate roofing codes is how roofers and public adjusters find the money insurance companies leave out of estimates.",
    trade: "Roofing",
    intro: "Xactimate is the estimating software used by most insurance companies. For roofing, adjusters frequently use under-priced codes, miss required items, or fail to apply mandatory adders. This guide covers the most important roofing line items and where supplementing is most commonly necessary.",
    sections: [
      {
        heading: "Shingle Line Items",
        body: "The shingle line items form the core of any roofing estimate. The Xactimate code determines the base price per square — and there are significant differences between codes.",
        lineItems: [
          { code: "RFG 240", description: "Roofing — arch comp shingles (30yr)", unit: "SQ", notes: "Most common code. Verify the grade matches existing materials." },
          { code: "RFG 242", description: "Roofing — arch comp shingles (40-50yr)", unit: "SQ", notes: "Supplement from RFG 240 if existing shingles were premium grade." },
          { code: "RFG 226", description: "Starter — comp shingles", unit: "LF", notes: "Required at eaves and rakes. Frequently omitted from adjuster estimates." },
          { code: "RFG 252", description: "Ridge cap — comp shingles", unit: "LF", notes: "Separate from field shingles. Measure from sketch — often under-counted." },
        ],
      },
      {
        heading: "Tear-Off and Disposal",
        body: "Tear-off and disposal are separate line items. Document layer count — multiple layers require different codes.",
        lineItems: [
          { code: "RFG 180", description: "Remove roofing — comp shingles (1 layer)", unit: "SQ", notes: "Standard single-layer tear-off." },
          { code: "RFG 181", description: "Remove roofing — comp shingles (2 layers)", unit: "SQ", notes: "Higher labor for multi-layer removal. Document layer count in photos." },
          { code: "RFG 188", description: "Haul debris", unit: "SQ", notes: "Disposal separate from removal in most markets." },
        ],
      },
      {
        heading: "Underlayment and Moisture Barriers",
        body: "Among the most frequently missed items. Modern codes require synthetic underlayment — upgrading from felt paper is a code upgrade item.",
        lineItems: [
          { code: "RFG 356", description: "Synthetic underlayment", unit: "SQ", notes: "Current standard. Code upgrade if existing was felt paper." },
          { code: "RFG 358", description: "Ice & water shield", unit: "SQ", notes: "Required at eaves, valleys, skylights per local code." },
          { code: "RFG 270", description: "Drip edge — aluminum", unit: "LF", notes: "All eaves and rakes. Code requirement. Measure total LF from sketch." },
        ],
      },
      {
        heading: "Flashing and Penetrations",
        body: "Flashing items are individually scoped and among the most under-counted items. Count each occurrence from documentation.",
        lineItems: [
          { code: "RFG 281", description: "Flashing — step flashing", unit: "LF", notes: "All wall intersections. Count from site photos." },
          { code: "RFG 290", description: "Pipe flashing — lead or rubber", unit: "EA", notes: "Each pipe penetration. Count from photos — frequently under-counted." },
          { code: "RFG 310", description: "Ridge vent", unit: "LF", notes: "Required by most shingle manufacturers for warranty." },
        ],
      },
      {
        heading: "Pitch and Complexity Adders",
        body: "Xactimate applies pitch adders automatically when the correct pitch is entered. If the adjuster entered the wrong pitch, all labor items will be under-priced.",
        lineItems: [
          { code: "PITCH ADDER", description: "Steep slope adder (7/12–9/12)", unit: "%", notes: "Applied to all labor items. Verify pitch measurement is in estimate." },
          { code: "PITCH ADDER", description: "Very steep slope adder (10/12+)", unit: "%", notes: "Higher adder for steep pitches. Confirm with actual site measurement." },
          { code: "STORY ADDER", description: "Additional story height adder", unit: "%", notes: "For 2-story+ structures. Verify correct story count." },
        ],
      },
    ],
    supplementTips: [
      "Always verify shingle code matches the grade of existing materials",
      "Check that starter shingles are a separate line item",
      "Confirm drip edge is included on all eaves and rakes",
      "Verify ice & water shield coverage matches local code",
      "Count pipe penetrations in photos and compare to estimate",
      "Verify pitch adder is applied at the correct pitch",
    ],
    commonMisses: [
      "Starter shingles (RFG 226) — frequently omitted entirely",
      "Drip edge (RFG 270) — code requirement often excluded",
      "Ice & water shield — under-measured or omitted",
      "Synthetic underlayment code upgrade from felt paper",
      "Pipe boot replacements — under-counted",
      "Steep slope adders — wrong pitch entered in sketch",
    ],
  },
  {
    slug: "xactimate-siding-line-items",
    title: "Xactimate Siding Line Items — Complete Guide for Contractors & Adjusters | LossStack",
    metaDescription: "Complete guide to Xactimate siding line items. Learn siding codes, when matching applies, and how to supplement under-scoped siding damage claims.",
    heroHeading: "Xactimate Siding Line Items: Complete Guide",
    heroSubheading: "Siding claims are among the most supplemented in the industry. Understanding the right codes — and the matching provision — is how you get full replacement.",
    trade: "Siding",
    intro: "Insurance adjusters frequently scope only directly damaged sections of siding rather than accounting for matching requirements and all associated accessories. Understanding siding codes and the matching provision is critical to a properly scoped claim.",
    sections: [
      {
        heading: "Vinyl Siding",
        body: "Vinyl siding has a wide range of Xactimate codes based on profile size and style. Using the correct code for the existing profile is critical — price differences are significant.",
        lineItems: [
          { code: "SID 160", description: "Vinyl siding — double 4\"", unit: "SF", notes: "Most common profile. Measure all affected elevations." },
          { code: "SID 162", description: "Vinyl siding — double 5\"", unit: "SF", notes: "Wider profile — confirm measurement matches existing." },
          { code: "SID 165", description: "Vinyl siding — dutch lap", unit: "SF", notes: "Different profile from standard double — use correct code." },
          { code: "SID 168", description: "Vinyl siding — shake/shingle style", unit: "SF", notes: "Higher cost code for premium vinyl profiles." },
        ],
      },
      {
        heading: "Fiber Cement and Aluminum Siding",
        body: "Fiber cement siding has higher material and labor costs than vinyl. Always verify the correct product code is used.",
        lineItems: [
          { code: "SID 140", description: "Aluminum siding", unit: "SF", notes: "Dents from hail are functional damage. Document impact density." },
          { code: "SID 204", description: "Fiber cement siding — lap", unit: "SF", notes: "Hardie board and similar. Higher cost than vinyl." },
          { code: "SID 206", description: "Fiber cement siding — panel", unit: "SF", notes: "Large format fiber cement panels." },
        ],
      },
      {
        heading: "Trim, Corners, and Accessories",
        body: "Siding accessories are separate line items frequently overlooked. Document each component individually.",
        lineItems: [
          { code: "SID 180", description: "Corner post — vinyl", unit: "LF", notes: "All exterior corners. Count from photos." },
          { code: "SID 182", description: "J-channel — vinyl", unit: "LF", notes: "At all window/door perimeters and terminations." },
          { code: "SID 270", description: "Soffit — vinyl vented", unit: "SF", notes: "All soffit areas — separate from wall siding." },
          { code: "SID 275", description: "Fascia — aluminum wrap", unit: "LF", notes: "All fascia linear footage." },
        ],
      },
    ],
    supplementTips: [
      "Document all affected elevations — don't let adjuster scope only one side",
      "Research matching availability before accepting partial scope",
      "Include all trim pieces as separate line items",
      "Verify soffit and fascia are separate from wall siding",
      "Confirm waste factor (typically 10–15% for standard profiles)",
    ],
    commonMisses: [
      "Corner posts and J-channel frequently omitted",
      "Soffit and fascia excluded from siding estimate",
      "Wrong profile code (cheaper code for premium siding)",
      "Matching provision not applied when partial creates visible mismatch",
      "Only one elevation scoped when all four are damaged",
    ],
  },
  {
    slug: "xactimate-drywall-line-items",
    title: "Xactimate Drywall Line Items — Complete Guide for Contractors & Adjusters | LossStack",
    metaDescription: "Complete guide to Xactimate drywall line items. Codes for removal, installation, texture, and finishing — with tips for water and fire damage drywall claims.",
    heroHeading: "Xactimate Drywall Line Items: Complete Guide",
    heroSubheading: "Drywall spans multiple phases — removal, install, texture, and finish. Adjusters routinely miss items in the finishing and texture phases.",
    trade: "Drywall",
    intro: "Drywall work in insurance claims spans removal, installation, finishing, and texture matching. Each phase has distinct Xactimate codes. Adjusters routinely miss texture and finishing items. A properly scoped drywall estimate accounts for every step from flood cut to paint-ready finish.",
    sections: [
      {
        heading: "Drywall Removal",
        body: "Removal codes vary based on full removal vs flood cut. Document which type was performed and photograph all areas before removal.",
        lineItems: [
          { code: "DRY 120", description: "Remove drywall — per SF", unit: "SF", notes: "Full panel removal. Measure all removed areas." },
          { code: "DRY 121", description: "Remove drywall — flood cut", unit: "SF", notes: "Partial height removal for water damage. Cut height × LF." },
          { code: "DRY 125", description: "Remove drywall — ceiling", unit: "SF", notes: "Ceiling removal — separate code from wall removal." },
        ],
      },
      {
        heading: "Drywall Installation",
        body: "Verify the correct thickness. 5/8\" type X is required for fire-rated assemblies and prices differently from 1/2\" standard.",
        lineItems: [
          { code: "DRY 200", description: "Drywall 1/2\" — hung, taped, floated, ready for paint", unit: "SF", notes: "Standard residential — complete to paint-ready." },
          { code: "DRY 205", description: "Drywall 5/8\" type X — hung, taped, floated", unit: "SF", notes: "Fire-rated — required in garage/living space assemblies." },
          { code: "DRY 210", description: "Drywall — ceiling 1/2\"", unit: "SF", notes: "Ceiling application — separate from wall in most estimates." },
        ],
      },
      {
        heading: "Texture Matching",
        body: "Texture matching is the most frequently missed and contested drywall item. The correct code must match the existing texture type.",
        lineItems: [
          { code: "DRY 320", description: "Texture — light orange peel", unit: "SF", notes: "Most common in modern construction." },
          { code: "DRY 325", description: "Texture — knockdown", unit: "SF", notes: "Common in Southwest markets and older construction." },
          { code: "DRY 330", description: "Texture — skip trowel", unit: "SF", notes: "Hand-applied — higher labor cost." },
          { code: "DRY 335", description: "Texture — smooth / skim coat", unit: "SF", notes: "High-end finish — significantly higher labor." },
          { code: "DRY 340", description: "Texture — popcorn ceiling", unit: "SF", notes: "May require asbestos testing in older structures." },
        ],
      },
    ],
    supplementTips: [
      "Verify texture code matches actual existing texture — visit site to confirm",
      "Include corner bead on all outside corners as a separate line item",
      "Confirm ceiling drywall is separate from wall drywall",
      "Supplement for skim coat when walls have a smooth finish",
      "Include framing repairs when studs were water-damaged",
    ],
    commonMisses: [
      "Texture matching omitted entirely",
      "Wrong texture code (cheaper code for complex texture)",
      "Corner bead not included",
      "Ceiling and wall merged under one line item",
      "Flood cut measurement understated",
      "Framing repair omitted for visibly wet studs",
    ],
  },
  {
    slug: "xactimate-paint-line-items",
    title: "Xactimate Paint Line Items — Complete Guide for Contractors & Adjusters | LossStack",
    metaDescription: "Complete guide to Xactimate paint line items. Codes for walls, ceilings, trim, primers, and smoke sealers — with tips for water and fire damage paint claims.",
    heroHeading: "Xactimate Paint Line Items: Complete Guide",
    heroSubheading: "Paint is the final step in reconstruction — and one of the most under-scoped categories in insurance estimates.",
    trade: "Painting",
    intro: "Paint in insurance claims covers more than just the damaged area. When any surface is repainted, the entire room typically requires painting to achieve a consistent appearance. Understanding which codes apply — and when primers and sealers are required — is key to a properly scoped paint estimate.",
    sections: [
      {
        heading: "Wall and Ceiling Paint",
        body: "Standard paint codes cover two-coat application. Apply to full room walls and ceiling — not just the repaired patch.",
        lineItems: [
          { code: "PNT 175", description: "Paint wall — two coats", unit: "SF", notes: "Standard specification. Include entire room, not just repaired area." },
          { code: "PNT 180", description: "Paint ceiling — two coats", unit: "SF", notes: "Ceiling area separate from wall area." },
          { code: "PNT 185", description: "Paint wall — three coats", unit: "SF", notes: "Required over primers and on previously unpainted new drywall." },
        ],
      },
      {
        heading: "Primers and Sealers",
        body: "Primers and sealers are required over repaired drywall, smoke damage, and water stains. These are separate line items from finish paint.",
        lineItems: [
          { code: "PNT 190", description: "Seal/prime stained surface — one coat", unit: "SF", notes: "Required for smoke staining and water stains." },
          { code: "PNT 192", description: "Shellac-based primer/sealer — one coat", unit: "SF", notes: "Required for smoke odor sealing in fire damage claims." },
          { code: "PNT 194", description: "Drywall primer — one coat", unit: "SF", notes: "Required over new or repaired drywall before finish coat." },
        ],
      },
      {
        heading: "Trim, Doors, and Cabinets",
        body: "Trim painting is a separate line item from wall painting. Include all base, casing, and door painting.",
        lineItems: [
          { code: "PNT 210", description: "Paint baseboard — two coats", unit: "LF", notes: "All base throughout repainted rooms." },
          { code: "PNT 215", description: "Paint door/window casing — two coats", unit: "LF", notes: "All casing in repainted rooms." },
          { code: "PNT 220", description: "Paint door slab — both sides", unit: "EA", notes: "Each door — both sides, two coats." },
        ],
      },
    ],
    supplementTips: [
      "Apply paint scope to full rooms — matching provision applies",
      "Include primer as a separate line item over all new/repaired drywall",
      "Add shellac-based sealer for all smoke-affected surfaces in fire claims",
      "Include trim painting (base, casing, doors) as separate line items",
      "Verify three-coat specification over new drywall",
    ],
    commonMisses: [
      "Primer omitted on new or repaired drywall",
      "Smoke sealer not included on all affected surfaces in fire claims",
      "Paint scope limited to repaired patch only instead of full room",
      "Trim and door painting omitted from scope",
      "Two-coat spec used where three coats are required over new drywall",
    ],
  },
];

export function getXactimateGuide(slug: string): XactimateGuide | undefined {
  return xactimateGuides.find((g) => g.slug === slug);
}
