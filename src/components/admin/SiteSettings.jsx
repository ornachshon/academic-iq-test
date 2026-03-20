import React, { useState, useEffect } from "react";

const DEFAULTS = {
  headerHeight: 80,
  footerPaddingY: 40,
  headerLogoSize: 112,
  footerLogoSize: 96,
};

export function useSiteSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("site_settings");
      return saved ? { ...DEFAULTS, ...JSON.parse(saved) } : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  const update = (key, value) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      localStorage.setItem("site_settings", JSON.stringify(next));
      return next;
    });
  };

  return { settings, update };
}

export default function SiteSettingsPanel({ onClose }) {
  const { settings, update } = useSiteSettings();
  const [local, setLocal] = useState(settings);

  const handleChange = (key, value) => {
    const num = Number(value);
    setLocal((prev) => ({ ...prev, [key]: num }));
    update(key, num);
  };

  const handleReset = () => {
    setLocal(DEFAULTS);
    Object.entries(DEFAULTS).forEach(([k, v]) => update(k, v));
  };

  const fields = [
    { key: "headerHeight", label: "Header Height (px)", min: 40, max: 120 },
    { key: "headerLogoSize", label: "Header Logo Size (px)", min: 32, max: 200 },
    { key: "footerPaddingY", label: "Footer Padding (px)", min: 16, max: 120 },
    { key: "footerLogoSize", label: "Footer Logo Size (px)", min: 32, max: 200 },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-[#0C3547]">Site Settings</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none">✕</button>
      </div>

      <div className="space-y-4">
        {fields.map(({ key, label, min, max }) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <label className="text-xs text-gray-600">{label}</label>
              <span className="text-xs font-bold text-[#F5921B]">{local[key]}px</span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              value={local[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full accent-[#F5921B]"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleReset}
        className="mt-4 w-full text-xs text-gray-400 hover:text-gray-600 underline"
      >
        Reset to defaults
      </button>
    </div>
  );
}