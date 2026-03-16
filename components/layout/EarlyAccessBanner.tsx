"use client";

import Link from "next/link";
import { X } from "lucide-react";

interface EarlyAccessBannerProps {
  onDismiss: () => void;
}

export default function EarlyAccessBanner({ onDismiss }: EarlyAccessBannerProps) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="relative bg-amber-400 text-[#0f1e3c] px-4 py-2.5 flex items-center justify-center gap-3 text-sm font-medium">
      <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wide opacity-70">
        As of {today}:
      </span>
      <span>
        LossStack — Appraisly, ImageLablr &amp; RestoreCam are all currently in <strong>Beta</strong>. Full launch April 1, 2026.{" "}
        <Link
          href="/contact"
          className="underline underline-offset-2 font-bold hover:opacity-80 transition-opacity"
        >
          Add your email for early access →
        </Link>
      </span>
      <button
        onClick={onDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
