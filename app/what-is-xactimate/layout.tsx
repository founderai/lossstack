import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Is Xactimate? — The Insurance Estimating Software Explained | LossStack",
  description: "Xactimate is the software insurance companies use to price property damage claims. Here's how it works, who uses it, and what contractors need to know.",
  alternates: { canonical: "https://lossstack.com/what-is-xactimate" },
  openGraph: {
    title: "What Is Xactimate? | LossStack",
    description: "How Xactimate works, who uses it, and what every contractor and adjuster needs to know.",
    url: "https://lossstack.com/what-is-xactimate",
    siteName: "LossStack",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "What Is Xactimate? | LossStack", description: "The insurance estimating software explained." },
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
            headline: "What Is Xactimate? The Insurance Estimating Software Explained",
            description: "Xactimate is the software insurance companies use to price property damage claims.",
            url: "https://lossstack.com/what-is-xactimate",
            publisher: { "@type": "Organization", name: "LossStack", url: "https://lossstack.com" },
          }),
        }}
      />
      {children}
    </>
  );
}
