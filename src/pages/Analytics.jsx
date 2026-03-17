import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";

const FUNNEL_STEPS = [
  { key: "start_iq_test_clicked", label: "Start IQ Test Clicked", color: "#0C3547" },
  { key: "iq_test_started",       label: "Test Started",          color: "#1a5276" },
  { key: "test_finished",         label: "Test Finished",         color: "#2471a3" },
  { key: "test_abandoned",        label: "Test Abandoned",        color: "#e67e22" },
  { key: "assessment_completed",  label: "Assessment Completed",  color: "#2980b9" },
  { key: "email_inserted",        label: "Email Inserted",        color: "#1abc9c" },
  { key: "payment_initiated",     label: "Payment Initiated",     color: "#f39c12" },
  { key: "payment_completed",     label: "Payment Completed",     color: "#27ae60" },
];

export default function Analytics() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const result = await base44.analytics.getEvents({ limit: 10000 });
        setEvents(result || []);
      } catch (e) {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // Count occurrences per event name
  const counts = {};
  events.forEach(e => {
    counts[e.event_name] = (counts[e.event_name] || 0) + 1;
  });

  const firstStepCount = counts["start_iq_test_clicked"] || 0;

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
                { label: "Test Starts",       value: counts["start_iq_test_clicked"] || 0 },
                { label: "Emails Collected",  value: counts["email_inserted"] || 0 },
                { label: "Payments Initiated",value: counts["payment_initiated"] || 0 },
                { label: "Payments Completed",value: counts["payment_completed"] || 0 },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
                  <p className="text-3xl font-black text-[#F5921B]">{value}</p>
                  <p className="text-sm text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Conversion rate */}
            {firstStepCount > 0 && counts["payment_completed"] > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-5 mb-10 text-center shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Overall Conversion Rate</p>
                <p className="text-4xl font-black text-[#27ae60]">
                  {((counts["payment_completed"] / firstStepCount) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-gray-400 mt-1">Start → Payment Completed</p>
              </div>
            )}

            {/* Funnel */}
            <h2 className="text-xl font-bold text-[#0C3547] mb-4">Conversion Funnel</h2>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {FUNNEL_STEPS.map((step, idx) => {
                const count = counts[step.key] || 0;
                const pct = firstStepCount > 0 ? Math.min(100, (count / firstStepCount) * 100) : 0;
                return (
                  <div key={step.key} className={`px-6 py-4 ${idx !== FUNNEL_STEPS.length - 1 ? "border-b border-gray-100" : ""}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-400 w-5">{idx + 1}</span>
                        <span className="text-sm font-semibold text-[#0C3547]">{step.label}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-gray-700">{count.toLocaleString()}</span>
                        {firstStepCount > 0 && (
                          <span className="text-xs text-gray-400 w-12 text-right">{pct.toFixed(1)}%</span>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: step.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}