import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LossStack — The AI-Powered Claims & Restoration Suite",
  description:
    "LossStack is the unified software suite for insurance claims, appraisal, and restoration professionals. Bundle Appraisly, ImageLablr, and RestoreCam for maximum workflow efficiency.",
  metadataBase: new URL("https://lossstack.com"),
  alternates: {
    canonical: "https://lossstack.com",
  },
  keywords: [
    "LossStack",
    "insurance claims software",
    "restoration documentation",
    "public adjuster tools",
    "Appraisly",
    "ImageLablr",
    "RestoreCam",
    "claims workflow",
    "AI appraisal",
  ],
  openGraph: {
    title: "LossStack — The AI-Powered Claims & Restoration Suite",
    description:
      "Stack smarter. Work faster. Run every claim workflow from one ecosystem.",
    type: "website",
    url: "https://lossstack.com",
    siteName: "LossStack",
    images: [
      {
        url: "https://lossstack.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "LossStack — AI-Powered Claims & Restoration Suite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LossStack — The AI-Powered Claims & Restoration Suite",
    description:
      "Stack smarter. Work faster. Run every claim workflow from one ecosystem.",
    images: ["https://lossstack.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "name": "LossStack",
                  "url": "https://lossstack.com",
                },
                {
                  "@type": "Organization",
                  "name": "LossStack",
                  "url": "https://lossstack.com",
                  "logo": "https://lossstack.com/og-image.png",
                  "description": "The unified AI-powered software suite for insurance claims, appraisal, and restoration professionals.",
                  "sameAs": [],
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ClerkProvider>
          <MainLayout>{children}</MainLayout>
        </ClerkProvider>
      </body>
    </html>
  );
}
