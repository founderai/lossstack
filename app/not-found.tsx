import Link from "next/link";
import { Home, LayoutGrid, Layers } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-[#0f1e3c] flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-bold text-xl">LS</span>
        </div>
        <h1 className="text-6xl font-bold text-[#0f1e3c] mb-3">404</h1>
        <h2 className="text-xl font-semibold text-slate-700 mb-3">Page not found</h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Head back to the LossStack suite.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 bg-[#0f1e3c] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1a3060] transition-colors text-sm"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/apps"
            className="flex items-center gap-2 border border-slate-300 text-slate-600 font-semibold px-5 py-2.5 rounded-lg hover:bg-white transition-colors text-sm"
          >
            <LayoutGrid className="w-4 h-4" />
            View Apps
          </Link>
          <Link
            href="/pricing"
            className="flex items-center gap-2 border border-slate-300 text-slate-600 font-semibold px-5 py-2.5 rounded-lg hover:bg-white transition-colors text-sm"
          >
            <Layers className="w-4 h-4" />
            Bundle Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
