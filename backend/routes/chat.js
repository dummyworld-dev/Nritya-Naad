const express = require("express");
const router = express.Router();
const knowledge = require("../data/chatKnowledge.json");

const SYSTEM =
  "You are NrityaNaad, a friendly expert on Indian classical dance, music (ragas, talas, swaras), and related culture. Answer clearly; stay under about 180 words unless the user asks for more. If they misspell forms (e.g. katthak, bhrtnatyam), infer the correct form and help them. Vary your wording; do not repeat the same boilerplate every time. If unsure, say so briefly.";

const DEFAULT_GROQ_MODELS = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"];

function normalizeForMatch(text) {
  let s = (text || "").toLowerCase();
  s = s.replace(/\bkatthak\b|\bkataak\b/g, "kathak");
  s = s.replace(/\bkatak\b/g, "kathak");
  s = s.replace(/\bbhrtnatyam\b|\bbharatnatyam\b/g, "bharatanatyam");
  s = s.replace(/\bleran\b|\bleanr\b|\blearnn\b/g, "learn");
  s = s.replace(/\bi want to earn\b/g, "i want to learn");
  s = s.replace(/\bhow to earn\b/g, "how to learn");
  return s;
}

function localReply(text) {
  const q = normalizeForMatch(text);
  for (const row of knowledge) {
    if (row.keywords.some((k) => q.includes(k.toLowerCase()))) {
      return row.answer;
    }
  }
  return "I focus on Indian classical dance, music, and culture. Try asking about mudras, ragas, talas, how to learn Kathak or Bharatanatyam, or any major form. If Groq is configured in backend/.env, restart the server (node server.js) so GROQ_API_KEY loads.";
}

function openAiStyleMessages(message, history) {
  const h = history
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content }));
  return [{ role: "system", content: SYSTEM }, ...h, { role: "user", content: message.trim() }];
}

function groqModelList() {
  const fromEnv = process.env.GROQ_MODEL?.trim();
  if (fromEnv) {
    return fromEnv.split(/[,\s]+/).map((s) => s.trim()).filter(Boolean);
  }
  return DEFAULT_GROQ_MODELS;
}

async function callGroq(message, history) {
  const key = process.env.GROQ_API_KEY?.trim();
  if (!key) return { reply: null, error: "GROQ_API_KEY missing" };

  const messages = openAiStyleMessages(message, history);
  let lastErr = "Unknown Groq error";

  for (const model of groqModelList()) {
    try {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: 600,
          temperature: 0.75,
        }),
      });
      const data = await r.json();
      if (!r.ok) {
        lastErr = data?.error?.message || `${r.status} ${r.statusText}`;
        continue;
      }
      const reply = data.choices?.[0]?.message?.content?.trim();
      if (reply) return { reply, error: null, model };
      lastErr = "Empty reply from Groq";
    } catch (e) {
      lastErr = e.message || String(e);
    }
  }

  return { reply: null, error: lastErr };
}

async function callOpenAI(message, history) {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) return null;
  const messages = openAiStyleMessages(message, history);
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data?.error?.message || r.statusText);
  return data.choices?.[0]?.message?.content?.trim() || null;
}

async function callGemini(message, history) {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) return null;
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const contents = [
    ...history
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-10)
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    { role: "user", parts: [{ text: message.trim() }] },
  ];

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM }] },
      contents,
      generationConfig: { maxOutputTokens: 600, temperature: 0.7 },
    }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data?.error?.message || r.statusText);
  const parts = data.candidates?.[0]?.content?.parts;
  const text = parts?.map((p) => p.text).join("")?.trim();
  return text || null;
}

router.post("/", async (req, res) => {
  const { message, history = [] } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message required" });
  }

  const hasGroq = !!process.env.GROQ_API_KEY?.trim();
  const hasOpenAI = !!process.env.OPENAI_API_KEY?.trim();
  const hasGemini = !!process.env.GEMINI_API_KEY?.trim();

  if (!hasGroq && !hasOpenAI && !hasGemini) {
    return res.json({ reply: localReply(message), source: "local" });
  }

  try {
    let reply = null;
    let source = "local_fallback";
    let groqDetail = null;

    if (hasGroq) {
      const g = await callGroq(message, history);
      groqDetail = g.error;
      if (g.reply) {
        return res.json({ reply: g.reply, source: "groq", model: g.model });
      }
    }

    if (!reply && hasOpenAI) {
      try {
        reply = await callOpenAI(message, history);
        if (reply) source = "openai";
      } catch (e) {
        reply = null;
      }
    }
    if (!reply && hasGemini) {
      try {
        reply = await callGemini(message, history);
        if (reply) source = "gemini";
      } catch (e) {
        reply = null;
      }
    }

    if (reply) {
      return res.json({ reply, source });
    }

    return res.json({
      reply: localReply(message),
      source: "local_fallback",
      warning: hasGroq
        ? `Groq failed: ${groqDetail || "unknown"}. Using curated answer — check key and models in console.groq.com.`
        : "All configured AI providers failed; showing curated answer.",
    });
  } catch (e) {
    return res.json({
      reply: localReply(message),
      source: "local_fallback",
      warning: String(e.message),
    });
  }
});

module.exports = router;
