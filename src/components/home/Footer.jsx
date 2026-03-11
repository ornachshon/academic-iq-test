import React from "react";
import { Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0C3547] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F5921B] rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg">IQ Test</span>
              <p className="text-sm text-gray-400">Discover your true potential</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} IQ Test. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}