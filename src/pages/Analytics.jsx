import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";

export default function Analytics() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await base44.entities.IQResult.list('-created_date', 10000);
        setResults(data || []);
      } catch (e) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const total        = results.length;
  const withEmail    = results.filter(r => r.email && r.email.trim() !== "").length;
  const withScore    = results.filter(r => r.score != null).length;

  // Funnel steps derived from IQResult entity
  const funnelSteps = [
    { label: "Test Completed",     count: total,     color: "#0C3547" },
    { label: "Email Collected",    count: withEmail,  color: "#1abc9c" },
    { label: "Score Calculated",   count: withScore,  color: "#2980b9" },
  ];

  const topCount = total || 1;

  // Score distribution
  const scoreBuckets = [
    { label: "< 85",    min: 0,   max: 84  },
    { label: "85–99",   min: 85,  max: 99  },
    { label: "100–114", min: 100, max: 114 },
    { label: "115–129", min: 115, max: 129 },
    { label: "130+",    min: 130, max: 999 },
  ].map(b => ({
    ...b,
    count: results.filter(r => r.score >= b.min && r.score <= b.max).length,
  }));

  const maxBucket = Math.max(...scoreBuckets.map(b => b.count), 1);

  const avgScore = total > 0
    ? Math.round(results.reduce((sum, r) => sum + (r.score || 0), 0) / total)
    : null;

  const conversionRate = total > 0 && withEmail > 0
    ? ((withEmail / total) * 100).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/Home">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/6feaa6fe0_aiq_academic_iq_test_logo.svg"
              alt="Academic IQ Test"
              className="h-10 w-10 object-contain"
            />
          </Link>
          <h1 className="text-lg font-bold text-[#0C3547]">Analytics Dashboard</h1>
          <div />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {loading ? (
          <div className="text-center text-gray-400 py-20 text-lg">Loading...</div>
        ) : (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label: "Tests Completed",   value: total },
                { label: "Emails Collected",  value: withEmail },
                { label: "Avg IQ Score",       value: avgScore ?? "—" },
                { label: "Email Capture Rate", value: conversionRate ? `${conversionRate}%` : "—" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
                  <p className="text-3xl font-black text-[#F5921B]">{value}</p>
                  <p className="text-sm text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Funnel */}
            <h2 className="text-xl font-bold text-[#0C3547] mb-4">Conversion Funnel</h2>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-10">
              {funnelSteps.map((step, idx) => {
                const pct = Math.min(100, (step.count / topCount) * 100);
                const dropOff = idx > 0 ? funnelSteps[idx - 1].count - step.count : 0;
                const dropPct = idx > 0 && funnelSteps[idx - 1].count > 0
                  ? ((dropOff / funnelSteps[idx - 1].count) * 100).toFixed(1)
                  : null;
                return (
                  <div key={step.label} className={`px-6 py-5 ${idx !== funnelSteps.length - 1 ? "border-b border-gray-100" : ""}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ backgroundColor: step.color }}
                        >
                          {idx + 1}
                        </span>
                        <span className="text-sm font-semibold text-[#0C3547]">{step.label}</span>
                        {dropPct && (
                          <span className="text-xs text-red-400 bg-red-50 px-2 py-0.5 rounded-full">
                            −{dropPct}% drop-off
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-700">{step.count.toLocaleString()}</span>
                        <span className="text-xs text-gray-400 w-12 text-right">{pct.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, backgroundColor: step.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Score Distribution */}
            <h2 className="text-xl font-bold text-[#0C3547] mb-4">IQ Score Distribution</h2>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-end gap-3 h-40">
                {scoreBuckets.map(b => {
                  const heightPct = (b.count / maxBucket) * 100;
                  return (
                    <div key={b.label} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs font-bold text-gray-600">{b.count}</span>
                      <div className="w-full rounded-t-md transition-all duration-700" style={{ height: `${Math.max(heightPct, 2)}%`, backgroundColor: "#0C3547" }} />
                      <span className="text-xs text-gray-400 text-center">{b.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}