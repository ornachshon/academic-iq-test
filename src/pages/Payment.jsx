import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Shield, Loader2 } from "lucide-react";
import { trackFunnel } from "@/lib/trackFunnel";
import { base44 } from "@/api/base44Client";
import { useGeoPrice } from "@/hooks/useGeoPrice";

export default function Payment() {
  const location = useLocation();
  const score = location.state?.score || "???";
  const navigate = useNavigate();
  const [payMethod, setPayMethod] = useState("oneclick"); // "oneclick" | "card"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { pricing, loading: priceLoading, formatPrice } = useGeoPrice();

  useEffect(() => { trackFunnel("payment_page_viewed"); }, []);

  const goToCheckout = async (method) => {
    setLoading(true);
    setError(null);
    trackFunnel("payment_initiated", { payment_method: method });
    try {
      const res = await base44.functions.invoke("createCheckout", {
        score,
        email: location.state?.email || "",
        currency_code: pricing.currency_code,
        price: pricing.price,
      });
      const redirectUrl = res.data?.redirectUrl;
      if (!redirectUrl) throw new Error("No redirect URL received");

      window.location.href = redirectUrl;
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      {/* ── Background "Results" teaser ── */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 select-none pointer-events-none">
        {/* Fake results header */}
        <div className="bg-[#0C3547] px-4 py-4 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h2 className="text-white font-bold text-lg">Your Results</h2>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 pt-10 text-center">
          <p className="text-2xl md:text-3xl font-bold text-[#0C3547] mb-2">
            Your IQ test is:
          </p>
          {/* Blurred / hidden score */}
          <div className="inline-block mt-4 px-10 py-6 bg-white rounded-2xl shadow-lg border border-gray-200">
            <p className="text-7xl font-black text-[#F5921B] blur-md select-none">
              {score}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {[
              { title: "Personalized IQ Certificate", desc: "A personalized certificate is ready for you to download with just one click." },
              { title: "Detailed Analysis Report", desc: "A personalized certificate is ready for you to download with just one click." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow border border-gray-100">
                <p className="font-bold text-[#0C3547] mb-1">{item.title}</p>
                <p className="text-gray-400 text-sm">{item.desc}</p>
                <div className="mt-3 h-9 rounded bg-[#0C3547] opacity-40" />
              </div>
            ))}
          </div>

          <p className="text-gray-400 text-xs mt-6">
            Your results are based on the email you provided.
          </p>
        </div>
      </div>

      {/* ── Dark overlay ── */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

      {/* ── Payment popup ── */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 relative z-10">
          {/* Close button */}
          <button onClick={() => navigate(-1)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          {/* Title */}
          <h2 className="text-center text-lg font-bold text-gray-800 mb-1">Quick Checkout</h2>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-4 border-b pb-3">
            <span className="font-medium text-gray-700">Total:</span>
            <span className="font-bold text-gray-800">
              {priceLoading ? "..." : formatPrice(pricing.price)}
            </span>
          </div>

          {/* One-click payment option */}
          <div
            className={`flex items-center gap-2 border rounded-lg px-4 py-3 mb-3 cursor-pointer transition-colors ${payMethod === "oneclick" ? "border-[#0C3547]" : "border-gray-200 hover:border-gray-300"}`}
            onClick={() => setPayMethod("oneclick")}
          >
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${payMethod === "oneclick" ? "border-[#0C3547]" : "border-gray-300"}`}>
              {payMethod === "oneclick" && <div className="w-2 h-2 rounded-full bg-[#0C3547]" />}
            </div>
            <span className="text-sm font-semibold text-gray-700">One-click payment</span>
          </div>

          {payMethod === "oneclick" && (
            <>
              <p className="text-xs text-gray-400 text-center mb-3">The faster, easier way to pay</p>
              {/* Google Pay */}
              <button onClick={() => goToCheckout("google_pay")} disabled={loading} className="w-full mb-2 bg-black text-white rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors font-medium text-sm disabled:opacity-60">
                <svg viewBox="0 0 41 17" width="50" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.526 2.635v4.083h2.518c.6 0 1.096-.202 1.488-.605.403-.402.605-.882.605-1.437 0-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0 5.52v4.736h-1.504V1.198h3.99c1.013 0 1.873.337 2.582 1.012.72.675 1.08 1.497 1.08 2.466 0 .99-.36 1.819-1.08 2.482-.698.665-1.559.996-2.583.996h-2.485zM27.194 10.655c0 .392.166.718.499.98.332.26.722.39 1.168.39.633 0 1.196-.234 1.692-.701.497-.469.744-1.019.744-1.651-.469-.37-1.123-.555-1.962-.555-.61 0-1.12.148-1.528.442-.409.294-.613.657-.613 1.095m1.946-5.442c1.075 0 1.924.287 2.546.862.623.574.934 1.361.934 2.362v4.765h-1.439v-1.073h-.063c-.601.882-1.402 1.323-2.4 1.323-.854 0-1.566-.253-2.138-.758-.572-.506-.858-1.139-.858-1.9 0-.802.303-1.44.91-1.915.607-.475 1.415-.712 2.425-.712.862 0 1.572.158 2.13.474v-.332c0-.507-.2-.935-.6-1.283a2.077 2.077 0 00-1.415-.522c-.82 0-1.468.345-1.945 1.036l-1.322-.831c.726-1.045 1.8-1.568 3.235-1.568M40.24 5.467l-5.02 11.54H33.67l1.864-4.034-3.306-7.506h1.695l2.384 5.76h.032l2.32-5.76z" fill="white"/>
                  <path d="M13.16 8.467c0-.468-.04-.92-.116-1.35H6.7v2.56h3.633a3.104 3.104 0 01-1.343 2.035v1.69h2.175c1.27-1.17 2.003-2.9 2.003-4.935" fill="#4285F4"/>
                  <path d="M6.7 14.53c1.82 0 3.35-.605 4.466-1.638l-2.175-1.69c-.604.406-1.378.648-2.29.648-1.76 0-3.253-1.188-3.786-2.786H.67v1.745C1.78 12.985 4.05 14.53 6.7 14.53" fill="#34A853"/>
                  <path d="M2.914 9.064a4.304 4.304 0 010-2.748V4.57H.67A7.28 7.28 0 000 7.69c0 1.176.282 2.286.67 3.12l2.244-1.745z" fill="#FBBC04"/>
                  <path d="M6.7 3.53c.99 0 1.88.341 2.58 1.01l1.93-1.93C10.046 1.487 8.517.85 6.7.85 4.051.85 1.78 2.394.67 4.57l2.244 1.745C3.447 4.718 4.94 3.53 6.7 3.53" fill="#EA4335"/>
                </svg>
                <span className="text-white font-semibold text-base tracking-wide">Pay</span>
              </button>
              {/* PayPal */}
              <button onClick={() => goToCheckout("paypal")} disabled={loading} className="w-full mb-2 bg-[#FFC439] rounded-lg py-3 flex items-center justify-center hover:bg-[#f0b429] transition-colors disabled:opacity-60">
                <svg viewBox="0 0 100 26" width="80" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#003087" d="M12.237 2.094H7.234c-.345 0-.638.25-.692.59L4.4 17.295c-.04.25.152.476.405.476h2.417c.345 0 .638-.25.693-.59l.592-3.752c.054-.34.348-.59.692-.59h1.573c3.27 0 5.157-1.582 5.65-4.717.222-1.372.009-2.449-.63-3.202-.704-.826-1.952-1.226-3.555-1.226z"/>
                  <path fill="#003087" d="M13.048 6.877c-.271 1.78-1.63 1.78-2.946 1.78h-.748l.525-3.324a.415.415 0 01.41-.351h.343c.896 0 1.741 0 2.178.511.26.305.34.759.238 1.384z"/>
                  <path fill="#009cde" d="M25.548 6.808h-2.425c-.198 0-.375.143-.41.34l-.106.668-.168-.244c-.52-.756-1.679-.01-1.679-.01-1.784 0-3.305 1.351-3.6 3.247-.154.946.065 1.85.6 2.481.49.58 1.192.822 2.028.822 1.44 0 2.24-.925 2.24-.925l-.107.662c-.04.25.152.476.404.476h2.184c.346 0 .638-.25.693-.59l1.31-8.302c.04-.252-.152-.625-.964-.625z"/>
                  <path fill="#fff" d="M22.158 10.129a1.934 1.934 0 01-1.959 1.656c-.503 0-.906-.162-1.164-.468-.256-.304-.352-.737-.271-1.22a1.943 1.943 0 011.97-1.667c.494 0 .893.164 1.156.474.266.312.368.748.268 1.225z"/>
                  <path fill="#003087" d="M36.82 6.808h-2.433c-.225 0-.434.111-.561.297l-3.24 4.772-1.374-4.585a.694.694 0 00-.665-.484h-2.39c-.279 0-.474.277-.382.54l2.587 7.59-2.433 3.434c-.19.27.001.64.33.64h2.43c.223 0 .43-.109.558-.292l7.808-11.272c.186-.27-.006-.64-.335-.64z"/>
                  <path fill="#009cde" d="M44.237 2.094h-5.003c-.345 0-.638.25-.692.59l-2.142 13.587c-.04.25.152.476.405.476h2.608c.24 0 .447-.176.484-.414l.607-3.852c.054-.34.347-.59.692-.59h1.573c3.271 0 5.157-1.582 5.65-4.717.222-1.372.009-2.449-.63-3.202-.704-.826-1.952-1.226-3.552-1.226z"/>
                  <path fill="#009cde" d="M45.048 6.877c-.271 1.78-1.63 1.78-2.946 1.78h-.748l.525-3.324a.415.415 0 01.41-.351h.343c.896 0 1.741 0 2.178.511.261.305.34.759.238 1.384z"/>
                  <path fill="#009cde" d="M57.548 6.808h-2.425c-.198 0-.375.143-.41.34l-.105.668-.169-.244c-.52-.756-1.679-.01-1.679-.01-1.784 0-3.305 1.351-3.6 3.247-.154.946.065 1.85.6 2.481.49.58 1.192.822 2.028.822 1.44 0 2.24-.925 2.24-.925l-.107.662c-.04.25.152.476.404.476h2.184c.346 0 .638-.25.693-.59l1.31-8.302c.04-.252-.152-.625-.964-.625z"/>
                  <path fill="#fff" d="M54.158 10.129a1.934 1.934 0 01-1.959 1.656c-.503 0-.906-.162-1.164-.468-.256-.304-.352-.737-.271-1.22a1.943 1.943 0 011.97-1.667c.494 0 .893.164 1.156.474.266.312.368.748.268 1.225z"/>
                </svg>
              </button>
            </>
          )}

          {/* Credit card option */}
          <div
            className={`flex items-center justify-between border rounded-lg px-4 py-3 mt-2 cursor-pointer transition-colors ${payMethod === "card" ? "border-[#0C3547]" : "border-gray-200 hover:border-gray-300"}`}
            onClick={() => setPayMethod("card")}
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${payMethod === "card" ? "border-[#0C3547]" : "border-gray-300"}`}>
                {payMethod === "card" && <div className="w-2 h-2 rounded-full bg-[#0C3547]" />}
              </div>
              <span className="text-sm font-medium text-gray-700">Credit card</span>
            </div>
            <div className="flex gap-1 items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-5 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 object-contain" />
            </div>
          </div>

          {payMethod === "card" && (
            <div className="mt-3 space-y-2">
              <input
                type="text"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                maxLength={19}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 placeholder-gray-300 focus:outline-none focus:border-gray-400"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-1/2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 placeholder-gray-300 focus:outline-none focus:border-gray-400"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  maxLength={4}
                  className="w-1/2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 placeholder-gray-300 focus:outline-none focus:border-gray-400"
                />
              </div>
              <button onClick={() => goToCheckout("credit_card")} disabled={loading} className="w-full bg-[#F5921B] hover:bg-[#e0830f] text-white font-bold py-3 rounded-lg text-sm transition-colors disabled:opacity-60">
                Get My IQ Result
              </button>
            </div>
          )}

          {/* Loading / Error */}
          {loading && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-3">
              <Loader2 className="w-4 h-4 animate-spin" />
              Redirecting to checkout...
            </div>
          )}
          {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}

          {/* Security note */}
          <div className="flex items-start gap-2 text-xs text-gray-400 mt-4">
            <Shield className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-400" />
            <p>All transactions are secure and encrypted.<br />Credit card information is never stored.</p>
          </div>
        </div>
      </div>

    </div>
  );
}