import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0C3547] mb-8">
          World Wide IQ Test
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-600 leading-relaxed mb-6">
              The World Wide IQ Test is part of an ambitious effort to deliver fun, stimulating and
              engaging online measures of human cognitive abilities, as well as social and emotional
              learning skills for the global community.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              We aim to provide you with accurate and precise information about important aspects of
              your intellectual abilities and personality characteristics, and where they may benefit
              the most from further development, regardless of your academic, professional, or
              cultural background.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The current version measures several dimensions of general fluid intelligence, including
              visuospatial pattern reasoning, visuospatial insight, and numerical pattern reasoning
              skills.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {[
            {
              num: "01.",
              title: "Take the IQ Test",
              desc: "Designed by experts and test developers"
            },
            {
              num: "02.",
              title: "Find out your scores",
              desc: "Get your customized score report and learn how you compare to thousands of adults from all over the world"
            },
            {
              num: "03.",
              title: "Start your brain power journey",
              desc: "Unleash your full potential with brain training designed to improve your memory, focus and problem-solving skills"
            }].
            map((step) =>
            <div key={step.num} className="flex gap-4">
                <span className="text-2xl font-black text-[#0C3547] leading-tight flex-shrink-0">
                  {step.num}
                </span>
                <div>
                  <h4 className="font-bold text-[#0C3547] text-sm uppercase tracking-wide mb-1">
                    {step.title}
                  </h4>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Why section */}
        <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="flex items-center justify-center">
            <img
              src="https://media.base44.com/images/public/69b1aedc5a0abb358cd40ec0/ccd006c18_image.png"
              alt="IQ Score Distribution"
              className="w-full h-full object-contain rounded-xl"
            />




          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-extrabold text-[#0C3547] mb-4">Why this IQ test?</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              The World Wide IQ Test presents you with a short series of fun, challenging problems
              designed to measure your fluid intelligence abilities and provide you with both accurate
              and precise scores.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              You can take the test online anytime from any mobile device or desktop computer and
              immediately receive a detailed score report that tells you how your performance compares
              to thousands of adults from all over the world.
            </p>
            <Link to={createPageUrl("IQTest")}>
              <button className="bg-[#F5921B] hover:bg-[#e07a0c] text-white font-bold px-7 py-3 rounded-md transition-colors">
                Start IQ Test
              </button>
            </Link>
          </div>

          




















        </div>
      </div>
    </section>);

}