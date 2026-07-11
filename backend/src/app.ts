import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import express from "express";
import uploadRoutes from "./routes/upload.routes";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://groweasy-ai-importer-six.vercel.app",
    ],
  })
);

app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("🚀 GrowEasy AI Importer Backend is running!");
});

// Upload routes
app.use("/api", uploadRoutes);

export default app;