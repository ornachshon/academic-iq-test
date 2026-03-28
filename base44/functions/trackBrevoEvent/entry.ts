import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const { eventName, email } = await req.json();

    const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");

    const response = await fetch("https://api.brevo.com/v3/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        event_name: eventName,
        identifiers: { email_id: email },
        event_date: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Brevo API error:", err);
      return Response.json({ error: err }, { status: response.status });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("trackBrevoEvent error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});