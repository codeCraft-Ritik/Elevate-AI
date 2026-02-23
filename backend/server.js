const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');
const contentRoutes = require('./routes/content');
const analyticsRoutes = require('./routes/analytics');

const app = express();

// CONNECT DATABASE
connectDB();

// MIDDLEWARE
app.use(express.json());

// UPDATED CORS LOGIC: Added your specific Render URL
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://elevate-ai-2.onrender.com",
    "https://elevate-ai-2.onrender.com/"
  ], 
  credentials: true
}));

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/analytics', analyticsRoutes);

// ERROR HANDLER
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));