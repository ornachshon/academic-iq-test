import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const WIX_API_KEY = Deno.env.get("PAYMENTS_BY_WIX_API_KEY");
const WIX_SITE_ID = Deno.env.get("PAYMENTS_BY_WIX_SITE_ID");

Deno.serve(async (req) => {
  try {
    const { price, currency, score, email } = await req.json();

    const origin = req.headers.get("Origin") || "https://academiciqtest.base44.app";

    // Build the Info page URL with score + email as query params (Wix redirects here after payment)
    const infoUrl = `${origin}/Info?score=${encodeURIComponent(score || "")}&email=${encodeURIComponent(email || "")}`;
    const homeUrl = `${origin}/Home`;

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
                name: "IQ Evaluation Report & Certificate",
                quantity: 1,
                price: String(price || "9.99"),
              },
            ],
          },
          callbackUrls: {
            thankYouPageUrl: infoUrl,
            postFlowUrl: homeUrl,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Wix API error:", JSON.stringify(data));
      return Response.json({ error: data.message || "Failed to create checkout" }, { status: response.status });
    }

    console.log("Checkout session created:", data.checkoutSession?.id);
    return Response.json({ redirectUrl: data.checkoutSession?.redirectUrl });

  } catch (error) {
    console.error("createCheckout error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});