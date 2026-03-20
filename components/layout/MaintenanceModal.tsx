"use client";

import { useState, useEffect } from "react";
import { X, Wrench } from "lucide-react";

export default function MaintenanceModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("maintenance_dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("maintenance_dismissed", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative bg-[#0f1e3c] border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-blue-300/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/15 mx-auto mb-5">
          <Wrench className="w-7 h-7 text-amber-400" />
        </div>

        <h2 className="text-white font-bold text-xl mb-3">
          Major Update In Progress
        </h2>

        <p className="text-blue-200/70 text-sm leading-relaxed mb-6">
          We&apos;re currently rolling out a significant platform update.
          Some features may be temporarily unavailable or behaving unexpectedly.
          <br /><br />
          Please bear with us — we expect everything to be fully live and
          running <span className="text-white font-semibold">by next week</span>.
          Thank you for your patience!
        </p>

        <button
          onClick={dismiss}
          className="w-full bg-linear-to-r from-blue-500 to-teal-500 hover:from-blue-400 hover:to-teal-400 text-white font-semibold py-2.5 rounded-lg transition-all duration-150 text-sm"
        >
          Got it, thanks
        </button>
      </div>
    </div>
  );
}
