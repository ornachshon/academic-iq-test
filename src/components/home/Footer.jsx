import React from "react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/components/admin/SiteSettings";

export default function Footer() {
  const { settings } = useSiteSettings();

  return (
    <footer className="bg-[#0C3547] text-white" style={{ paddingTop: `${settings.footerPaddingY}px`, paddingBottom: `${settings.footerPaddingY}px` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://media.base44.com/images/public/69b1aedc5a0abb358cd40ec0/cbc52774d_AIQlogo-Square.png"
              alt="Academic IQ Test"
              style={{ width: `${settings.footerLogoSize}px`, height: `${settings.footerLogoSize}px` }}
              className="object-contain bg-white rounded-full"
            />
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-300">
            <Link to="/Privacy_Policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/Terms_Conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/Support" className="hover:text-white transition-colors">Contact Support</Link>
          </div>

          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Academic IQ Test. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}