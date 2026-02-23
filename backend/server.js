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

// 2. UPDATED CORS CONFIGURATION
// This allows your specific Vercel frontend to communicate with this backend
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://elevate-ai-silk.vercel.app",
    "https://elevate-ai-silk.vercel.app/"
  ], 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 3. MIDDLEWARE
app.use(express.json());

// 4. ROUTES
// All auth routes will be prefixed with /api/auth (e.g., /api/auth/login)
app.use('/api/auth', authRoutes); 
app.use('/api/resume', resumeRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/analytics', analyticsRoutes);

// 5. ERROR HANDLER
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));