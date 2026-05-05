import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const languages = [
  { code: "en", label: "EN" },
  { code: "ja", label: "JP" },
  { code: "ko", label: "KR" },
];

export default function LanguageSelector() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = languages.find(l => l.code === lang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 bg-white border border-gray-200 rounded-md px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
      >
        <span>{selected.label}</span>
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-20 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { localStorage.setItem("selectedLanguage", lang.code); localStorage.setItem("manualLanguageSet", "true"); window.dispatchEvent(new Event("languageChanged")); setOpen(false); }}
              className={`w-full flex items-center justify-center px-2 py-2 text-xs text-left hover:bg-gray-50 transition-colors ${selected.code === lang.code ? "bg-gray-50 font-medium" : "text-gray-700"}`}
            >
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}