import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, PaymentRequestButtonElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { base44 } from "@/api/base44Client";
import { useLanguage } from "@/lib/LanguageContext";
import { CheckCircle, Lock } from "lucide-react";

const ELEMENT_STYLE = {
  base: {
    fontSize: "16px",
    color: "#1a1f36",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    "::placeholder": { color: "#aab7c4" },
  },
  invalid: { color: "#e53e3e" },
};

function CheckoutForm({ email, score, timeTaken, resultId, pricing, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (!stripe || !elements) return;

    const label = pricing?.currency_code === "JPY"
      ? `IQ Evaluation & Certificate - ¥${pricing.price}`
      : `IQ Evaluation & Certificate - ${pricing?.currency_symbol || "$"}${pricing?.price || "..."}`;

    const pr = stripe.paymentRequest({
      country: "US",
      currency: (pricing?.currency_code || "usd").toLowerCase(),
      total: {
        label,
        amount: pricing?.currency_code === "JPY" ? Math.round(pricing.price) : Math.round(pricing.price * 100),
      },
      requestPayerName: false,
      requestPayerEmail: false,
    });

    pr.canMakePayment().then((result) => {
      if (result) setPaymentRequest(pr);
    });
  }, [stripe, pricing]);

  useEffect(() => {
    if (!paymentRequest) return;

    paymentRequest.on("paymentmethod", async (ev) => {
      const res = await base44.functions.invoke("createPaymentIntentCustom", {
        email,
        score,
        priceAmount: pricing.price,
        priceCurrency: pricing.currency_code,
        resultId,
      });

      if (!res.data?.clientSecret) {
        ev.complete("fail");
        setError("Payment initialization failed.");
        return;
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        res.data.clientSecret,
        { payment_method: ev.paymentMethod.id },
        { handleActions: false }
      );

      if (confirmError) {
        ev.complete("fail");
        setError(confirmError.message);
      } else {
        ev.complete("success");
        if (paymentIntent?.status === "succeeded") {
          setSuccess(true);
          setTimeout(() => {
            navigate("/Info", {
              state: { score, email, timeTaken, resultId, paymentSuccess: true },
            });
          }, 1000);
        }
      }
    });
  }, [paymentRequest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const res = await base44.functions.invoke("createPaymentIntentCustom", {
      email,
      score,
      priceAmount: pricing.price,
      priceCurrency: pricing.currency_code,
      resultId,
    });

    if (!res.data?.clientSecret) {
      setError("Payment initialization failed. Please try again.");
      setLoading(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(res.data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      setLoading(false);
    } else if (paymentIntent?.status === "succeeded") {
      setSuccess(true);
      setTimeout(() => {
        navigate("/Info", {
          state: { score, email, timeTaken, resultId, paymentSuccess: true },
        });
      }, 1000);
    }
  };

  if (success) {
    return (
      <div className="text-center py-10">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-500">Redirecting to your results...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Google Pay / Apple Pay */}
      {paymentRequest && (
        <PaymentRequestButtonElement
          options={{ paymentRequest, style: { paymentRequestButton: { height: "52px" } } }}
          className="w-full"
        />
      )}

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-gray-200" />
        <span className="text-sm text-gray-500">Or Pay with Card</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      {/* Card Number */}
      <div className="border border-gray-300 rounded-xl px-4 py-4 bg-white focus-within:ring-2 focus-within:ring-[#F5921B] focus-within:border-[#F5921B] transition">
        <CardNumberElement options={{ style: ELEMENT_STYLE, placeholder: "CARD NUMBER" }} />
      </div>

      {/* Expiry + CVC */}
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-gray-300 rounded-xl px-4 py-4 bg-white focus-within:ring-2 focus-within:ring-[#F5921B] focus-within:border-[#F5921B] transition">
          <CardExpiryElement options={{ style: ELEMENT_STYLE, placeholder: "MM/YY" }} />
        </div>
        <div className="border border-gray-300 rounded-xl px-4 py-4 bg-white focus-within:ring-2 focus-within:ring-[#F5921B] focus-within:border-[#F5921B] transition">
          <CardCvcElement options={{ style: ELEMENT_STYLE, placeholder: "CVV" }} />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-[#F5921B] text-white py-4 rounded-full font-black text-lg tracking-widest uppercase hover:bg-[#e0830f] transition disabled:opacity-70 mt-2"
      >
        {loading ? "Processing..." : "Get My IQ Result"}
      </button>
    </form>
  );
}

export default function StripePayment() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score;
  const email = location.state?.email || "";
  const timeTaken = location.state?.timeTaken || 0;
  const resultId = location.state?.resultId || "";
  const pricing = location.state?.pricing;
  const lang = location.state?.locale;

  const [stripePromise, setStripePromise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pricing || !pricing.price) {
      setError("Pricing information is missing.");
      setLoading(false);
      return;
    }
    base44.functions.invoke("createPaymentIntentCustom", {
      email,
      score,
      priceAmount: pricing.price,
      priceCurrency: pricing.currency_code,
      resultId,
    }).then((res) => {
      if (res.data?.publishableKey) {
        setStripePromise(loadStripe(res.data.publishableKey));
      } else {
        setError("Failed to initialize payment.");
      }
    }).catch(() => {
      setError("Something went wrong.");
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Background: blurred & darkened Thankyou page top */}
      <div className="absolute inset-0 pointer-events-none select-none bg-white" style={{ filter: "blur(2px) brightness(0.45)" }}>
        <header className="border-b border-gray-200 px-6">
          <div className="flex items-center h-16">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/6feaa6fe0_aiq_academic_iq_test_logo.svg"
              alt="Academic IQ Test"
              className="h-10 w-10 object-contain"
            />
          </div>
        </header>
        <div className="flex flex-col items-center pt-12 px-4">
          <h1 className="text-4xl font-bold text-[#0C3547]">{t("yourIQScoreIs")}</h1>
        </div>
      </div>

      {/* Modal overlay — centered */}
      <div className="absolute inset-0 flex items-center justify-center px-4 z-50">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Security notice */}
          <div className="flex items-start gap-3 px-5 pt-5 pb-4 border-b border-gray-100">
            <Lock className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-600 text-center flex-1">
              All transactions are secure and encrypted. Credit Card information is never stored.
            </p>
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600 text-xl font-light leading-none shrink-0">✕</button>
          </div>

          {/* Payment form or loading/error */}
          <div className="px-5 py-5">
            {loading && (
              <div className="flex justify-center py-8">
                <div className="w-10 h-10 border-4 border-[#F5921B] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {error && (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">{error}</p>
                <button onClick={() => navigate(-1)} className="bg-[#0C3547] text-white px-6 py-3 rounded-lg font-bold">
                  Go Back
                </button>
              </div>
            )}
            {stripePromise && (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  email={email}
                  score={score}
                  timeTaken={timeTaken}
                  resultId={resultId}
                  pricing={pricing}
                  onBack={() => navigate(-1)}
                />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}