// Simple test script for OpenRouter integration
// Run with: npm run test-openrouter

import dotenv from "dotenv";
// Load environment variables first
dotenv.config();

import {
  analyzeChemicalReaction,
  assistantChat,
  explainElement,
} from "./server/openrouter.js";

async function testOpenRouter() {
  console.log(
    "🧪 Testing OpenRouter Integration with Llama 3.1 405B for ChemVerse...\n"
  );

  try {
    // Test 0: Connection Test
    console.log("0️⃣ Testing OpenRouter Connection...");
    const connectionTest = await openRouterService.testConnection();
    if (!connectionTest) {
      throw new Error("Connection test failed");
    }
    console.log("✅ Connection test passed!\n");

    // Test 1: Chemical Reaction Analysis
    console.log("1️⃣ Testing Chemical Reaction Analysis...");
    const reaction = await analyzeChemicalReaction(["H", "O"]);
    console.log("✅ Reaction Analysis Result:");
    console.log(`   Product: ${reaction.product}`);
    console.log(`   Name: ${reaction.productName}`);
    console.log(`   Feasible: ${reaction.feasible}\n`);

    // Test 2: Element Explanation
    console.log("2️⃣ Testing Element Explanation...");
    const explanation = await explainElement("C", "Carbon");
    console.log("✅ Element Explanation Result:");
    console.log(`   ${explanation.substring(0, 100)}...\n`);

    // Test 3: AI Assistant Chat
    console.log("3️⃣ Testing AI Assistant Chat...");
    const chatResponse = await assistantChat(
      "What is the difference between ionic and covalent bonds?"
    );
    console.log("✅ Chat Response Result:");
    console.log(`   ${chatResponse.substring(0, 100)}...\n`);

    console.log("🎉 All tests passed! OpenRouter is working correctly.");
    console.log("💡 You can now start your app with: npm run dev");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Make sure OPENROUTER_API_KEY is set in your .env file");
    console.log("2. Check that your API key is valid");
    console.log("3. Verify you have credits in your OpenRouter account");
    console.log("4. Try switching to a different model in server/ai-config.ts");
  }
}

testOpenRouter();
