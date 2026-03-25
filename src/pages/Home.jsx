import React, { useEffect } from "react";
import Hero from "@/components/home/Hero";
import CountryTable from "@/components/home/CountryTable";
import AboutSection from "@/components/home/AboutSection";
import PricingSection from "@/components/home/PricingSection";
import Footer from "@/components/home/Footer";
import { trackFunnel } from "@/lib/trackFunnel";

export default function Home() {
  useEffect(() => { trackFunnel("home_page_visited"); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <CountryTable />
      <AboutSection />
      <PricingSection />
      <Footer />
    </div>
  );
}