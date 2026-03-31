import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

// Default fallback pricing
const DEFAULT_PRICE = {
  price: 19.99,
  original_price: 39.99,
  currency_code: "USD",
  currency_symbol: "$",
  region_name: "Default",
  country_code: "US"
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const body = await req.json().catch(() => ({}));
    const { language } = body;

    // Detect user's country from Cloudflare headers or similar
    const cfCountry = req.headers.get("cf-ipcountry") ||
                      req.headers.get("x-vercel-ip-country") ||
                      req.headers.get("x-country-code") ||
                      null;

    // Also try ip-api for more geo info
    let detectedCountry = cfCountry;
    let detectedCity = null;
    let detectedRegion = null;

    if (!detectedCountry) {
      // Try to get IP from headers
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                 req.headers.get("x-real-ip") ||
                 null;

      if (ip && ip !== "127.0.0.1" && ip !== "::1") {
        try {
          const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,countryCode,country,regionName,city`, {
            signal: AbortSignal.timeout(3000)
          });
          const geoData = await geoRes.json();
          if (geoData.status === "success") {
            detectedCountry = geoData.countryCode;
            detectedCity = geoData.city;
            detectedRegion = geoData.regionName;
          }
        } catch (_) {
          console.log("IP geo lookup failed, using default");
        }
      }
    }

    console.log(`Detected country: ${detectedCountry}, language: ${language}`);

    // Fetch all active pricing rules
    const rules = await base44.asServiceRole.entities.PricingRule.filter({ is_active: true });

    if (!rules || rules.length === 0) {
      console.log("No pricing rules found, returning default");
      return Response.json({
        ...DEFAULT_PRICE,
        detected_country: detectedCountry,
        detected_city: detectedCity
      });
    }

    // Sort by priority descending (higher priority first)
    const sorted = [...rules].sort((a, b) => (b.priority || 0) - (a.priority || 0));

    let matched = null;

    // Pass 1: Match by country code + language (most specific)
    if (detectedCountry && language) {
      matched = sorted.find(r =>
        r.country_codes?.includes(detectedCountry) &&
        r.languages?.includes(language) &&
        r.languages?.length > 0
      );
    }

    // Pass 2: Match by country code only
    if (!matched && detectedCountry) {
      matched = sorted.find(r =>
        r.country_codes?.includes(detectedCountry) &&
        (!r.languages || r.languages.length === 0)
      );
      // Also accept country match even if languages is set
      if (!matched) {
        matched = sorted.find(r => r.country_codes?.includes(detectedCountry));
      }
    }

    // Pass 3: Match by language only (no country codes set)
    if (!matched && language) {
      matched = sorted.find(r =>
        r.languages?.includes(language) &&
        (!r.country_codes || r.country_codes.length === 0)
      );
    }

    // Pass 4: Default rule (no country codes and no languages)
    if (!matched) {
      matched = sorted.find(r =>
        (!r.country_codes || r.country_codes.length === 0) &&
        (!r.languages || r.languages.length === 0)
      );
    }

    if (matched) {
      console.log(`Matched rule: ${matched.region_name}`);
      return Response.json({
        price: matched.price,
        original_price: matched.original_price || null,
        currency_code: matched.currency_code,
        currency_symbol: matched.currency_symbol,
        region_name: matched.region_name,
        detected_country: detectedCountry,
        detected_city: detectedCity,
        rule_id: matched.id
      });
    }

    // No match found
    console.log("No matching rule, returning default");
    return Response.json({
      ...DEFAULT_PRICE,
      detected_country: detectedCountry,
      detected_city: detectedCity
    });

  } catch (error) {
    console.error("getLocationPrice error:", error.message);
    return Response.json({ ...DEFAULT_PRICE, error: error.message });
  }
});