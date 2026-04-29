import Stripe from "npm:stripe@17.3.1";

Deno.serve(async (req) => {
  try {
    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");

    if (!STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY not set");
      return Response.json({ error: "STRIPE_SECRET_KEY not set" }, { status: 500 });
    }
    if (!BREVO_API_KEY) {
      console.error("BREVO_API_KEY not set");
      return Response.json({ error: "BREVO_API_KEY not set" }, { status: 500 });
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
    return Response.json({ error: error.message }, { status: 400 });
  }
});