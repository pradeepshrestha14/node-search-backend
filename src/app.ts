import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import compression from "compression";

import searchRoutes from "./routes/search";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

// Security & performance middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan("combined"));

// Serve a dummy favicon to prevent errors
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Routes
app.use("/api/search", searchRoutes);

// Health
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Error handler (at end)
app.use(errorHandler);

export default app;
