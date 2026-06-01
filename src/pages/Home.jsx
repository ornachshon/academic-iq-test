import React, { useEffect } from "react";
import { useSEO } from "@/lib/useSEO";
import Hero from "@/components/home/Hero";
import CountryTable from "@/components/home/CountryTable";
import AboutSection from "@/components/home/AboutSection";
import PricingSection from "@/components/home/PricingSection";
import Footer from "@/components/home/Footer";
import { trackFunnel } from "@/lib/trackFunnel";

export default function Home() {
  useSEO({ title: 'Free Online IQ Test', description: 'Take our free 30-question IQ test and discover your intelligence level. Compare your IQ score with people from over 100 countries. Get your certificate and detailed report.' });
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