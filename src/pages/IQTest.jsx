import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, SkipForward, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

import questions, { calculateIQ } from "@/components/iq/QuestionData";
import Timer from "@/components/iq/Timer";
import QuestionCard from "@/components/iq/QuestionCard";
import QuestionNavigator from "@/components/iq/QuestionNavigator";


export default function IQTest() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false); // kept for timer compat

  const handleSelect = (optionIdx) => {
    setAnswers((prev) => ({ ...prev, [currentQ]: optionIdx }));
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  const handleSkip = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  const goToEmail = useCallback(() => {
    navigate("/Email", { state: { answers, startTime } });
  }, [navigate, answers, startTime]);

  const handleFinishClick = () => {
    goToEmail();
  };

  const handleTimeUp = useCallback(() => {
    goToEmail();
  }, [goToEmail]);

  const answeredCount = Object.keys(answers).length;

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 bg-[#0C3547] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-black text-[#F5921B]">IQ</span>
          </div>
          <h1 className="text-3xl font-bold text-[#0C3547] mb-4">Ready to Begin?</h1>
          <p className="text-gray-500 mb-6 leading-relaxed">
            You'll answer 30 questions in 20 minutes. The test measures pattern recognition, numerical reasoning, and spatial intelligence.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-[#0C3547]">30</p>
              <p className="text-xs text-gray-500">Questions</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-[#0C3547]">20</p>
              <p className="text-xs text-gray-500">Minutes</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-[#0C3547]">3</p>
              <p className="text-xs text-gray-500">Categories</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowIntro(false)}
            className="w-full bg-[#F5921B] hover:bg-[#e0830f] text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-orange-500/25 transition-colors"
          >
            Start Test
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
      {/* Top Bar */}
      <div className="bg-[#0C3547] px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h2 className="text-white font-bold text-lg">
            Question {currentQ + 1}
            <span className="text-gray-400 font-normal">/{questions.length}</span>
          </h2>
          <Timer totalSeconds={1200} onTimeUp={handleTimeUp} />
        </div>
        {/* Progress bar */}
        <div className="max-w-6xl mx-auto mt-3">
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <motion.div
              className="bg-[#F5921B] h-1.5 rounded-full"
              animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <QuestionCard
          question={questions[currentQ]}
          selectedAnswer={answers[currentQ]}
          onSelectAnswer={handleSelect}
        />

        {/* Controls */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentQ === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleSkip}
              disabled={currentQ === questions.length - 1}
              className="gap-2 border-[#F5921B] text-[#F5921B] hover:bg-[#F5921B]/10"
            >
              <SkipForward className="w-4 h-4" />
              Skip
            </Button>

            {currentQ === questions.length - 1 || answeredCount === questions.length ? (
              <Button
                onClick={handleFinishClick}
                disabled={isSubmitting}
                className="gap-2 bg-[#F5921B] hover:bg-[#e0830f] text-white px-6"
              >
                {isSubmitting ? "Submitting..." : "Finish Test"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={answers[currentQ] === undefined}
                className="gap-2 bg-[#0C3547] hover:bg-[#0e3d52] text-white px-6"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <QuestionNavigator
          total={questions.length}
          current={currentQ}
          answers={answers}
          onNavigate={setCurrentQ}
        />
        
        <p className="text-center text-sm text-gray-400 mt-4">
          {answeredCount} of {questions.length} questions answered
        </p>
      </div>

      {showEmailModal && (
        <EmailCaptureModal onSubmit={handleSubmit} />
      )}
    </div>
  );
}