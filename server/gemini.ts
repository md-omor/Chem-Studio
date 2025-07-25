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

export async function assistantChat(question: string): Promise<string> {
  try {
    const systemPrompt = `You are an expert chemistry tutor for high school students. You provide clear, accurate, and educational explanations about chemistry concepts, reactions, equations, safety, and applications.

Key guidelines:
1. Use simple, clear language appropriate for high school level
2. Provide step-by-step explanations when solving problems
3. Include real-world examples and applications
4. Emphasize safety when relevant
5. Use proper chemical notation and formulas
6. Break down complex concepts into understandable parts
7. Encourage learning with engaging facts
8. When creating flowcharts, use simple text-based format with arrows (→) and clear numbered steps
9. For equations, show balancing steps clearly with detailed explanations
10. Always be encouraging and supportive
11. AVOID using unnecessary asterisks (*), hashtags (#), or excessive markdown formatting
12. Use clean, readable text with proper paragraph breaks and bullet points
13. Extract comprehensive information and present it in organized, visual format
14. Focus on educational content that helps students understand concepts deeply

Format responses with clear structure and proper spacing for optimal readability.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: question
    });

    return response.text || "I'm having trouble processing your question right now. Could you please rephrase it or try again?";
  } catch (error) {
    console.error("Failed to process assistant chat:", error);
    throw new Error("Unable to process your question at the moment. Please try again.");
  }
}