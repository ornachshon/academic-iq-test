import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Top navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-2">
              <div className="border-2 border-[#0C3547] rounded p-1.5 flex flex-col items-center leading-none">
                
                <span className="text-[9px] font-semibold text-[#0C3547] tracking-wider">Academic</span>
                <span className="text-[10px] font-black text-[#0C3547] tracking-widest">IQ TEST</span>
              </div>
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#0C3547]">
              


              
            </nav>

            {/* CTA buttons */}
            {currentPageName !== "IQTest" && (
              <div className="flex items-center gap-3">
                <Link to={createPageUrl("IQTest")}>
                  <button className="bg-[#F5921B] hover:bg-[#e0830f] text-white font-bold text-sm px-5 py-2.5 rounded-md transition-colors">
                    Start IQ Test
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>);

}