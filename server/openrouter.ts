// Load environment variables first
import dotenv from "dotenv";
import { getCurrentModel } from "./ai-config";
dotenv.config();

// Use native fetch (Node.js 18+) or node-fetch fallback
const fetch = globalThis.fetch || require("node-fetch");

export interface ReactionAnalysis {
  product: string;
  productName: string;
  description: string;
  uses: string;
  facts: string;
  feasible: boolean;
}

class OpenRouterService {
  private apiKey: string;
  private baseUrl = "https://openrouter.ai/api/v1/chat/completions";

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || "";
    if (!this.apiKey) {
      console.error("❌ OPENROUTER_API_KEY not found in environment variables");
    } else {
      console.log("✅ OpenRouter API key loaded successfully");
      console.log("🤖 Using model:", getCurrentModel());
    }
  }

  private async makeRequest(
    messages: any[],
    model: string = getCurrentModel(),
    options: any = {}
  ) {
    try {
      console.log(`🚀 Making OpenRouter request with model: ${model}`);

      const requestBody = {
        model,
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 2000,
        ...options,
      };

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "ChemVerse Chemistry App",
        },
        body: JSON.stringify(requestBody),
      });

      console.log(
        `📥 Response status: ${response.status} ${response.statusText}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ OpenRouter API error response:", errorText);
        throw new Error(
          `OpenRouter API error: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const data: any = await response.json();
      console.log("✅ OpenRouter response received successfully");

      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        console.error("❌ No content in response:", data);
        throw new Error("No content received from OpenRouter API");
      }

      return content;
    } catch (error) {
      console.error("❌ OpenRouter API error:", error);
      throw error;
    }
  }

  async analyzeChemicalReaction(
    elementSymbols: string[]
  ): Promise<ReactionAnalysis> {
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

      const messages = [
        {
          role: "system",
          content:
            "You are an expert chemistry tutor. Always respond with valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ];

      const response = await this.makeRequest(messages, getCurrentModel(), {
        temperature: 0.3,
        maxTokens: 1000,
      });

      // Parse JSON response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const data: ReactionAnalysis = JSON.parse(jsonMatch[0]);
        return data;
      } else {
        throw new Error("Invalid JSON response from AI model");
      }
    } catch (error) {
      console.error("Failed to analyze reaction with OpenRouter:", error);
      // Fallback response for when AI fails
      return {
        product: "Unknown",
        productName: "Unknown Compound",
        description:
          "Unable to analyze this combination of elements at the moment.",
        uses: "Analysis temporarily unavailable.",
        facts: "Please try again or select different elements.",
        feasible: false,
      };
    }
  }

  async explainElement(
    elementSymbol: string,
    elementName: string
  ): Promise<string> {
    try {
      const messages = [
        {
          role: "system",
          content:
            "You are an expert chemistry tutor for high school students. Provide clear, engaging explanations.",
        },
        {
          role: "user",
          content: `Provide a brief, educational explanation about the element ${elementName} (${elementSymbol}) that would be interesting for high school students. Include 2-3 fascinating facts in about 100 words.`,
        },
      ];

      const response = await this.makeRequest(messages, getCurrentModel(), {
        temperature: 0.8,
        maxTokens: 300,
      });

      return (
        response ||
        `${elementName} is an important chemical element with the symbol ${elementSymbol}.`
      );
    } catch (error) {
      console.error("Failed to explain element:", error);
      return `${elementName} is an important chemical element with the symbol ${elementSymbol}.`;
    }
  }

  async assistantChat(question: string): Promise<string> {
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

      const messages = [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: question,
        },
      ];

      const response = await this.makeRequest(messages, getCurrentModel(), {
        temperature: 0.7,
        maxTokens: 2000,
      });

      return (
        response ||
        "I'm having trouble processing your question right now. Could you please rephrase it or try again?"
      );
    } catch (error) {
      console.error("Failed to process assistant chat:", error);
      throw new Error(
        "Unable to process your question at the moment. Please try again."
      );
    }
  }

  // Method to get current model info
  getCurrentModel() {
    return getCurrentModel();
  }
}

// Export singleton instance
export const openRouterService = new OpenRouterService();

// Export individual functions for backward compatibility
export async function analyzeChemicalReaction(
  elementSymbols: string[]
): Promise<ReactionAnalysis> {
  return openRouterService.analyzeChemicalReaction(elementSymbols);
}

export async function explainElement(
  elementSymbol: string,
  elementName: string
): Promise<string> {
  return openRouterService.explainElement(elementSymbol, elementName);
}

export async function assistantChat(question: string): Promise<string> {
  return openRouterService.assistantChat(question);
}
