import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, FileText, BookOpen, User, Plus } from 'lucide-react';
import { caseStudiesAPI, blogAPI, publicationsAPI, profileAPI } from '../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    caseStudies: 0,
    blogPosts: 0,
    publications: 0,
    profile: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [caseStudies, blogPosts, publications, profile] = await Promise.all([
        caseStudiesAPI.getAll(),
        blogAPI.getAll(),
        publicationsAPI.getAll(),
        profileAPI.get(),
      ]);

      setStats({
        caseStudies: caseStudies.length,
        blogPosts: blogPosts.length,
        publications: publications.length,
        profile: profile,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const cards = [
    {
      title: 'Case Studies',
      count: stats.caseStudies,
      icon: Briefcase,
      link: '/admin/case-studies',
      color: 'orange',
    },
    {
      title: 'Blog Posts',
      count: stats.blogPosts,
      icon: FileText,
      link: '/admin/blog',
      color: 'blue',
    },
    {
      title: 'Publications',
      count: stats.publications,
      icon: BookOpen,
      link: '/admin/publications',
      color: 'purple',
    },
    {
      title: 'Profile',
      count: stats.profile ? '✓' : '✗',
      icon: User,
      link: '/admin/profile',
      color: 'green',
    },
  ];

  const quickActions = [
    { title: 'New Case Study', link: '/admin/case-studies/new', icon: Briefcase },
    { title: 'New Blog Post', link: '/admin/blog/new', icon: FileText },
    { title: 'New Publication', link: '/admin/publications/new', icon: BookOpen },
    { title: 'Edit Profile', link: '/admin/profile', icon: User },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-text-muted">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">Welcome Back!</h1>
        <p className="text-text-muted">
          Manage your portfolio content from this dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={card.link}
                className="block glass rounded-2xl p-6 hover:border-primary-orange transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-${
                      card.color === 'orange' ? 'primary-orange' : card.color
                    }/20 flex items-center justify-center`}
                  >
                    <Icon
                      className={`text-${
                        card.color === 'orange' ? 'primary-orange' : card.color
                      }-400`}
                      size={24}
                    />
                  </div>
                  <div className="text-3xl font-extrabold">{card.count}</div>
                </div>
                <h3 className="font-bold text-lg group-hover:text-primary-orange transition-colors">
                  {card.title}
                </h3>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.link}
                className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-orange/20 flex items-center justify-center">
                  <Icon className="text-primary-orange" size={20} />
                </div>
                <span className="font-medium group-hover:text-primary-orange transition-colors">
                  {action.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity placeholder */}
      <div className="glass rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Profile Summary</h2>
        {stats.profile && (
          <div className="space-y-2 text-text-muted">
            <p>
              <strong>Name:</strong> {stats.profile.name}
            </p>
            <p>
              <strong>Email:</strong> {stats.profile.email}
            </p>
            <p>
              <strong>Location:</strong> {stats.profile.location}
            </p>
            <Link
              to="/admin/profile"
              className="inline-block mt-4 text-primary-orange hover:text-white transition-colors"
            >
              Edit Profile →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
