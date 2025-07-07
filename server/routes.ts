import type { Express } from "express";
import { createServer, type Server } from "http";
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

  // Get reaction by reactants
  app.post("/api/reactions/find", async (req, res) => {
    try {
      const { reactants } = req.body;
      if (!reactants || !Array.isArray(reactants)) {
        return res.status(400).json({ error: "Invalid reactants" });
      }
      
      const reaction = await storage.getReactionByReactants(reactants);
      if (!reaction) {
        return res.status(404).json({ error: "No reaction found for these elements" });
      }
      
      res.json(reaction);
    } catch (error) {
      res.status(500).json({ error: "Failed to find reaction" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
