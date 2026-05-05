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

  useEffect(() => {
    const language = localStorage.getItem("selectedLanguage") || "en";
    base44.functions.invoke("getLocationPrice", { language })
      .then((res) => {
        if (res.data && res.data.price) {
          setPricing(res.data);
        }
      })
      .catch(() => {
        // Keep default on error
      })
      .finally(() => setLoading(false));
  }, []);

  const formatPrice = (amount) =>
    `${pricing.currency_symbol}${Number(amount).toFixed(2)}`;

  return { pricing, loading, formatPrice };
}