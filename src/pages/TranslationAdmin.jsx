import React, { useState, useEffect, useCallback, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Languages, Save, RefreshCw, Zap, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Search, ArrowUpDown, ArrowUp, ArrowDown, X, SlidersHorizontal } from "lucide-react";

const SUPPORTED_LANGS = [{ code: "ja", name: "Japanese", flag: "🇯🇵" }];
const SECTIONS = ["all", "hero", "about", "email", "checkout", "iqtest", "nav", "general"];

export default function TranslationAdmin() {
  const [translations, setTranslations] = useState({});  // { key: { en, ja, section, notes } }
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [autoTranslating, setAutoTranslating] = useState({});
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("all"); // all, missing_ja, has_ja
  const [sortField, setSortField] = useState("key"); // key, section, en, ja
  const [sortDir, setSortDir] = useState("asc"); // asc, desc
  const [expandedKeys, setExpandedKeys] = useState(new Set());
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const rows = await base44.entities.Translation.list();
    const grouped = {};
    for (const row of rows) {
      if (!grouped[row.key]) grouped[row.key] = { key: row.key, section: row.section, notes: row.notes };
      grouped[row.key][row.language] = { value: row.value, id: row.id };
    }
    setTranslations(grouped);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateLocalTranslation = (key, lang, value, id) => {
    setTranslations(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [lang]: { value, id: id || prev[key]?.[lang]?.id }
      }
    }));
  };

  const handleSave = async (key, lang, value) => {
    setSaving(s => ({ ...s, [`${key}_${lang}`]: true }));
    try {
      const existing = translations[key]?.[lang];
      if (existing?.id) {
        await base44.entities.Translation.update(existing.id, { value });
        updateLocalTranslation(key, lang, value, existing.id);
      } else {
        const created = await base44.entities.Translation.create({
          key, language: lang, value,
          section: translations[key]?.section || "general",
          notes: translations[key]?.notes || ""
        });
        updateLocalTranslation(key, lang, value, created.id);
      }
      showToast(`Saved ${lang.toUpperCase()} for "${key}"`);
    } finally {
      setSaving(s => ({ ...s, [`${key}_${lang}`]: false }));
    }
  };

  const handleSaveEnglish = async (key, value) => {
    setSaving(s => ({ ...s, [`${key}_en`]: true }));
    try {
      const existing = translations[key]?.en;
      if (existing?.id) {
        await base44.entities.Translation.update(existing.id, { value });
        updateLocalTranslation(key, "en", value, existing.id);
      } else {
        const created = await base44.entities.Translation.create({
          key, language: "en", value,
          section: translations[key]?.section || "general",
          notes: translations[key]?.notes || ""
        });
        updateLocalTranslation(key, "en", value, created.id);
      }
      showToast(`Saved EN for "${key}" — auto-translating...`);
      // Auto-translate to all other languages
      await autoTranslateKey(key, value);
      // Reload only to sync auto-translated values
      await load();
    } finally {
      setSaving(s => ({ ...s, [`${key}_en`]: false }));
    }
  };

  const autoTranslateKey = async (key, englishText) => {
    setAutoTranslating(s => ({ ...s, [key]: true }));
    try {
      const res = await base44.functions.invoke("autoTranslate", {
        key,
        englishText,
        targetLanguages: SUPPORTED_LANGS.map(l => l.code),
        section: translations[key]?.section || "general",
        notes: translations[key]?.notes || ""
      });
      // Update local state immediately with returned translations
      const results = res?.data?.results || {};
      setTranslations(prev => {
        const updated = { ...prev };
        for (const [lang, value] of Object.entries(results)) {
          updated[key] = {
            ...updated[key],
            [lang]: { value, id: updated[key]?.[lang]?.id }
          };
        }
        return updated;
      });
      showToast(`Auto-translated "${key}" to all languages`, "success");
    } catch (e) {
      showToast(`Auto-translate failed: ${e.message}`, "error");
    } finally {
      setAutoTranslating(s => ({ ...s, [key]: false }));
    }
  };

  const handleAutoTranslateAll = async () => {
    const keys = Object.keys(filteredTranslations);
    for (const key of keys) {
      const enVal = translations[key]?.en?.value;
      if (enVal) await autoTranslateKey(key, enVal);
    }
    await load();
  };

  const toggleExpand = (key) => {
    setExpandedKeys(prev => {
      const n = new Set(prev);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filteredTranslations = useMemo(() => {
    const q = search.toLowerCase();
    const entries = Object.entries(translations).filter(([key, val]) => {
      const sectionMatch = filter === "all" || val.section === filter;
      const langMatch = langFilter === "all" ||
        (langFilter === "missing_ja" && !val.ja?.value) ||
        (langFilter === "has_ja" && !!val.ja?.value);
      const searchMatch = !q ||
        key.toLowerCase().includes(q) ||
        (val.section || "").toLowerCase().includes(q) ||
        (val.en?.value || "").toLowerCase().includes(q) ||
        (val.ja?.value || "").toLowerCase().includes(q);
      return sectionMatch && langMatch && searchMatch;
    });

    entries.sort(([aKey, aVal], [bKey, bVal]) => {
      let a = "", b = "";
      if (sortField === "key") { a = aKey; b = bKey; }
      else if (sortField === "section") { a = aVal.section || ""; b = bVal.section || ""; }
      else if (sortField === "en") { a = aVal.en?.value || ""; b = bVal.en?.value || ""; }
      else if (sortField === "ja") { a = aVal.ja?.value || ""; b = bVal.ja?.value || ""; }
      return sortDir === "asc" ? a.localeCompare(b) : b.localeCompare(a);
    });

    return Object.fromEntries(entries);
  }, [translations, filter, langFilter, search, sortField, sortDir]);

  const totalKeys = Object.keys(translations).length;
  const translatedJA = Object.values(translations).filter(v => v.ja?.value).length;

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Header */}
      <div className="bg-[#0C3547] text-white px-6 py-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Languages size={24} />
              <div>
                <h1 className="text-xl font-bold">Translation Manager</h1>
                <p className="text-sm text-blue-200 mt-0.5">Side-by-side English ↔ Japanese editor with AI auto-translation</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="text-right">
                <p className="text-xs text-blue-200">Japanese coverage</p>
                <p className="font-bold">{translatedJA}/{totalKeys} keys</p>
              </div>
              <div className="w-24 bg-white/20 rounded-full h-2">
                <div className="bg-[#F5921B] h-2 rounded-full transition-all" style={{ width: totalKeys > 0 ? `${(translatedJA/totalKeys)*100}%` : "0%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        {/* Controls */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
          {/* Row 1: search + action buttons */}
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="border border-gray-300 rounded-md pl-8 pr-8 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
                placeholder="Search by key, section, English or Japanese text..."
                value={search} onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={13} />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={load} className="flex items-center gap-1.5 border border-gray-300 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                <RefreshCw size={14} /> Refresh
              </button>
              <button onClick={handleAutoTranslateAll} className="flex items-center gap-1.5 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors">
                <Zap size={14} /> Auto-translate All
              </button>
            </div>
          </div>

          {/* Row 2: section + language filters + sort */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <SlidersHorizontal size={13} /> Filters:
            </div>

            {/* Section pills */}
            <div className="flex gap-1 flex-wrap">
              {SECTIONS.map(s => (
                <button key={s} onClick={() => setFilter(s)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${filter === s ? "bg-[#0C3547] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {s}
                </button>
              ))}
            </div>

            {/* Language status filter */}
            <div className="flex gap-1 border-l border-gray-200 pl-3">
              {[["all", "All"], ["has_ja", "✅ Has JA"], ["missing_ja", "⚠ Missing JA"]].map(([val, label]) => (
                <button key={val} onClick={() => setLangFilter(val)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${langFilter === val ? "bg-[#F5921B] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {label}
                </button>
              ))}
            </div>

            {/* Sort controls */}
            <div className="flex gap-1 border-l border-gray-200 pl-3 items-center">
              <span className="text-xs text-gray-500 font-medium">Sort:</span>
              {[["key", "Key"], ["section", "Section"], ["en", "English"], ["ja", "Japanese"]].map(([field, label]) => {
                const active = sortField === field;
                const Icon = active ? (sortDir === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;
                return (
                  <button key={field} onClick={() => handleSort(field)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    <Icon size={11} /> {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active filters summary */}
          {(filter !== "all" || langFilter !== "all" || search) && (
            <div className="flex items-center gap-2 text-xs text-gray-500 pt-1 border-t border-gray-100">
              <span>{Object.keys(filteredTranslations).length} result{Object.keys(filteredTranslations).length !== 1 ? "s" : ""}</span>
              {filter !== "all" && <span className="bg-[#0C3547]/10 text-[#0C3547] px-2 py-0.5 rounded-full">section: {filter} <button onClick={() => setFilter("all")} className="ml-1 hover:text-red-500">×</button></span>}
              {langFilter !== "all" && <span className="bg-[#F5921B]/10 text-[#F5921B] px-2 py-0.5 rounded-full">{langFilter === "missing_ja" ? "Missing JA" : "Has JA"} <button onClick={() => setLangFilter("all")} className="ml-1 hover:text-red-500">×</button></span>}
              {search && <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">"{search}" <button onClick={() => setSearch("")} className="ml-1 hover:text-red-500">×</button></span>}
            </div>
          )}
        </div>

        {/* Translation rows */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading translations...</div>
        ) : Object.keys(filteredTranslations).length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
            <Languages size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No translations found</p>
            <p className="text-xs text-gray-400 mt-1">Use the seeder below or add keys from the app</p>
          </div>
        ) : (
          <div className="space-y-2">
            {Object.entries(filteredTranslations).map(([key, data]) => (
              <TranslationRow
                key={key}
                tkey={key}
                data={data}
                expanded={expandedKeys.has(key)}
                onToggle={() => toggleExpand(key)}
                onSaveEN={(v) => handleSaveEnglish(key, v)}
                onSaveJA={(v) => handleSave(key, "ja", v)}
                onAutoTranslate={() => autoTranslateKey(key, data.en?.value)}
                savingEN={saving[`${key}_en`]}
                savingJA={saving[`${key}_ja`]}
                autoTranslating={autoTranslating[key]}
              />
            ))}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-white text-sm z-50 transition-all ${toast.type === "error" ? "bg-red-600" : "bg-green-600"}`}>
          {toast.type === "error" ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}

function TranslationRow({ tkey, data, expanded, onToggle, onSaveEN, onSaveJA, onAutoTranslate, savingEN, savingJA, autoTranslating }) {
  const [enVal, setEnVal] = useState(data.en?.value || "");
  const [jaVal, setJaVal] = useState(data.ja?.value || "");

  // Sync when external data changes
  useEffect(() => { setEnVal(data.en?.value || ""); }, [data.en?.value]);
  useEffect(() => { setJaVal(data.ja?.value || ""); }, [data.ja?.value]);

  const enChanged = enVal !== (data.en?.value || "");
  const jaChanged = jaVal !== (data.ja?.value || "");
  const hasJA = !!data.ja?.value;

  return (
    <div className={`bg-white rounded-xl border ${!hasJA ? "border-yellow-200" : "border-gray-200"} overflow-hidden`}>
      {/* Header row */}
      <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors" onClick={onToggle}>
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded flex-shrink-0">{tkey}</span>
          {data.section && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{data.section}</span>}
          {!hasJA && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">⚠ Missing JA</span>}
          <span className="text-xs text-gray-400 truncate hidden md:block">{data.en?.value?.substring(0, 60)}{data.en?.value?.length > 60 ? "..." : ""}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {!hasJA && (
            <button onClick={e => { e.stopPropagation(); onAutoTranslate(); }} disabled={autoTranslating || !data.en?.value}
              className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium hover:bg-purple-200 disabled:opacity-50 transition-colors">
              {autoTranslating ? <RefreshCw size={11} className="animate-spin" /> : <Zap size={11} />}
              Auto-translate
            </button>
          )}
          {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </div>

      {/* Expanded editor */}
      {expanded && (
        <div className="border-t border-gray-100 grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {/* English */}
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">🇺🇸 English (source)</span>
              {enChanged && (
                <button onClick={() => onSaveEN(enVal)} disabled={savingEN}
                  className="flex items-center gap-1 bg-[#0C3547] text-white px-3 py-1 rounded text-xs font-bold hover:bg-[#0a2d3e] disabled:opacity-60 transition-colors">
                  {savingEN ? <RefreshCw size={11} className="animate-spin" /> : <Save size={11} />}
                  Save & Auto-translate
                </button>
              )}
            </div>
            <textarea
              value={enVal}
              onChange={e => setEnVal(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0C3547] min-h-[80px]"
              placeholder="Enter English text..."
            />
            {data.notes && <p className="text-xs text-gray-400 italic">{data.notes}</p>}
          </div>

          {/* Japanese */}
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">🇯🇵 Japanese</span>
              <div className="flex gap-2">
                <button onClick={onAutoTranslate} disabled={autoTranslating || !data.en?.value}
                  className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded text-xs font-medium hover:bg-purple-200 disabled:opacity-50 transition-colors">
                  {autoTranslating ? <RefreshCw size={11} className="animate-spin" /> : <Zap size={11} />}
                  AI Translate
                </button>
                {jaChanged && (
                  <button onClick={() => onSaveJA(jaVal)} disabled={savingJA}
                    className="flex items-center gap-1 bg-[#F5921B] text-white px-3 py-1 rounded text-xs font-bold hover:bg-[#e0830f] disabled:opacity-60 transition-colors">
                    {savingJA ? <RefreshCw size={11} className="animate-spin" /> : <Save size={11} />}
                    Save
                  </button>
                )}
              </div>
            </div>
            <textarea
              value={jaVal}
              onChange={e => setJaVal(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#F5921B] min-h-[80px]"
              placeholder="Japanese translation..."
              style={{ fontFamily: "sans-serif" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}