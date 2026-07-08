import dotenv from "dotenv";
dotenv.config();

import express from "express";
import uploadRoutes from "./routes/upload.routes";

const app = express();

app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("🚀 GrowEasy AI Importer Backend is running!");
});

// Upload routes
app.use("/api", uploadRoutes);

export default app;