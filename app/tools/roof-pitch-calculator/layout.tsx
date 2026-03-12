import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roof Pitch Calculator — Free Tool for Roofers & Adjusters | LossStack",
  description: "Free roof pitch calculator. Enter rise and run to get pitch, angle in degrees, roof area multiplier, and slope category. Built for roofers, contractors, and adjusters.",
  alternates: { canonical: "https://lossstack.com/tools/roof-pitch-calculator" },
  openGraph: { title: "Roof Pitch Calculator | LossStack", description: "Free roof pitch calculator for roofers and adjusters.", url: "https://lossstack.com/tools/roof-pitch-calculator", siteName: "LossStack", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
