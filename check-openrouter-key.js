// Check if your OpenRouter API key is valid
import dotenv from "dotenv";
dotenv.config();

async function checkKey() {
  const API_KEY = process.env.OPENROUTER_API_KEY;

  console.log("🔑 Checking OpenRouter API Key...");
  console.log("Key exists:", !!API_KEY);
  console.log(
    "Key format:",
    API_KEY?.startsWith("sk-or-v1-") ? "✅ Correct" : "❌ Wrong format"
  );

  if (!API_KEY) {
    console.log("❌ No API key found in .env file");
    return;
  }

  try {
    // Test with account info endpoint
    const response = await fetch("https://openrouter.ai/api/v1/auth/key", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ API Key is valid!");
      console.log("Account info:", data);
    } else {
      const error = await response.text();
      console.log("❌ API Key is invalid:", error);
      console.log("\n🔧 To fix this:");
      console.log("1. Go to https://openrouter.ai/keys");
      console.log("2. Create a new API key");
      console.log(
        "3. Update your .env file with: OPENROUTER_API_KEY=sk-or-v1-your-new-key"
      );
    }
  } catch (error) {
    console.log("❌ Error checking key:", error.message);
  }
}

checkKey();
