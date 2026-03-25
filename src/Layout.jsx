import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { trackFunnel } from "@/lib/trackFunnel";
import SiteSettingsPanel, { useSiteSettings } from "@/components/admin/SiteSettings";
import LanguageSelector from "@/components/header/LanguageSelector";

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
          paddingTop: '12px',
          paddingBottom: '12px',
          backgroundImage: `url("https://media.base44.com/images/public/69b1aedc5a0abb358cd40ec0/e70d95bd4_image.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between" style={{ minHeight: `${settings.headerHeight}px` }}>
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-2">
              <img
                src="https://media.base44.com/images/public/69b1aedc5a0abb358cd40ec0/cbc52774d_AIQlogo-Square.png"
                alt="Academic IQ Test"
                style={{ width: `${settings.headerLogoSize * 0.825}px`, height: `${settings.headerLogoSize * 0.825}px` }}
                className="object-contain" />
              
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#0C3547]">
            </nav>

            {/* CTA buttons */}
            <div className="flex items-center gap-6">
              {currentPageName !== "IQTest" &&
              <Link to={createPageUrl("IQTest")} onClick={() => trackFunnel("start_iq_test_clicked")}>
                  <button className="bg-[#F5921B] text-white px-6 py-3 text-lg font-bold text-left normal-case rounded-md hover:bg-[#e0830f] transition-colors">
                    Start IQ Test
                  </button>
                </Link>
              }
              <LanguageSelector />

            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      {showSettings && <SiteSettingsPanel onClose={() => setShowSettings(false)} />}
    </div>);

}