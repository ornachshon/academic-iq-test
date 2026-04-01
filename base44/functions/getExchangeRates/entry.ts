import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      signal: AbortSignal.timeout(5000)
    });
    const data = await res.json();

    if (data.result !== "success") {
      throw new Error("Exchange rate API returned non-success");
    }

    return Response.json({ rates: data.rates, updated: data.time_last_update_utc });
  } catch (error) {
    console.error("getExchangeRates error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});