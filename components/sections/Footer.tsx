"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { apps } from "@/data/apps";

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-blue-200/70 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-400 to-teal-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm">LS</span>
              </div>
              <span className="text-white font-bold text-base">LossStack</span>
            </div>
            <p className="text-sm leading-relaxed text-blue-200/50">
              The AI-powered claims and restoration suite. Purpose-built for insurance and restoration professionals.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Products</h4>
            <ul className="space-y-2.5">
              {apps.map((app) => (
                <li key={app.id}>
                  <Link
                    href={app.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    {app.name}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <li><Link href="/apps" className="text-sm hover:text-white transition-colors">App Overview</Link></li>
              <li><Link href="/pricing" className="text-sm hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/compare" className="text-sm hover:text-white transition-colors">Compare Plans</Link></li>
              <li><Link href="/roadmap" className="text-sm hover:text-white transition-colors">Roadmap</Link></li>
              <li><Link href="/#faqs" className="text-sm hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link href="/contact" className="text-sm hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-white transition-colors">Request a Demo</Link></li>
              <li><Link href="/status" className="text-sm hover:text-white transition-colors">System Status</Link></li>
              <li><Link href="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-blue-200/30">
            © 2025 LossStack. All rights reserved.
          </p>
          <p className="text-xs text-blue-200/30">
            Purpose-built for insurance, appraisal, and restoration professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}
