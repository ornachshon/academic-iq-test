import jwt from "npm:jsonwebtoken@9.0.2";

Deno.serve(async (req) => {
  try {
    const body = await req.text();

    const WEBHOOK_PUBLIC_KEY = Deno.env.get("PAYMENTS_BY_WIX_WEBHOOK_PUBLIC_KEY");
    if (!WEBHOOK_PUBLIC_KEY) {
      console.error("PAYMENTS_BY_WIX_WEBHOOK_PUBLIC_KEY not set");
      return new Response("Missing public key", { status: 500 });
    }

    // Step 1: Verify JWT signature - fail closed if verification fails
    const rawPayload = jwt.verify(body, WEBHOOK_PUBLIC_KEY, { algorithms: ["RS256"] });

    // Step 2: Parse double-nested JSON
    const event = JSON.parse(rawPayload.data);
    const eventData = JSON.parse(event.data);

    if (event.eventType === "wix.ecom.v1.order_approved") {
      const order = eventData.actionEvent.body.order;
      console.log("Order approved - orderId:", order.id, "checkoutId:", order.checkoutId, "email:", order.buyerInfo?.email, "amount:", order.priceSummary?.total?.amount, order.currency);
      // Future: update IQResult, trigger emails, etc.
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("wix-payments-webhook error:", error.message);
    return new Response("Error", { status: 500 });
  }
});