import React, { useState, useEffect } from 'react';
import { Star, HelpCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '@/components/home/Footer';
import { useGeoPrice } from '@/hooks/useGeoPrice';
import { useLanguage } from '@/lib/LanguageContext';




const reviewsEn = [
{ name: "Mei Lin Zhang", rating: 5, text: "Great test with a clear layout and easy-to-use controls. The questions leaned more toward critical thinking rather than simple logic, which I liked. The only small confusion was how to view the results, though it becomes clear as you continue. Overall, enjoyable and engaging!" },
{ name: "Yuki Tanaka", rating: 4, text: "I'm genuinely impressed by this kind of activity because it feels like time well spent. The 20 minutes I dedicated to the quiz helped me avoid distractions from social media and other less important tasks. Thank you!" },
{ name: "Lucas Müller", rating: 5, text: "It's a great experience to enjoy this test after a long gap of learning such practices. As a teacher who is guiding many aspirants for services, I felt so privileged to share my level in your platform and thanks a lot for giving me and others such a nice platform to test our intelligence. Thank you so much 🙏" },
{ name: "Liam O'Connor", rating: 4, text: "I am more impressed to see this type of work because it is worth of time and my 20 minutes of this quiz saves me to distract from wasting my time in any other social media app or other nonimportant work. Thank you!" },
{ name: "G Okafor", rating: 5, text: "I took the test on my phone one evening while in bed and was initially unsure about paying to see the results. In the end, curiosity won out, and after going through others' reviews, I decided to unlock them. I was pleasantly surprised to find my score matched one I had received years earlier on a similar test. Overall, I'm very satisfied with the experience." },
{ name: "Sofia Martínez", rating: 5, text: "I really enjoyed the test! It was well-structured, consistent, and thoughtfully designed. The performance report at the end was detailed, and understanding my results gave my confidence a nice boost. I especially appreciated the explanations behind the score. Overall, it was an engaging and informative experience." },
{ name: "James R.", rating: 4, text: "Clean, refined presentation paired with insightful feedback." }];

const reviewsJa = [
{ name: "鈴木 美咲", rating: 5, text: "レイアウトが明確で操作も簡単な素晴らしいテストでした。問題は単純な論理よりも批判的思考に重点が置かれており、好印象でした。結果の見方に少し戸惑いましたが、進めるうちに明確になりました。全体的に楽しく魅力的でした！" },
{ name: "田中 ゆき", rating: 4, text: "この種の活動には本当に感銘を受けます。時間を有効に使えたと感じます。このクイズに費やした20分のおかげで、SNSなどの無駄な時間を避けることができました。ありがとうございます！" },
{ name: "山本 隆", rating: 5, text: "久しぶりにこのような練習を楽しめた素晴らしい体験でした。多くの人を指導している教師として、このプラットフォームで自分のレベルを共有できたことを誇りに思います。このような素晴らしいプラットフォームをありがとうございます🙏" },
{ name: "佐藤 健一", rating: 4, text: "この種の取り組みには非常に感銘を受けます。時間の価値があり、このクイズの20分のおかげでSNSや重要でない作業に時間を無駄にしなくて済みました。ありがとうございます！" },
{ name: "中村 恵子", rating: 5, text: "ある夜、ベッドでスマホを使ってテストを受けましたが、最初は結果を見るために支払うか迷いました。最終的に好奇心が勝り、他の方のレビューを参考にして結果を解放しました。何年も前に受けた同様のテストとスコアが一致していて驚きました。全体的にとても満足しています。" },
{ name: "伊藤 さくら", rating: 5, text: "テストをとても楽しみました！よく構成されており、一貫性があり、丁寧に設計されていました。最後のパフォーマンスレポートは詳細で、結果を理解することで自信がつきました。スコアの背後にある説明、特にどの知性の側面が評価されたかがわかり、日常生活との関連も明確でした。全体的に充実した体験でした。" },
{ name: "James R.", rating: 4, text: "洗練されたデザインと的確なフィードバックが印象的でした。" }];


function StarRating({ count, total = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) =>
      <Star key={i} className={`w-4 h-4 ${i < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`} />
      )}
    </div>);
}

export default function Checkout() {
  const { t, lang } = useLanguage();
  const reviews = lang === "ja" ? reviewsJa : reviewsEn;
  const [agreed, setAgreed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score;
  const email = location.state?.email || "";
  const timeTaken = location.state?.timeTaken || 0;
  const resultId = location.state?.resultId || "";
  const { pricing, loading: priceLoading, formatPrice } = useGeoPrice();

  const [timeLeft, setTimeLeft] = useState(10 * 60);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);


  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePayment = () => {
    navigate("/Payment", {
      state: { score, email, timeTaken, resultId, pricing, locale: lang }
    });
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
      </div>

      {/* Subtitle */}
      <div className="text-center py-5 px-4 bg-white border-b border-gray-200">
        <p className="text-gray-600">{t("iqAnalyzed")}</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">

        {/* Order Details Header */}
        <div className="bg-[#e8a84a] text-white text-center font-medium py-4 rounded-t-sm tracking-wide text-base uppercase">
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
              <div className="relative group">
                <div className="w-12 h-12 rounded-full border-2 border-[#F5921B] bg-[#FFF4E8] flex items-center justify-center cursor-default">
                  <HelpCircle className="w-6 h-6 text-[#F5921B]" />
                </div>
                <div className="absolute right-0 bottom-14 w-56 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center leading-relaxed">
                  {lang === "ja" ? <>IQスコアを取得するには、下の<span className="font-bold text-[#F5921B]">IQ結果を取得</span>ボタンを押してください</> : <>To get your IQ score press the <span className="font-bold text-[#F5921B]">Get My IQ Results</span> button below</>}
                  <div className="absolute right-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800" />
                </div>
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
            alt="Certificate" className="w-56 md:w-28 h-auto mt-4 md:mt-0 mx-auto md:mx-0 md:ml-2 flex-shrink-0 border border-gray-200 rounded shadow-sm" />
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
            alt="IQ Report" className="w-64 md:w-32 h-auto mt-4 md:mt-0 mx-auto md:mx-0 md:ml-4 flex-shrink-0 rounded" />
          </div>
        </div>

        {/* Total & Payment */}
        <div className="bg-white border border-gray-200 rounded-sm px-6 py-5 space-y-4">
          <div className="flex justify-between items-center font-bold text-base bg-[#0C3547] text-white px-4 py-3 -mx-5 -mt-5 rounded-t-sm">
            <span>{t("oneTimeFeeOnly")}</span>
            <div className="flex flex-col items-end">
              <span className="flex items-center gap-2">
                {!priceLoading && pricing.original_price && pricing.currency_code !== "JPY" && (
                  <span className="line-through text-gray-400 font-normal text-sm">{formatPrice(pricing.original_price)}</span>
                )}
                {priceLoading ? "..." : formatPrice(pricing.price)}
              </span>
              {pricing.currency_code !== "JPY" && (
                <span className="text-[#F5921B] text-xs font-bold">{t("youSave80")}</span>
              )}
            </div>
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
            disabled={priceLoading}
            className="bg-[#F5921B] text-white py-4 text-2xl font-black rounded-lg w-full hover:bg-[#e0830f] active:scale-95 transition-all shadow-lg shadow-orange-200 disabled:opacity-70 disabled:cursor-not-allowed tracking-wide">
            {t("getMyIQResults")}
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
                <p className="font-bold text-gray-800 mb-1">{r.name}</p>
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