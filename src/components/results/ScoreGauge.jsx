import React from "react";
import { motion } from "framer-motion";

export default function ScoreGauge({ score }) {
  const getLabel = (s) => {
    if (s >= 130) return { text: "Very Superior", color: "#16a34a" };
    if (s >= 120) return { text: "Superior", color: "#22c55e" };
    if (s >= 110) return { text: "High Average", color: "#84cc16" };
    if (s >= 90) return { text: "Average", color: "#F5921B" };
    if (s >= 80) return { text: "Low Average", color: "#f59e0b" };
    if (s >= 70) return { text: "Borderline", color: "#ef4444" };
    return { text: "Extremely Low", color: "#dc2626" };
  };

  const { text, color } = getLabel(score);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
        className="relative w-48 h-48"
      >
        {/* Outer ring */}
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          <circle cx="100" cy="100" r="85" fill="none" stroke="#e5e7eb" strokeWidth="12" />
          <motion.circle
            cx="100" cy="100" r="85"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 85}
            initial={{ strokeDashoffset: 2 * Math.PI * 85 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 85 * (1 - Math.min(score / 160, 1)) }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-5xl font-black text-[#0C3547]"
          >
            {score}
          </motion.span>
          <span className="text-sm text-gray-400 font-medium">IQ Score</span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-4 px-6 py-2 rounded-full font-bold text-sm"
        style={{ backgroundColor: color + "20", color }}
      >
        {text}
      </motion.div>
    </div>
  );
}