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
  const [paypalLoading, setPaypalLoading] = useState(false);
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
    <form onSubmit={handleSubmit} className="space-y-5">
      {paymentRequest && (
        <PaymentRequestButtonElement
          options={{ paymentRequest }}
          className="w-full"
        />
      )}

      {/* PayPal button */}
      <button
        type="button"
        disabled={paypalLoading}
        onClick={async () => {
          setPaypalLoading(true);
          setError(null);

          const res = await base44.functions.invoke("createPaymentIntentCustom", {
            email,
            score,
            priceAmount: pricing.price,
            priceCurrency: pricing.currency_code,
            resultId,
          });

          if (!res.data?.clientSecret) {
            setError("Payment initialization failed.");
            setPaypalLoading(false);
            return;
          }

          const origin = window.location.origin;
          const returnUrl = `${origin}/Info?score=${encodeURIComponent(score || "")}&email=${encodeURIComponent(email || "")}&resultId=${encodeURIComponent(resultId || "")}&paymentSuccess=true`;

          const { error: paypalError } = await stripe.confirmPayPalPayment(
            res.data.clientSecret,
            { return_url: returnUrl }
          );

          if (paypalError) {
            setError(paypalError.message);
            setPaypalLoading(false);
          }
        }}
        className="w-full bg-[#0070BA] text-white py-3 rounded-lg font-bold text-base hover:bg-[#005fa3] transition disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {paypalLoading ? "Loading..." : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H8.134c-.524 0-.973.382-1.058.903L7.076 21.337Z"/>
            </svg>
            PayPal
          </>
        )}
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-gray-200" />
        <span className="text-xs text-gray-400 font-medium">or pay with card</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Card Number</label>
        <div className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-[#F5921B] focus-within:border-[#F5921B] transition">
          <CardNumberElement options={{ style: ELEMENT_STYLE }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expiry Date</label>
          <div className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-[#F5921B] focus-within:border-[#F5921B] transition">
            <CardExpiryElement options={{ style: ELEMENT_STYLE }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">CVC</label>
          <div className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-[#F5921B] focus-within:border-[#F5921B] transition">
            <CardCvcElement options={{ style: ELEMENT_STYLE }} />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 bg-[#F5921B] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#e0830f] transition disabled:opacity-70"
        >
          {loading ? "Processing..." : `Pay ${pricing?.currency_symbol || "$"}${pricing?.price || "..."}`}
        </button>
      </div>
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-10 h-10 border-4 border-[#F5921B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <p className="text-gray-600 mb-4">{error}</p>
        <button onClick={() => navigate(-1)} className="bg-[#0C3547] text-white px-6 py-3 rounded-lg font-bold">
          Go Back
        </button>
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

      {/* Content */}
      <div className="flex-1 max-w-lg w-full mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-1">{t("orderDetails")}</h1>
          <p className="text-gray-500 text-sm mb-6">IQ Evaluation & Certificate • One-time fee</p>

          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 mb-6">
            <span className="font-semibold text-gray-700">{t("oneTimeFeeOnly")}</span>
            <span className="text-lg font-bold text-[#0C3547]">
              {pricing?.currency_symbol || "$"}{pricing?.price || "..."}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Lock className="w-4 h-4" />
            <span>{t("securePayment")}</span>
          </div>

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
  );
}