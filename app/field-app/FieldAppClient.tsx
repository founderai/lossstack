"use client";

// ─── FieldAppClient ───────────────────────────────────────────────────────────
//
// Client component for the /field-app interstitial.
//
// On mount:
//   1. Attempts to open the native app via the lossstack-field:// deep link
//   2. After a 2-second timeout (app not installed), shows store buttons
//
// Deep link format:
//   lossstack-field://open?from=appraisly&path=/jobs/abc
//
// Universal link alternative (future):
//   https://lossstack.com/.well-known/apple-app-site-association  (iOS)
//   https://lossstack.com/.well-known/assetlinks.json              (Android)
//   These are not implemented yet — deep link is sufficient for phase 1.

import { useEffect, useState } from "react";
import Link from "next/link";

// ─── App Store links ──────────────────────────────────────────────────────────
// Replace with real store URLs once the app is published.
// Using placeholder lossstack.com URLs for now — they 404 gracefully.

const IOS_STORE_URL =
  process.env.NEXT_PUBLIC_FIELD_IOS_URL ??
  "https://apps.apple.com/app/lossstack-field/id000000000"; // placeholder

const ANDROID_STORE_URL =
  process.env.NEXT_PUBLIC_FIELD_ANDROID_URL ??
  "https://play.google.com/store/apps/details?id=com.lossstack.field"; // placeholder

// ─── Module metadata ──────────────────────────────────────────────────────────

const FROM_META: Record<
  string,
  { label: string; color: string; module: string; description: string }
> = {
  appraisly: {
    label:       "Appraisly",
    color:       "#3B82F6",
    module:      "Inspect",
    description: "Scope notes, photo documentation, and field inspection.",
  },
  imagelablr: {
    label:       "ImageLablr",
    color:       "#8B5CF6",
    module:      "Label",
    description: "Photo labeling, bucket organization, and report prep.",
  },
  restorecam: {
    label:       "RestoreCam",
    color:       "#10B981",
    module:      "Contents",
    description: "Room-by-room contents documentation and item capture.",
  },
};

// ─── Platform detection ───────────────────────────────────────────────────────

