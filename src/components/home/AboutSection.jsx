import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CheckCircle } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C3547] mb-6">
              Why Take This IQ Test?
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Our IQ test measures several dimensions of general fluid intelligence, including visuospatial pattern reasoning, visuospatial insight, and numerical pattern reasoning skills. Designed by cognitive science experts, it provides accurate and precise information about your intellectual abilities.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Scientifically designed questions",
                "Instant, detailed score report",
                "Compare with global averages",
                "Pattern, numerical & spatial reasoning",
                "Completely free to take",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#F5921B] flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <Link to={createPageUrl("IQTest")}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#F5921B] hover:bg-[#e0830f] text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition-colors"
              >
                Start IQ Test
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-[#0C3547] to-[#11465e] rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">IQ Score Distribution</h3>
              <div className="space-y-4">
                {[
                  { range: "130+", label: "Very Superior", pct: 2 },
                  { range: "120-129", label: "Superior", pct: 7 },
                  { range: "110-119", label: "High Average", pct: 16 },
                  { range: "90-109", label: "Average", pct: 50 },
                  { range: "80-89", label: "Low Average", pct: 16 },
                  { range: "70-79", label: "Borderline", pct: 7 },
                  { range: "Below 70", label: "Extremely Low", pct: 2 },
                ].map((item) => (
                  <div key={item.range}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{item.range}</span>
                      <span className="text-gray-300">{item.label} ({item.pct}%)</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(item.pct * 2, 100)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="bg-[#F5921B] h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}