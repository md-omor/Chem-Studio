// Simple direct test of OpenRouter API
import dotenv from "dotenv";
dotenv.config();

async function testSimpleOpenRouter() {
  console.log("🔧 Testing OpenRouter API directly...\n");

  const API_KEY = process.env.OPENROUTER_API_KEY;
  console.log("API Key exists:", !!API_KEY);
  console.log(
    "API Key starts with sk-or-v1:",
    API_KEY?.startsWith("sk-or-v1-")
  );

  // Test with different models
  const models = [
    "meta-llama/llama-3.1-70b-instruct:free",
    "anthropic/claude-3.5-haiku",
    "meta-llama/llama-3.1-8b-instruct:free",
  ];

  for (const model of models) {
    console.log(`\n🤖 Testing model: ${model}`);

    try {
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
            model: model,
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

      console.log(`Status: ${response.status} ${response.statusText}`);

      if (response.ok) {
        const data = await response.json();
        const answer = data.choices?.[0]?.message?.content;
        console.log(`✅ Success: ${answer?.substring(0, 80)}...`);
        break; // Stop on first success
      } else {
        const errorText = await response.text();
        console.log(`❌ Error: ${errorText.substring(0, 100)}...`);
      }
    } catch (error) {
      console.log(`❌ Exception: ${error.message}`);
    }
  }
}

testSimpleOpenRouter();
