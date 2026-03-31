// ─── /field-app — LossStack Field Download / Interstitial Page ───────────────
//
// Mobile users who visit Appraisly, ImageLablr, or RestoreCam on a phone are
// redirected here by each app's Next.js middleware.
//
// URL shape:  https://lossstack.com/field-app?from=appraisly&path=/jobs/abc
//
// This page:
//   1. Attempts a deep-link open into the native app (lossstack-field://)
//   2. Falls back to App Store / Play Store links if app is not installed
//   3. Shows which specific module the user was trying to access
//   4. Never hard-traps the user — always provides a "continue in browser" escape
//      (hidden behind the FIELD_REDIRECT_SHOW_BROWSER_LINK env, defaults false)

import type { Metadata } from "next";
import FieldAppClient from "./FieldAppClient";

export const metadata: Metadata = {
  title: "LossStack Field — Download the App",
  description:
    "Field workflows for insurance claims and restoration now live in the LossStack Field app. Download it free for iOS and Android.",
  robots: { index: false, follow: false }, // interstitial — no SEO value
};

interface PageProps {
  searchParams: Promise<{ from?: string; path?: string }>;
}

export default async function FieldAppPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const from = (params.from ?? "") as "appraisly" | "imagelablr" | "restorecam" | "";
  const path = params.path ?? "";

  // Whether to show the "Continue in browser" escape link.
  // Off by default — only enable for support/testing via env var.
  const showBrowserLink =
    process.env.FIELD_REDIRECT_SHOW_BROWSER_LINK === "true";

  // Build the original web URL so the browser-escape link can point back
  const originMap: Record<string, string> = {
    appraisly:   "https://appraislyai.com",
    imagelablr:  "https://imagelablr.com",
    restorecam:  "https://www.restorecam.com",
  };
  const browserFallbackUrl =
    from && originMap[from] ? `${originMap[from]}${path}?mobile_web=1` : null;

  return (
    <FieldAppClient
      from={from}
      path={path}
      showBrowserLink={showBrowserLink}
      browserFallbackUrl={browserFallbackUrl}
    />
  );
}
