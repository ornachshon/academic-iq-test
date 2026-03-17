import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const events = await base44.asServiceRole.analytics.getEvents({ limit: 50000 });

    return Response.json({ events: events || [] });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});