import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { format } from "date-fns";
import { base44 } from "@/api/base44Client";

export default function Info() {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const score = location.state?.score || urlParams.get("score");
  const emailFromUrl = location.state?.email || urlParams.get("email") || "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [purpose, setPurpose] = useState("");

  const isValid = firstName.trim() && lastName.trim() && age && gender && purpose;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    const serialNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
    const date = format(new Date(), "MMMM dd, yyyy");
    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    // Brevo: track payment event with full details (fire-and-forget)
    const email = emailFromUrl;
    const language = localStorage.getItem("selectedLanguage") || "en";
    const baseUrl = window.location.origin;
    const certificateUrl = `${baseUrl}/Certificate`;
    const reportUrl = `${baseUrl}/Results`;
    if (email) {
      base44.functions.invoke("trackBrevoEvent", {
        eventName: "payment",
        email,
        properties: {
          name: fullName,
          iq_score: score,
          language,
          certificate_url: certificateUrl,
          report_url: reportUrl,
        }
      }).catch(() => {});
    }

    navigate("/Thankyou", { state: { name: fullName, score, serialNumber, date } });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
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

      <div className="flex flex-col items-center justify-center flex-1 px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Your payment is <span className="text-[#F5921B]">complete</span>
          </h1>
          <p className="text-gray-500 mt-2">Please submit your details to view your results</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-[#dce8f5] rounded-xl p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            />
            <input
              type="number"
              placeholder="Age"
              min="5"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            >
              <option value="" disabled>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not">Prefer not to say</option>
            </select>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
            >
              <option value="" disabled>Purpose of taking the IQ test</option>
              <option value="curiosity">Personal curiosity</option>
              <option value="academic">Academic purposes</option>
              <option value="career">Career assessment</option>
              <option value="fun">Just for fun</option>
              <option value="other">Other</option>
            </select>
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full font-bold py-3 rounded-md text-sm transition-colors ${isValid ? "bg-[#F5921B] hover:bg-[#e0830f] text-white" : "bg-[#f5c07b] text-white cursor-not-allowed"}`}
            >
              Get My IQ Result
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-400 mt-6 text-center">
          * All personal information is confidential and will never be shared with third parties
        </p>
      </div>
    </div>
  );
}