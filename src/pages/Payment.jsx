import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
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

  const [clientSecret, setClientSecret] = useState(null);
  const [stripePromise, setStripePromise] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = useCallback(async () => {
    if (!pricing || !pricing.price || !pricing.currency_code) {
      setError("Pricing information is missing. Please go back and try again.");
      setLoading(false);
      return;
    }

    try {
      trackFunnel("payment_initiated");
      const res = await base44.functions.invoke("createPaymentIntent", {
        email,
        score,
        priceAmount: pricing.price,
        priceCurrency: pricing.currency_code,
        resultId,
        couponId: couponId || undefined,
      });

      if (res.data?.clientSecret && res.data?.publishableKey) {
        setClientSecret(res.data.clientSecret);
        setStripePromise(loadStripe(res.data.publishableKey));
      } else {
        setError("Failed to initialize payment. Please try again.");
      }
    } catch (err) {
      console.error("Payment initialization error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [email, score, pricing, resultId, couponId]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#F5921B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">{t("preparingPayment") || "Preparing payment..."}</p>
        </div>
      </div>
    );
  }

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

  if (!clientSecret || !stripePromise) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">{t("loadingPayment") || "Loading payment..."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/Home">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/6feaa6fe0_aiq_academic_iq_test_logo.svg"
                alt="Academic IQ Test"
                className="h-10 w-10 object-contain"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Secure badge */}
      <div className="bg-[#0C3547] text-white text-center py-2 text-sm">
        <span className="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          {t("securePayment") || "Secure Payment"}
        </span>
      </div>

      {/* Embedded Checkout */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
          <EmbeddedCheckout className="bg-white rounded-lg shadow-md" />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}