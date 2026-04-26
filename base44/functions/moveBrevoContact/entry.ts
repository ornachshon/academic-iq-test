Deno.serve(async (req) => {
  try {
    const { email } = await req.json();

    const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
    if (!BREVO_API_KEY) {
      return Response.json({ error: "BREVO_API_KEY not set" }, { status: 500 });
    }

    if (!email) {
      return Response.json({ error: "email is required" }, { status: 400 });
    }

    const headers = { "Content-Type": "application/json", "api-key": BREVO_API_KEY };
    const body = JSON.stringify({ emails: [email] });

    // Remove from list 7 and add to list 9 in parallel
    const [removeRes, addRes] = await Promise.all([
      fetch("https://api.brevo.com/v3/contacts/lists/7/contacts/remove", { method: "POST", headers, body }),
      fetch("https://api.brevo.com/v3/contacts/lists/9/contacts/add", { method: "POST", headers, body }),
    ]);

    const removeText = await removeRes.text();
    const addText = await addRes.text();

    console.log("Remove from list 7:", removeRes.status, removeText);
    console.log("Add to list 9:", addRes.status, addText);

    return Response.json({ success: true });
  } catch (error) {
    console.error("moveBrevoContact error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});