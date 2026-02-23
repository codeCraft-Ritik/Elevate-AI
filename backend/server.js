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
connectDB(); //

const app = express();

// === CRITICAL: Handle ALL preflight OPTIONS requests ===
app.use((req, res, next) => {
  const origin = req.get('origin');
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://elevate-ai-amber.vercel.app"
  ];

  if (allowedOrigins.includes(origin) || !origin) {
    res.set('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Max-Age', '86400');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// CORS MUST be applied BEFORE routes and other middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://elevate-ai-amber.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS blocked'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  maxAge: 86400
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`🚀 Server running in ${config.env} mode on port ${config.port}`);
  console.log(`🔗 Shadow Simulation active at: http://localhost:${config.port}/api/shadow`);
});