import React, { useState, useEffect } from "react";

const ADMIN_USER = "admin";
const ADMIN_PASS = "iq-admin-2025";
const SESSION_KEY = "admin_gate_auth";

export default function AdminPasswordGate({ children }) {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "true") {
      setAuthed(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setAuthed(true);
    } else {
      setError(true);
    }
  };

  if (authed) return children;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm space-y-5"
      >
        <h2 className="text-xl font-bold text-[#0C3547] text-center">Admin Access</h2>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Username</label>
          <input
            type="text"
            autoComplete="username"
            value={user}
            onChange={(e) => { setUser(e.target.value); setError(false); }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
          <input
            type="password"
            autoComplete="current-password"
            value={pass}
            onChange={(e) => { setPass(e.target.value); setError(false); }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5921B]"
          />
        </div>
        {error && <p className="text-red-500 text-xs text-center">Invalid username or password.</p>}
        <button
          type="submit"
          className="w-full bg-[#F5921B] text-white py-2.5 rounded-lg font-bold text-sm hover:bg-[#e0830f] transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}