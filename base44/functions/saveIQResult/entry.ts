import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const { user_id, timestamp, score, correct_answers, total_questions, time_taken_seconds, answers, email, resultId } = body;

    // If resultId is provided, update the existing record with email
    if (resultId && email) {
      await base44.asServiceRole.entities.IQResult.update(resultId, { email });
      return Response.json({ success: true, id: resultId });
    }

    // Otherwise create a new record
    const saved = await base44.asServiceRole.entities.IQResult.create({
      user_id,
      timestamp,
      score,
      correct_answers,
      total_questions,
      time_taken_seconds,
      answers: answers || [],
      email: email || null,
    });

    return Response.json({ success: true, id: saved.id });
  } catch (error) {
    console.error('saveIQResult error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});