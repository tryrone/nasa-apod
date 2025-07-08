// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { apodRoutes, marsRoverRoutes } from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/error-handler";

dotenv.config();

const appConfig = require("./config/app.config");

const app = express();
const PORT = process.env["PORT"] || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure JSON parsing
app.use(express.json({ limit: appConfig.requestLimits.json }));
app.use(
  express.urlencoded({
    extended: true,
    limit: appConfig.requestLimits.urlencoded,
  })
);

// Routes

app.use("/api/apod", apodRoutes);
app.use("/api/mars-rover", marsRoverRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);
app.use(notFoundHandler);

// Root
app.get("/", (_req, res) => {
  res.send("🌌 NASA Explorer Backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
