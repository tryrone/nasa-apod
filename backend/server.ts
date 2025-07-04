// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env["PORT"] || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import apodRoutes from "./routes/apodRoutes";
app.use("/api/apod", apodRoutes);

// Root
app.get("/", (_req, res) => {
  res.send("🌌 NASA Explorer Backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
