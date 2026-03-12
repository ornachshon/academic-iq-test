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
            <div className="border-2 border-white rounded p-1.5 flex flex-col items-center leading-none">
              
              <span className="text-[9px] font-semibold tracking-wider">Academic</span>
              <span className="text-[10px] font-black tracking-widest">IQ TEST</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-300">
            
            
          </div>

          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} World Wide IQ Test. All rights reserved.
          </p>
        </div>
      </div>
    </footer>);

}