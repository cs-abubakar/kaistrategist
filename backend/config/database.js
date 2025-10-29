import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure database directory exists
const dbPath = process.env.DB_PATH || join(__dirname, '..', 'database.sqlite');
const dbDir = dirname(dbPath);
if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
}

// Create database connection
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database tables if they don't exist
const initializeTables = () => {
  try {
    // Check if tables exist
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").get();

    if (!tables) {
      console.log('📦 Initializing database tables...');

      // Users table
      db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          email TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Profile settings table
      db.exec(`
        CREATE TABLE IF NOT EXISTS profile_settings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          tagline TEXT,
          bio TEXT,
          email TEXT,
          location TEXT,
          linkedin_url TEXT,
          instagram_url TEXT,
          profile_image TEXT,
          availability_status TEXT,
          years_experience TEXT,
          education TEXT,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Case studies table
      db.exec(`
        CREATE TABLE IF NOT EXISTS case_studies (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          industry TEXT NOT NULL,
          year TEXT NOT NULL,
          tagline TEXT NOT NULL,
          context TEXT,
          strategy TEXT,
          execution TEXT,
          results TEXT,
          cover_image TEXT,
          featured BOOLEAN DEFAULT 0,
          published BOOLEAN DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Case study metrics table
      db.exec(`
        CREATE TABLE IF NOT EXISTS case_study_metrics (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          case_study_id INTEGER NOT NULL,
          label TEXT NOT NULL,
          value TEXT NOT NULL,
          FOREIGN KEY (case_study_id) REFERENCES case_studies(id) ON DELETE CASCADE
        )
      `);

      // Case study tools table
      db.exec(`
        CREATE TABLE IF NOT EXISTS case_study_tools (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          case_study_id INTEGER NOT NULL,
          tool_name TEXT NOT NULL,
          FOREIGN KEY (case_study_id) REFERENCES case_studies(id) ON DELETE CASCADE
        )
      `);

      // Case study tags table
      db.exec(`
        CREATE TABLE IF NOT EXISTS case_study_tags (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          case_study_id INTEGER NOT NULL,
          tag_name TEXT NOT NULL,
          FOREIGN KEY (case_study_id) REFERENCES case_studies(id) ON DELETE CASCADE
        )
      `);

      // Publications table
      db.exec(`
        CREATE TABLE IF NOT EXISTS publications (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          authors TEXT NOT NULL,
          journal TEXT NOT NULL,
          year TEXT NOT NULL,
          doi TEXT,
          abstract TEXT,
          why_it_matters TEXT,
          featured BOOLEAN DEFAULT 0,
          published BOOLEAN DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Blog posts table
      db.exec(`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          category TEXT NOT NULL,
          summary TEXT,
          body TEXT NOT NULL,
          cover_image TEXT,
          read_time INTEGER,
          featured BOOLEAN DEFAULT 0,
          published BOOLEAN DEFAULT 1,
          published_date DATE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Blog post tags table
      db.exec(`
        CREATE TABLE IF NOT EXISTS blog_post_tags (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          blog_post_id INTEGER NOT NULL,
          tag_name TEXT NOT NULL,
          FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
        )
      `);

      console.log('✅ Database tables created successfully');
    }
  } catch (error) {
    console.error('❌ Error initializing database tables:', error);
    throw error;
  }
};

// Initialize tables on module load
initializeTables();

export default db;
