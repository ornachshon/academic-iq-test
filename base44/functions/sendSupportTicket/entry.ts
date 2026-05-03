Deno.serve(async (req) => {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const brevoApiKey = Deno.env.get("BREVO_API_KEY");
    if (!brevoApiKey) {
      return Response.json({ error: "Missing Brevo API key" }, { status: 500 });
    }

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Academic IQ Test Support Form", email: "noreply@academiciqtest.com" },
        to: [{ email: "support@academiciqtest.com", name: "Support" }],
        replyTo: { email, name },
        subject: `New Support Ticket from ${name}`,
        htmlContent: `<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, "<br/>")}</p>`,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Brevo error:", err);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("sendSupportTicket error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});