import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import Research from './pages/Research';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import CaseStudyDetail from './pages/CaseStudyDetail';
import BlogPostDetail from './pages/BlogPostDetail';

// Admin imports
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import CaseStudiesManagement from './pages/admin/CaseStudiesManagement';
import CaseStudyForm from './pages/admin/CaseStudyForm';
import BlogManagement from './pages/admin/BlogManagement';
import BlogForm from './pages/admin/BlogForm';
import PublicationsManagement from './pages/admin/PublicationsManagement';
import ProfileSettings from './pages/admin/ProfileSettings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/work" element={<Layout><Work /></Layout>} />
          <Route path="/work/:id" element={<Layout><CaseStudyDetail /></Layout>} />
          <Route path="/research" element={<Layout><Research /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/blog/:slug" element={<Layout><BlogPostDetail /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="case-studies" element={<CaseStudiesManagement />} />
            <Route path="case-studies/new" element={<CaseStudyForm />} />
            <Route path="case-studies/edit/:id" element={<CaseStudyForm />} />
            <Route path="blog" element={<BlogManagement />} />
            <Route path="blog/new" element={<BlogForm />} />
            <Route path="blog/edit/:id" element={<BlogForm />} />
            <Route path="publications" element={<PublicationsManagement />} />
            <Route path="profile" element={<ProfileSettings />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Layout><div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-6xl font-extrabold mb-4">404</h1><p className="text-text-muted">Page not found</p></div></div></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
