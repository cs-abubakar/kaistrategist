# KAI Portfolio - Full-Stack Portfolio & CMS

A modern, full-stack portfolio website with integrated Content Management System (CMS) for Abu Bakar (Kai) - Marketing Strategist specializing in Meta & Google Ads with CS + MBA background.

## ✨ Key Features

### Frontend
- **Modern Tech Stack**: React 19 + Vite + Tailwind CSS v4
- **Smooth Animations**: Framer Motion for all page transitions and interactions
- **Fully Responsive**: Mobile-first design with adaptive layouts
- **Performance-First**: Optimized builds and lazy loading
- **Dark Theme**: Custom design system with glass morphism effects

### Backend & Admin
- **Full CMS**: Complete content management system
- **REST API**: Express.js backend with SQLite database
- **Authentication**: JWT-based secure admin authentication
- **File Uploads**: Image upload system for case studies, blog posts, and profile
- **CRUD Operations**: Full create, read, update, delete for all content
- **Admin Dashboard**: Beautiful admin interface matching site design

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS v4 with custom theme
- **Animations**: Framer Motion
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite with better-sqlite3
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer
- **Security**: Helmet, CORS, Rate Limiting
- **Password Hashing**: bcryptjs

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/cs-abubakar/kaistrategist.git
cd kaistrategist

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Environment Setup

1. **Copy environment files:**
```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

2. **Edit `.env` (Frontend):**
```env
VITE_WEB3FORMS_KEY=412d29d7-9b56-466e-a78f-d87d646692ef
VITE_API_URL=http://localhost:5000/api
```

3. **Edit `backend/.env` (Backend):**
```env
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

### Initialize Database

```bash
cd backend
npm run init-db
```

This creates the SQLite database and seeds it with initial data from your existing case studies and publications.

### Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: **http://localhost:5000**

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend runs on: **http://localhost:5173**

---

## 🔐 Admin Dashboard

### Access
- **URL**: http://localhost:5173/admin/login
- **Default Username**: `admin`
- **Default Password**: `admin123`

**⚠️ IMPORTANT**: Change default credentials for production!

### Admin Features

#### Dashboard (`/admin/dashboard`)
- Overview statistics (case studies, blog posts, publications)
- Quick action buttons
- Profile summary

#### Case Studies Management (`/admin/case-studies`)
- View all case studies with filtering (all, published, drafts)
- Create new case studies with full form
- Edit existing case studies
- Delete case studies
- Upload cover images
- Add metrics, tools, and tags
- Set featured status

#### Blog Management (`/admin/blog`)
- Create and edit blog posts
- Rich text content area (markdown supported)
- Upload cover images
- Organize with categories (Marketing, Research, Travel, Productivity)
- Add tags for better organization
- Set featured posts
- Control published status
- Auto-generate slugs from titles

#### Publications Management (`/admin/publications`)
- Add peer-reviewed publications
- Include DOI links
- Add abstracts and marketing implications
- Set featured publications
- Inline editing interface

#### Profile Settings (`/admin/profile`)
- Update personal information
- Upload profile picture
- Edit bio and tagline
- Update social media links
- Set availability status
- Edit years of experience and education

---

## 📁 Project Structure

```
kaistrategist/
├── backend/                    # Backend API server
│   ├── config/
│   │   ├── database.js        # SQLite configuration
│   │   └── initDb.js          # Database initialization
│   ├── controllers/           # Route handlers
│   │   ├── authController.js
│   │   ├── caseStudyController.js
│   │   ├── blogController.js
│   │   ├── publicationController.js
│   │   └── profileController.js
│   ├── middleware/
│   │   ├── auth.js           # JWT authentication
│   │   ├── upload.js         # File upload handling
│   │   └── errorHandler.js
│   ├── routes/               # API routes
│   ├── uploads/              # Uploaded files
│   ├── database.sqlite       # SQLite database (created on init)
│   ├── server.js            # Express server
│   └── package.json
│
├── src/                      # Frontend React app
│   ├── components/
│   │   ├── layout/          # Header, Footer, Layout
│   │   ├── home/            # Home page sections
│   │   └── admin/           # Admin UI components
│   ├── pages/
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── Home.jsx
│   │   ├── Work.jsx
│   │   ├── Blog.jsx
│   │   ├── Research.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── CaseStudyDetail.jsx
│   │   └── BlogPostDetail.jsx
│   ├── context/            # React context (AuthContext)
│   ├── utils/              # API utilities
│   ├── App.jsx
│   └── main.jsx
│
├── public/                  # Static assets
├── .env                     # Frontend environment variables
├── .env.example
├── package.json
├── DEPLOYMENT.md           # Complete deployment guide
└── README.md
```

---

## 🌐 API Endpoints

### Public Endpoints
```
GET  /api/case-studies       - Get all case studies
GET  /api/case-studies/:id   - Get single case study
GET  /api/publications        - Get all publications
GET  /api/publications/:id    - Get single publication
GET  /api/blog                - Get all blog posts
GET  /api/blog/slug/:slug     - Get blog post by slug
GET  /api/blog/categories     - Get blog categories
GET  /api/profile             - Get profile information
GET  /health                  - Health check
```

