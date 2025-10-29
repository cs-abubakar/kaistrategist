import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Load environment variables first
dotenv.config();

// Import database (this will auto-initialize tables)
import './config/database.js';

// Import seed function
import { seedDatabase } from './config/seed.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import caseStudyRoutes from './routes/caseStudyRoutes.js';
import publicationRoutes from './routes/publicationRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const uploadsDir = join(__dirname, 'uploads');
if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory');
}

// Seed database on startup
try {
  seedDatabase();
} catch (error) {
  console.error('⚠️  Warning: Database seeding failed:', error.message);
  // Don't exit - let the server start anyway
}

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

// CORS - allow all origins in production for Railway
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
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
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/profile', profileRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'KAI Portfolio Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      caseStudies: '/api/case-studies',
      publications: '/api/publications',
      blog: '/api/blog',
      profile: '/api/profile'
    }
  });
});

// API info endpoint
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

// Start server - bind to 0.0.0.0 for Railway
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════╗
║   KAI Portfolio Backend API Server   ║
╚═══════════════════════════════════════╝

🚀 Server is running on port ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
📝 API Documentation: http://localhost:${PORT}/api

Available endpoints:
  - Health Check: GET /health
  - Root: GET /
  - Auth: POST /api/auth/login
  - Case Studies: GET /api/case-studies
  - Publications: GET /api/publications
  - Blog: GET /api/blog
  - Profile: GET /api/profile

Press Ctrl+C to stop the server
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default app;
