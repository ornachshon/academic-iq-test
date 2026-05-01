import Stripe from "npm:stripe@14.21.0";
import { createClientFromRequest } from "npm:@base44/sdk@0.8.25";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email, score, priceAmount, priceCurrency, resultId } = await req.json();

    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    if (!STRIPE_SECRET_KEY) {
      return Response.json({ error: "STRIPE_SECRET_KEY not set" }, { status: 500 });
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY);

    const origin = req.headers.get("Origin") || "https://academiciqtest.com";
    const successUrl = `${origin}/Info?session_id={CHECKOUT_SESSION_ID}&score=${encodeURIComponent(score || "")}&email=${encodeURIComponent(email || "")}`;
    const cancelUrl = `${origin}/Checkout`;

    // Amount in smallest currency unit (cents for USD, etc.)
    const unitAmount = Math.round((priceAmount || 9.99) * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: (priceCurrency || "usd").toLowerCase(),
            unit_amount: unitAmount,
            product_data: {
              name: "IQ Evaluation & Certificate",
              description: "Full IQ score, personalized certificate, and detailed analytical report",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        score: String(score || ""),
        email: email || "",
        resultId: resultId || "",
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    console.log("Stripe session created:", session.id, "for email:", email);
    return Response.json({ url: session.url });
  } catch (error) {
    console.error("createStripeCheckout error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});