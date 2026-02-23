import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { config } from './config/index.js';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';

// Import Routes
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import resumeRoutes from './routes/resume.js';
import analyticsRoutes from './routes/analytics.js';

dotenv.config(); 

const app = express();

// === CORS WHITELIST ===
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://elevate-ai-amber.vercel.app"
];

// === MIDDLEWARE ORDER MATTERS ===
// 1. Custom CORS handler (explicit)
app.use((req, res, next) => {
  const origin = req.get('origin');
  
  if (!origin || allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin || '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 2. Body parsers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 3. Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 4. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/analytics', analyticsRoutes);

// 5. Error handler
app.use(errorHandler);

// === START SERVER ===
// Connect DB first, then start listening
connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`✅ Server running on port ${config.port}`);
  });
}).catch((err) => {
  console.error('❌ Database connection failed:', err.message);
  process.exit(1);
});