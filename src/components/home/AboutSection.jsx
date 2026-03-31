import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useTranslation } from "@/hooks/useTranslation";

export default function AboutSection() {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0C3547] mb-8">{t("about.title")}</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-600 leading-relaxed mb-6">{t("about.p1")}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{t("about.p2")}</p>
            <p className="text-gray-600 leading-relaxed">{t("about.p3")}</p>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {[
            { num: "01.", title: t("about.step1_title"), desc: t("about.step1_desc") },
            { num: "02.", title: t("about.step2_title"), desc: t("about.step2_desc") },
            { num: "03.", title: t("about.step3_title"), desc: t("about.step3_desc") }
            ].
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
        <div className="bg-transparent mt-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="flex items-center justify-center">
            <img
              src="https://media.base44.com/images/public/69b1aedc5a0abb358cd40ec0/ccd006c18_image.png"
              alt="IQ Score Distribution"
              className="w-full h-full object-contain rounded-xl" />





          </div>

          <div className="bg-transparent p-8 opacity-100 rounded">
            <h3 className="text-2xl font-extrabold text-[#0C3547] mb-4">{t("about.why_title")}</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{t("about.why_p1")}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{t("about.why_p2")}</p>
            <Link to={createPageUrl("IQTest")}>
              <button className="bg-[#F5921B] text-[#ffffff] px-7 py-3 font-bold opacity-100 rounded-md hover:bg-[#e07a0c] transition-colors">
                {t("hero.start_btn")}
              </button>
            </Link>
          </div>

          




















        </div>
      </div>
    </section>);

}