/**
 * i18n — translation store & utilities
 * Translations are loaded from DB once and cached in memory.
 * Falls back to English if a translation is missing.
 */

import { base44 } from "@/api/base44Client";

// In-memory cache: { "en": { "hero.title": "..." }, "ja": { ... } }
let cache = {};
let loaded = false;
let loadPromise = null;

export async function loadTranslations() {
  if (loaded) return cache;
  if (loadPromise) return loadPromise;

  loadPromise = base44.entities.Translation.list()
    .then((rows) => {
      cache = {};
      for (const row of rows) {
        if (!cache[row.language]) cache[row.language] = {};
        cache[row.language][row.key] = row.value;
      }
      loaded = true;
      return cache;
    })
    .catch(() => {
      loaded = true;
      return cache;
    });

  return loadPromise;
}

export function invalidateCache() {
  cache = {};
  loaded = false;
  loadPromise = null;
}

/** Detect language: persisted cookie > browser language > geo (JP) */
export function detectInitialLanguage(geoCountry = null) {
  // 1. Persisted user choice (cookie)
  const cookie = getCookie("aiq_lang");
  if (cookie === "ja" || cookie === "en") return cookie;

  // 2. localStorage fallback (legacy)
  const ls = localStorage.getItem("selectedLanguage");
  if (ls === "ja" || ls === "en") return ls;

  // 3. Geo-based: Japan → Japanese
  if (geoCountry === "JP") return "ja";

  // 4. Browser language
  const browserLang = (navigator.language || "").toLowerCase();
  if (browserLang.startsWith("ja")) return "ja";

  return "en";
}

export function setLanguageCookie(lang) {
  document.cookie = `aiq_lang=${lang};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
  localStorage.setItem("selectedLanguage", lang);
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

/** Get a translated string. Falls back to English then to the key itself. */
export function translate(lang, key, cache) {
  return cache?.[lang]?.[key] || cache?.["en"]?.[key] || key;
}