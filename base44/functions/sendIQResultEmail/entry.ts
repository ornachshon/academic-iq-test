import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// IQ label helper
function getIQLabel(score) {
  if (score >= 145) return { en: "Genius", ja: "天才" };
  if (score >= 130) return { en: "Highly Gifted", ja: "非常に優秀" };
  if (score >= 120) return { en: "Superior", ja: "優秀" };
  if (score >= 110) return { en: "Above Average", ja: "平均以上" };
  if (score >= 90)  return { en: "Average", ja: "平均" };
  if (score >= 80)  return { en: "Low Average", ja: "平均以下" };
  return { en: "Below Average", ja: "平均よりかなり低い" };
}

function getPercentile(score) {
  const z = (score - 100) / 15;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  const cdf = z >= 0 ? 1 - p : p;
  return Math.round(cdf * 100);
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const { event, data } = body;

    // We need email and score to send the email
    if (!data?.email || !data?.score) {
      return Response.json({ skipped: true, reason: "No email or score" });
    }

    const score = data.score;
    const correctAnswers = data.correct_answers || 0;
    const totalQuestions = data.total_questions || 30;
    const timeTakenSeconds = data.time_taken_seconds || 0;
    const timeTakenMin = Math.floor(timeTakenSeconds / 60);
    const timeTakenSec = timeTakenSeconds % 60;

    const label = getIQLabel(score);
    const percentile = getPercentile(score);

    // Detect language from event metadata (fallback to en)
    const lang = "en"; // emails in English by default

    const emailBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your IQ Test Results</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);max-width:560px;width:100%;">
          
          <!-- Header -->
          <tr>
            <td style="background:#0C3547;padding:28px 32px;text-align:center;">
              <img src="https://media.base44.com/images/public/69b1aedc5a0abb358cd40ec0/cbc52774d_AIQlogo-Square.png" alt="Academic IQ Test" width="60" style="border-radius:8px;margin-bottom:12px;display:block;margin-left:auto;margin-right:auto;" />
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">Your IQ Test Results Are Ready!</h1>
            </td>
          </tr>

          <!-- Score Card -->
          <tr>
            <td style="padding:32px 32px 16px;text-align:center;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:14px;">Your IQ Score</p>
              <div style="display:inline-block;background:#0C3547;color:#ffffff;border-radius:50%;width:100px;height:100px;line-height:100px;font-size:40px;font-weight:900;margin:0 auto 12px;text-align:center;">
                ${score}
              </div>
              <p style="margin:0;color:#F5921B;font-size:18px;font-weight:700;">${label.en}</p>
              <p style="margin:8px 0 0;color:#6b7280;font-size:13px;">You scored higher than <strong>${percentile}%</strong> of the population</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 32px;"><hr style="border:none;border-top:1px solid #e5e7eb;" /></td></tr>

          <!-- Stats -->
          <tr>
            <td style="padding:20px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="33%" style="text-align:center;padding:12px 8px;background:#f9fafb;border-radius:8px;">
                    <p style="margin:0;font-size:22px;font-weight:700;color:#0C3547;">${score}</p>
                    <p style="margin:4px 0 0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">IQ Score</p>
                  </td>
                  <td width="4%"></td>
                  <td width="33%" style="text-align:center;padding:12px 8px;background:#f9fafb;border-radius:8px;">
                    <p style="margin:0;font-size:22px;font-weight:700;color:#0C3547;">${correctAnswers}/${totalQuestions}</p>
                    <p style="margin:4px 0 0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Correct</p>
                  </td>
                  <td width="4%"></td>
                  <td width="33%" style="text-align:center;padding:12px 8px;background:#f9fafb;border-radius:8px;">
                    <p style="margin:0;font-size:22px;font-weight:700;color:#0C3547;">${timeTakenMin}m ${timeTakenSec}s</p>
                    <p style="margin:4px 0 0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Time Taken</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:8px 32px 32px;text-align:center;">
              <p style="margin:0 0 20px;color:#4b5563;font-size:14px;line-height:1.6;">
                To unlock your full detailed report, cognitive breakdown, and personalized certificate, complete your purchase below.
              </p>
              <a href="https://www.academiciqtest.com/Checkout" style="display:inline-block;background:#F5921B;color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:16px;font-weight:700;">Get My Full IQ Results</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:16px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:11px;">© ${new Date().getFullYear()} Academic IQ Test. All rights reserved.</p>
              <p style="margin:4px 0 0;color:#9ca3af;font-size:11px;">
                <a href="https://www.academiciqtest.com/Privacy_Policy" style="color:#9ca3af;">Privacy Policy</a> · 
                <a href="https://www.academiciqtest.com/Terms_Conditions" style="color:#9ca3af;">Terms & Conditions</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: data.email,
      subject: `Your IQ Score is ${score} — ${label.en}`,
      body: emailBody,
      from_name: "Academic IQ Test",
    });

    console.log(`IQ result email sent to ${data.email} (score: ${score})`);
    return Response.json({ success: true });

  } catch (error) {
    console.error("sendIQResultEmail error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});