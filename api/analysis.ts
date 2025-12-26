// import { corsHeaders, handleCors } from "./_utils/cors";

// export const config = {
//   runtime: "edge",
// };

// type MoodLog = {
//   mood: string;
//   detailMoods?: string[];
//   activities?: string[];
//   note?: string;
//   date?: string;
// };

// type ApiSuccess = {
//   result: string;
//   degraded?: boolean;
// };

// type ApiError = {
//   error: string;
//   code: string;
// };

// const SYSTEM_PROMPT = `
// Bạn là một trợ lý tâm lý nhẹ nhàng và tích cực.

// Nhiệm vụ:
// - Tóm tắt cảm xúc trong ngày của người dùng
// - Dựa trên mood, chi tiết mood, hoạt động và ghi chú
// - Chỉ trả về MỘT DÒNG duy nhất
// - Ngắn gọn, dễ hiểu, có emoji phù hợp
// - Không chẩn đoán, không tư vấn y khoa
// `;

// function fallbackMessage(): ApiSuccess {
//   return {
//     result: "Hôm nay trạng thái của bạn khá ổn 🌱",
//     degraded: true,
//   };
// }

// function systemDownMessage(): ApiError {
//   return {
//     error: "AI service is temporarily unavailable",
//     code: "AI_SERVICE_UNAVAILABLE",
//   };
// }

// export default async function handler(req: Request): Promise<Response> {
//   // ===== CORS =====
//   const corsResponse = handleCors(req);
//   if (corsResponse) return corsResponse;

//   if (req.method !== "POST") {
//     return new Response(JSON.stringify({ error: "Method not allowed" }), {
//       status: 405,
//       headers: {
//         "Content-Type": "application/json",
//         ...corsHeaders,
//       },
//     });
//   }

//   if (!process.env.OPENROUTER_API_KEY) {
//     console.error("Missing OPENROUTER_API_KEY");
//     return new Response(
//       JSON.stringify({
//         error: "Service misconfiguration",
//         code: "MISSING_API_KEY",
//       }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//           ...corsHeaders,
//         },
//       }
//     );
//   }

//   try {
//     const moodLog: MoodLog = await req.json();

//     if (!moodLog || !moodLog.mood) {
//       return new Response(JSON.stringify({ error: "MoodLog is required" }), {
//         status: 400,
//         headers: {
//           "Content-Type": "application/json",
//           ...corsHeaders,
//         },
//       });
//     }

//     const userPrompt = `
// Mood hôm nay (JSON):
// ${JSON.stringify(moodLog, null, 2)}

// Hãy viết một dòng tóm tắt cảm xúc hôm nay.
// `;

//     const aiResponse = await fetch(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json",
//           "HTTP-Referer": "https://bloomie.vercel.app",
//           "X-Title": "Bloomie Mood Analysis",
//         },
//         body: JSON.stringify({
//           model: "nex-agi/deepseek-v3.1-nex-n1:free",
//           temperature: 0.5,
//           messages: [
//             { role: "system", content: SYSTEM_PROMPT },
//             { role: "user", content: userPrompt },
//           ],
//         }),
//       }
//     );

//     if (!aiResponse.ok) {
//       console.error("OpenRouter error:", await aiResponse.text());
//       return new Response(JSON.stringify(fallbackMessage()), {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//           ...corsHeaders,
//         },
//       });
//     }

//     const data = await aiResponse.json();
//     const result: string | undefined =
//       data?.choices?.[0]?.message?.content?.trim();

//     if (!result) {
//       return new Response(JSON.stringify(fallbackMessage()), {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//           ...corsHeaders,
//         },
//       });
//     }

//     return new Response(JSON.stringify({ result }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//         ...corsHeaders,
//       },
//     });
//   } catch (error) {
//     console.error("Server crash:", error);

//     return new Response(JSON.stringify(systemDownMessage()), {
//       status: 503,
//       headers: {
//         "Content-Type": "application/json",
//         ...corsHeaders,
//       },
//     });
//   }
// }
