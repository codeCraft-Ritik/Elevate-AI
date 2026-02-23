import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS (VERY IMPORTANT)
const allowedOrigins = [
  "http://localhost:5173",
  "https://elevate-ai-amber.vercel.app", // your frontend domain
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Fix preflight CORS error
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Elevate-AI Backend Running 🚀");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});