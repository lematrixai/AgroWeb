"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  throw new Error(
    "❌ Google API key is missing. Check your .env file and ensure GOOGLE_API_KEY is set."
  );
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function chatWithAI(
  messages: { role: string; content: string }[],
  disease: string | null,
  confidence: string | null
) {
  try {
    const messageHistory = messages
      .slice(-5)
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    const prompt = `You are a friendly and knowledgeable maize (corn) disease expert. ${disease ? `A farmer has shared a photo of their maize plant, and our AI detected ${disease} with ${confidence}% confidence.` : 'A farmer is looking for advice about their maize plant.'}

Previous conversation context:
${messageHistory}

${!disease ? `👋 Hi! I'm your maize disease assistant. I can help you with:
• Maize Streak Virus (MSV)
• Maize Lethal Necrosis (MLN)
• General maize health issues

To help you better, could you tell me:
• What's happening with your maize plants? (spots, streaks, color changes, etc.)
• Where are you seeing these issues? (leaves, stalk, roots)
• How's the weather been lately?
• Any recent treatments you've tried?
• What kind of soil are you working with?
• Which maize variety are you growing?

The more details you share, the better I can help! 🌽` : `Thanks for sharing that photo! I see our AI detected ${disease}. Let me help you understand what this means:

🔍 What's Happening
• What ${disease} means for your maize
• Key symptoms to watch for

🌡️ Why It's Happening
• What's causing this
• Conditions that make it worse

💊 How to Fix It
• Immediate steps to take
• Treatment options

🛡️ Prevention Tips
• How to protect your crop
• Long-term management

Feel free to ask any questions! 🌱`}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    revalidatePath("/chat");

    return {
      id: Date.now().toString(),
      role: "assistant",
      content: response,
    };
  } catch (apiError: any) {
    console.error("API Error:", apiError);

    let retryDelay = "30";

    const retryMatch = apiError.message?.match(/retryDelay":"(\d+)s"/);
    if (retryMatch) retryDelay = retryMatch[1];

    if (
      apiError.status === 429 ||
      apiError.message?.includes("429") ||
      apiError.message?.includes("Too Many Requests") ||
      apiError.message?.includes("quota") ||
      apiError.message?.includes("rate limit")
    ) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: `The AI service is currently busy. Please try again in ${retryDelay} seconds.`,
        error: true,
      };
    }

    if (apiError.message?.includes("API key")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "AI service configuration error. Please contact support.",
        error: true,
      };
    }

    return {
      id: Date.now().toString(),
      role: "assistant",
      content: "Failed to generate response. Please try again.",
      error: true,
    };
  }
}
