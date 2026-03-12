import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xactimate Line Item Search — Roofing, Siding, Drywall & More | LossStack",
  description: "Search every major Xactimate category code. Find roofing, siding, drywall, paint, flooring, and water mitigation line items — with typical ranges, often-missed items, and scope notes. Free for contractors, roofers, and adjusters.",
  metadataBase: new URL("https://lossstack.com"),
  alternates: { canonical: "https://lossstack.com/xactimate-line-item-search" },
  keywords: [
    "xactimate line items",
    "xactimate roofing line items",
    "xactimate category codes",
    "xactimate roof codes",
    "hail damage roof scope",
    "contractor vs insurance estimate",
    "xactimate RFG codes",
    "insurance estimate comparison",
    "roof replacement line items",
    "xactimate siding codes",
  ],
  openGraph: {
    title: "Xactimate Line Item Search — Roofing, Siding, Drywall & More | LossStack",
    description: "Search every major Xactimate category code and find the items insurance adjusters most often miss. Free for contractors, roofers, and adjusters.",
    url: "https://lossstack.com/xactimate-line-item-search",
    siteName: "LossStack",
    type: "website",
    images: [{ url: "https://lossstack.com/og-image.png", width: 1200, height: 630, alt: "Xactimate Line Item Search | LossStack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xactimate Line Item Search | LossStack",
    description: "Search every major Xactimate category code — roofing, siding, drywall, water mitigation and more. Free tool for contractors and adjusters.",
    images: ["https://lossstack.com/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Xactimate Line Item Search",
              description: "Search every major Xactimate category code including roofing, siding, drywall, paint, flooring, and water mitigation line items.",
              url: "https://lossstack.com/xactimate-line-item-search",
              isPartOf: { "@type": "WebSite", name: "LossStack", url: "https://lossstack.com" },
              about: { "@type": "Thing", name: "Xactimate", description: "Insurance estimating software used by adjusters to scope property damage claims." },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What are Xactimate category codes?",
                  acceptedAnswer: { "@type": "Answer", text: "Xactimate organizes every line item under a 3-letter category code — RFG for Roofing, SID for Siding, DRY for Drywall, PNT for Painting, FLR for Flooring, WTR for Water Mitigation. Each code corresponds to a specific unit of work with a localized price." },
                },
                {
                  "@type": "Question",
                  name: "How do I find roofing line items in Xactimate?",
                  acceptedAnswer: { "@type": "Answer", text: "Roofing line items in Xactimate fall under the RFG category. Common items include RFG 240 (architectural shingles), RFG 180 (tear-off), RFG 358 (ice & water shield), RFG 270 (drip edge), RFG 226 (starter shingles), and RFG 310 (ridge vent)." },
                },
                {
                  "@type": "Question",
                  name: "What items are most often missed on roof estimates?",
                  acceptedAnswer: { "@type": "Answer", text: "The most frequently missed roofing items are: starter shingles (RFG 226), drip edge (RFG 270), ice & water shield (RFG 358), synthetic underlayment upgrade (RFG 356), pipe boot replacements (RFG 290), and steep slope pitch adders." },
                },
                {
                  "@type": "Question",
                  name: "How do I compare two Xactimate estimates faster?",
                  acceptedAnswer: { "@type": "Answer", text: "Appraisly automates estimate comparison by ingesting both estimates and highlighting every discrepancy, missing line item, and pricing difference. What takes hours manually takes minutes with Appraisly." },
                },
                {
                  "@type": "Question",
                  name: "What is the difference between a contractor estimate and an insurance estimate?",
                  acceptedAnswer: { "@type": "Answer", text: "Discrepancies arise from different measurements, omitted code-required items, different material grades, missing adders (pitch, story height), and matching provisions. The gap is what contractors and public adjusters supplement." },
                },
                {
                  "@type": "Question",
                  name: "What does O&P mean in Xactimate?",
                  acceptedAnswer: { "@type": "Answer", text: "O&P stands for Overhead and Profit — the markup a general contractor is entitled to on an insurance claim. Standard O&P is 10% overhead and 10% profit applied to the subtotal." },
                },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
