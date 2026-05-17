import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    // Use service role to bypass RLS
    const results = await base44.asServiceRole.entities.IQResult.filter({ email });

    if (!results || results.length === 0) {
      return Response.json({ result: null });
    }

    // Return the most recent result
    const latest = results.sort((a, b) => new Date(b.created_date) - new Date(a.created_date))[0];
    return Response.json({ result: { id: latest.id, score: latest.score, email: latest.email } });
  } catch (error) {
    console.error('getResultByEmail error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});