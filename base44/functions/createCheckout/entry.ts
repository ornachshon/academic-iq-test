import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const origin = req.headers.get("Origin") || "https://your-app.base44.app";
    const { score, email } = await req.json();

    const WIX_API_KEY = Deno.env.get("PAYMENTS_BY_WIX_API_KEY");
    const WIX_SITE_ID = Deno.env.get("PAYMENTS_BY_WIX_SITE_ID");

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
                name: "IQ Test Results & Certificate",
                quantity: 1,
                price: "4.99",
              },
            ],
          },
          callbackUrls: {
            postFlowUrl: `${origin}/Home`,
            thankYouPageUrl: `${origin}/Certificate`,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Wix API error:", JSON.stringify(data));
      return Response.json({ error: data.message || "Failed to create checkout" }, { status: response.status });
    }

    return Response.json({ redirectUrl: data.checkoutSession.redirectUrl });
  } catch (error) {
    console.error("createCheckout error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});