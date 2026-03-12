import React from 'react';
import { Link } from 'react-router-dom';

export default function CheckoutFooter() {
  return (
    <footer className="bg-[#0C3547] text-gray-300 mt-10">
      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Logo */}
        <div className="col-span-2 md:col-span-1 flex items-start">
          <div className="border-2 border-white rounded p-2 flex flex-col items-center leading-none">
            <span className="text-[9px] font-semibold text-white tracking-wider">Academic</span>
            <span className="text-[10px] font-black text-white tracking-widest">IQ TEST</span>
          </div>
        </div>

        {/* Customer Support */}
        <div>
          <h4 className="text-white font-bold mb-2 text-sm">Customer Support</h4>
          <p className="text-xs mb-1">Available 24/7/365</p>
          <ul className="space-y-1 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cancel subscription</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-bold mb-2 text-sm">Legal</h4>
          <ul className="space-y-1 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Subscription Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-white font-bold mb-2 text-sm">Explore</h4>
          <ul className="space-y-1 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Academic IQ Test FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
          </ul>
        </div>

        {/* IQ Booster */}
        <div>
          <h4 className="text-white font-bold mb-2 text-sm">IQ Booster</h4>
          <ul className="space-y-1 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">Log In</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About IQ Booster</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-600 py-4 text-center text-xs text-gray-500 px-4">
        <p>This test is for personal development and entertainment purposes only. It is not a medical or psychological diagnostic tool.</p>
        <p className="mt-1">© 2026 All Rights Reserved by Academic IQ Test</p>
      </div>
    </footer>
  );
}