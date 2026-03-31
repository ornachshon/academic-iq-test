import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, Pencil, Trash2, Save, X, Globe, Tag, ToggleLeft, ToggleRight, ChevronDown, ChevronUp } from "lucide-react";

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "ILS", symbol: "₪", name: "Israeli Shekel" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "MXN", symbol: "MX$", name: "Mexican Peso" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
];

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "he", name: "Hebrew" },
  { code: "ar", name: "Arabic" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "zh", name: "Chinese" },
  { code: "hi", name: "Hindi" },
];

const EMPTY_RULE = {
  region_name: "",
  country_codes: [],
  languages: [],
  currency_code: "USD",
  currency_symbol: "$",
  price: "",
  original_price: "",
  is_active: true,
  priority: 0,
  label: "",
};

function RuleForm({ rule, onSave, onCancel }) {
  const [form, setForm] = useState({ ...EMPTY_RULE, ...rule });
  const [countryInput, setCountryInput] = useState(
    (rule?.country_codes || []).join(", ")
  );

  const handleCurrencyChange = (code) => {
    const cur = CURRENCIES.find((c) => c.code === code);
    setForm((f) => ({ ...f, currency_code: code, currency_symbol: cur?.symbol || "" }));
  };

  const toggleLanguage = (code) => {
    setForm((f) => ({
      ...f,
      languages: f.languages.includes(code)
        ? f.languages.filter((l) => l !== code)
        : [...f.languages, code],
    }));
  };

  const handleSave = () => {
    const countryCodes = countryInput
      .split(/[\s,]+/)
      .map((c) => c.trim().toUpperCase())
      .filter(Boolean);
    onSave({ ...form, country_codes: countryCodes, price: parseFloat(form.price), original_price: form.original_price ? parseFloat(form.original_price) : null });
  };

  return (
    <div className="bg-white border-2 border-[#F5921B] rounded-xl p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Region Name *</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            placeholder="e.g. Israel, Europe, Default"
            value={form.region_name}
            onChange={(e) => setForm((f) => ({ ...f, region_name: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Internal Label</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            placeholder="Optional notes"
            value={form.label}
            onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Country Codes (comma-separated)</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            placeholder="e.g. IL, US, GB — leave empty for all countries"
            value={countryInput}
            onChange={(e) => setCountryInput(e.target.value)}
          />
          <p className="text-xs text-gray-400 mt-0.5">ISO 3166-1 alpha-2 codes. Empty = matches any country.</p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Priority</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            placeholder="0"
            value={form.priority}
            onChange={(e) => setForm((f) => ({ ...f, priority: parseInt(e.target.value) || 0 }))}
          />
          <p className="text-xs text-gray-400 mt-0.5">Higher = matched first. Use for language-specific overrides.</p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Currency *</label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            value={form.currency_code}
            onChange={(e) => handleCurrencyChange(e.target.value)}
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>{c.symbol} {c.name} ({c.code})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Currency Symbol</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            value={form.currency_symbol}
            onChange={(e) => setForm((f) => ({ ...f, currency_symbol: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Price *</label>
          <input
            type="number"
            step="0.01"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            placeholder="4.99"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Original Price (strikethrough)</label>
          <input
            type="number"
            step="0.01"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            placeholder="9.99"
            value={form.original_price}
            onChange={(e) => setForm((f) => ({ ...f, original_price: e.target.value }))}
          />
        </div>
      </div>

      {/* Language selector */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-2">Languages (optional — leave empty for all)</label>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => toggleLanguage(l.code)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                form.languages.includes(l.code)
                  ? "bg-[#0C3547] text-white border-[#0C3547]"
                  : "bg-white text-gray-600 border-gray-300 hover:border-[#0C3547]"
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-xs font-semibold text-gray-600">Active</label>
        <button
          type="button"
          onClick={() => setForm((f) => ({ ...f, is_active: !f.is_active }))}
          className={`text-2xl ${form.is_active ? "text-green-500" : "text-gray-400"}`}
        >
          {form.is_active ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
        </button>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={handleSave}
          disabled={!form.region_name || !form.price}
          className="flex items-center gap-2 bg-[#F5921B] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#e0830f] disabled:opacity-50 transition-colors"
        >
          <Save size={15} /> Save Rule
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 border border-gray-300 text-gray-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <X size={15} /> Cancel
        </button>
      </div>
    </div>
  );
}

function RuleCard({ rule, onEdit, onDelete, onToggle }) {
  return (
    <div className={`bg-white rounded-xl border ${rule.is_active ? "border-gray-200" : "border-gray-100 opacity-60"} p-5 flex flex-col sm:flex-row sm:items-center gap-4`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-bold text-[#0C3547] text-base">{rule.region_name}</h3>
          {rule.priority > 0 && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">Priority {rule.priority}</span>
          )}
          {!rule.is_active && (
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inactive</span>
          )}
        </div>
        {rule.label && <p className="text-xs text-gray-400 mt-0.5">{rule.label}</p>}
        <div className="flex flex-wrap gap-3 mt-2 text-sm">
          <span className="flex items-center gap-1 font-bold text-[#F5921B]">
            {rule.currency_symbol}{rule.price}
            {rule.original_price && (
              <span className="line-through text-gray-400 font-normal ml-1">{rule.currency_symbol}{rule.original_price}</span>
            )}
            <span className="text-gray-500 font-normal text-xs">{rule.currency_code}</span>
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {rule.country_codes?.length > 0
            ? rule.country_codes.map((c) => (
                <span key={c} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono">{c}</span>
              ))
            : <span className="text-xs text-gray-400 italic">All countries</span>
          }
          {rule.languages?.length > 0 && (
            <>
              <span className="text-xs text-gray-400 mx-1">·</span>
              {rule.languages.map((l) => (
                <span key={l} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">{l}</span>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button onClick={onToggle} title={rule.is_active ? "Deactivate" : "Activate"}
          className={`p-2 rounded-lg transition-colors ${rule.is_active ? "text-green-500 hover:bg-green-50" : "text-gray-400 hover:bg-gray-50"}`}>
          {rule.is_active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
        </button>
        <button onClick={onEdit} className="p-2 text-gray-500 hover:text-[#0C3547] hover:bg-gray-100 rounded-lg transition-colors">
          <Pencil size={16} />
        </button>
        <button onClick={onDelete} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default function PricingAdmin() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [testLoading, setTestLoading] = useState(false);
  const [testCountry, setTestCountry] = useState("");
  const [testLang, setTestLang] = useState("en");

  const load = async () => {
    setLoading(true);
    const data = await base44.entities.PricingRule.list("-priority");
    setRules(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (data) => {
    await base44.entities.PricingRule.create(data);
    setShowNewForm(false);
    load();
  };

  const handleUpdate = async (id, data) => {
    await base44.entities.PricingRule.update(id, data);
    setEditingId(null);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this pricing rule?")) return;
    await base44.entities.PricingRule.delete(id);
    load();
  };

  const handleToggle = async (rule) => {
    await base44.entities.PricingRule.update(rule.id, { is_active: !rule.is_active });
    load();
  };

  const runTest = async () => {
    setTestLoading(true);
    setTestResult(null);
    try {
      const res = await base44.functions.invoke("getLocationPrice", { language: testLang, _override_country: testCountry || undefined });
      setTestResult(res.data);
    } catch (e) {
      setTestResult({ error: e.message });
    }
    setTestLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Header */}
      <div className="bg-[#0C3547] text-white px-6 py-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Globe size={24} />
            <div>
              <h1 className="text-xl font-bold">Geo Pricing Manager</h1>
              <p className="text-sm text-blue-200 mt-0.5">Configure dynamic pricing by region, country, and language</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Add new rule button */}
        {!showNewForm && (
          <button
            onClick={() => setShowNewForm(true)}
            className="flex items-center gap-2 bg-[#F5921B] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#e0830f] transition-colors shadow-sm"
          >
            <Plus size={16} /> Add Pricing Rule
          </button>
        )}

        {showNewForm && (
          <RuleForm
            rule={EMPTY_RULE}
            onSave={handleCreate}
            onCancel={() => setShowNewForm(false)}
          />
        )}

        {/* Rules List */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Tag size={14} /> Pricing Rules ({rules.length})
          </h2>

          {loading ? (
            <div className="text-center py-12 text-gray-400 text-sm">Loading...</div>
          ) : rules.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
              <Globe size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No pricing rules yet</p>
              <p className="text-xs text-gray-400 mt-1">Click "Add Pricing Rule" to create your first rule</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rules.map((rule) =>
                editingId === rule.id ? (
                  <RuleForm
                    key={rule.id}
                    rule={rule}
                    onSave={(data) => handleUpdate(rule.id, data)}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <RuleCard
                    key={rule.id}
                    rule={rule}
                    onEdit={() => setEditingId(rule.id)}
                    onDelete={() => handleDelete(rule.id)}
                    onToggle={() => handleToggle(rule)}
                  />
                )
              )}
            </div>
          )}
        </div>

        {/* Matching Logic explanation */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-bold text-[#0C3547] mb-3 flex items-center gap-2"><ChevronDown size={16} /> How Matching Works</h3>
          <ol className="text-sm text-gray-600 space-y-1.5 list-decimal list-inside">
            <li><strong>Country + Language</strong> — most specific match (highest priority wins)</li>
            <li><strong>Country only</strong> — matches by country code, any language</li>
            <li><strong>Language only</strong> — matches by language, no country codes set</li>
            <li><strong>Default</strong> — no country codes and no languages set (catch-all fallback)</li>
          </ol>
          <p className="text-xs text-gray-400 mt-3">Rules with higher <strong>Priority</strong> values are evaluated first within each pass.</p>
        </div>

        {/* Test panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-bold text-[#0C3547] mb-4">Test Pricing Lookup</h3>
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Country Code</label>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
                placeholder="e.g. IL"
                value={testCountry}
                onChange={(e) => setTestCountry(e.target.value.toUpperCase())}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Language</label>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
                value={testLang}
                onChange={(e) => setTestLang(e.target.value)}
              >
                {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
              </select>
            </div>
            <button
              onClick={runTest}
              disabled={testLoading}
              className="bg-[#0C3547] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#0a2d3e] disabled:opacity-60 transition-colors"
            >
              {testLoading ? "Testing..." : "Run Test"}
            </button>
          </div>
          {testResult && (
            <div className={`mt-4 p-4 rounded-lg text-sm font-mono ${testResult.error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-800"}`}>
              <pre>{JSON.stringify(testResult, null, 2)}</pre>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}