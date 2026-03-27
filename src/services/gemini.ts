import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getFarmingAdvice(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are a helpful farming assistant for Marathi farmers. Answer in Marathi. Provide practical, scientific, and traditional farming advice. If asked about weather or market prices, use your general knowledge or suggest checking the specific sections in the app. Always be polite and encouraging. Use Marathi script (Devanagari).",
    },
  });
  return response.text;
}

export async function getMarketInfo(crop: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `महाराष्ट्रातील ${crop} चे सध्याचे बाजार भाव आणि बाजार समितीची माहिती द्या. (Provide current market prices and mandi info for ${crop} in Maharashtra.)`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  return response.text;
}

export async function getWeatherInfo(location: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `${location} साठी आजचा आणि उद्याचा हवामान अंदाज सांगा. (Tell today's and tomorrow's weather forecast for ${location}.)`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  return response.text;
}
