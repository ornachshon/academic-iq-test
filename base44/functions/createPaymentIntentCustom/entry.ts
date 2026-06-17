import Stripe from "npm:stripe@14.21.0";
import { createClientFromRequest } from "npm:@base44/sdk@0.8.25";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { priceAmount, priceCurrency, email, score, resultId } = await req.json();

    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    if (!STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY not set");
      return Response.json({ error: "Server configuration error" }, { status: 500 });
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY);

    const ZERO_DECIMAL_CURRENCIES = ["jpy", "krw", "vnd", "clp", "gnf", "mga", "pyg", "rwf", "ugx", "xaf", "xof"];
    const currency = (priceCurrency || "usd").toLowerCase();
    const amount = ZERO_DECIMAL_CURRENCIES.includes(currency)
      ? Math.round(priceAmount || 990)
      : Math.round((priceAmount || 9.99) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
      metadata: {
        score: String(score || ""),
        email: email || "",
        resultId: resultId || "",
      },
      receipt_email: email || undefined,
    });

    const publishableKey = Deno.env.get("STRIPE_PUBLISHABLE_KEY");
    console.log("PaymentIntent created:", paymentIntent.id, "for email:", email);
    return Response.json({ clientSecret: paymentIntent.client_secret, publishableKey });
  } catch (error) {
    console.error("createPaymentIntentCustom error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});