import { createClientFromRequest } from "npm:@base44/sdk@0.8.31";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { priceAmount, priceCurrency, email, score, resultId, locale } = await req.json();

    const WIX_API_KEY = Deno.env.get("PAYMENTS_BY_WIX_API_KEY");
    const WIX_SITE_ID = Deno.env.get("PAYMENTS_BY_WIX_SITE_ID");

    if (!WIX_API_KEY || !WIX_SITE_ID) {
      console.error("Missing Wix Payments configuration");
      return Response.json({ error: "Payment configuration error" }, { status: 500 });
    }

    const origin = req.headers.get("Origin") || "https://academiciqtest.com";
    const price = (Number(priceAmount) || 9.99).toFixed(2);

    const queryParams = new URLSearchParams({
      score: String(score || ""),
      email: email || "",
      resultId: resultId || "",
    }).toString();

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
            items: [
              {
                name: "IQ Evaluation & Certificate",
                quantity: 1,
                price: price,
              },
            ],
            customerInfo: email ? { email } : undefined,
          },
          callbackUrls: {
            postFlowUrl: origin,
            thankYouPageUrl: `${origin}/Info?${queryParams}`,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Wix checkout error:", JSON.stringify(data));
      return Response.json({ error: data.message || "Failed to create checkout" }, { status: 500 });
    }

    console.log("Wix checkout session created:", data.checkoutSession?.id);
    return Response.json({ redirectUrl: data.checkoutSession.redirectUrl });
  } catch (error) {
    console.error("create-checkout error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});