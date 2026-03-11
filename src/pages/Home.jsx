import React from "react";
import Hero from "@/components/home/Hero";
import CountryTable from "@/components/home/CountryTable";
import HowItWorks from "@/components/home/HowItWorks";
import AboutSection from "@/components/home/AboutSection";
import PricingSection from "@/components/home/PricingSection";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <HowItWorks />
      <AboutSection />
      <CountryTable />
      <PricingSection />
      <Footer />
    </div>
  );
}