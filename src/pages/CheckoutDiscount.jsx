import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useGeoPrice } from '@/hooks/useGeoPrice';
import Footer from '@/components/home/Footer';
import { trackFunnel } from '@/lib/trackFunnel';

export default function CheckoutDiscount() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const couponId = params.get('discount') || '';
  const email = params.get('email') || '';

  const { pricing, loading: priceLoading, formatPrice } = useGeoPrice();
  const [resultData, setResultData] = useState(null);
  const [loadingResult, setLoadingResult] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState('');

  const discountedPrice = pricing.price * 0.5;

  useEffect(() => {
    if (!email) {
      setLoadingResult(false);
      setError('No email provided.');
      return;
    }
    base44.entities.IQResult.filter({ email })
      .then((results) => {
        if (results && results.length > 0) {
          // Use the most recent result
          const latest = results.sort((a, b) => new Date(b.created_date) - new Date(a.created_date))[0];
          setResultData(latest);
        } else {
          setError('No result found for this email.');
        }
      })
      .catch(() => setError('Failed to load your result.'))
      .finally(() => setLoadingResult(false));
  }, [email]);

  const handlePayment = async () => {
    if (!resultData) return;
    trackFunnel('payment_initiated_discount');
    setIsRedirecting(true);
    try {
      const res = await base44.functions.invoke('createStripeCheckout', {
        email,
        score: resultData.score,
        priceAmount: discountedPrice,
        priceCurrency: pricing.currency_code,
        resultId: resultData.id,
        couponId: couponId || undefined,
      });
      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        setIsRedirecting(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setIsRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-sm text-gray-800">
      {/* Top banner */}
      <div className="bg-[#0C3547] text-white text-center py-4 px-4">
        <p className="text-base font-bold">🎉 Special Offer — Reserved Just For You</p>
        <p className="text-sm mt-1">Your IQ results are waiting. Unlock them now at 50% off.</p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-4">

        {/* Discount Badge */}
        <div className="flex justify-center">
          <span className="bg-red-500 text-white text-lg font-black px-6 py-2 rounded-full tracking-wide">
            50% OFF
          </span>
        </div>

        {/* Pricing Card */}
        <div className="bg-white border border-gray-200 rounded-sm px-6 py-6 space-y-4">
          <h2 className="text-xl font-bold text-[#0C3547] text-center">Your IQ Results Package</h2>

          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-center gap-2">✅ IQ Evaluation Score</li>
            <li className="flex items-center gap-2">✅ Printable Certificate (PDF)</li>
            <li className="flex items-center gap-2">✅ Detailed Analysis Report</li>
          </ul>

          {/* Pricing display */}
          <div className="flex items-center justify-between bg-[#0C3547] text-white px-4 py-3 rounded">
            <span className="font-bold text-base">Total Today</span>
            <div className="text-right">
              {priceLoading ? (
                <span>...</span>
              ) : (
                <>
                  <span className="line-through text-gray-400 text-sm mr-2">
                    {formatPrice(pricing.price)}
                  </span>
                  <span className="text-xl font-black text-[#F5921B]">
                    {formatPrice(discountedPrice)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Email read-only */}
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">Your Email</label>
            <div className="border border-gray-200 bg-gray-50 rounded px-3 py-2 text-gray-700 text-sm">
              {email || '—'}
            </div>
          </div>

          {/* Error state */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* CTA Button */}
          <button
            onClick={handlePayment}
            disabled={isRedirecting || priceLoading || loadingResult || !!error}
            className="bg-[#F5921B] text-white py-3 text-xl font-bold rounded-md w-full hover:bg-[#e0830f] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isRedirecting ? 'Redirecting to payment...' : loadingResult ? 'Loading...' : 'Get My Results Now'}
          </button>

          <p className="text-center text-xs text-gray-400">
            Secure payment · 30-day money back guarantee
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}