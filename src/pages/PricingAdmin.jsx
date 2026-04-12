import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IS_ADMIN_PANEL = window.self !== window.top || window.location.hostname === 'localhost';
import { base44 } from "@/api/base44Client";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, Pencil, Trash2, Save, X, Globe, Tag, ToggleLeft, ToggleRight, ChevronDown, GripVertical, GripHorizontal } from "lucide-react";

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
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  { code: "KRW", symbol: "₩", name: "South Korean Won" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
  { code: "PLN", symbol: "zł", name: "Polish Zloty" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
  { code: "COP", symbol: "$", name: "Colombian Peso" },
  { code: "ARS", symbol: "$", name: "Argentine Peso" },
  { code: "CLP", symbol: "$", name: "Chilean Peso" },
  { code: "TWD", symbol: "NT$", name: "Taiwan Dollar" },
  { code: "TRY", symbol: "₺", name: "Turkish Lira" },
  { code: "UYU", symbol: "$U", name: "Uruguayan Peso" },
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

const ALL_COLUMNS = [
  { id: "drag",         label: "",              width: "w-8"   },
  { id: "region_name",  label: "Region",        width: "w-40"  },
  { id: "countries",    label: "Countries",     width: "w-36"  },
  { id: "languages",    label: "Languages",     width: "w-28"  },
  { id: "currency",     label: "Currency",      width: "w-24"  },
  { id: "price",        label: "Sale Price",    width: "w-28"  },
  { id: "original_price", label: "Orig. Price", width: "w-28"  },
  { id: "price_usd",    label: "≈ USD",         width: "w-24"  },
  { id: "priority",     label: "Priority",      width: "w-20"  },
  { id: "status",       label: "Status",        width: "w-20"  },
  { id: "actions",      label: "Actions",       width: "w-24"  },
];

const NON_DRAGGABLE_COLS = new Set(["drag", "actions"]);

const EMPTY_RULE = {
  region_name: "", country_codes: [], languages: [],
  currency_code: "USD", currency_symbol: "$",
  price: "", original_price: "", is_active: true, priority: 0, label: "",
};

function RuleForm({ rule, onSave, onCancel }) {
  const [form, setForm] = useState({ ...EMPTY_RULE, ...rule });
  const [countryInput, setCountryInput] = useState((rule?.country_codes || []).join(", "));

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
    const countryCodes = countryInput.split(/[\s,]+/).map((c) => c.trim().toUpperCase()).filter(Boolean);
    onSave({ ...form, country_codes: countryCodes, price: parseFloat(form.price), original_price: form.original_price ? parseFloat(form.original_price) : null });
  };

  return (
    <div className="bg-white border-2 border-[#F5921B] rounded-xl p-6 space-y-4 mb-4">
      <h3 className="font-bold text-[#0C3547] text-sm">{rule?.id ? "Edit Rule" : "New Rule"}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Region Name *", key: "region_name", placeholder: "e.g. United States" },
          { label: "Internal Label", key: "label", placeholder: "Optional notes" },
        ].map(({ label, key, placeholder }) => (
          <div key={key}>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
            <input className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
              placeholder={placeholder} value={form[key]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
          </div>
        ))}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Country Codes</label>
          <input className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            placeholder="e.g. US, GB — empty = all" value={countryInput}
            onChange={(e) => setCountryInput(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Currency *</label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            value={form.currency_code} onChange={(e) => handleCurrencyChange(e.target.value)}>
            {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.symbol} {c.name} ({c.code})</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Currency Symbol</label>
          <input className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            value={form.currency_symbol} onChange={(e) => setForm((f) => ({ ...f, currency_symbol: e.target.value }))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Sale Price *</label>
          <input type="number" step="0.01" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            placeholder="4.99" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Original Price</label>
          <input type="number" step="0.01" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            placeholder="9.99" value={form.original_price} onChange={(e) => setForm((f) => ({ ...f, original_price: e.target.value }))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Priority</label>
          <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            placeholder="0" value={form.priority} onChange={(e) => setForm((f) => ({ ...f, priority: parseInt(e.target.value) || 0 }))} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-2">Languages (empty = all)</label>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <button key={l.code} type="button" onClick={() => toggleLanguage(l.code)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${form.languages.includes(l.code) ? "bg-[#0C3547] text-white border-[#0C3547]" : "bg-white text-gray-600 border-gray-300 hover:border-[#0C3547]"}`}>
              {l.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-xs font-semibold text-gray-600">Active</label>
        <button type="button" onClick={() => setForm((f) => ({ ...f, is_active: !f.is_active }))}
          className={form.is_active ? "text-green-500" : "text-gray-400"}>
          {form.is_active ? <ToggleRight size={26} /> : <ToggleLeft size={26} />}
        </button>
      </div>
      <div className="flex gap-3">
        <button onClick={handleSave} disabled={!form.region_name || !form.price}
          className="flex items-center gap-2 bg-[#F5921B] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#e0830f] disabled:opacity-50 transition-colors">
          <Save size={14} /> Save Rule
        </button>
        <button onClick={onCancel}
          className="flex items-center gap-2 border border-gray-300 text-gray-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
          <X size={14} /> Cancel
        </button>
      </div>
    </div>
  );
}

function CellContent({ colId, rule, onEdit, onDelete, onToggle, rates }) {
  switch (colId) {
    case "drag": return null; // handle in row
    case "region_name": return (
      <div>
        <p className="font-semibold text-[#0C3547] text-sm leading-tight">{rule.region_name}</p>
        {rule.label && <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[150px]">{rule.label}</p>}
      </div>
    );
    case "countries": return (
      <div className="flex flex-wrap gap-1">
        {rule.country_codes?.length > 0
          ? rule.country_codes.map((c) => <span key={c} className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono">{c}</span>)
          : <span className="text-xs text-gray-400 italic">All</span>}
      </div>
    );
    case "languages": return (
      <div className="flex flex-wrap gap-1">
        {rule.languages?.length > 0
          ? rule.languages.map((l) => <span key={l} className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded">{l}</span>)
          : <span className="text-xs text-gray-400 italic">All</span>}
      </div>
    );
    case "currency": return <span className="text-sm font-mono text-gray-700">{rule.currency_symbol} {rule.currency_code}</span>;
    case "price": return <span className="text-sm font-bold text-[#F5921B]">{rule.currency_symbol}{rule.price}</span>;
    case "original_price": return rule.original_price
      ? <span className="text-sm text-gray-400 line-through">{rule.currency_symbol}{rule.original_price}</span>
      : <span className="text-xs text-gray-300">—</span>;
    case "price_usd": {
      if (!rates || !rule.price) return <span className="text-xs text-gray-300">—</span>;
      if (rule.currency_code === "USD") return <span className="text-sm font-medium text-green-700">${Number(rule.price).toFixed(2)}</span>;
      const rate = rates[rule.currency_code];
      if (!rate) return <span className="text-xs text-gray-400 italic">N/A</span>;
      const usd = (rule.price / rate).toFixed(2);
      return <span className="text-sm font-medium text-green-700">${usd}</span>;
    }
    case "priority": return rule.priority > 0
      ? <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">{rule.priority}</span>
      : <span className="text-xs text-gray-300">0</span>;
    case "status": return (
      <button onClick={onToggle} title={rule.is_active ? "Deactivate" : "Activate"}
        className={rule.is_active ? "text-green-500 hover:opacity-75" : "text-gray-300 hover:opacity-75"}>
        {rule.is_active ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
      </button>
    );
    case "actions": return (
      <div className="flex items-center gap-1">
        <button onClick={onEdit} className="p-1.5 text-gray-400 hover:text-[#0C3547] hover:bg-gray-100 rounded transition-colors"><Pencil size={14} /></button>
        <button onClick={onDelete} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 size={14} /></button>
      </div>
    );
    default: return null;
  }
}

export default function PricingAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    // Only accessible from the admin panel (embedded in iframe)
    // Redirect to Home if accessed directly as a website URL
    const isEmbedded = window.self !== window.top;
    if (!isEmbedded) {
      navigate('/Home', { replace: true });
    }
  }, []);

  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [columns, setColumns] = useState(ALL_COLUMNS);
  const [rates, setRates] = useState(null);
  const [ratesUpdated, setRatesUpdated] = useState(null);
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

  useEffect(() => {
    load();
    base44.functions.invoke("getExchangeRates", {}).then((res) => {
      if (res.data?.rates) {
        setRates(res.data.rates);
        setRatesUpdated(res.data.updated);
      }
    }).catch(() => {});
  }, []);

  const handleCreate = async (data) => { await base44.entities.PricingRule.create(data); setShowNewForm(false); load(); };
  const handleUpdate = async (id, data) => { await base44.entities.PricingRule.update(id, data); setEditingId(null); load(); };
  const handleDelete = async (id) => { if (!confirm("Delete this pricing rule?")) return; await base44.entities.PricingRule.delete(id); load(); };
  const handleToggle = async (rule) => { await base44.entities.PricingRule.update(rule.id, { is_active: !rule.is_active }); load(); };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, type } = result;

    if (type === "ROW") {
      const reordered = Array.from(rules);
      const [moved] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, moved);
      setRules(reordered);
    }

    if (type === "COLUMN") {
      const draggableColId = result.draggableId.replace("col-", "");
      if (NON_DRAGGABLE_COLS.has(draggableColId)) return;
      const reordered = Array.from(columns);
      const [moved] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, moved);
      setColumns(reordered);
    }
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
        <div className="max-w-full mx-auto px-2">
          <div className="flex items-center gap-3">
            <Globe size={24} />
            <div>
              <h1 className="text-xl font-bold">Geo Pricing Manager</h1>
              <p className="text-sm text-blue-200 mt-0.5">Drag rows to reorder · Drag column headers to rearrange</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-full">

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          {!showNewForm && (
            <button onClick={() => setShowNewForm(true)}
              className="flex items-center gap-2 bg-[#F5921B] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#e0830f] transition-colors shadow-sm">
              <Plus size={16} /> Add Pricing Rule
            </button>
          )}
          <span className="text-sm text-gray-400 flex items-center gap-1.5">
            <GripVertical size={14} /> Drag rows &nbsp;|&nbsp; <GripHorizontal size={14} /> Drag columns
          </span>
        </div>

        {showNewForm && (
          <RuleForm rule={EMPTY_RULE} onSave={handleCreate} onCancel={() => setShowNewForm(false)} />
        )}

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <Tag size={14} /> Pricing Rules ({rules.length})
            </h2>
            {ratesUpdated && (
              <span className="text-xs text-gray-400">Rates updated: {new Date(ratesUpdated).toLocaleDateString()}</span>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-400 text-sm">Loading...</div>
          ) : rules.length === 0 ? (
            <div className="text-center py-12">
              <Globe size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No pricing rules yet</p>
            </div>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <table className="w-full text-sm border-collapse">
                {/* Draggable Column Headers */}
                <Droppable droppableId="columns" direction="horizontal" type="COLUMN">
                  {(provided) => (
                    <thead ref={provided.innerRef} {...provided.droppableProps}>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        {columns.map((col, colIndex) => (
                          <Draggable
                            key={`col-${col.id}`}
                            draggableId={`col-${col.id}`}
                            index={colIndex}
                            isDragDisabled={NON_DRAGGABLE_COLS.has(col.id)}
                          >
                            {(provided, snapshot) => (
                              <th
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3 whitespace-nowrap select-none ${snapshot.isDragging ? "bg-blue-50 text-blue-700" : ""} ${!NON_DRAGGABLE_COLS.has(col.id) ? "cursor-grab" : ""}`}
                                style={{ ...provided.draggableProps.style }}
                              >
                                <div className="flex items-center gap-1" {...provided.dragHandleProps}>
                                  {!NON_DRAGGABLE_COLS.has(col.id) && col.label && (
                                    <GripHorizontal size={12} className="text-gray-300 shrink-0" />
                                  )}
                                  {col.label}
                                </div>
                              </th>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </tr>
                    </thead>
                  )}
                </Droppable>

                {/* Draggable Rows */}
                <Droppable droppableId="rows" type="ROW">
                  {(provided) => (
                    <tbody ref={provided.innerRef} {...provided.droppableProps}>
                      {rules.map((rule, rowIndex) => (
                        editingId === rule.id ? (
                          <tr key={rule.id}>
                            <td colSpan={columns.length} className="px-3 py-2">
                              <RuleForm
                                rule={rule}
                                onSave={(data) => handleUpdate(rule.id, data)}
                                onCancel={() => setEditingId(null)}
                              />
                            </td>
                          </tr>
                        ) : (
                          <Draggable key={rule.id} draggableId={rule.id} index={rowIndex}>
                            {(provided, snapshot) => (
                              <tr
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`border-b border-gray-50 transition-colors ${snapshot.isDragging ? "bg-orange-50 shadow-lg" : rule.is_active ? "hover:bg-gray-50" : "opacity-50 hover:bg-gray-50"}`}
                              >
                                {columns.map((col) => (
                                  <td key={col.id} className="px-3 py-3 align-middle">
                                    {col.id === "drag" ? (
                                      <div {...provided.dragHandleProps} className="cursor-grab text-gray-300 hover:text-gray-500 flex items-center justify-center">
                                        <GripVertical size={16} />
                                      </div>
                                    ) : (
                                      <CellContent
                                        colId={col.id}
                                        rule={rule}
                                        onEdit={() => setEditingId(rule.id)}
                                        onDelete={() => handleDelete(rule.id)}
                                        onToggle={() => handleToggle(rule)}
                                        rates={rates}
                                      />
                                    )}
                                  </td>
                                ))}
                              </tr>
                            )}
                          </Draggable>
                        )
                      ))}
                      {provided.placeholder}
                    </tbody>
                  )}
                </Droppable>
              </table>
            </DragDropContext>
          )}
        </div>

        {/* Matching Logic */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-bold text-[#0C3547] mb-3 flex items-center gap-2"><ChevronDown size={16} /> How Matching Works</h3>
          <ol className="text-sm text-gray-600 space-y-1.5 list-decimal list-inside">
            <li><strong>Country + Language</strong> — most specific match (highest priority wins)</li>
            <li><strong>Country only</strong> — matches by country code, any language</li>
            <li><strong>Language only</strong> — matches by language, no country codes set</li>
            <li><strong>Default</strong> — no country codes and no languages set (catch-all fallback)</li>
          </ol>
        </div>

        {/* Test panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-bold text-[#0C3547] mb-4">Test Pricing Lookup</h3>
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Country Code</label>
              <input className="border border-gray-300 rounded-md px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
                placeholder="e.g. IL" value={testCountry} onChange={(e) => setTestCountry(e.target.value.toUpperCase())} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Language</label>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
                value={testLang} onChange={(e) => setTestLang(e.target.value)}>
                {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
              </select>
            </div>
            <button onClick={runTest} disabled={testLoading}
              className="bg-[#0C3547] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#0a2d3e] disabled:opacity-60 transition-colors">
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