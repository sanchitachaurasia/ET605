import express from "express";
import { readFile } from "fs/promises";
import path from "path";
import { createServer as createViteServer } from "vite";
import authRoutes from "./src/backend/authRoutes.ts";
import sessionRoutes from "./src/backend/sessionRoutes.ts";
import mergeTeamRoutes from "./src/backend/mergeTeamRoutes.ts";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3012;
  const HOST = '0.0.0.0';
  const isDev = process.env.NODE_ENV === "development";
  const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use((req, res, next) => {
    const requestOrigin = req.headers.origin;
    const isLocalDevOrigin = !!requestOrigin && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(requestOrigin);
    const isAllowedOrigin = !!requestOrigin && (allowedOrigins.includes(requestOrigin) || isLocalDevOrigin);

    if (!requestOrigin || isAllowedOrigin) {
      res.header("Access-Control-Allow-Origin", requestOrigin || allowedOrigins[0]);
    }

    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,x-admin-key");

    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }

    next();
  });

  app.use(express.json());
  
  // Mount auth, session, and merge team routes
  app.use("/api/auth", authRoutes);
  app.use("/api/session", sessionRoutes);
  app.use(mergeTeamRoutes);

  // Chapter Metadata API
  app.get("/api/chapter/metadata", async (_req, res) => {
    try {
      const metadataPath = path.join(process.cwd(), "MERGE_METADATA.json");
      const metadataRaw = await readFile(metadataPath, "utf-8");
      const metadata = JSON.parse(metadataRaw);
      res.json(metadata);
    } catch (error) {
      console.error("Failed to load MERGE metadata:", error);
      res.status(500).json({
        success: false,
        error: "Failed to load chapter metadata",
      });
    }
  });

  // Session Payload Receiver (Mock for Merge Team)
  app.post("/api/session/payload", (req, res) => {
    console.log("Received Session Payload:", req.body);
    res.status(200).json({ status: "success" });
  });

  // Never let unknown API paths fall through to SPA routes.
  app.use('/api', (_req, res) => {
    res.status(404).json({
      success: false,
      error: 'API route not found',
    });
  });

  // Vite middleware for development
  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get(/.*/, (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
