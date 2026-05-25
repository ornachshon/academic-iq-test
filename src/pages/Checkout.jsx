import React, { useState } from 'react';
import { Star, HelpCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '@/components/home/Footer';
import { trackFunnel } from '@/lib/trackFunnel';
import { useGeoPrice } from '@/hooks/useGeoPrice';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';

const reviews = [
{ name: "Mei Lin Zhang", rating: 5, text: "Great test with a clear layout and easy-to-use controls. The questions leaned more toward critical thinking rather than simple logic, which I liked. The only small confusion was how to view the results, though it becomes clear as you continue. Overall, enjoyable and engaging!" },
{ name: "Yuki Tanaka", rating: 4, text: "I\u2019m genuinely impressed by this kind of activity because it feels like time well spent. The 20 minutes I dedicated to the quiz helped me avoid distractions from social media and other less important tasks. Please review and correct any grammatical errors. Thank you!" },
{ name: "Lucas M\xFCller", rating: 5, text: "It's a great experience to enjoy this test after a long gap of learning such practices. As a teacher who is guiding many aspirants for services, I felt so privileged to share my level in your platform and thanks a lot for giving me and others such a nice platform to test our intelligence. Thank you so much 🙏" },
{ name: "Liam O\u2019Connor", rating: 4, text: "I am more impressed to see this type of work because it is worth of time and my 20 minutes of this quiz saves me to distract from wasting my time in any other social media app or other nonimportant work. Read after correct grammatical mistakes. Thank you!" },
{ name: "G Okafor", rating: 5, text: "I took the test on my phone one evening while in bed and was initially unsure about paying to see the results. In the end, curiosity won out, and after going through others\u2019 reviews, I decided to unlock them. I was pleasantly surprised to find my score matched one I had received years earlier on a similar test. Overall, I\u2019m very satisfied with the experience." },
{ name: "Sofia Mart\xEDnez", rating: 5, text: "I really enjoyed the test! It was well-structured, consistent, and thoughtfully designed. The performance report at the end was detailed, and understanding my results gave my confidence a nice boost. I especially appreciated the explanations behind the score, including which aspects of intelligence were assessed and how they relate to everyday life. Overall, it was an engaging and informative experience. " },
{ name: "A", rating: 4, text: "Clean, refined presentation paired with insightful feedback." }];


function StarRating({ count, total = 5 }) {
  return (
    <div className="flex gap-0.5 hidden">
      {Array.from({ length: total }).map((_, i) =>
      <Star key={i} className={`w-4 h-4 ${i < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`} />
      )}
    </div>);
}

export default function Checkout() {
  const { t, lang } = useLanguage();
  const [agreed, setAgreed] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score;
  const email = location.state?.email || "";
  const timeTaken = location.state?.timeTaken || 0;
  const resultId = location.state?.resultId || "";
  const { pricing, loading: priceLoading, formatPrice } = useGeoPrice();

  const handlePayment = async () => {
    trackFunnel("payment_initiated");
    setIsRedirecting(true);
    console.log("lang value:", lang);
    try {
      const res = await base44.functions.invoke("createStripeCheckout", {
        email,
        score,
        priceAmount: pricing.price,
        priceCurrency: pricing.currency_code,
        resultId,
        locale: lang || "auto"
      });
      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        console.error("No URL returned from Stripe checkout");
        setIsRedirecting(false);
      }
    } catch (err) {
      console.error("Stripe checkout error:", err);
      setIsRedirecting(false);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 text-sm text-gray-800">

      {/* Top banner */}
      <div className="bg-[#0C3547] text-white text-center py-4 px-4">
        <p className="text-base">{t("youCompleted")} <strong>{formatTime(timeTaken)} {t("minutes")}</strong></p>
        <p className="text-base">{t("highlyCompetent")} <strong>{t("visuospatial")}</strong></p>
      </div>

      {/* Subtitle */}
      <div className="text-center py-5 px-4 bg-white border-b border-gray-200">
        <p className="text-gray-600">{t("iqAnalyzed")}</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">

        {/* Order Details Header */}
        <div className="bg-[#F5921B] text-white text-center font-medium py-4 rounded-t-sm tracking-wide text-base uppercase">
          {t("orderDetails")}
        </div>

        {/* Order Items */}
        <div className="bg-white border border-gray-200 rounded-b-sm divide-y divide-gray-200 -mt-4">
          {/* Item 1 */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-5">
            <div className="flex items-start gap-5">
              <span className="font-black text-[#0C3547] text-2xl w-8 shrink-0">1.</span>
              <div>
                <p className="font-bold text-[#0C3547] text-lg">{t("iqEvaluationScore")}</p>
                <p className="text-gray-500 text-sm mt-0.5">{t("yourOverallScore")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 mt-4 md:mt-0 ml-0 md:ml-0 justify-center">
              <div className="text-center leading-tight">
                <p className="text-xs font-bold text-[#0C3547] uppercase tracking-widest">{t("yourIQScore")}</p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-5">
            <div className="flex items-start gap-5">
              <span className="font-black text-[#0C3547] text-2xl w-8 shrink-0">2.</span>
              <div>
                <p className="font-bold text-[#0C3547] text-lg">{t("printableCertificate")}</p>
                <p className="text-gray-500 text-sm mt-0.5">{t("yourCertificate")}</p>
                <p className="text-gray-400 text-sm italic">{t("highQualityPDF")}</p>
              </div>
            </div>
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/400b59f43_Certificate-Example.svg"
            alt="Certificate" className="w-28 h-auto mt-4 md:mt-0 mx-auto md:mx-0 md:ml-2 flex-shrink-0 border border-gray-200 rounded shadow-sm" />
          </div>

          {/* Item 3 */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-5">
            <div className="flex items-start gap-5">
              <span className="font-black text-[#0C3547] text-2xl w-8 shrink-0">3.</span>
              <div>
                <p className="font-bold text-[#0C3547] text-lg">{t("detailedReportItem")}</p>
                <p className="text-gray-500 text-sm mt-0.5">{t("fullStatistical")}</p>
              </div>
            </div>
            <img src="https://media.base44.com/images/public/69b1aedc5a0abb358cd40ec0/03c9e0491_AIQreportsnap.png"
            alt="IQ Report" className="w-32 h-auto mt-4 md:mt-0 mx-auto md:mx-0 md:ml-4 flex-shrink-0 rounded" />
          </div>
        </div>

        {/* Total & Payment */}
        <div className="bg-white border border-gray-200 rounded-sm px-6 py-5 space-y-4">
          <div className="flex justify-between items-center font-bold text-base bg-[#0C3547] text-white px-4 py-3 -mx-5 -mt-5 rounded-t-sm">
            <span>One-time fee only</span>
            <span>{priceLoading ? "..." : formatPrice(pricing.price)}</span>
          </div>

          {/* Payment logos */}
          <div className="flex items-center gap-3 flex-wrap pt-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 471" className="h-6 object-contain" aria-label="Visa">
  <rect width="750" height="471" rx="40" fill="#1a1f71"/>
  <text x="375" y="320" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="220" fill="white" letterSpacing="-8">VISA</text>
</svg>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 object-contain" />
          </div>

          {/* CTA Button */}
          <button
            onClick={handlePayment}
            disabled={isRedirecting || priceLoading}
            className="bg-[#F5921B] text-white py-3 text-xl font-bold rounded-md w-full hover:bg-[#e0830f] transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
            {isRedirecting ? "Redirecting to payment..." : t("continueToPayment")}
          </button>
        </div>

        {/* Reviews Section */}
        <div className="bg-white border border-gray-200 rounded-sm px-6 py-6">
          <h2 className="text-lg font-bold text-center text-gray-800 mb-1">{t("customerReviews")}</h2>
          <p className="text-center text-gray-500 text-xs mb-3">{t("afterResults")}</p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-sm font-semibold text-gray-700">{t("averageRating")}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
              {/* Half star */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
                <defs>
                  <linearGradient id="halfGrad">
                    <stop offset="50%" stopColor="#facc15" />
                    <stop offset="50%" stopColor="#d1d5db" />
                  </linearGradient>
                </defs>
                <path fill="url(#halfGrad)" stroke="#facc15" strokeWidth="1.5" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>

          <div className="space-y-5">
            {reviews.map((r, i) =>
            <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <p className="font-bold text-gray-800 mb-1 hidden">{r.name}</p>
                <StarRating count={r.rating} />
                <p className="text-gray-600 text-xs mt-1 leading-relaxed">{r.text}</p>
              </div>
            )}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}