import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import authRoutes from "./src/backend/authRoutes";
import sessionRoutes from "./src/backend/sessionRoutes";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use((req, res, next) => {
    const requestOrigin = req.headers.origin;

    if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
      res.header("Access-Control-Allow-Origin", requestOrigin || allowedOrigins[0]);
    }

    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }

    next();
  });

  app.use(express.json());
  
  // Mount auth and session routes
  app.use("/api/auth", authRoutes);
  app.use("/api/session", sessionRoutes);

  // Chapter Metadata API
  app.get("/api/chapter/metadata", (req, res) => {
    res.json({
      grade: 8,
      chapter_name: "Data Handling",
      chapter_id: "grade8_data_handling",
      chapter_url: "https://dataquest.example.com",
      chapter_difficulty: 0.6,
      expected_completion_time_seconds: 3600,
      subtopics: [
        { subtopic_id: "data_org", name: "Data Organisation", difficulty: 0.4 },
        { subtopic_id: "histograms", name: "Grouping Data & Histograms", difficulty: 0.6 },
        { subtopic_id: "pie_charts", name: "Pie Charts", difficulty: 0.7 },
        { subtopic_id: "probability", name: "Probability", difficulty: 0.5 },
      ],
      prerequisites: ["Basic Arithmetic", "Fractions", "Percentages"],
    });
  });

  // Session Payload Receiver (Mock for Merge Team)
  app.post("/api/session/payload", (req, res) => {
    console.log("Received Session Payload:", req.body);
    res.status(200).json({ status: "success" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
