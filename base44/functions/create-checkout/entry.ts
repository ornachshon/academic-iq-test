import { createClientFromRequest } from "npm:@base44/sdk@0.8.31";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { priceAmount, email, score, resultId } = body;

    const WIX_API_KEY = Deno.env.get("PAYMENTS_BY_WIX_API_KEY");
    const WIX_SITE_ID = Deno.env.get("PAYMENTS_BY_WIX_SITE_ID");

    if (!WIX_API_KEY || !WIX_SITE_ID) {
      console.error("PAYMENTS_BY_WIX_API_KEY or PAYMENTS_BY_WIX_SITE_ID not set");
      return Response.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Use Origin header for base URL (req.url contains wrong value)
    const origin = req.headers.get("Origin") || "https://academic-iq-test.base44.app";

    const response = await fetch(
      "https://www.wixapis.com/payments/platform/v1/checkout-sessions/construct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": WIX_API_KEY,
          "wix-site-id": WIX_SITE_ID,
        },
        body: JSON.stringify({
          cart: {
            items: [{
              name: "IQ Evaluation & Certificate",
              quantity: 1,
              price: String(priceAmount),
            }],
            customerInfo: {
              email: email || undefined,
            },
          },
          callbackUrls: {
            postFlowUrl: `${origin}/Home`,
            thankYouPageUrl: `${origin}/Info`,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Wix checkout error:", JSON.stringify(data));
      const errorMsg = data?.details?.applicationError?.description || "Failed to create checkout session";
      return Response.json({ error: errorMsg }, { status: 500 });
    }

    console.log("Wix checkout session created:", data.checkoutSession?.id, "for email:", email);
    return Response.json({ redirectUrl: data.checkoutSession.redirectUrl });
  } catch (error) {
    console.error("create-checkout error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});