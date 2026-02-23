const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');
const contentRoutes = require('./routes/content');
const analyticsRoutes = require('./routes/analytics');

const app = express();

// 1. CONNECT DATABASE
connectDB();

// 2. DYNAMIC CORS CONFIGURATION
const allowedOrigins = [
  "http://localhost:5173",                 // Local development
  "https://elevate-ai-silk.vercel.app",    // Your Vercel Frontend (No slash)
  "https://elevate-ai-silk.vercel.app/"     // Your Vercel Frontend (With slash)
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      console.log("Blocked by CORS: ", origin);
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 3. MIDDLEWARE
app.use(express.json());

// 4. ROUTES
app.use('/api/auth', authRoutes); 
app.use('/api/resume', resumeRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/analytics', analyticsRoutes);

// 5. ERROR HANDLER
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));