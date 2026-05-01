import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Mail, RefreshCw, XCircle, Shield, Star } from "lucide-react";

const Section = ({ icon: Icon, title, children }) => (
  <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
    <div className="flex items-center gap-3 mb-3">
      <div className="bg-[#F5921B]/10 p-2 rounded-lg">
        <Icon className="w-5 h-5 text-[#F5921B]" />
      </div>
      <h2 className="text-lg font-bold text-[#0C3547]">{title}</h2>
    </div>
    <div className="text-gray-600 text-sm space-y-2">{children}</div>
  </div>
);

export default function Support() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setLoading(true);
    setError("");
    try {
      await base44.functions.invoke("sendSupportTicket", { name, email, message });
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/Home">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b1aedc5a0abb358cd40ec0/6feaa6fe0_aiq_academic_iq_test_logo.svg"
                alt="Academic IQ Test"
                className="h-10 w-10 object-contain"
              />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-14">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-[#0C3547] mb-2">Customer Service</h1>
            <p className="text-gray-500">Everything you need to know about your purchase</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {/* Contact Us */}
            <Section icon={Mail} title="Contact Us">
              <p>Email: <a href="mailto:support@academiciqtest.com" className="text-[#F5921B] font-medium hover:underline">support@academiciqtest.com</a></p>
              <p>Response time: within 24 hours</p>
            </Section>

            {/* Refund Policy */}
            <Section icon={RefreshCw} title="Refund Policy">
              <p>Digital products are non-refundable once delivered.</p>
              <p>If a technical issue prevents access, contact us within 7 days for a full refund.</p>
            </Section>

            {/* Cancellation Policy */}
            <Section icon={XCircle} title="Cancellation Policy">
              <p>This is a one-time payment — no subscription, no cancellation needed.</p>
            </Section>

            {/* Privacy Policy */}
            <Section icon={Shield} title="Privacy Policy">
              <ul className="space-y-1">
                <li>• We collect email and payment information for order processing.</li>
                <li>• We do not sell personal data to third parties.</li>
                <li>• Payment is processed securely by Stripe.</li>
              </ul>
            </Section>

            {/* What's Included */}
            <Section icon={Star} title="What's Included">
              <ul className="space-y-1">
                <li>✓ IQ Evaluation Score</li>
                <li>✓ Printable IQ Certificate</li>
                <li>✓ Detailed Analysis Report</li>
              </ul>
            </Section>
          </div>

          {/* Contact Form */}
          <div className="border border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-bold text-[#0C3547] mb-1">Send us a message</h2>
            <p className="text-gray-500 text-sm mb-6">We'll get back to you within 24 hours.</p>

            {submitted ? (
              <div className="text-center bg-[#dce8f5] rounded-xl p-10">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-[#0C3547] mb-2">Message sent!</h3>
                <p className="text-gray-500">We'll get back to you at <span className="font-semibold">{email}</span> as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0C3547] mb-1">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0C3547]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0C3547] mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0C3547]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0C3547] mb-1">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0C3547] resize-y"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#F5921B] hover:bg-[#e0830f] text-white font-bold px-8 py-2.5 rounded-md text-sm transition-colors disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}