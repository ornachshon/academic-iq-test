import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";

export default function Info() {
  const navigate = useNavigate();
  const location = useLocation();
  const { score } = location.state || {};

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

    navigate("/Certificate", { state: { name: fullName, score, serialNumber, date } });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Your payment is <span className="text-[#F5921B]">complete</span>
        </h1>
        <p className="text-gray-500 mt-2">Please submit your details to view your results</p>
      </div>

      {/* Form card */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-[#dce8f5] rounded-xl p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
          />

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
          />

          {/* Age */}
          <input
            type="number"
            placeholder="Age"
            min="5"
            max="120"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
          />

          {/* Gender */}
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

          {/* Purpose */}
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

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full font-bold py-3 rounded-md text-sm transition-colors ${isValid ? "bg-[#F5921B] hover:bg-[#e0830f] text-white" : "bg-[#f5c07b] text-white cursor-not-allowed"}`}
          >
            Get My IQ Result
          </button>
        </div>
      </form>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 mt-6 text-center">
        * All personal information is confidential and will never be shared with third parties
      </p>
    </div>
  );
}