"use client";

import { motion } from "framer-motion";
import { Camera, ImageIcon, FileText, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    id: "restorecam",
    step: "01",
    icon: Camera,
    label: "RestoreCam",
    role: "Field Documentation",
    description: "Technicians capture moisture readings, jobsite photos, and equipment logs from the field in real time.",
    color: "#F59E0B",
    bg: "#FEF3C7",
  },
  {
    id: "imagelablr",
    step: "02",
    icon: ImageIcon,
    label: "ImageLablr",
    role: "Photo Intelligence",
    description: "Label, categorize, and organize hundreds of claim photos into export-ready packages — faster and more consistently than manual workflows.",
    color: "#0D9488",
    bg: "#CCFBF1",
  },
  {
    id: "appraisly",
    step: "03",
    icon: FileText,
    label: "Appraisly",
    role: "Claims Intelligence",
    description: "Structured field data and organized photos fuel AI-generated narratives, estimate comparisons, and professional reports.",
    color: "#3B82F6",
    bg: "#DBEAFE",
  },
  {
    id: "report",
    step: "04",
    icon: CheckCircle,
    label: "Final Report",
    role: "Resolved Claim",
    description: "A complete, defensible claim package — ready for carrier submission, mediation, or arbitration.",
    color: "#8B5CF6",
    bg: "#EDE9FE",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function WorkflowSection() {
  return (
    <section className="px-6 py-16 lg:py-24 bg-[#0f1e3c] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-4">
            <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide">The Ecosystem</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            From first photo to final report —<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-teal-400">
              one connected workflow.
            </span>
          </h2>
          <p className="text-blue-200/70 text-lg max-w-2xl mx-auto">
            Each app handles a distinct stage. Together, they eliminate every handoff bottleneck in the claims and restoration process.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:items-stretch"
        >
          {steps.map((step, i) => (
            <div key={step.id} className="flex lg:flex-col items-stretch gap-0">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="flex-1 relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-200 lg:mx-2"
              >
                {/* Step number */}
                <div className="text-white/20 text-xs font-bold tracking-widest uppercase mb-4">
                  Step {step.step}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${step.color}22` }}
                >
                  <step.icon className="w-6 h-6" style={{ color: step.color }} />
                </div>

                {/* Label */}
                <div className="font-bold text-white text-lg mb-1">{step.label}</div>
                <div
                  className="text-xs font-semibold uppercase tracking-wide mb-3"
                  style={{ color: step.color }}
                >
                  {step.role}
                </div>

                {/* Description */}
                <p className="text-blue-200/60 text-sm leading-relaxed">{step.description}</p>
              </motion.div>

              {/* Arrow connector — desktop only, not after last item */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center w-0 relative z-10">
                  <div className="absolute -right-3 w-6 h-6 rounded-full bg-[#0f1e3c] border border-white/20 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-white/40" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10 text-blue-300/50 text-sm"
        >
          Use one app. Use two. Use all three — the workflow scales with your operation.
        </motion.div>
      </div>
    </section>
  );
}
