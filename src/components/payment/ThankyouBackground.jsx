import React from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ThankyouBackground() {
  const { t } = useLanguage();

  return (
    <div className="bg-white w-full h-screen" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
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

      {/* Score section only */}
      <div className="flex flex-col items-center pt-16 px-4">
        <h1 className="text-3xl font-bold text-[#0C3547] mb-4">
          {t("yourIQScoreIs")}
        </h1>
        <p className="text-6xl font-black text-[#F5921B] select-none" style={{ filter: "blur(8px)" }}>135</p>
      </div>
    </div>
  );
}