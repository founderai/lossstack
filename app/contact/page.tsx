"use client";

import { useState } from "react";
import { Mail, Calendar, Send, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"general" | "demo" | "support">("general");

  const subjects: Record<typeof type, string> = {
    general: "LossStack Inquiry",
    demo: "LossStack Demo Request",
    support: "LossStack Support",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(subjects[type]);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:founderai@pm.me?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] px-6 py-16 lg:py-24">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-[#0f1e3c]/8 border border-[#0f1e3c]/12 rounded-full px-4 py-1.5 mb-5">
              <span className="text-[#0f1e3c] text-xs font-semibold uppercase tracking-wide">Get in Touch</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#0f1e3c] mb-3">Contact LossStack</h1>
            <p className="text-slate-500 text-base">
              Questions, demo requests, early access, or support — send us a message and we&apos;ll get back to you directly.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Type selector */}
              <div>
                <label className="block text-sm font-semibold text-[#0f1e3c] mb-2">What can we help with?</label>
                <div className="flex gap-2 flex-wrap">
                  {([
                    { value: "general", label: "General Inquiry" },
                    { value: "demo",    label: "Request a Demo" },
                    { value: "support", label: "Support" },
                  ] as const).map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setType(opt.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                        type === opt.value
                          ? "bg-[#0f1e3c] text-white border-[#0f1e3c]"
                          : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-[#0f1e3c] mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0f1e3c] transition-colors bg-slate-50 focus:bg-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#0f1e3c] mb-1.5">Your Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0f1e3c] transition-colors bg-slate-50 focus:bg-white"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-[#0f1e3c] mb-1.5">Message</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={type === "demo" ? "Tell us about your team and what you'd like to see in a demo..." : "How can we help?"}
                  rows={5}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0f1e3c] transition-colors bg-slate-50 focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#0f1e3c] hover:bg-[#1a3060] text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors"
              >
                <Send className="w-4 h-4" />
                Send Message
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Direct links */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="mailto:founderai@pm.me?subject=LossStack Inquiry"
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-5 py-4 hover:border-slate-300 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0f1e3c]">Email directly</div>
                <div className="text-xs text-slate-400">founderai@pm.me</div>
              </div>
            </a>
            <a
              href="mailto:founderai@pm.me?subject=LossStack Demo Request"
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-5 py-4 hover:border-slate-300 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0f1e3c]">Schedule a demo</div>
                <div className="text-xs text-slate-400">We&apos;ll walk you through every app</div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
