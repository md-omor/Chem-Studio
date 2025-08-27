import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false,
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    port: 5173, // Vite default port
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      external: (id) => {
        // Exclude server-side modules from client build
        return (
          id.includes("server/") ||
          id.includes("node:") ||
          id.includes("express")
        );
      },
    },
  },
});
