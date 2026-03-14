import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Footer() {
  return (
    <footer className="bg-[#0C3547] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/d89997424_aiq_academic_iq_test_logo.svg" alt="Academic IQ Test" className="h-12 w-12 object-contain bg-white rounded-full" />
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-300">
            <Link to="/Privacy_Policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/Terms_Conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>

          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Academic IQ Test. All rights reserved.
          </p>
        </div>
      </div>
    </footer>);

}