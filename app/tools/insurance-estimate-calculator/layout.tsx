import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insurance Estimate Calculator — Free Line Item Builder | LossStack",
  description: "Free insurance estimate calculator. Build line-item estimates with automatic overhead and profit calculation. Built for roofers, contractors, and public adjusters.",
  alternates: { canonical: "https://lossstack.com/tools/insurance-estimate-calculator" },
  openGraph: { title: "Insurance Estimate Calculator | LossStack", description: "Free line-item insurance estimate calculator with overhead and profit.", url: "https://lossstack.com/tools/insurance-estimate-calculator", siteName: "LossStack", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
