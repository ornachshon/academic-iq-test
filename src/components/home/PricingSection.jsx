import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Check } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 bg-[#f7f7f7] border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0C3547] mb-3">Pricing</h2>
        <p className="text-gray-500 mb-10 text-base">
          Begin your journey to enhance your cognitive skills and unlock your full potential.
        </p>

        {/* Pricing card */}
        <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Card header */}
          <div className="bg-[#0C3547] text-white px-8 py-6">
            <h3 className="text-xl font-bold leading-snug">
              IQ Results + Certificate + 7‑Day Trial to IQ Booster, brain training platform
            </h3>
            <p className="text-sm text-gray-300 mt-2">Includes full trial access</p>
          </div>

          {/* Price */}
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-5xl font-black text-[#0C3547]">$4.99</span>
              <span className="text-gray-400 text-sm ml-1">today</span>
            </div>
            <p className="text-gray-500 text-xs mt-1">
              After the 7-day trial, $29.99 billed every 28 days.
            </p>
          </div>

          {/* Features */}
          <div className="px-8 py-6 text-left space-y-3">
            {[
              "Instant IQ score & downloadable certificate",
              "Personalized insights summary",
              "7‑day full access to IQ Booster Brain training",
              "Cancel any time",
            ].map((f) => (
              <div key={f} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#F5921B] mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{f}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="px-8 pb-8">
            <Link to={createPageUrl("IQTest")}>
              <button className="w-full bg-[#F5921B] hover:bg-[#e07a0c] text-white font-bold py-4 rounded-md text-lg transition-colors">
                Start your journey
              </button>
            </Link>
            <p className="text-xs text-gray-400 mt-3 text-center">
              * See pricing page for full details
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}