import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Check, Sparkles } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C3547] mb-4">
            Simple & Transparent
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Take the test completely free and get your IQ score instantly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="relative bg-white rounded-3xl shadow-xl border-2 border-[#F5921B]/20 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F5921B] to-[#f7a940]" />
            
            <div className="p-8 text-center">
              <div className="inline-flex items-center gap-2 bg-[#F5921B]/10 px-4 py-1.5 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#F5921B]" />
                <span className="text-sm font-semibold text-[#F5921B]">Most Popular</span>
              </div>
              
              <h3 className="text-2xl font-bold text-[#0C3547] mb-2">
                IQ Test + Full Report
              </h3>
              
              <div className="flex items-baseline justify-center gap-2 my-6">
                <span className="text-5xl font-black text-[#0C3547]">Free</span>
              </div>
              
              <p className="text-gray-500 mb-8">
                Get your complete IQ score and detailed cognitive report
              </p>
              
              <div className="space-y-4 text-left mb-8">
                {[
                  "Instant IQ score calculation",
                  "Detailed performance breakdown",
                  "Compare with global averages",
                  "Pattern & numerical reasoning analysis",
                  "Downloadable results",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link to={createPageUrl("IQTest")}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#F5921B] hover:bg-[#e0830f] text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-orange-500/20 transition-colors"
                >
                  Start Your IQ Test Now
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}