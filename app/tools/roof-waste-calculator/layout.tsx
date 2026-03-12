import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roof Waste Calculator — Free Tool for Roofers & Adjusters | LossStack",
  description: "Free roof waste calculator. Calculate the correct waste factor for gable, hip, and complex roofs. Get total squares to order for accurate insurance supplements.",
  alternates: { canonical: "https://lossstack.com/tools/roof-waste-calculator" },
  openGraph: { title: "Roof Waste Calculator | LossStack", description: "Free roof waste calculator for roofers and adjusters.", url: "https://lossstack.com/tools/roof-waste-calculator", siteName: "LossStack", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
