import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, BarChart3, Zap } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Take the IQ Test",
    description: "Answer 30 carefully designed questions covering pattern recognition, numerical reasoning, and spatial intelligence.",
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Get Your Score",
    description: "Receive your personalized IQ score instantly and see how you compare to millions of test-takers worldwide.",
  },
  {
    icon: Zap,
    number: "03",
    title: "Unlock Your Potential",
    description: "Understand your cognitive strengths and discover areas where you can sharpen your mental abilities.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C3547] mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Our test is designed by experts to measure your fluid intelligence through fun, challenging problems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#F5921B]/20 transition-all duration-300 group"
            >
              <span className="text-6xl font-black text-[#F5921B]/10 absolute top-4 right-6 group-hover:text-[#F5921B]/20 transition-colors">
                {step.number}
              </span>
              <div className="w-14 h-14 rounded-xl bg-[#0C3547] flex items-center justify-center mb-6">
                <step.icon className="w-7 h-7 text-[#F5921B]" />
              </div>
              <h3 className="text-xl font-bold text-[#0C3547] mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}