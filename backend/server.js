import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARE =================
app.use(express.json());

// ================= FINAL CORS FIX (PRODUCTION READY) =================
const allowedOrigins = [
  "http://localhost:5173", // Local dev
  "http://localhost:3000",
  "https://elevate-ai-brown.vercel.app", // 🔥 YOUR ACTUAL FRONTEND (IMPORTANT)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS Not Allowed: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// VERY IMPORTANT: Fix Preflight Requests (Your exact error)
app.options("*", cors());

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Elevate-AI Backend Running 🚀");
});

// ================= API ROUTES =================
app.use("/api/auth", authRoutes);

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});