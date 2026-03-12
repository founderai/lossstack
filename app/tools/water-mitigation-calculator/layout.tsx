import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Water Mitigation Equipment Calculator — Free Tool | LossStack",
  description: "Free water mitigation equipment calculator. Calculate IICRC-standard air mover and dehumidifier counts and daily equipment costs for any water damage job.",
  alternates: { canonical: "https://lossstack.com/tools/water-mitigation-calculator" },
  openGraph: { title: "Water Mitigation Equipment Calculator | LossStack", description: "Free IICRC-standard equipment calculator for water mitigation jobs.", url: "https://lossstack.com/tools/water-mitigation-calculator", siteName: "LossStack", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
