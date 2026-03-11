import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Brain, Clock, Target, Award, RotateCcw, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScoreGauge from "@/components/results/ScoreGauge";
import BellCurve from "@/components/results/BellCurve";

export default function Results() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      base44.entities.IQResult.list().then((results) => {
        const found = results.find((r) => r.id === id);
        setResult(found);
        setLoading(false);
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#F5921B] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Result not found</p>
          <Link to={createPageUrl("Home")}>
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const minutes = Math.floor(result.time_taken_seconds / 60);
  const secs = result.time_taken_seconds % 60;
  const percentile = getPercentile(result.score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-16">
      {/* Header */}
      <div className="bg-[#0C3547] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Your IQ Test Results
          </motion.h1>
          <p className="text-gray-300 mt-2">Here's how you performed</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-4">
        {/* Main Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <ScoreGauge score={result.score} />
            
            <div className="flex-1 w-full">
              <h2 className="text-2xl font-bold text-[#0C3547] mb-6">Performance Summary</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Target, label: "Correct Answers", value: `${result.correct_answers}/30` },
                  { icon: Clock, label: "Time Taken", value: `${minutes}m ${secs}s` },
                  { icon: Award, label: "Percentile", value: `Top ${percentile}%` },
                  { icon: Brain, label: "IQ Score", value: result.score },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <stat.icon className="w-4 h-4 text-[#F5921B]" />
                      <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                    </div>
                    <p className="text-xl font-bold text-[#0C3547]">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bell Curve */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-8 mt-6"
        >
          <h3 className="text-xl font-bold text-[#0C3547] mb-2">IQ Distribution</h3>
          <p className="text-gray-500 text-sm mb-6">Your score compared to the global population</p>
          <BellCurve score={result.score} />
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 mt-6"
        >
          <h3 className="text-xl font-bold text-[#0C3547] mb-6">Cognitive Breakdown</h3>
          <div className="space-y-5">
            {getCategoryScores(result.answers).map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{cat.name}</span>
                  <span className="text-sm font-bold text-[#0C3547]">{cat.correct}/{cat.total}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(cat.correct / cat.total) * 100}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"
        >
          <Link to={createPageUrl("IQTest")}>
            <Button
              variant="outline"
              className="gap-2 border-[#0C3547] text-[#0C3547] hover:bg-[#0C3547]/5 px-8 py-3"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Test
            </Button>
          </Link>
          <Button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "My IQ Test Results",
                  text: `I scored ${result.score} on the IQ Test! Take the test yourself.`,
                  url: window.location.href,
                });
              }
            }}
            className="gap-2 bg-[#F5921B] hover:bg-[#e0830f] text-white px-8 py-3"
          >
            <Share2 className="w-4 h-4" />
            Share Results
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function getPercentile(score) {
  // Approximate percentile from IQ
  const z = (score - 100) / 15;
  const p = 0.5 * (1 + erf(z / Math.sqrt(2)));
  return Math.max(1, Math.round((1 - p) * 100));
}

function erf(x) {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);
  const t = 1 / (1 + p * absX);
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
  return sign * y;
}

function getCategoryScores(answers) {
  // Questions by category (indices in the data)
  const categories = {
    "Pattern Recognition": { indices: [0, 2, 5, 7, 10, 12, 15, 17, 20, 22, 25, 28], color: "#F5921B" },
    "Numerical Reasoning": { indices: [1, 3, 6, 8, 11, 13, 16, 18, 21, 23, 26, 29], color: "#0C3547" },
    "Spatial Intelligence": { indices: [4, 9, 14, 19, 24, 27], color: "#22c55e" },
  };

  return Object.entries(categories).map(([name, { indices, color }]) => {
    const total = indices.length;
    const correct = indices.filter((i) => answers?.[i]?.correct).length;
    return { name, total, correct, color };
  });
}