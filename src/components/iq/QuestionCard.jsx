import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuestionCard({ question, selectedAnswer, onSelectAnswer }) {
  const labels = ["A", "B", "C", "D", "E", "F"];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}
        className="grid md:grid-cols-[1.2fr_1fr] gap-6"
      >
        {/* Question Area */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <h3 className="text-[#0C3547] font-bold text-lg mb-6 border-b-2 border-[#F5921B] pb-3 inline-block">
            {question.question}
          </h3>

          {question.grid && (
            <div className="flex justify-center my-6">
              <div className="inline-grid gap-0.5 bg-gray-200 p-0.5 rounded-xl">
                {question.grid.map((row, rIdx) => (
                  <div key={rIdx} className="flex gap-0.5">
                    {row.map((cell, cIdx) => (
                      <div
                        key={cIdx}
                        className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-xl sm:text-2xl font-bold rounded-lg ${
                          cell === "?"
                            ? "bg-[#F5921B] text-white text-3xl"
                            : "bg-white text-[#0C3547]"
                        }`}
                      >
                        {cell}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!question.grid && (
            <div className="flex items-center justify-center min-h-[200px]">
              <p className="text-2xl sm:text-3xl font-bold text-[#0C3547] text-center">
                {question.question.includes("?") ? "" : question.question}
              </p>
            </div>
          )}
        </div>

        {/* Answers Area */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <h4 className="text-[#0C3547] font-bold mb-6 border-b-2 border-[#F5921B] pb-3 inline-block">
            Choose an answer:
          </h4>

          <div className="grid grid-cols-2 gap-3">
            {question.options.map((option, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectAnswer(idx)}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                  selectedAnswer === idx
                    ? "border-[#F5921B] bg-[#F5921B]/10 shadow-md"
                    : "border-gray-200 hover:border-[#0C3547]/30 hover:bg-gray-50"
                }`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  selectedAnswer === idx
                    ? "bg-[#F5921B] text-white"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {labels[idx]}
                </span>
                <span className="font-semibold text-[#0C3547] text-lg">{option}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}