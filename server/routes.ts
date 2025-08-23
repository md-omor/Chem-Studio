import type { Express } from "express";
import { createServer, type Server } from "http";
import {
  analyzeChemicalReaction,
  assistantChat,
  explainElement,
} from "./openrouter";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all elements
  app.get("/api/elements", async (req, res) => {
    try {
      const elements = await storage.getAllElements();
      res.json(elements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch elements" });
    }
  });

  // Get element by symbol
  app.get("/api/elements/:symbol", async (req, res) => {
    try {
      const element = await storage.getElementBySymbol(req.params.symbol);
      if (!element) {
        return res.status(404).json({ error: "Element not found" });
      }
      res.json(element);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch element" });
    }
  });

  // Get all reactions
  app.get("/api/reactions", async (req, res) => {
    try {
      const reactions = await storage.getAllReactions();
      res.json(reactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reactions" });
    }
  });

  // Get reaction by reactants (with AI fallback)
  app.post("/api/reactions/find", async (req, res) => {
    try {
      const { reactants } = req.body;
      if (!reactants || !Array.isArray(reactants)) {
        return res.status(400).json({ error: "Invalid reactants" });
      }

      // First try to find a known reaction in storage
      const storedReaction = await storage.getReactionByReactants(reactants);
      if (storedReaction) {
        return res.json(storedReaction);
      }

      // If no stored reaction found, use AI to analyze
      console.log(
        `No stored reaction found for ${reactants.join(
          ", "
        )}, using AI analysis...`
      );
      const aiAnalysis = await analyzeChemicalReaction(reactants);

      if (aiAnalysis.feasible) {
        // Create a temporary reaction object that matches our interface
        const aiReaction = {
          id: -1, // Temporary ID to indicate AI-generated
          reactants: JSON.stringify(reactants),
          product: aiAnalysis.product,
          productName: aiAnalysis.productName,
          description: aiAnalysis.description,
          uses: aiAnalysis.uses,
          facts: aiAnalysis.facts,
        };

        res.json(aiReaction);
      } else {
        return res.status(404).json({
          error: "No stable compound can be formed",
          explanation: aiAnalysis.description,
        });
      }
    } catch (error) {
      console.error("Error finding reaction:", error);
      res.status(500).json({ error: "Failed to find reaction" });
    }
  });

  // Get AI explanation for an element
  app.get("/api/elements/:symbol/explain", async (req, res) => {
    try {
      const element = await storage.getElementBySymbol(req.params.symbol);
      if (!element) {
        return res.status(404).json({ error: "Element not found" });
      }

      const explanation = await explainElement(element.symbol, element.name);
      res.json({ explanation });
    } catch (error) {
      console.error("Error explaining element:", error);
      res.status(500).json({ error: "Failed to explain element" });
    }
  });

  // AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { question } = req.body;
      if (!question) {
        return res.status(400).json({ error: "Question is required" });
      }

      // Use OpenRouter AI to answer chemistry questions
      const response = await assistantChat(question);

      res.json({ response });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to get AI response" });
    }
  });

  // AI Assistant endpoint with enhanced features
  app.post("/api/ai-assistant", async (req, res) => {
    try {
      const { question } = req.body;
      if (!question) {
        return res.status(400).json({ error: "Question is required" });
      }

      // Use enhanced OpenRouter AI assistant
      const response = await assistantChat(question);

      res.json({
        response,
        type: "text", // Could be expanded to support different response types
      });
    } catch (error) {
      console.error("AI Assistant error:", error);
      res.status(500).json({ error: "Failed to get AI response" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
