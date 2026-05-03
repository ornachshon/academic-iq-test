import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "ja", label: "JP", flag: "🇯🇵" },
  { code: "ko", label: "KR", flag: "🇰🇷" },
];

export default function LanguageSelector() {
  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("selectedLanguage");
    return languages.find(l => l.code === saved) || languages[0];
  });
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

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
        <span className="text-sm leading-none">{selected.flag}</span>
        <span>{selected.label}</span>
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-20 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { setSelected(lang); localStorage.setItem("selectedLanguage", lang.code); window.dispatchEvent(new Event("languageChanged")); setOpen(false); }}
              className={`w-full flex items-center gap-1.5 px-2 py-2 text-xs text-left hover:bg-gray-50 transition-colors ${selected.code === lang.code ? "bg-gray-50 font-medium" : "text-gray-700"}`}
            >
              <span className="text-sm leading-none">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}