import { useState, useEffect, useCallback } from "react";
import { loadTranslations, detectInitialLanguage, setLanguageCookie, translate, invalidateCache } from "@/lib/i18n";

// Global state shared across all hook instances
let globalLang = null;
let globalCache = {};
let listeners = new Set();

function notifyListeners() {
  listeners.forEach(fn => fn());
}

export function useTranslation() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const update = () => forceUpdate(n => n + 1);
    listeners.add(update);
    return () => listeners.delete(update);
  }, []);

  // On first mount, bootstrap language + translations
  useEffect(() => {
    if (globalLang !== null) return; // Already initialized

    // Start with a safe default while we detect
    globalLang = "en";

    // Detect geo then finalize language
    const init = async () => {
      let geoCountry = null;
      try {
        const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
        const data = await res.json();
        geoCountry = data.country_code;
      } catch (_) {}

      globalLang = detectInitialLanguage(geoCountry);
      globalCache = await loadTranslations();
      notifyListeners();
    };

    init();
  }, []);

  const t = useCallback((key) => {
    return translate(globalLang, key, globalCache);
  }, [globalLang, globalCache]);

  const setLanguage = useCallback((lang) => {
    globalLang = lang;
    setLanguageCookie(lang);
    notifyListeners();
  }, []);

  const reloadTranslations = useCallback(async () => {
    invalidateCache();
    globalCache = await loadTranslations();
    notifyListeners();
  }, []);

  return { t, lang: globalLang || "en", setLanguage, reloadTranslations };
}