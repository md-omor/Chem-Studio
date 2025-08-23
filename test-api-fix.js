// Test the fixed API endpoints
import dotenv from "dotenv";
dotenv.config();

async function testAPI() {
  console.log("🧪 Testing Fixed API Endpoints...\n");

  try {
    // Test 1: Reaction Analysis (H + Be)
    console.log("1️⃣ Testing H + Be reaction analysis...");
    const reactionResponse = await fetch(
      "http://localhost:3000/api/reactions/find",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reactants: ["H", "Be"] }),
      }
    );

    if (reactionResponse.ok) {
      const reactionData = await reactionResponse.json();
      console.log("✅ Reaction Analysis Result:");
      console.log(
        `   Product: ${reactionData.product || "No stable compound"}`
      );
      console.log(`   Feasible: ${reactionData.feasible || false}`);
    } else {
      const errorData = await reactionResponse.json();
      console.log("⚠️ Expected 404 for H + Be:", errorData.error);
    }

    // Test 2: AI Assistant with Context
    console.log("\n2️⃣ Testing AI Assistant with H + Be context...");
    const chatResponse = await fetch("http://localhost:3000/api/ai-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: "Are there any safety concerns?",
        context: {
          elements: ["H", "Be"],
          initialContext:
            "User is asking about hydrogen and beryllium reaction",
        },
      }),
    });

    if (chatResponse.ok) {
      const chatData = await chatResponse.json();
      console.log("✅ AI Assistant Response:");
      console.log(`   ${chatData.response.substring(0, 150)}...`);
    } else {
      console.log("❌ AI Assistant failed:", chatResponse.status);
    }

    // Test 3: Simple AI Chat
    console.log("\n3️⃣ Testing simple AI chat...");
    const simpleChatResponse = await fetch(
      "http://localhost:3000/api/ai-assistant",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: "What is water made of?",
        }),
      }
    );

    if (simpleChatResponse.ok) {
      const simpleChatData = await simpleChatResponse.json();
      console.log("✅ Simple Chat Response:");
      console.log(`   ${simpleChatData.response.substring(0, 100)}...`);
    } else {
      console.log("❌ Simple chat failed:", simpleChatResponse.status);
    }

    console.log("\n🎉 API tests completed!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testAPI();
