import React from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ThankyouBackground() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Score heading at the top — visible through blur/darkness */}
      <div className="text-center pt-20 px-4">
        <h1 className="text-3xl font-bold text-[#0C3547] mb-4">
          {t("yourIQScoreIs")}
        </h1>
        <p className="text-6xl font-black text-[#F5921B] filter blur-sm select-none">XXX</p>
      </div>

      {/* Cards below — visible dimly through blur */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl px-4">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
          <h2 className="text-lg font-bold text-[#0C3547] mb-2">{t("personalizedCertificate")}</h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">{t("certificateReady")}</p>
          <div className="w-full bg-[#F5921B] text-white font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2">
            {t("downloadCertificate")}
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
          <h2 className="text-lg font-bold text-[#0C3547] mb-2">{t("detailedAnalysisReport")}</h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">{t("fullStatisticalBreakdown")}</p>
          <div className="w-full bg-[#0C3547] text-white font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2">
            {t("viewReport")}
          </div>
        </div>
      </div>
    </div>
  );
}