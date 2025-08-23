// Simple test for Llama 3.1 405B via OpenRouter
import dotenv from "dotenv";
dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "meta-llama/llama-3.1-405b-instruct";

async function testLlama405B() {
  console.log("🦙 Testing Llama 3.1 405B connection via OpenRouter...\n");

  if (!OPENROUTER_API_KEY) {
    console.error("❌ OPENROUTER_API_KEY not found in .env file");
    return;
  }

  console.log("✅ API Key found");
  console.log(`🤖 Testing model: ${MODEL}\n`);

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "ChemVerse Chemistry App",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "system",
              content:
                "You are a chemistry expert. Respond briefly and accurately.",
            },
            {
              role: "user",
              content:
                "What happens when hydrogen and oxygen react? Give a brief answer.",
            },
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      }
    );

    console.log(
      `📡 Response status: ${response.status} ${response.statusText}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", errorText);
      return;
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;

    if (answer) {
      console.log("✅ Llama 3.1 405B Response:");
      console.log(`📝 ${answer}\n`);
      console.log("🎉 SUCCESS! Llama 3.1 405B is working correctly!");
      console.log(
        "💡 You can now use your ChemVerse app with the most powerful Llama model!"
      );
    } else {
      console.error("❌ No response content received");
    }
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Check your internet connection");
    console.log("2. Verify your OpenRouter API key is valid");
    console.log("3. Make sure you have credits in your OpenRouter account");
    console.log(
      "4. Try the free model first: meta-llama/llama-3.1-70b-instruct:free"
    );
  }
}

testLlama405B();
