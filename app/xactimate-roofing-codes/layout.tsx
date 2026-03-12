import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xactimate Roofing Codes — Complete RFG Category Reference | LossStack",
  description: "Every Xactimate RFG roofing code explained — descriptions, units, typical price ranges, pitch adders, and the line items adjusters most often miss on roof estimates.",
  alternates: { canonical: "https://lossstack.com/xactimate-roofing-codes" },
  openGraph: {
    title: "Xactimate Roofing Codes — Complete RFG Reference | LossStack",
    description: "Every Xactimate RFG roofing code with descriptions, units, price ranges, and supplement tips.",
    url: "https://lossstack.com/xactimate-roofing-codes",
    siteName: "LossStack",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "Xactimate Roofing Codes | LossStack", description: "Complete RFG category reference for roofers and adjusters." },
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
            headline: "Xactimate Roofing Codes — Complete RFG Category Reference",
            description: "Every Xactimate RFG roofing code explained with descriptions, units, price ranges, and supplement tips.",
            url: "https://lossstack.com/xactimate-roofing-codes",
            publisher: { "@type": "Organization", name: "LossStack", url: "https://lossstack.com" },
          }),
        }}
      />
      {children}
    </>
  );
}
