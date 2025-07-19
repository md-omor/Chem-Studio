import express, { NextFunction, type Request, Response } from "express";
import { registerRoutes } from "./routes";
import { log, serveStatic, setupVite } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Get port from environment variable or use default
  const startPort = parseInt(process.env.PORT || "3000");
  const host = process.env.HOST || "localhost";

  // Try to find an available port
  const tryListen = (port: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      server
        .listen(port, host)
        .once("listening", () => {
          log(`serving on ${host}:${port}`);
          resolve();
        })
        .once("error", (err: any) => {
          if (err.code === "EADDRINUSE") {
            log(`Port ${port} in use, trying ${port + 1}`);
            server.close();
            tryListen(port + 1)
              .then(resolve)
              .catch(reject);
          } else {
            reject(err);
          }
        });
    });
  };

  await tryListen(startPort);
})();
