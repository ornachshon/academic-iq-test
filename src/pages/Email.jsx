import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import questions, { calculateIQ } from "@/components/iq/QuestionData";

export default function Email() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State passed from IQTest via navigate
  const { answers = {}, startTime = Date.now() } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;
    setIsSubmitting(true);

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    let correct = 0;
    const answerDetails = questions.map((q, idx) => {
      const selected = answers[idx];
      const isCorrect = selected === q.correct;
      if (isCorrect) correct++;
      return {
        question_id: q.id,
        selected_answer: selected ?? -1,
        correct: isCorrect
      };
    });

    const score = calculateIQ(correct);

    const result = await base44.entities.IQResult.create({
      score,
      correct_answers: correct,
      total_questions: 20,
      time_taken_seconds: timeTaken,
      answers: answerDetails,
      email: email.trim()
    });

    navigate(createPageUrl("Checkout") + `?id=${result.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background overlay */}
      <div className="bg-zinc-950 opacity-90 absolute inset-0" />

      {/* Modal card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 text-center">

        <h2 className="text-2xl font-bold text-[#0C3547] mb-1">
          Where to send your IQ score
        </h2>
        <h2 className="text-2xl font-bold text-[#0C3547] mb-4">
          and performance report?
        </h2>

        <p className="text-gray-500 text-sm mb-4">Please enter your email:</p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            placeholder="" />


          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#F5921B] hover:bg-[#e0830f] text-white font-bold py-3 rounded-md transition-colors text-base disabled:opacity-60">

            {isSubmitting ? "Processing..." : "Get IQ Results"}
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4 leading-relaxed flex items-center justify-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          We value your privacy. Your email will never be shared with anyone.
        </p>
      </motion.div>
    </div>);

}