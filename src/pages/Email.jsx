import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { trackFunnel } from "@/lib/trackFunnel";
import questions, { calculateDetailedIQ } from "@/components/iq/QuestionData";
import { useLanguage } from "@/lib/LanguageContext";
import { useGeoPrice } from "@/hooks/useGeoPrice";

export default function Email() {
  const { t } = useLanguage();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { pricing } = useGeoPrice();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

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

    const { iqScore: score } = calculateDetailedIQ(answerDetails);

    try {
      base44.analytics.track({ eventName: "assessment_completed", properties: { score, correct_answers: correct } });
    } catch (_) {}

    trackFunnel("email_inserted");

    // Brevo: track email insert event (fire-and-forget)
    const language = localStorage.getItem("selectedLanguage") || "en";
    base44.functions.invoke("trackBrevoEvent", { eventName: "insert_email", email: email.trim(), properties: { iq_score: score, language, IQ_SCORE: score } }).catch(() => {});

    // Go directly to Wix payment page
    trackFunnel("payment_initiated");
    try {
      const response = await base44.functions.invoke("createCheckout", {
        price: String(pricing?.price || "9.99"),
        currency: pricing?.currency_code || "USD",
        score,
        email: email.trim(),
      });
      const { redirectUrl } = response.data;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong initiating payment. Please try again.");
      setIsSubmitting(false);
    }
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
          {t("emailModalTitle1")}
        </h2>
        <h2 className="text-2xl font-bold text-[#0C3547] mb-4">
          {t("emailModalTitle2")}
        </h2>

        <p className="text-gray-500 text-sm mb-4">{t("emailModalSubtitle")}</p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <div className="relative w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
              placeholder="" />
          </div>


          <button
            type={isValidEmail ? "submit" : "button"}
            disabled={isSubmitting}
            className={`w-full font-bold py-3 rounded-md transition-colors text-base ${isValidEmail ? "bg-[#F5921B] hover:bg-[#e0830f] text-white" : "bg-[#f5c07b] text-white cursor-pointer"}`}>

            {isSubmitting ? t("processing") : t("getMyResults")}
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4 leading-relaxed flex items-center justify-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          {t("privacyNote")}
        </p>
      </motion.div>
    </div>);

}