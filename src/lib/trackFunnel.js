import { base44 } from "@/api/base44Client";

// Get or create a session ID for anonymous tracking
function getSessionId() {
  let id = sessionStorage.getItem("funnel_session_id");
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem("funnel_session_id", id);
  }
  return id;
}

export function trackFunnel(eventName, params = {}) {
  try {
    base44.entities.FunnelEvent.create({
      event_name: eventName,
      session_id: getSessionId(),
    });
    base44.analytics.track({ eventName });
    // Send to Google Analytics
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
  } catch (_) {}
}