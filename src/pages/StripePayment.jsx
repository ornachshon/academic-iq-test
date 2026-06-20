import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useLanguage } from "@/lib/LanguageContext";
import { Lock, AlertCircle } from "lucide-react";
import { trackFunnel } from "@/lib/trackFunnel";

export default function StripePayment() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score;
  const email = location.state?.email || "";
  const timeTaken = location.state?.timeTaken || 0;
  const resultId = location.state?.resultId || "";
  const pricing = location.state?.pricing;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pricing || !pricing.price) {
      setError("Pricing information is missing.");
      setLoading(false);
      return;
    }

    trackFunnel("payment_initiated");

    // Store context in localStorage for post-payment redirect (Wix redirect has no router state)
    localStorage.setItem("iq_score", String(score));
    localStorage.setItem("userEmail", email);
    if (resultId) localStorage.setItem("iq_result_id", resultId);
    if (timeTaken) localStorage.setItem("iq_time_taken", String(timeTaken));

    (async () => {
      try {
        const res = await base44.functions.invoke("create-checkout", {
          priceAmount: pricing.price,
          email,
          score,
          resultId,
        });

        if (!res.data?.redirectUrl) {
          throw new Error("No checkout URL returned");
        }

        window.location.href = res.data.redirectUrl;
      } catch (err) {
        console.error("Checkout error:", err);
        setError(err.message || "Failed to initialize payment.");
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Background: blurred & darkened Thankyou page */}
      <div className="absolute inset-0 pointer-events-none select-none bg-white" style={{ filter: "blur(2px) brightness(0.45)" }}>
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/6feaa6fe0_aiq_academic_iq_test_logo.svg"
                alt="Academic IQ Test"
                className="h-10 w-10 object-contain"
              />
            </div>
          </div>
        </header>
        <div className="flex flex-col items-center justify-center px-4 py-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#0C3547] mb-3">{t("yourIQScoreIs")}</h1>
            <p className="text-6xl font-black" style={{ color: "transparent" }}>XXX</p>
            <p className="text-gray-500 mt-5 text-base">{t("wePreparedEverything")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
              <h2 className="text-lg font-bold text-[#0C3547] mb-2">{t("personalizedCertificate")}</h2>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">{t("certificateReady")}</p>
              <div className="w-full bg-[#F5921B] text-white font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2">{t("downloadCertificate")}</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
              <h2 className="text-lg font-bold text-[#0C3547] mb-2">{t("detailedAnalysisReport")}</h2>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">{t("fullStatisticalBreakdown")}</p>
              <div className="w-full bg-[#0C3547] text-white font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2">{t("viewReport")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal overlay — centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-50" style={{ paddingTop: "80px" }}>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Security notice */}
          <div className="flex items-start gap-3 px-5 pt-5 pb-4 border-b border-gray-100">
            <Lock className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-600 text-center flex-1">
              {t("stripeSecureNotice")}
            </p>
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600 text-xl font-light leading-none shrink-0">✕</button>
          </div>

          {/* Loading or error */}
          <div className="px-5 py-5">
            {loading && (
              <div className="flex flex-col items-center py-8">
                <div className="w-10 h-10 border-4 border-[#F5921B] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-500 text-sm">{t("processing")}</p>
              </div>
            )}
            {error && (
              <div className="text-center py-4">
                <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">{error}</p>
                <button onClick={() => navigate(-1)} className="bg-[#0C3547] text-white px-6 py-3 rounded-lg font-bold">
                  {t("goBack")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}