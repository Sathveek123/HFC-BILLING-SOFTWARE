import { NextRequest, NextResponse } from "next/server";

function parseJsonSafely(rawText: string) {
  let cleaned = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();

  // Extract from first { to last }
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  // Remove trailing commas before closing braces or brackets
  cleaned = cleaned.replace(/,\s*([\}\]])/g, "$1");

  try {
    return JSON.parse(cleaned);
  } catch (e1) {
    try {
      // Remove invalid control characters
      const sanitized = cleaned.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
      return JSON.parse(sanitized);
    } catch (e2) {
      throw new Error(`JSON parsing error: ${(e2 as Error).message}`);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const groqKey = (process.env.GROQ_API_KEY || "").trim();
    const geminiKey = (process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "").trim();

    if (!groqKey && !geminiKey) {
      return NextResponse.json(
        { error: "No API Key configured. Add GROQ_API_KEY or GEMINI_API_KEY in .env file." },
        { status: 400 }
      );
    }

    const { imageBase64, mimeType } = await req.json();

    if (!imageBase64) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    const prompt = `You are a restaurant menu extraction expert.
Extract ALL menu items from this menu card image EXACTLY as written.

Return ONLY a valid JSON object — no markdown, no explanation, no code blocks.

JSON format:
{
  "categories": [
    {
      "name": "CATEGORY NAME IN CAPS",
      "items": [
        {
          "name": "Exact item name from menu",
          "price": 229,
          "half_price": 129,
          "full_price": 229,
          "notes": "1 Person ₹129 / 2 Persons ₹229"
        }
      ]
    }
  ]
}

Rules:
- Extract EVERY single item visible on the menu card — do not skip any items
- If item has two portion prices (1 Person / 2 Persons, Half / Full, Small / Large):
    half_price = lower price (1 Person / Half) as number only
    full_price = higher price (2 Persons / Full) as number only
    price = higher price (2 Persons / Full) as number only
- If item has ONE price only:
    price = that price as number only
    half_price = null
    full_price = null
- notes = human readable price string exactly from menu card
- Category names: UPPERCASE exactly as on menu card
- Item names: exactly as written on menu card
- Return ONLY the JSON object, absolutely nothing else`;

    let rawText = "";
    let lastErrMessage = "";

    // 1. Primary: Gemini API with official REST endpoints
    if (geminiKey) {
      const geminiConfigs = [
        { url: `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, name: "gemini-1.5-flash (v1)" },
        { url: `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${geminiKey}`, name: "gemini-1.5-pro (v1)" },
        { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiKey}`, name: "gemini-3.6-flash (v1beta)" },
        { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, name: "gemini-1.5-flash (v1beta)" },
      ];

      for (const cfg of geminiConfigs) {
        try {
          const response = await fetch(cfg.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: prompt },
                    {
                      inline_data: {
                        mime_type: mimeType || "image/jpeg",
                        data: imageBase64,
                      },
                    },
                  ],
                },
              ],
            }),
          });

          const resData = await response.json();
          if (response.ok && resData.candidates?.[0]?.content?.parts?.[0]?.text) {
            rawText = resData.candidates[0].content.parts[0].text;
            console.log(`[Gemini Success] Extracted menu using: ${cfg.name}`);
            break;
          } else {
            lastErrMessage = `Gemini (${cfg.name}): ${resData.error?.message || JSON.stringify(resData)}`;
            console.warn(lastErrMessage);
          }
        } catch (err: any) {
          lastErrMessage = `Gemini (${cfg.name}) fetch error: ${err.message}`;
          console.warn(lastErrMessage);
        }
      }
    }

    // 2. Secondary: Groq API Key
    if (!rawText && groqKey) {
      const groqModels = [
        "llama-3.2-11b-vision-instruct",
        "llama-3.2-90b-vision-instruct",
        "llava-v1.5-7b-4096"
      ];

      for (const model of groqModels) {
        try {
          const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${groqKey}`
            },
            body: JSON.stringify({
              model,
              messages: [
                {
                  role: "user",
                  content: [
                    { type: "text", text: prompt },
                    {
                      type: "image_url",
                      image_url: {
                        url: `data:${mimeType || "image/jpeg"};base64,${imageBase64}`
                      }
                    }
                  ]
                }
              ],
              max_tokens: 4096,
              temperature: 0.1
            })
          });

          const resData = await response.json();
          if (response.ok && resData.choices?.[0]?.message?.content) {
            rawText = resData.choices[0].message.content;
            console.log(`[Groq Success] Extracted menu using model: ${model}`);
            break;
          } else {
            lastErrMessage = `Groq (${model}): ${resData.error?.message || JSON.stringify(resData)}`;
            console.warn(lastErrMessage);
          }
        } catch (err: any) {
          lastErrMessage = `Groq (${model}) fetch error: ${err.message}`;
          console.warn(lastErrMessage);
        }
      }
    }

    if (!rawText) {
      return NextResponse.json(
        {
          success: false,
          error: "Vision API menu extraction failed",
          details: lastErrMessage || "Check your GEMINI_API_KEY or GROQ_API_KEY in .env file."
        },
        { status: 400 }
      );
    }

    const parsed = parseJsonSafely(rawText);
    return NextResponse.json({ success: true, data: parsed });

  } catch (error: any) {
    console.error("Menu extraction route error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Menu extraction failed" },
      { status: 400 }
    );
  }
}
