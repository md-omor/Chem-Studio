import { pgTable, text, serial, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const elements = pgTable("elements", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull().unique(),
  name: text("name").notNull(),
  atomicNumber: integer("atomic_number").notNull(),
  atomicMass: real("atomic_mass").notNull(),
  category: text("category").notNull(),
  period: integer("period").notNull(),
  group: integer("group"),
  electronConfiguration: text("electron_configuration").notNull(),
  meltingPoint: text("melting_point"),
  boilingPoint: text("boiling_point"),
  uses: text("uses"),
  fact: text("fact"),
});

export const reactions = pgTable("reactions", {
  id: serial("id").primaryKey(),
  reactants: text("reactants").notNull(), // JSON array of element symbols
  product: text("product").notNull(),
  productName: text("product_name").notNull(),
  description: text("description").notNull(),
  uses: text("uses").notNull(),
  facts: text("facts").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertElementSchema = createInsertSchema(elements).omit({
  id: true,
});

export const insertReactionSchema = createInsertSchema(reactions).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Element = typeof elements.$inferSelect;
export type InsertElement = z.infer<typeof insertElementSchema>;
export type Reaction = typeof reactions.$inferSelect;
export type InsertReaction = z.infer<typeof insertReactionSchema>;
