Deno.serve(async (req) => {
  try {
    const { eventName, email, properties } = await req.json();

    const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
    if (!BREVO_API_KEY) {
      console.error("BREVO_API_KEY is not set");
      return Response.json({ error: "BREVO_API_KEY not set" }, { status: 500 });
    }

    if (!email) {
      return Response.json({ error: "email is required" }, { status: 400 });
    }

    // --- STEP 1: Upsert contact with attributes FIRST ---
    const UTM_ATTR_KEYS = ['UTM_SOURCE', 'UTM_MEDIUM', 'UTM_CAMPAIGN', 'UTM_TERM', 'UTM_CONTENT', 'GCLID'];
    const utmAttrs = {};
    UTM_ATTR_KEYS.forEach(key => {
      if (properties?.[key]) utmAttrs[key] = properties[key];
    });

    const attributes = {
      ...(properties?.iq_score !== undefined ? { IQ_SCORE: properties.iq_score } : {}),
      ...(properties?.result_url ? { RESULT_URL: properties.result_url } : {}),
      ...(properties?.language ? { LANGUAGE: properties.language } : {}),
      ...utmAttrs,
    };

    const contactBody = { email, attributes, updateEnabled: true };
    console.log("Brevo upsert contact request body:", JSON.stringify(contactBody));

    const contactResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": BREVO_API_KEY },
      body: JSON.stringify(contactBody),
    });

    const contactText = await contactResponse.text();
    console.log("Brevo upsert contact response:", contactResponse.status, contactText);

    // If POST failed with 409 (already exists), fallback to PUT
    if (contactResponse.status === 409) {
      const putBody = { attributes };
      console.log("Contact exists, falling back to PUT:", JSON.stringify(putBody));
      const putResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "api-key": BREVO_API_KEY },
        body: JSON.stringify(putBody),
      });
      const putText = await putResponse.text();
      console.log("Brevo PUT contact response:", putResponse.status, putText);
    }

    // --- STEP 2: Track the event ---
    const eventPayload = {
      event_name: eventName,
      identifiers: { email_id: email },
      event_date: new Date().toISOString(),
    };

    if (properties && Object.keys(properties).length > 0) {
      eventPayload.event_properties = properties;
    }

    console.log("Brevo track event request body:", JSON.stringify(eventPayload));

    const eventResponse = await fetch("https://api.brevo.com/v3/events", {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": BREVO_API_KEY },
      body: JSON.stringify(eventPayload),
    });

    const eventText = await eventResponse.text();
    console.log("Brevo track event response:", eventResponse.status, eventText);

    if (!eventResponse.ok) {
      console.error("Brevo event API error:", eventText);
      // Don't fail - contact was already upserted
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("trackBrevoEvent error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});