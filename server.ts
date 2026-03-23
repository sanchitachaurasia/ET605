import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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

startServer();
