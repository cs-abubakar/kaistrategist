import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import routes
import authRoutes from './routes/authRoutes.js';
import caseStudyRoutes from './routes/caseStudyRoutes.js';
import publicationRoutes from './routes/publicationRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', limiter);

// Serve uploaded files statically
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/profile', profileRoutes);

// Root endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'KAI Portfolio Backend API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      caseStudies: '/api/case-studies',
      publications: '/api/publications',
      blog: '/api/blog',
      profile: '/api/profile'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   KAI Portfolio Backend API Server   ║
╚═══════════════════════════════════════╝

🚀 Server is running on port ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
📝 API Documentation: http://localhost:${PORT}/api

Available endpoints:
  - Health Check: http://localhost:${PORT}/health
  - Auth: http://localhost:${PORT}/api/auth
  - Case Studies: http://localhost:${PORT}/api/case-studies
  - Publications: http://localhost:${PORT}/api/publications
  - Blog: http://localhost:${PORT}/api/blog
  - Profile: http://localhost:${PORT}/api/profile

Press Ctrl+C to stop the server
  `);
});

export default app;
