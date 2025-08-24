// Quick test to check if the free model is working
import dotenv from "dotenv";
dotenv.config();

async function testFreeModel() {
  console.log("🧪 Testing Free Llama 3.1 405B Model...\n");

  const API_KEY = process.env.OPENROUTER_API_KEY;
  const MODEL = "meta-llama/llama-3.1-405b-instruct:free";

  if (!API_KEY) {
    console.error("❌ No API key found");
    return;
  }

  try {
    console.log("🚀 Making request to:", MODEL);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "ChemVerse Chemistry App",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "user",
              content: "What is H2O? Answer in one sentence.",
            },
          ],
          temperature: 0.7,
          max_tokens: 100,
        }),
      }
    );

    console.log("📡 Response status:", response.status, response.statusText);

    if (response.ok) {
      const data = await response.json();
      const answer = data.choices?.[0]?.message?.content;
      console.log("✅ SUCCESS! Response:", answer);
    } else {
      const errorText = await response.text();
      console.log("❌ Error response:", errorText);

      if (response.status === 429) {
        console.log(
          "💡 This is a rate limit error - free models have usage limits"
        );
        console.log("🔄 Try again in a few minutes or use shorter questions");
      } else if (response.status === 503) {
        console.log("💡 Service unavailable - free model might be overloaded");
        console.log("🔄 Try again later when demand is lower");
      }
    }
  } catch (error) {
    console.error("❌ Network error:", error.message);
  }
}

testFreeModel();
