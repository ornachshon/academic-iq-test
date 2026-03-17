import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import AiqLogo from "@/components/AiqLogo";
import { base44 } from "@/api/base44Client";
import { trackFunnel } from "@/lib/trackFunnel";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Top navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-2">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/6feaa6fe0_aiq_academic_iq_test_logo.svg" alt="Academic IQ Test" className="h-10 w-10 object-contain" />
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#0C3547]">
              


              
            </nav>

            {/* CTA buttons */}
            {currentPageName !== "IQTest" &&
            <div className="flex items-center gap-3">
                <Link to={createPageUrl("IQTest")} onClick={() => trackFunnel("start_iq_test_clicked")}>
                  <button className="bg-[#F5921B] text-white px-5 py-2.5 text-sm font-bold rounded-md hover:bg-[#e0830f] transition-colors">
                    Start IQ Test
                  </button>
                </Link>
              </div>
            }
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>);

}