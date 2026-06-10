import Stripe from "npm:stripe@17.3.1";

Deno.serve(async (req) => {
  try {
    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");

    if (!STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY not set");
      return Response.json({ received: true, warning: "STRIPE_SECRET_KEY not set" }, { status: 200 });
    }

    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    let event;

    if (webhookSecret && signature) {
      // Verify webhook signature if secret is set
      const stripe = new Stripe(STRIPE_SECRET_KEY);
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } else {
      // No webhook secret set — parse raw body (less secure, OK for testing)
      event = JSON.parse(body);
    }

    console.log("Stripe event received:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.customer_details?.email || session.customer_email;

      if (!email) {
        console.error("No email found in session:", session.id);
        return Response.json({ received: true });
      }

      console.log("Processing payment for email:", email);

      if (!BREVO_API_KEY) {
        console.error("BREVO_API_KEY not set — skipping Brevo actions");
        return Response.json({ received: true });
      }

      // Send receipt email via Brevo
      const score = session.metadata?.score || "";
      const amountTotal = session.amount_total;
      const currency = (session.currency || "usd").toUpperCase();
      const formattedAmount = amountTotal ? `${(amountTotal / 100).toFixed(2)} ${currency}` : "";

      const receiptRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": BREVO_API_KEY },
        body: JSON.stringify({
          sender: { name: "Academic IQ Test", email: "support@academiciqtest.com" },
          to: [{ email }],
          subject: "Your Academic IQ Test – Payment Receipt",
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
              <div style="background: #0C3547; padding: 24px; text-align: center;">
                <img src="https://media.base44.com/images/public/69b1aedc5a0abb358cd40ec0/cbc52774d_AIQlogo-Square.png" alt="Academic IQ Test" style="height: 60px;" />
              </div>
              <div style="padding: 32px;">
                <h2 style="color: #0C3547;">Payment Receipt</h2>
                <p>Thank you for your purchase! Here is your receipt summary:</p>
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                  <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px 0; color: #555;">Product</td>
                    <td style="padding: 10px 0; text-align: right; font-weight: bold;">Academic IQ Test – Full Report & Certificate</td>
                  </tr>
                  ${score ? `<tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px 0; color: #555;">Your IQ Score</td>
                    <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #F5921B; font-size: 20px;">${score}</td>
                  </tr>` : ""}
                  ${formattedAmount ? `<tr>
                    <td style="padding: 10px 0; color: #555;">Amount Paid</td>
                    <td style="padding: 10px 0; text-align: right; font-weight: bold;">${formattedAmount}</td>
                  </tr>` : ""}
                </table>
                <p style="margin-top: 24px;">You can now access your detailed results and download your certificate by visiting the website.</p>
                <p style="color: #888; font-size: 13px; margin-top: 32px;">If you have any questions, please contact us at support@academiciqtest.com</p>
              </div>
              <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #aaa;">
                © Academic IQ Test. All rights reserved.
              </div>
            </div>
          `
        })
      });
      const receiptText = await receiptRes.text();
      console.log("Receipt email sent:", receiptRes.status, receiptText);

      const headers = { "Content-Type": "application/json", "api-key": BREVO_API_KEY };
      const emailBody = JSON.stringify({ emails: [email] });

      // Remove from list 7, add to list 9 in parallel
      const [removeRes, addRes] = await Promise.all([
        fetch("https://api.brevo.com/v3/contacts/lists/7/contacts/remove", {
          method: "POST",
          headers,
          body: emailBody,
        }),
        fetch("https://api.brevo.com/v3/contacts/lists/9/contacts/add", {
          method: "POST",
          headers,
          body: emailBody,
        }),
      ]);

      const removeText = await removeRes.text();
      const addText = await addRes.text();

      console.log("Remove from list 7:", removeRes.status, removeText);
      console.log("Add to list 9:", addRes.status, addText);
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("stripeWebhook error:", error.message);
    // Always return 200 so Stripe doesn't retry — log the error for debugging
    return Response.json({ received: true, error: error.message }, { status: 200 });
  }
});