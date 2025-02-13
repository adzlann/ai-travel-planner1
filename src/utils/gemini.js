import { GoogleGenerativeAI } from "@google/generative-ai";

// Check if API key exists
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('VITE_GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function generateItinerary(destination, preferences) {
  if (!destination || !preferences.duration || !preferences.budget) {
    throw new Error('Missing required parameters');
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Create a detailed ${preferences.duration}-day travel itinerary for ${destination} with a budget of MYR ${preferences.budget}.
    Please format the response as follows:
    - Break it down by days
    - Include estimated costs for activities in MYR
    - Suggest local attractions, restaurants, and activities
    - Consider transportation options
    Please provide the itinerary in a clear, organized format with all costs in Malaysian Ringgit (MYR).`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(`Failed to generate itinerary: ${error.message}`);
  }
}