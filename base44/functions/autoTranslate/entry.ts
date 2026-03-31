import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { key, englishText, targetLanguages, section, notes } = await req.json();

    if (!key || !englishText || !targetLanguages?.length) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const languageNames = { ja: "Japanese" };
    const results = {};

    for (const lang of targetLanguages) {
      const langName = languageNames[lang] || lang;
      const prompt = `Translate the following website UI text from English to ${langName}.
This is for an IQ test website called "Academic IQ Test".
Keep the tone professional, clear and engaging.
Preserve any formatting (line breaks, punctuation style).
Return ONLY the translated text, nothing else.
${notes ? `Context/notes: ${notes}` : ""}
${section ? `UI section: ${section}` : ""}

English text:
${englishText}`;

      const translated = await base44.asServiceRole.integrations.Core.InvokeLLM({ prompt });

      // Upsert the translation record
      const existing = await base44.asServiceRole.entities.Translation.filter({ key, language: lang });
      if (existing && existing.length > 0) {
        await base44.asServiceRole.entities.Translation.update(existing[0].id, {
          value: translated.trim(),
          section,
          notes
        });
      } else {
        await base44.asServiceRole.entities.Translation.create({
          key,
          language: lang,
          value: translated.trim(),
          section,
          notes
        });
      }

      results[lang] = translated.trim();
      console.log(`Translated [${key}] to ${lang}: ${translated.trim().substring(0, 60)}...`);
    }

    return Response.json({ success: true, results });
  } catch (error) {
    console.error("autoTranslate error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});