function detectPlatform(): "ios" | "android" | "unknown" {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/iPhone|iPod/.test(ua)) return "ios";
  if (/Android.*Mobile/.test(ua)) return "android";
  return "unknown";
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface FieldAppClientProps {
  from: string;
  path: string;
  showBrowserLink: boolean;
  browserFallbackUrl: string | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FieldAppClient({
  from,
  path,
  showBrowserLink,
  browserFallbackUrl,
}: FieldAppClientProps) {
  const [platform, setPlatform] = useState<"ios" | "android" | "unknown">("unknown");
  const [deepLinkAttempted, setDeepLinkAttempted] = useState(false);

  const meta = FROM_META[from] ?? null;

  // Detect platform and attempt deep link on mount
  useEffect(() => {
    const p = detectPlatform();
    setPlatform(p);

    if (p === "unknown") return; // desktop somehow — don't attempt deep link

    // Attempt native deep link
    const deepLink = buildDeepLink(from, path);
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = deepLink;
    document.body.appendChild(iframe);

    // After 2 s, assume app is not installed — show store button prominently
    const timer = setTimeout(() => {
      document.body.removeChild(iframe);
      setDeepLinkAttempted(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      if (document.body.contains(iframe)) document.body.removeChild(iframe);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const storeUrl = platform === "android" ? ANDROID_STORE_URL : IOS_STORE_URL;
  const storeName = platform === "android" ? "Google Play" : "App Store";
  const storeLabel =
    platform === "android"
      ? "Get it on Google Play"
      : "Download on the App Store";

  const accentColor = meta?.color ?? "#F59E0B";

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center px-6 py-12">
      {/* Card */}
      <div className="w-full max-w-sm bg-[#1E293B] rounded-2xl overflow-hidden shadow-2xl">

        {/* Accent bar */}
        <div className="h-1 w-full" style={{ backgroundColor: accentColor }} />

        <div className="p-8">
          {/* LossStack wordmark */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              LossStack
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-white leading-tight mb-2">
            Field workflows live in LossStack Field
          </h1>

          {/* Source context */}
          {meta ? (
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              You were heading to{" "}
              <span className="font-semibold" style={{ color: accentColor }}>
                {meta.label} → {meta.module}
              </span>
              . {meta.description}
            </p>
          ) : (
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The page you were trying to visit is now part of the LossStack Field app.
            </p>
          )}

          {/* Module pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <ModulePill color="#3B82F6" label="Inspect" active={from === "appraisly"} />
            <ModulePill color="#8B5CF6" label="Label"   active={from === "imagelablr"} />
            <ModulePill color="#10B981" label="Contents" active={from === "restorecam"} />
          </div>

          {/* Primary CTA — store download */}
          <a
            href={storeUrl}
            className="block w-full text-center py-4 rounded-xl font-semibold text-white text-base transition-opacity hover:opacity-90 active:opacity-80 mb-3"
            style={{ backgroundColor: accentColor }}
          >
            {storeLabel}
          </a>

          {/* Open app (deep link) — shown after initial attempt */}
          {deepLinkAttempted && (
            <a
              href={buildDeepLink(from, path)}
              className="block w-full text-center py-3 rounded-xl font-medium text-sm border border-slate-600 text-slate-300 hover:border-slate-400 transition-colors mb-3"
            >
              Open in LossStack Field
            </a>
          )}

          {/* Continue in browser — only visible when FIELD_REDIRECT_SHOW_BROWSER_LINK=true */}
          {showBrowserLink && browserFallbackUrl && (
            <Link
              href={browserFallbackUrl}
              className="block w-full text-center py-2 text-xs text-slate-500 hover:text-slate-400 transition-colors"
            >
              Continue in browser instead →
            </Link>
          )}
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-6 text-xs text-slate-600 text-center max-w-xs">
        LossStack Field is free to download. Your existing LossStack account works automatically.
      </p>

      {/* Stores badge strip */}
      <div className="mt-8 flex items-center gap-6">
        <StoreButton
          href={IOS_STORE_URL}
          label="App Store"
          icon={<AppleIcon />}
          active={platform === "ios"}
        />
        <StoreButton
          href={ANDROID_STORE_URL}
          label="Google Play"
          icon={<PlayIcon />}
          active={platform === "android"}
        />
      </div>

      {/* LossStack link */}
      <Link
        href="/"
        className="mt-8 text-xs text-slate-600 hover:text-slate-400 transition-colors"
      >
        lossstack.com
      </Link>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ModulePill({
  color,
  label,
  active,
}: {
  color: string;
  label: string;
  active: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border"
      style={
        active
          ? { backgroundColor: color + "22", borderColor: color, color }
          : { backgroundColor: "transparent", borderColor: "#334155", color: "#94A3B8" }
      }
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: active ? color : "#475569" }}
      />
      {label}
    </span>
  );
}

function StoreButton({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}) {
  return (
    <a
      href={href}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
        active
          ? "border-amber-400/60 text-amber-300 bg-amber-400/5"
          : "border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-400"
      }`}
    >
      {icon}
      {label}
    </a>
  );
}

// ─── Icons (inline SVG — no lucide dependency needed here) ───────────────────

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.18 23.85C2.48 23.48 2 22.74 2 21.87V2.13C2 1.26 2.48.52 3.18.15L13.79 12 3.18 23.85zM16.26 9.06L5.51 2.98l8.86 9.02-1.11-2.94zM21.43 10.49c.74.41.74 1.61 0 2.02l-2.87 1.61-3.13-3.18 3.13-3.06 2.87 1.61zM5.51 21.02l10.75-6.08-1.11-2.94-8.86 9.02-1.39-.57.61.57z" />
    </svg>
  );
}

// ─── Deep link builder ────────────────────────────────────────────────────────

function buildDeepLink(from: string, path: string): string {
  const params = new URLSearchParams();
  if (from) params.set("from", from);
  if (path) params.set("path", path);
  const qs = params.toString();
  return `lossstack-field://open${qs ? "?" + qs : ""}`;
}
