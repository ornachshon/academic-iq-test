import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const DEFAULT_PRICE = {
  price: 4.99,
  original_price: 9.99,
  currency_code: "USD",
  currency_symbol: "$",
  region_name: "Default",
};

export function useGeoPrice() {
  const [pricing, setPricing] = useState(DEFAULT_PRICE);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState(() => localStorage.getItem("selectedLanguage") || "en");

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("selectedLanguage") || "en");
    };
    window.addEventListener("languageChanged", handleLanguageChange);
    return () => window.removeEventListener("languageChanged", handleLanguageChange);
  }, []);

  useEffect(() => {
    setLoading(true);
    const forceCountry = language === "ja" ? "JP" : undefined;
    base44.functions.invoke("getLocationPrice", { language, ...(forceCountry && { force_country: forceCountry }) })
      .then((res) => {
        if (res.data && res.data.price) {
          setPricing(res.data);
        }
      })
      .catch(() => {
        // Keep default on error
      })
      .finally(() => setLoading(false));
  }, [language]);

  const formatPrice = (amount) =>
    `${pricing.currency_symbol}${Number(amount).toFixed(2)}`;

  return { pricing, loading, formatPrice };
}