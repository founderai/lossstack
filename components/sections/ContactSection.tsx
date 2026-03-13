"use client";

import { motion } from "framer-motion";
import { Mail, Calendar, ArrowRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="px-6 py-16 lg:py-20 bg-[#f5f0e8]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bg-[#0f1e3c] rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden"
        >
          {/* BG decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-600/10 blur-[60px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-teal-500/10 blur-[50px] pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
              <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Get in Touch</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              See LossStack in action
            </h2>
            <p className="text-blue-200/70 text-lg max-w-2xl mx-auto mb-10">
              Request a personalized demo and see how the LossStack suite can transform your claims and restoration workflow. Our team is ready to walk you through every app.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:founderai@pm.me?subject=LossStack Inquiry"
                className="flex items-center gap-2.5 bg-white text-[#0f1e3c] font-bold px-6 py-3.5 rounded-lg hover:bg-blue-50 transition-colors text-sm shadow-sm w-full sm:w-auto justify-center"
              >
                <Mail className="w-4 h-4" />
                Email Us
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:founderai@pm.me?subject=LossStack Demo Request"
                className="flex items-center gap-2.5 bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-lg hover:bg-white/15 transition-colors text-sm w-full sm:w-auto justify-center"
              >
                <Calendar className="w-4 h-4" />
                Schedule a Demo
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
