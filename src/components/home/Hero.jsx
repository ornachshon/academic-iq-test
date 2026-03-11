import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Brain, Users, Clock, Award } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0C3547] via-[#0e3d52] to-[#11465e] text-white">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#F5921B] animate-pulse" />
              <span className="text-sm font-medium text-gray-300 tracking-wide uppercase">
                Over 2 million people have taken this test
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Discover Your{" "}
              <span className="text-[#F5921B]">True IQ</span>{" "}
              Score
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
              Take our scientifically designed IQ test and find out how you compare to millions of people worldwide.
            </p>

            <Link to={createPageUrl("IQTest")}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#F5921B] hover:bg-[#e0830f] text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg shadow-orange-500/25 transition-colors"
              >
                Start IQ Test — It's Free
              </motion.button>
            </Link>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {[
                { icon: Brain, label: "30 Questions" },
                { icon: Clock, label: "20 Minutes" },
                { icon: Users, label: "2M+ Taken" },
                { icon: Award, label: "Free Results" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-gray-300">
                  <Icon className="w-4 h-4 text-[#F5921B]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:block"
          >
            <img
              src="/__generating__/img_3f048a04c354.png"
              alt="IQ Test on multiple devices"
              className="w-full rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}