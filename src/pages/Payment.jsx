import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { trackFunnel } from "@/lib/trackFunnel";
import { useLanguage } from "@/lib/LanguageContext";

export default function Payment() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score;
  const email = location.state?.email || "";
  const timeTaken = location.state?.timeTaken || 0;
  const resultId = location.state?.resultId || "";
  const pricing = location.state?.pricing;
  const couponId = location.state?.couponId || "";

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const initCheckout = useCallback(async () => {
    if (!pricing || !pricing.price || !pricing.currency_code) {
      setError("Pricing information is missing. Please go back and try again.");
      setLoading(false);
      return;
    }

    try {
      trackFunnel("payment_initiated");
      const res = await base44.functions.invoke("create-checkout", {
        email,
        score,
        priceAmount: pricing.price,
        priceCurrency: pricing.currency_code,
        resultId,
        couponId: couponId || undefined,
      });

      if (res.data?.redirectUrl) {
        window.location.href = res.data.redirectUrl;
      } else {
        setError("Failed to initialize payment. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Payment initialization error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }, [email, score, pricing, resultId, couponId]);

  useEffect(() => {
    initCheckout();
  }, [initCheckout]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{t("paymentError") || "Payment Error"}</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => navigate("/Checkout", { state: { score, email, timeTaken, resultId } })}
            className="bg-[#0C3547] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#0a2d3d] transition-colors w-full"
          >
            {t("goBack") || "Go Back"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <div className="text-center px-4">
        <Link to="/Home" className="inline-block mb-6">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/6feaa6fe0_aiq_academic_iq_test_logo.svg"
            alt="Academic IQ Test"
            className="h-12 w-12 object-contain mx-auto"
          />
        </Link>
        <div className="w-10 h-10 border-4 border-[#F5921B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-lg">{t("preparingPayment") || "Preparing payment..."}</p>
        <p className="text-gray-400 text-sm mt-2">{t("redirectingToPayment") || "Redirecting to secure checkout..."}</p>
      </div>
    </div>
  );
}