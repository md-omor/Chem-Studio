import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ReactionAnalysis {
  product: string;
  productName: string;
  description: string;
  uses: string;
  facts: string;
  feasible: boolean;
}

export async function analyzeChemicalReaction(elementSymbols: string[]): Promise<ReactionAnalysis> {
  try {
    const elementsText = elementSymbols.join(", ");
    
    const prompt = `You are a chemistry expert analyzing a potential reaction between elements: ${elementsText}.

Please analyze if these elements can realistically form a stable compound and provide educational information.

Respond with JSON in this exact format:
{
  "product": "Chemical formula (e.g., H₂O, NaCl, CO₂)",
  "productName": "Common name of the compound",
  "description": "Brief scientific description of the compound and reaction",
  "uses": "Real-world applications and uses",
  "facts": "Interesting educational facts about the compound",
  "feasible": true/false
}

Rules:
1. Only suggest feasible, stable compounds that actually exist
2. If elements cannot form a stable compound, set feasible to false and explain why
3. Use proper chemical notation with subscripts and superscripts
4. Keep descriptions educational and appropriate for high school students
5. Focus on real chemistry, not science fiction
6. For infeasible combinations, still provide educational value about why they don't work

Examples of good responses:
- H + O → H₂O (water)
- Na + Cl → NaCl (salt) 
- C + O → CO₂ (carbon dioxide)
- Noble gases typically don't react with other elements`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            product: { type: "string" },
            productName: { type: "string" },
            description: { type: "string" },
            uses: { type: "string" },
            facts: { type: "string" },
            feasible: { type: "boolean" }
          },
          required: ["product", "productName", "description", "uses", "facts", "feasible"]
        }
      },
      contents: prompt
    });

    const rawJson = response.text;
    if (rawJson) {
      const data: ReactionAnalysis = JSON.parse(rawJson);
      return data;
    } else {
      throw new Error("Empty response from AI model");
    }
  } catch (error) {
    console.error("Failed to analyze reaction with AI:", error);
    // Fallback response for when AI fails
    return {
      product: "Unknown",
      productName: "Unknown Compound",
      description: "Unable to analyze this combination of elements at the moment.",
      uses: "Analysis temporarily unavailable.",
      facts: "Please try again or select different elements.",
      feasible: false
    };
  }
}

export async function explainElement(elementSymbol: string, elementName: string): Promise<string> {
  try {
    const prompt = `Provide a brief, educational explanation about the element ${elementName} (${elementSymbol}) that would be interesting for high school students. Include 2-3 fascinating facts in about 100 words.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    return response.text || `${elementName} is an important chemical element with the symbol ${elementSymbol}.`;
  } catch (error) {
    console.error("Failed to explain element:", error);
    return `${elementName} is an important chemical element with the symbol ${elementSymbol}.`;
  }
}