import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roof Supplement Guide — How to Get Paid in Full on Every Claim | LossStack",
  description: "The complete guide to supplementing a roof insurance claim. Step-by-step process, the 10 most common supplement items, and how to write a supplement request.",
  alternates: { canonical: "https://lossstack.com/roof-supplement-guide" },
  openGraph: {
    title: "Roof Supplement Guide | LossStack",
    description: "How to supplement a roof insurance claim — step by step.",
    url: "https://lossstack.com/roof-supplement-guide",
    siteName: "LossStack",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "Roof Supplement Guide | LossStack", description: "How to get paid in full on every roof claim." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Supplement a Roof Insurance Claim",
            description: "Step-by-step guide to supplementing a roof claim and getting paid in full.",
            url: "https://lossstack.com/roof-supplement-guide",
            publisher: { "@type": "Organization", name: "LossStack", url: "https://lossstack.com" },
          }),
        }}
      />
      {children}
    </>
  );
}
