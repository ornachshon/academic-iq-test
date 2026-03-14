import React, { useState } from "react";
import { motion } from "framer-motion";

export default function EmailCaptureModal({ onSubmit }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit(email.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="bg-black/75 opacity-100 absolute inset-0" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 text-center">

        <h2 className="text-2xl font-bold text-[#0C3547] mb-1">
          Where to send your IQ score
        </h2>
        <h2 className="text-2xl font-bold text-[#0C3547] mb-4">
          and performance report?
        </h2>

        <p className="text-gray-500 text-sm mb-4">Please enter your email:</p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            placeholder="" />


          <button
            type="submit"
            className="w-full bg-[#F5921B] hover:bg-[#e0830f] text-white font-bold py-3 rounded-md transition-colors text-base">

            Get IQ Results
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4 leading-relaxed flex items-center justify-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          We value your privacy. Your email will never be shared with anyone.





        </p>
      </motion.div>
    </div>);

}