import React, { useState } from 'react';
import { Star, HelpCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckoutFooter from '@/components/checkout/CheckoutFooter';

const reviews = [
{ name: "Cecilie Perri", rating: 5, text: "Nice test with clear presentation and intuitive control. The questions involved critical thinking more than rote logic, which I appreciated. The only minor surprise was the way results are accessed – but, clear once you proceed. Fun and mentally stimulating!" },
{ name: "Leonora Winthleiser", rating: 4, text: "Appreciated the breakdown details of my performance and what it implied. I have had no other IQ test to compare but it felt like a standard timed test. A good recommendation to others who may want to take up the challenge and see what they can do." },
{ name: "P Khan", rating: 5, text: "It's a great experience to enjoy this test after a long gap of learning such practices. As a teacher who is guiding many aspirants for services, I felt so privileged to share my level in your platform and thanks a lot for giving me and others such a nice platform to test our intelligence. Thank you so much 🙏" },
{ name: "H Ladani", rating: 4, text: "I am more impressed to see this type of work because it is worth of time and my 20 minutes of this quiz saves me to distract from wasting my time in any other social media app or other nonimportant work. Read after correct grammatical mistakes. Thank you!" },
{ name: "Gregory Gomes", rating: 5, text: "I did the test on my phone one night in bed, but was hesitant to pay for the results. Eventually my curiosity got the better of me and after reading reviews by others decided to get the results. I was pleasantly surprised that my score was the same a previous test done some years ago. Am very happy with the whole experience." },
{ name: "Ivah Brown", rating: 5, text: "I loved the test, it was coherent, and well-planned. Lastly, the performance report was detailed, and knowing my performance details also helped me boost my confidence. Knowing the whys is also important to get more involved and immersed in the experience, to a report about which parts of intelligence were tested and how it is useful in our daily lives was very informative. Overall I enjoyed the experience." },
{ name: "Ida Nolan", rating: 4, text: "Polished presentation and meaningful feedback - I liked the way it highlighted specific thinking areas." }];


function StarRating({ count, total = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) =>
      <Star key={i} className={`w-4 h-4 ${i < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`} />
      )}
    </div>);

}

export default function Checkout() {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score;

  return (
    <div className="min-h-screen bg-gray-100 text-sm text-gray-800">
      {/* Top banner */}
      <div className="bg-[#0C3547] text-white text-center py-4 px-4">
        <p className="text-base">You completed the test in <strong>00:22 minutes</strong></p>
        <p className="text-base">It seems that you are highly competent in <strong>Visuospatial Pattern Reasoning</strong></p>
      </div>

      {/* Subtitle */}
      <div className="text-center py-5 px-4 bg-white border-b border-gray-200">
        <p className="text-gray-600">Your IQ test was analyzed and compared to other participants' results in your country.</p>
        


      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* Order Details Header */}
        <div className="bg-[#F5921B] text-white text-center font-bold py-3 rounded-sm tracking-widest text-sm uppercase">
          Order Details
        </div>

        {/* Order Items */}
        <div className="bg-white border border-gray-200 rounded-sm divide-y divide-gray-200">
          {/* Item 1 */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-start gap-3">
              <span className="font-bold text-gray-500 text-base mt-0.5">1.</span>
              <div>
                <p className="font-bold text-gray-800">IQ Evaluation Score</p>
                <p className="text-gray-500 text-xs mt-0.5">Your overall Academic IQ score</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-right">
              <div className="text-center leading-tight">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Your</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">IQ Score</p>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-start gap-3">
              <span className="font-bold text-gray-500 text-base mt-0.5">2.</span>
              <div>
                <p className="font-bold text-gray-800">Printable Academic IQ Certificate</p>
                <p className="text-gray-500 text-xs mt-0.5">Your very own Academic IQ Certificate</p>
                <p className="text-gray-400 text-xs italic">(High Quality Downloadable PDF)</p>
              </div>
            </div>
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/400b59f43_Certificate-Example.svg"

            alt="Certificate" className="w-20 h-auto ml-4 flex-shrink-0" />


          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-start gap-3">
              <span className="font-bold text-gray-500 text-base mt-0.5">3.</span>
              <div>
                <p className="font-bold text-gray-800">Academic IQ Test details report</p>
                <p className="text-gray-500 text-xs mt-0.5">With a full statistical analysis of your result </p>
              </div>
            </div>
          </div>
        </div>

        {/* Total & Payment */}
        <div className="bg-white border border-gray-200 rounded-sm px-5 py-5 space-y-4">
          <div className="flex justify-between items-center font-bold text-base bg-[#0C3547] text-white px-4 py-3 -mx-5 -mt-5 rounded-t-sm">
            <span>Total today:</span>
            <span>$4.99</span>
          </div>

          {/* Payment logos */}
          <div className="flex items-center gap-3 flex-wrap pt-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 object-contain" />
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-2">
            






            





          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/Payment", { state: { score } })}
            className="bg-[#F5921B] text-white py-3 text-base font-extrabold rounded-md w-full hover:bg-[#e0830f] transition-colors">
            Continue to Payment
          </button>
        </div>

        {/* Fine print */}
        




        {/* Reviews Section */}
        <div className="bg-white border border-gray-200 rounded-sm px-5 py-6">
          <h2 className="text-lg font-bold text-center text-gray-800 mb-1">Customer Reviews & Feedback</h2>
          <p className="text-center text-gray-500 text-xs mb-3">After you get your results you are welcome to also share a review</p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-sm font-semibold text-gray-700">Average Rating: Very good</span>
            <StarRating count={4} />
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

      <CheckoutFooter />
    </div>);

}