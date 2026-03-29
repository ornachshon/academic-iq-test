import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: "support@academiciqtest.com",
      from_name: "Academic IQ Test Support",
      subject: `New Support Ticket from ${name}`,
      body: `<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, "<br/>")}</p>`,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("sendSupportTicket error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});