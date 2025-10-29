# KAI Portfolio - Complete Deployment Guide

## 🏗️ System Architecture

This is a full-stack portfolio website with:
- **Frontend**: React 19 + Vite + Tailwind CSS v4
- **Backend**: Node.js + Express + SQLite
- **Admin Panel**: Full CMS for content management
- **Authentication**: JWT-based admin authentication

---

## 📋 Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- **Git** for version control
- **Modern browser** (Chrome, Firefox, Safari, Edge)

---

## 🚀 Quick Start (Development)

### 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/cs-abubakar/kaistrategist.git
cd kaistrategist

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure Environment Variables

```bash
# Copy example files
cp .env.example .env
cp backend/.env backend/.env

# Edit .env files with your values
```

**Root `.env` (Frontend):**
```env
VITE_WEB3FORMS_KEY=412d29d7-9b56-466e-a78f-d87d646692ef
VITE_API_URL=http://localhost:5000/api
```

**`backend/.env` (Backend):**
```env
PORT=5000
NODE_ENV=development
DB_PATH=./database.sqlite
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=your-super-secret-jwt-key-CHANGE-THIS
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### 3. Initialize Database

```bash
cd backend
npm run init-db
```

This creates the SQLite database and seeds it with initial data.

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend runs on: http://localhost:5173

---

## 🔐 Admin Access

### Default Credentials
- **URL**: http://localhost:5173/admin/login
- **Username**: `admin`
- **Password**: `admin123`

**⚠️ IMPORTANT:** Change these credentials in production!

### Changing Admin Password

1. Log into admin dashboard
2. Or update directly in database:
```bash
cd backend
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-new-password', 10));"
```
3. Update `ADMIN_PASSWORD` in `backend/.env` with the hashed password

---

## 📝 Admin Dashboard Features

### Content Management
- **Case Studies**: Create, edit, delete portfolio case studies
- **Blog Posts**: Full blog management with markdown support
- **Publications**: Manage research publications
- **Profile**: Update personal information and profile image

### Dashboard Sections
1. **Dashboard** (`/admin/dashboard`) - Overview & quick actions
2. **Case Studies** (`/admin/case-studies`) - Portfolio management
3. **Blog** (`/admin/blog`) - Blog content management
4. **Publications** (`/admin/publications`) - Research publications
5. **Profile** (`/admin/profile`) - Personal settings

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
GET  /api/profile             - Get profile information
```

### Protected Endpoints (Requires JWT)
```
POST   /api/auth/login           - Admin login
GET    /api/auth/verify          - Verify token
POST   /api/auth/change-password - Change password

POST   /api/case-studies         - Create case study
PUT    /api/case-studies/:id     - Update case study
DELETE /api/case-studies/:id     - Delete case study

POST   /api/blog                 - Create blog post
PUT    /api/blog/:id             - Update blog post
DELETE /api/blog/:id             - Delete blog post

POST   /api/publications         - Create publication
PUT    /api/publications/:id     - Update publication
DELETE /api/publications/:id     - Delete publication

PUT    /api/profile              - Update profile
POST   /api/profile/upload-image - Upload profile image
```

---

## 📁 Project Structure

```
kaistrategist/
├── backend/                    # Backend API server
│   ├── config/                 # Database & initialization
│   │   ├── database.js        # SQLite connection
│   │   └── initDb.js          # Database setup script
│   ├── controllers/           # Route handlers
│   │   ├── authController.js
│   │   ├── caseStudyController.js
│   │   ├── blogController.js
│   │   ├── publicationController.js
│   │   └── profileController.js
│   ├── middleware/            # Express middleware
│   │   ├── auth.js           # JWT authentication
│   │   ├── upload.js         # File upload (Multer)
│   │   └── errorHandler.js
│   ├── routes/               # API routes
│   ├── uploads/              # Uploaded files
│   ├── server.js            # Express server
│   ├── package.json
│   └── .env
│
├── src/                      # Frontend React app
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── home/            # Home page sections
│   │   └── admin/           # Admin components
│   ├── pages/               # Page components
│   │   ├── admin/          # Admin pages
│   │   ├── Home.jsx
│   │   ├── Work.jsx
│   │   ├── Blog.jsx
│   │   ├── CaseStudyDetail.jsx
│   │   ├── BlogPostDetail.jsx
│   │   └── ...
│   ├── context/            # React context (Auth)
│   ├── utils/              # API utilities
│   ├── data/               # Static data (legacy)
│   ├── App.jsx
│   └── main.jsx
│
├── public/                  # Static assets
├── .env                     # Frontend environment
├── .env.example
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔧 Database Schema

### Tables
- **users** - Admin authentication
- **profile_settings** - User profile data
- **case_studies** - Portfolio case studies
- **case_study_metrics** - Case study metrics
- **case_study_tools** - Tools used
- **case_study_tags** - Tags/categories
- **publications** - Research publications
- **blog_posts** - Blog content
- **blog_post_tags** - Blog tags

### Relationships
- One-to-many: case_studies → metrics/tools/tags
- One-to-many: blog_posts → tags
- One profile_settings record (ID = 1)

---

## 🚢 Production Deployment

### Option 1: Deploy to Vercel (Frontend) + Railway (Backend)

#### Backend on Railway

1. **Create Railway Project**
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli

   # Login and initialize
   railway login
   railway init
   ```

