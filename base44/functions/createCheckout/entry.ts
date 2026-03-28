import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    // Allow unauthenticated users (public funnel)

    const body = await req.json();
    const { score, email } = body;

    const WIX_API_KEY = Deno.env.get("PAYMENTS_BY_WIX_API_KEY");
    const WIX_SITE_ID = Deno.env.get("PAYMENTS_BY_WIX_SITE_ID");

    // Derive base URL from the Origin header
    const origin = req.headers.get("origin") || req.headers.get("Origin") || "https://app.base44.com";

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
                name: "IQ Evaluation Score + Certificate + Report",
                quantity: 1,
                price: "4.99",
              },
            ],
          },
          callbackUrls: {
            postFlowUrl: `${origin}/Home`,
            thankYouPageUrl: `${origin}/Info?score=${encodeURIComponent(score || "")}&email=${encodeURIComponent(email || "")}`,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Wix API error:", JSON.stringify(data));
      return Response.json(
        { error: data?.message || "Failed to create checkout session" },
        { status: response.status }
      );
    }

    const { redirectUrl, id } = data.checkoutSession;
    return Response.json({ redirectUrl, checkoutSessionId: id });

  } catch (error) {
    console.error("createCheckout error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});