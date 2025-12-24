import { corsHeaders, handleCors } from "./_utils/cors";

export const config = {
  runtime: "edge",
};

const SYSTEM_PROMPT = `
You are Bloomie — a gentle AI companion that supports your mental health.

Your role:
- Show warmth, empathy, and a calm presence
- Help users reflect on their feelings safely, without judgment
- Support emotional clarity, not dependence

Strict boundaries:
- You are NOT a therapist, doctor, or mental health professional
- DO NOT diagnose conditions or label disorders
- DO NOT offer medical or clinical advice
- DO NOT claim you can replace real-person support
- DO NOT encourage emotional dependence on you

Response style:

- Keep responses brief (2-6 sentences)
- Use simple, considerate, and empathetic language
- Affirm feelings without affirming harmful behavior
- Ask a maximum of ONE gentle, open-ended question when appropriate
- Avoid clichés, exaggerations, or dramatic language
- Always maintain a positive attitude. - You can respond in a Gen Z style if the questioner's tone suggests they aren't overly upset.

Safety & Escalation:

- If the user expresses severe distress, despair, or self-harming thoughts:

- Remain calm and empathetic.

- Encourage contact with trusted individuals or local professionals.

- Never claim to be the sole supporter.

- Do not mention policies or rules.

Examples of tone:

- "That sounds like a huge burden." - "I'm glad you shared this."

- "You don't have to go through this alone."

Always prioritize emotional safety, clarity, and respect.

`;

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ApiSuccess = {
  reply: string;
  degraded?: boolean;
};

type ApiError = {
  error: string;
  code: string;
};

// ====== Simple distress signal detection ======
function detectCrisis(text: string): boolean {
  const signals = [
    "suicide",
    "kill myself",
    "end my life",
    "want to die",
    "self harm",
    "hurt myself",
    "no reason to live",
  ];
  return signals.some((s) => text.toLowerCase().includes(s));
}

// ====== Safe fallback messages ======
function systemDownMessage(): ApiError {
  return {
    error:
      "Bloomie is having trouble responding right now. This is a technical issue, not your fault.",
    code: "AI_SERVICE_UNAVAILABLE",
  };
}

function degradedMessage(): ApiSuccess {
  return {
    reply:
      "I'm here with you. I might not have the right words right now, but you don't have to go through this alone.",
    degraded: true,
  };
}

function crisisMessage(): ApiSuccess {
  return {
    reply:
      "I'm really sorry that you're feeling this much pain. You deserve support and care. If you're in danger, please consider reaching out to a trusted person or a mental health professional right now. If you can, contacting local emergency services or a suicide prevention hotline could help keep you safe.",
  };
}

// ====== Handler ======
export default async function handler(req: Request): Promise<Response> {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  }

  if (!process.env.OPENROUTER_API_KEY) {
    console.error("Missing OPENROUTER_API_KEY");
    return new Response(
      JSON.stringify({
        error: "Service misconfiguration",
        code: "MISSING_API_KEY",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }

  try {
    const body = await req.json();
    const message: string | undefined = body?.message;
    const history: ChatMessage[] = body?.history ?? [];

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    // ===== Crisis check (PRIORITY) =====
    if (detectCrisis(message)) {
      return new Response(JSON.stringify(crisisMessage()), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-10), // tránh context quá dài
      { role: "user", content: message },
    ];

    const aiResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://bloomie.vercel.app",
          "X-Title": "Bloomie Chatbot",
        },
        body: JSON.stringify({
          model: "nex-agi/deepseek-v3.1-nex-n1:free",
          messages,
          temperature: 0.7,
        }),
      }
    );

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("OpenRouter error:", {
        status: aiResponse.status,
        body: errText,
      });

      return new Response(JSON.stringify(systemDownMessage()), {
        status: 503,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    const data = await aiResponse.json();
    const reply: string | undefined = data?.choices?.[0]?.message?.content;

    if (!reply || reply.trim().length === 0) {
      return new Response(JSON.stringify(degradedMessage()), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Server crash:", error);

    return new Response(JSON.stringify(systemDownMessage()), {
      status: 503,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  }
}
