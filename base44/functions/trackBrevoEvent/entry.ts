import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const { eventName, email, properties } = await req.json();

    const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");

    // Track the event
    const payload = {
      event_name: eventName,
      identifiers: { email_id: email },
      event_date: new Date().toISOString(),
    };

    if (properties && Object.keys(properties).length > 0) {
      payload.event_properties = properties;
    }

    const eventResponse = await fetch("https://api.brevo.com/v3/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!eventResponse.ok) {
      const err = await eventResponse.text();
      console.error("Brevo event API error:", err);
      return Response.json({ error: err }, { status: eventResponse.status });
    }

    // If iq_score is present, save it as a contact attribute in Brevo
    if (email && properties?.iq_score !== undefined) {
      const contactPayload = {
        email,
        attributes: {
          IQ_SCORE: properties.iq_score,
          ...(properties.result_url ? { RESULT_URL: properties.result_url } : {}),
          ...(properties.language ? { LANGUAGE: properties.language } : {}),
        },
        updateEnabled: true,
      };

      const contactResponse = await fetch(`https://api.brevo.com/v3/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify(contactPayload),
      });

      if (!contactResponse.ok) {
        const err = await contactResponse.text();
        console.error("Brevo contact update error:", err);
        // Don't fail the whole request, just log the error
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("trackBrevoEvent error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});