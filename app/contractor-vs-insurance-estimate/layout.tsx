import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contractor vs Insurance Estimate — Why They're Always Different | LossStack",
  description: "Why your contractor estimate is higher than the insurance company's Xactimate scope — and what to do about it. The 5 most common estimate gaps explained.",
  alternates: { canonical: "https://lossstack.com/contractor-vs-insurance-estimate" },
  openGraph: {
    title: "Contractor vs Insurance Estimate | LossStack",
    description: "Why contractor and insurance estimates always differ — and how to close the gap with a supplement.",
    url: "https://lossstack.com/contractor-vs-insurance-estimate",
    siteName: "LossStack",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "Contractor vs Insurance Estimate | LossStack", description: "Why they differ and how to close the gap." },
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
            headline: "Contractor vs Insurance Estimate — Why They're Always Different",
            description: "Why your contractor estimate is higher than the insurance company's Xactimate scope and what to do about it.",
            url: "https://lossstack.com/contractor-vs-insurance-estimate",
            publisher: { "@type": "Organization", name: "LossStack", url: "https://lossstack.com" },
          }),
        }}
      />
      {children}
    </>
  );
}
