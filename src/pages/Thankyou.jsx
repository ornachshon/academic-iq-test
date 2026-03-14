import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Download, FileText } from "lucide-react";

export default function Thankyou() {
  const location = useLocation();
  const { name, score, serialNumber, date } = location.state || {};

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/Home">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/6feaa6fe0_aiq_academic_iq_test_logo.svg"
                alt="Academic IQ Test"
                className="h-10 w-10 object-contain"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-16">
        {/* Score section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#0C3547] mb-3">
            Your <span className="text-[#F5921B]">IQ Score</span> is:
          </h1>
          <p className="text-6xl font-black text-[#F5921B]">{score ?? "—"}</p>
          <p className="text-gray-500 mt-5 text-base">We've prepared everything for you</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Certificate card */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
            <h2 className="text-lg font-bold text-[#0C3547] mb-2">Personalized IQ Certificate</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              A personalized certificate is ready for you<br />to download with just one click.
            </p>
            <Link
              to="/Certificate"
              state={{ name, score, serialNumber, date }}
              className="w-full bg-[#F5921B] hover:bg-[#e0830f] text-white font-bold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Certificate
            </Link>
          </div>

          {/* Report card */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
            <h2 className="text-lg font-bold text-[#0C3547] mb-2">Detailed Analysis Report</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              A full statistical breakdown of your results<br />with cognitive domain insights.
            </p>
            <Link
              to="/Results"
              className="w-full bg-[#0C3547] hover:bg-[#0a2d3d] text-white font-bold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              View Report
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}