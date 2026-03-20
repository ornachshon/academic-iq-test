import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { trackFunnel } from "@/lib/trackFunnel";
import SiteSettingsPanel, { useSiteSettings } from "@/components/admin/SiteSettings";

export default function Layout({ children, currentPageName }) {
  const [showSettings, setShowSettings] = useState(false);
  const { settings } = useSiteSettings();

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Top navbar */}
      <header
        className="border-b border-gray-200 sticky top-0 z-50"
        style={{
          minHeight: `${settings.headerHeight}px`,
          backgroundColor: '#ffffff',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0-2l26-15V18L28 2 2 18v31l26 15z' fill='%23f0e8d8' fill-opacity='0.5'/%3E%3Cpath d='M28 100L0 84V50l28-16 28 16v34L28 100zm0-2l26-15V52L28 36 2 52v31l26 15z' fill='%23f0e8d8' fill-opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '56px 100px'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between" style={{ minHeight: `${settings.headerHeight}px` }}>
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-2">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/6feaa6fe0_aiq_academic_iq_test_logo.svg"
                alt="Academic IQ Test"
                style={{ width: `${settings.headerLogoSize * 0.75}px`, height: `${settings.headerLogoSize * 0.75}px` }}
                className="object-contain"
              />
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#0C3547]">
            </nav>

            {/* CTA buttons */}
            <div className="flex items-center gap-3">
              {currentPageName !== "IQTest" && (
                <Link to={createPageUrl("IQTest")} onClick={() => trackFunnel("start_iq_test_clicked")}>
                  <button className="bg-[#F5921B] text-white px-5 py-2.5 text-sm font-bold rounded-md hover:bg-[#e0830f] transition-colors">
                    Start IQ Test
                  </button>
                </Link>
              )}

            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      {showSettings && <SiteSettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  );
}