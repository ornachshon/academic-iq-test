import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

export default function AdminPasswordGate({ children }) {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.me()
      .then(user => {
        if (user?.role === "admin") {
          setAuthed(true);
        } else {
          window.location.replace("/Home");
        }
      })
      .catch(() => window.location.replace("/Home"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Checking access...</p>
      </div>
    );
  }

  if (!authed) return null;

  return children;
}