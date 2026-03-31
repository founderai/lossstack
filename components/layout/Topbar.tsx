"use client";

import Link from "next/link";
import { Menu, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser, UserButton } from "@clerk/nextjs";

interface TopbarProps {
  onMobileMenuOpen: () => void;
}

export default function Topbar({ onMobileMenuOpen }: TopbarProps) {
  const { isSignedIn } = useUser();
  return (
    <header
      className="h-16 bg-[#0f1e3c] border-b border-white/10 flex items-center justify-between px-4 lg:px-6"
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
            href="/dashboard"
            className="text-blue-200 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-150"
          >
            Dashboard
          </Link>
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

        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link
            href="/signup"
            className="flex items-center gap-1.5 bg-linear-to-r from-blue-500 to-teal-500 hover:from-blue-400 hover:to-teal-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-150 shadow-sm"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </header>
  );
}
