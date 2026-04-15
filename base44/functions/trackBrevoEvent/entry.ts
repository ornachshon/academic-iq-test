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
    const UTM_ATTR_KEYS = ['UTM_SOURCE', 'UTM_MEDIUM', 'UTM_CAMPAIGN', 'UTM_TERM', 'UTM_CONTENT', 'GCLID'];
    const utmAttrs = {};
    UTM_ATTR_KEYS.forEach(key => {
      if (properties?.[key]) utmAttrs[key] = properties[key];
    });

    if (email) {
      const attributes = {
        ...(properties?.iq_score !== undefined ? { IQ_SCORE: properties.iq_score } : {}),
        ...(properties?.result_url ? { RESULT_URL: properties.result_url } : {}),
        ...(properties?.language ? { LANGUAGE: properties.language } : {}),
        ...utmAttrs,
      };

      // First try to create the contact (handles new contacts)
      const createResponse = await fetch(`https://api.brevo.com/v3/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": BREVO_API_KEY },
        body: JSON.stringify({ email, attributes, updateEnabled: true }),
      });

      const createText = await createResponse.text();
      console.log("Brevo create/update contact response:", createResponse.status, createText);

      // If contact already exists (409), update via PUT
      if (createResponse.status === 409) {
        const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", "api-key": BREVO_API_KEY },
          body: JSON.stringify({ attributes }),
        });
        const updateText = await updateResponse.text();
        console.log("Brevo PUT contact response:", updateResponse.status, updateText);
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("trackBrevoEvent error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});