import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Download, FileText } from "lucide-react";

export default function ThankyouBackground() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/6feaa6fe0_aiq_academic_iq_test_logo.svg"
              alt="Academic IQ Test"
              className="h-10 w-10 object-contain"
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-16">
        {/* Score section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#0C3547] mb-3">
            {t("yourIQScoreIs")}
          </h1>
          <p className="text-6xl font-black text-[#F5921B] select-none" style={{ filter: "blur(8px)" }}>135</p>
          <p className="text-gray-500 mt-5 text-base">{t("wePreparedEverything")}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
            <h2 className="text-lg font-bold text-[#0C3547] mb-2">{t("personalizedCertificate")}</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">{t("certificateReady")}</p>
            <div className="w-full bg-[#F5921B] text-white font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              {t("downloadCertificate")}
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
            <h2 className="text-lg font-bold text-[#0C3547] mb-2">{t("detailedAnalysisReport")}</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">{t("fullStatisticalBreakdown")}</p>
            <div className="w-full bg-[#0C3547] text-white font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              {t("viewReport")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}