2. **Configure Environment**
   - Set all environment variables from `backend/.env`
   - Update `CORS_ORIGIN` to your frontend URL
   - Change `ADMIN_PASSWORD` and `JWT_SECRET`

3. **Deploy**
   ```bash
   cd backend
   railway up
   ```

4. **Initialize Database**
   ```bash
   railway run npm run init-db
   ```

#### Frontend on Vercel

1. **Update API URL**
   - Edit `.env`: `VITE_API_URL=https://your-backend.railway.app/api`

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Configure Environment**
   - Add `VITE_WEB3FORMS_KEY` and `VITE_API_URL` in Vercel dashboard

### Option 2: Deploy to VPS (DigitalOcean, AWS, etc.)

#### Setup Nginx

```nginx
# /etc/nginx/sites-available/kaistrategist
server {
    listen 80;
    server_name kaistrategist.com www.kaistrategist.com;

    # Frontend
    location / {
        root /var/www/kaistrategist/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploads
    location /uploads {
        proxy_pass http://localhost:5000;
    }
}
```

#### Setup PM2 (Process Manager)

```bash
# Install PM2
npm install -g pm2

# Start backend
cd backend
pm2 start server.js --name kai-backend

# Save PM2 configuration
pm2 save
pm2 startup
```

#### Build Frontend

```bash
# Build for production
npm run build

# Copy dist folder to /var/www/kaistrategist
sudo cp -r dist/* /var/www/kaistrategist/
```

#### SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d kaistrategist.com -d www.kaistrategist.com
```

---

## 🔒 Security Checklist

### Production Security

- [ ] Change default admin credentials
- [ ] Generate strong JWT_SECRET (32+ random characters)
- [ ] Enable HTTPS/SSL certificates
- [ ] Set secure CORS_ORIGIN (not wildcard)
- [ ] Review and limit file upload sizes
- [ ] Enable rate limiting (already configured)
- [ ] Regular database backups
- [ ] Keep dependencies updated (`npm audit`)
- [ ] Set NODE_ENV=production
- [ ] Use environment variables (never commit .env)

### Recommended JWT Secret Generation

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000
# Kill process if needed
kill -9 <PID>

# Verify database exists
ls -la backend/database.sqlite

# Reinitialize if needed
cd backend && npm run init-db
```

### Frontend can't connect to backend
- Check `VITE_API_URL` in `.env`
- Verify backend is running: `curl http://localhost:5000/health`
- Check CORS settings in `backend/server.js`
- Clear browser cache and restart dev server

### File uploads failing
```bash
# Check uploads directory permissions
ls -la backend/uploads
chmod 755 backend/uploads

# Check MAX_FILE_SIZE in backend/.env
```

### Database locked errors
```bash
# Close all connections and restart
cd backend
rm database.sqlite
npm run init-db
```

---

## 📱 Testing

### Run Backend Tests
```bash
cd backend
# Test health endpoint
curl http://localhost:5000/health

# Test API endpoint
curl http://localhost:5000/api/case-studies
```

### Test Admin Login
1. Navigate to http://localhost:5173/admin/login
2. Login with admin/admin123
3. Verify dashboard loads
4. Test CRUD operations

---

## 📦 Backup & Restore

### Backup Database
```bash
cp backend/database.sqlite backend/database.backup.sqlite
# Or with timestamp
cp backend/database.sqlite "backend/backup-$(date +%Y%m%d-%H%M%S).sqlite"
```

### Backup Uploads
```bash
tar -czf uploads-backup.tar.gz backend/uploads/
```

### Restore
```bash
cp backend/database.backup.sqlite backend/database.sqlite
```

---

## 🆘 Support

For issues or questions:
- **Email**: connect@kaistrategist.com
- **GitHub Issues**: https://github.com/cs-abubakar/kaistrategist/issues

---

## 📄 License

© 2025 Abu Bakar (Kai). All rights reserved.
