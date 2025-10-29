import db from './database.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

console.log('Initializing database...');

// Create tables
const createTables = () => {
  // Users table (for admin authentication)
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

  console.log('✓ Tables created successfully');
};

// Seed initial data
const seedData = () => {
  // Check if admin user exists
  const adminExists = db.prepare('SELECT id FROM users WHERE username = ?').get(process.env.ADMIN_USERNAME);

  if (!adminExists) {
    const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
    db.prepare('INSERT INTO users (username, password, email) VALUES (?, ?, ?)').run(
      process.env.ADMIN_USERNAME,
      hashedPassword,
      'connect@kaistrategist.com'
    );
    console.log('✓ Admin user created');
    console.log(`  Username: ${process.env.ADMIN_USERNAME}`);
    console.log(`  Password: ${process.env.ADMIN_PASSWORD}`);
  } else {
    console.log('✓ Admin user already exists');
  }

  // Check if profile settings exist
  const profileExists = db.prepare('SELECT id FROM profile_settings WHERE id = 1').get();

  if (!profileExists) {
    db.prepare(`
      INSERT INTO profile_settings (
        name, tagline, bio, email, location, linkedin_url, instagram_url,
        availability_status, years_experience, education
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'Abu Bakar (Kai)',
      'Marketing Strategist — performance-first, CS + MBA, published researcher.',
      'I engineer paid media that\'s measurable, scalable, and brand-safe. Specializing in Meta & Google with data-driven creative strategy.',
      'connect@kaistrategist.com',
      'Based in China, Available globally',
      'https://www.linkedin.com/in/abubakar7776',
      'https://www.instagram.com/cs_sheby',
      'Available for Full-Time & Contract Work',
      '3+',
      'MBA'
    );
    console.log('✓ Profile settings initialized');
  } else {
    console.log('✓ Profile settings already exist');
  }

  // Migrate existing case studies
  const caseStudiesExist = db.prepare('SELECT COUNT(*) as count FROM case_studies').get();
  if (caseStudiesExist.count === 0) {
    const caseStudies = [
      {
        title: "B2B SaaS — Germany Market",
        industry: "B2B SaaS",
        year: "2024",
        tagline: "Rebuilt for PMax + OCT/VBB; tightened ICP; improved ROAS trajectory",
        context: "A B2B SaaS company targeting the German market needed to improve their paid acquisition efficiency. Their existing campaigns were generating high volume but poor quality leads, resulting in low conversion rates and poor ROAS.",
        strategy: "Complete measurement rebuild using OCT/VBB framework, tightened ICP targeting, migrated to Performance Max campaigns with proper asset strategy.",
        execution: "Implemented server-side tracking stack, rebuilt conversion events with proper value assignment, created ICP-focused creative strategy, launched PMax campaigns with structured asset groups.",
        results: "Achieved 47% increase in ROAS while improving lead quality. CPA decreased by 31% month-over-month. Attribution clarity improved significantly with OCT/VBB implementation.",
        metrics: [
          { label: "ROAS Increase", value: "+47%" },
          { label: "CPA Reduction", value: "-31%" }
        ],
        tools: ["Google Ads", "Performance Max", "OCT/VBB", "Server-Side Tracking"],
        tags: ["B2B", "PMax", "Measurement", "Google Ads"],
        featured: true
      },
      {
        title: "E-Commerce — 2025 Launch",
        industry: "E-Commerce",
        year: "2025",
        tagline: "80/20 budget model; asset strategy; measurement spec",
        context: "New e-commerce brand preparing for market launch needed comprehensive paid media strategy across Meta and Google. No historical data, tight launch timeline.",
        strategy: "Built 80/20 budget allocation model (Meta focus), developed comprehensive asset strategy, architected measurement infrastructure before launch.",
        execution: "Created multi-variant creative testing framework, implemented GA4 + server-side tracking, launched Meta Advantage+ campaigns with proper catalog integration, supported with branded Search campaigns.",
        results: "Exceeded launch ROAS targets by 3.2x in first 60 days. CAC came in 22% below forecast. Established scalable testing framework for ongoing optimization.",
        metrics: [
          { label: "Launch ROAS", value: "3.2x Target" },
          { label: "CAC vs Forecast", value: "-22%" }
        ],
        tools: ["Meta Ads", "Google Ads", "GA4", "Server-Side Tracking"],
        tags: ["E-commerce", "Launch", "Meta", "Measurement"],
        featured: true
      },
      {
        title: "Healthcare Job Board — US",
        industry: "Job Board",
        year: "2023",
        tagline: "Traffic-only brief; CPC discipline; creative + query hygiene",
        context: "Healthcare job board needed high-quality traffic at scale. Traffic-only KPI focused on CPC efficiency and user quality.",
        strategy: "Disciplined Search campaign structure with strong query hygiene, creative testing for CTR improvement, systematic negative keyword management.",
        execution: "Built comprehensive keyword strategy across job categories, implemented dynamic ad variations, established weekly query review process, optimized landing pages for quality score.",
        results: "Delivered 47,000+ qualified clicks, improved CPC efficiency by 18% quarter-over-quarter while maintaining quality score above 7/10.",
        metrics: [
          { label: "Total Clicks", value: "47,000+" },
          { label: "CPC Efficiency", value: "-18%" }
        ],
        tools: ["Google Ads", "Search Campaigns", "Google Analytics"],
        tags: ["Search", "Traffic", "Healthcare", "Google Ads"],
        featured: true
      }
    ];

    caseStudies.forEach(cs => {
      const result = db.prepare(`
        INSERT INTO case_studies (title, industry, year, tagline, context, strategy, execution, results, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(cs.title, cs.industry, cs.year, cs.tagline, cs.context, cs.strategy, cs.execution, cs.results, cs.featured ? 1 : 0);

      const caseStudyId = result.lastInsertRowid;

      // Insert metrics
      cs.metrics.forEach(metric => {
        db.prepare('INSERT INTO case_study_metrics (case_study_id, label, value) VALUES (?, ?, ?)').run(caseStudyId, metric.label, metric.value);
      });

      // Insert tools
      cs.tools.forEach(tool => {
        db.prepare('INSERT INTO case_study_tools (case_study_id, tool_name) VALUES (?, ?)').run(caseStudyId, tool);
      });

      // Insert tags
      cs.tags.forEach(tag => {
        db.prepare('INSERT INTO case_study_tags (case_study_id, tag_name) VALUES (?, ?)').run(caseStudyId, tag);
      });
    });

    console.log('✓ Case studies migrated');
  }

  // Migrate existing publications
  const publicationsExist = db.prepare('SELECT COUNT(*) as count FROM publications').get();
  if (publicationsExist.count === 0) {
    const publications = [
      {
        title: "The Role of Algorithmic Ad Personalization in Shaping Impulse Buying Behavior on Social Commerce Platforms",
        authors: "Abu Bakar, Huaqiang Wang",
        journal: "Open Access Library Journal, 12 (2025)",
        year: "2025",
        doi: "https://doi.org/10.4236/oalib.1113822",
        abstract: "This research investigates how algorithmic ad personalization influences impulse buying behavior on social commerce platforms. Using a mixed-methods approach combining survey data and platform analytics, we examine the psychological and technical mechanisms through which personalized advertising drives unplanned purchases. The study reveals significant correlations between personalization sophistication and impulse buying frequency, with implications for both platform design and consumer protection policy.",
        why_it_matters: "For performance marketers, this research provides evidence-based guidance on personalization tactics that drive conversion without sacrificing user experience. The findings suggest optimal personalization strategies that balance immediate performance with long-term customer value, particularly relevant for social commerce campaigns on Meta and TikTok.",
        featured: true
      },
      {
        title: "Transformational Leadership and Organizational Culture in the Digital Marketing Era",
        authors: "Abu Bakar, Huaqiang Wang",
        journal: "Open Access Library Journal, 12 (2025)",
        year: "2025",
        doi: "https://doi.org/10.4236/oalib.1114183",
        abstract: "This study explores the relationship between transformational leadership styles and organizational culture in digital marketing teams. Through case studies and survey research across multiple organizations, we identify key leadership behaviors that foster innovation, experimentation, and data-driven decision-making. The research provides a framework for building high-performing growth marketing teams in rapidly evolving digital environments.",
        why_it_matters: "Growth marketing teams require different leadership approaches than traditional marketing. This research identifies specific leadership practices that enable rapid testing, intelligent risk-taking, and cross-functional collaboration—essential capabilities for modern performance marketing organizations. Particularly valuable for building and scaling in-house growth teams.",
        featured: true
      }
    ];

    publications.forEach(pub => {
      db.prepare(`
        INSERT INTO publications (title, authors, journal, year, doi, abstract, why_it_matters, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(pub.title, pub.authors, pub.journal, pub.year, pub.doi, pub.abstract, pub.why_it_matters, pub.featured ? 1 : 0);
    });

    console.log('✓ Publications migrated');
  }
};

// Run initialization
try {
  createTables();
  seedData();
  console.log('\n✓ Database initialization complete!');
  console.log('\nYou can now start the backend server with: npm run dev');
} catch (error) {
  console.error('Error initializing database:', error);
  process.exit(1);
}

process.exit(0);
