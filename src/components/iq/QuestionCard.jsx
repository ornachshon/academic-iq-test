import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShapeRenderer from "./ShapeRenderer";

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
            Which shape is missing?
          </h3>

          {question.image && (
            <div className="flex justify-center my-4">
              <img src={question.image} alt="Question" className="max-w-full rounded-xl" />
            </div>
          )}

          {!question.image && question.grid && (
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
                        <ShapeRenderer shapeName={cell} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!question.image && !question.grid && (
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
            {question.options.map((option, idx) => {
              const isImageOption = typeof option === "object" && option.image;
              return (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelectAnswer(idx)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    selectedAnswer === idx
                      ? "border-[#F5921B] bg-[#F5921B]/10 shadow-md"
                      : "border-gray-200 hover:border-[#0C3547]/30 hover:bg-gray-50"
                  }`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 self-start ${
                    selectedAnswer === idx
                      ? "bg-[#F5921B] text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    {labels[idx]}
                  </span>
                  {isImageOption ? (
                    <div className="w-full h-20 flex items-center justify-center">
                      <img src={option.image} alt={option.text} className="h-full w-full object-contain" />
                    </div>
                  ) : (
                    <span className="font-semibold text-[#0C3547] text-base leading-tight text-left w-full">{option}</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}