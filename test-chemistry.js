// Quick test for chemistry reactions
const { analyzeChemicalReaction } = require("./server/openrouter.ts");

async function testChemistry() {
  console.log("🧪 Testing H + O reaction...");

  try {
    const result = await analyzeChemicalReaction(["H", "O"]);
    console.log("Result:", JSON.stringify(result, null, 2));

    if (result.feasible && result.product === "H₂O") {
      console.log("✅ H + O → H₂O test PASSED!");
    } else {
      console.log("❌ H + O test FAILED - should be feasible and produce H₂O");
    }
  } catch (error) {
    console.error("❌ Test failed with error:", error.message);
  }
}

testChemistry();
