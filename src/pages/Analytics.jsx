import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Legend } from "recharts";

const FUNNEL_STEPS = [
  { key: "start_iq_test_clicked", label: "1. Start IQ Test Clicked", color: "#0C3547" },
  { key: "test_finished",         label: "2. Finished Test",          color: "#1a5c7a" },
  { key: "email_inserted",        label: "3. Email Inserted",         color: "#1abc9c" },
  { key: "payment_initiated",     label: "4. Payment Initiated",      color: "#f39c12" },
  { key: "payment_page_viewed",   label: "5. Payment Page Viewed",    color: "#e67e22" },
  { key: "payment_completed",     label: "6. Thank You Page",         color: "#27ae60" },
];

export default function Analytics() {
  const [counts, setCounts] = useState({});
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const events = await base44.entities.FunnelEvent.list('-created_date', 50000);
        const c = {};
        const byDay = {};
        (events || []).forEach(e => {
          c[e.event_name] = (c[e.event_name] || 0) + 1;
          // Build daily breakdown for line chart
          const day = e.created_date ? e.created_date.slice(0, 10) : null;
          if (day) {
            if (!byDay[day]) byDay[day] = { date: day, test_finished: 0, email_inserted: 0 };
            if (e.event_name === "test_finished") byDay[day].test_finished++;
            if (e.event_name === "email_inserted") byDay[day].email_inserted++;
          }
        });
        setCounts(c);
        // Sort days ascending
        const sorted = Object.values(byDay).sort((a, b) => a.date.localeCompare(b.date));
        setDailyData(sorted);
      } catch (e) {
        setCounts({});
        setDailyData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const topCount = counts["start_iq_test_clicked"] || 1;
  const startCount = counts["start_iq_test_clicked"] || 0;
  const completedCount = counts["payment_completed"] || 0;
  const conversionRate = startCount > 0 && completedCount > 0
    ? ((completedCount / startCount) * 100).toFixed(1)
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
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
              {[
                { label: "Test Starts",        value: startCount },
                { label: "Tests Finished",     value: counts["test_finished"] || 0 },
                { label: "Emails Collected",   value: counts["email_inserted"] || 0 },
                { label: "Payments Initiated", value: counts["payment_initiated"] || 0 },
                { label: "Payments Completed", value: completedCount },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
                  <p className="text-3xl font-black text-[#F5921B]">{value}</p>
                  <p className="text-sm text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-10">
              <h2 className="text-base font-bold text-[#0C3547] mb-4">Funnel Overview</h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={FUNNEL_STEPS.map(s => ({ name: s.label.replace(/^\d+\.\s*/, ""), count: counts[s.key] || 0, color: s.color }))} margin={{ top: 5, right: 10, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} angle={-35} textAnchor="end" interval={0} />
                  <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} allowDecimals={false} />
                  <Tooltip formatter={(value) => [value, "Events"]} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {FUNNEL_STEPS.map((step, idx) => (
                      <Cell key={idx} fill={step.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Overall conversion */}
            {conversionRate && (
              <div className="bg-white rounded-xl border border-gray-200 p-5 mb-10 text-center shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Overall Conversion Rate</p>
                <p className="text-4xl font-black text-[#27ae60]">{conversionRate}%</p>
                <p className="text-xs text-gray-400 mt-1">Start → Payment Completed</p>
              </div>
            )}

            {/* Funnel */}
            <h2 className="text-xl font-bold text-[#0C3547] mb-4">Conversion Funnel</h2>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {FUNNEL_STEPS.map((step, idx) => {
                const count = counts[step.key] || 0;
                const pct = startCount > 0 ? Math.min(100, (count / topCount) * 100) : 0;
                const prev = idx > 0 ? counts[FUNNEL_STEPS[idx - 1].key] || 0 : 0;
                const dropPct = idx > 0 && prev > 0
                  ? (((prev - count) / prev) * 100).toFixed(1)
                  : null;

                return (
                  <div
                    key={step.key}
                    className={`px-6 py-5 ${idx !== FUNNEL_STEPS.length - 1 ? "border-b border-gray-100" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-semibold text-[#0C3547]">{step.label}</span>
                        {dropPct !== null && Number(dropPct) > 0 && (
                          <span className="text-xs text-red-400 bg-red-50 px-2 py-0.5 rounded-full">
                            −{dropPct}% drop-off
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 ml-4 shrink-0">
                        <span className="text-sm font-bold text-gray-700">{count.toLocaleString()}</span>
                        {startCount > 0 && (
                          <span className="text-xs text-gray-400 w-12 text-right">{pct.toFixed(1)}%</span>
                        )}
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

            {startCount === 0 && (
              <p className="text-center text-gray-400 mt-8 text-sm">
                No funnel data yet. Events will appear here as users go through the flow.
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}