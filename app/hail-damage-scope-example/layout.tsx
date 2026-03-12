import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hail Damage Scope Example — Complete Xactimate Line Item Breakdown | LossStack",
  description: "A complete hail damage scope example with every Xactimate line item — roofing, siding, gutters, and secondary structures. See what a fully-scoped hail claim looks like.",
  alternates: { canonical: "https://lossstack.com/hail-damage-scope-example" },
  openGraph: {
    title: "Hail Damage Scope Example | LossStack",
    description: "Complete Xactimate line item breakdown for a hail damage claim.",
    url: "https://lossstack.com/hail-damage-scope-example",
    siteName: "LossStack",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "Hail Damage Scope Example | LossStack", description: "Complete Xactimate hail damage scope breakdown." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Hail Damage Scope Example — Complete Xactimate Line Item Breakdown",
            description: "A complete hail damage scope example with every Xactimate line item.",
            url: "https://lossstack.com/hail-damage-scope-example",
            publisher: { "@type": "Organization", name: "LossStack", url: "https://lossstack.com" },
          }),
        }}
      />
      {children}
    </>
  );
}