### Protected Endpoints (Require JWT Token)
```
POST   /api/auth/login           - Admin login
GET    /api/auth/verify          - Verify JWT token
POST   /api/auth/change-password - Change password

POST   /api/case-studies         - Create case study
PUT    /api/case-studies/:id     - Update case study
DELETE /api/case-studies/:id     - Delete case study

POST   /api/blog                 - Create blog post
PUT    /api/blog/:id             - Update blog post
DELETE /api/blog/:id             - Delete blog post
GET    /api/blog/admin/:id       - Get blog post by ID (admin)

POST   /api/publications         - Create publication
PUT    /api/publications/:id     - Update publication
DELETE /api/publications/:id     - Delete publication

PUT    /api/profile              - Update profile
POST   /api/profile/upload-image - Upload profile image
```

---

## 📄 Pages

### Public Pages
- **Home** (`/`) - Hero, About, Approach, Featured Work, Publications, Blog, CTA
- **Work** (`/work`) - Case studies portfolio with filtering and search
- **Case Study Detail** (`/work/:id`) - Full case study details
- **Research** (`/research`) - Peer-reviewed publications
- **Blog** (`/blog`) - Blog posts with category filtering
- **Blog Post Detail** (`/blog/:slug`) - Full blog post
- **About** (`/about`) - Professional journey, skills, timeline
- **Contact** (`/contact`) - Contact form and information

### Admin Pages (Protected)
- **Login** (`/admin/login`) - Admin authentication
- **Dashboard** (`/admin/dashboard`) - Overview and quick actions
- **Case Studies** (`/admin/case-studies`) - Manage portfolio
- **Blog** (`/admin/blog`) - Manage blog posts
- **Publications** (`/admin/publications`) - Manage research
- **Profile** (`/admin/profile`) - Profile settings

---

## 🎨 Design System

### Colors
- **Background**: `#0B132B` (dark navy)
- **Primary Orange**: `#F59E0B`
- **Primary Blue**: `#2563EB`
- **Text White**: `#FFFFFF`
- **Text Muted**: `rgba(255, 255, 255, 0.6)`

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 700, 800

### Effects
- **Glass Morphism**: Translucent backgrounds with blur
- **Gradient Text**: White to blue gradient
- **Magnetic Buttons**: Scale transform on hover
- **Smooth Animations**: Framer Motion transitions

---

## 📬 Contact Form

The contact form uses **Web3Forms** - a free email service with no backend required.

**Web3Forms API Key**: `412d29d7-9b56-466e-a78f-d87d646692ef` (already configured)

The form includes a mailto: fallback for reliability.

---

## 🚢 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete deployment instructions including:
- Production deployment to Vercel + Railway
- VPS deployment with Nginx
- SSL certificate setup
- Environment variables configuration
- Security checklist
- Backup strategies

### Quick Production Deploy

**Backend (Railway) - Deploy First:**

1. Go to [railway.app](https://railway.app) and connect your GitHub repo
2. Select the `backend` directory as root
3. Add environment variables in Railway dashboard:
   ```env
   PORT=5000
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-secure-password
   JWT_SECRET=generate-32-char-string
   NODE_ENV=production
   ```
4. Set start command: `node server.js`
5. Deploy! Database auto-initializes on first start.
6. Test: `curl https://your-app.railway.app/health`

**Frontend (Vercel):**

1. Install Vercel CLI: `npm i -g vercel`
2. Update `.env`: `VITE_API_URL=https://your-backend.railway.app/api`
3. Deploy: `vercel`
4. Add environment variables in Vercel dashboard

**✅ Required Environment Variables:**

Backend (Railway):
- `PORT` - 5000
- `ADMIN_USERNAME` - your admin username
- `ADMIN_PASSWORD` - secure password
- `JWT_SECRET` - 32+ char random string
- `NODE_ENV` - production

Frontend (Vercel):
- `VITE_WEB3FORMS_KEY` - 412d29d7-9b56-466e-a78f-d87d646692ef
- `VITE_API_URL` - https://your-backend.railway.app/api

---

## 🔒 Security

- JWT authentication for admin panel
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Helmet for security headers
- CORS configuration
- File upload validation
- SQL injection protection (prepared statements)

**Production Security Checklist:**
- [ ] Change default admin password
- [ ] Generate strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Set secure CORS origin
- [ ] Regular dependency updates
- [ ] Database backups

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check port 5000 availability
lsof -i :5000

# Reinitialize database if needed
cd backend && npm run init-db
```

### Frontend can't connect to API
- Verify `VITE_API_URL` in `.env`
- Check backend is running: `curl http://localhost:5000/health`
- Verify CORS settings

### Database issues
```bash
# Backup and recreate database
cp backend/database.sqlite backend/database.backup.sqlite
rm backend/database.sqlite
npm run init-db
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for more troubleshooting tips.

---

## 📞 Contact

- **Email**: connect@kaistrategist.com
- **LinkedIn**: [linkedin.com/in/abubakar7776](https://www.linkedin.com/in/abubakar7776)
- **Instagram**: [@cs_sheby](https://www.instagram.com/cs_sheby)

---

## 📄 License

© 2025 Abu Bakar (Kai). All rights reserved.

---

**Built with Claude Code** 🤖
