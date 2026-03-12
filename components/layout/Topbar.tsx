"use client";

import Link from "next/link";
import { Menu, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopbarProps {
  sidebarCollapsed: boolean;
  onMobileMenuOpen: () => void;
}

export default function Topbar({ sidebarCollapsed, onMobileMenuOpen }: TopbarProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-16 bg-[#0f1e3c] border-b border-white/10 z-20 flex items-center justify-between px-4 lg:px-6 transition-all duration-250",
        sidebarCollapsed ? "lg:left-16" : "lg:left-60"
      )}
    >
      {/* Left: Mobile menu + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuOpen}
          className="lg:hidden text-blue-200 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo shown on mobile only */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-blue-400 to-teal-400 flex items-center justify-center">
            <span className="text-white font-bold text-xs">LS</span>
          </div>
          <span className="text-white font-bold text-sm">LossStack</span>
        </div>

        {/* Desktop subtitle */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-blue-200/60 text-sm">The AI-Powered Claims & Restoration Suite</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/apps"
            className="text-blue-200 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-150"
          >
            Apps
          </Link>
          <Link
            href="/pricing"
            className="text-blue-200 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-150"
          >
            Pricing
          </Link>
          <Link
            href="/compare"
            className="text-blue-200 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-150"
          >
            Compare
          </Link>
        </nav>

        <div className="w-px h-5 bg-white/10 hidden md:block" />

        <Link
          href="/#contact"
          className="flex items-center gap-1.5 bg-linear-to-r from-blue-500 to-teal-500 hover:from-blue-400 hover:to-teal-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-150 shadow-sm"
        >
          <span>Get Started</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
}
