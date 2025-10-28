import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Posts');

  const categories = ['All Posts', 'Marketing', 'Research', 'Travel', 'Productivity'];

  // Category color mapping
  const categoryColors = {
    Marketing: 'text-primary-orange border-primary-orange bg-primary-orange/10',
    Research: 'text-primary-blue border-primary-blue bg-primary-blue/10',
    Travel: 'text-purple-500 border-purple-500 bg-purple-500/10',
    Productivity: 'text-green-500 border-green-500 bg-green-500/10',
  };

  // Filter blog posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        searchTerm === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All Posts' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Blog & Insights
            </h1>
            <p className="text-lg text-text-muted max-w-3xl mx-auto">
              Thoughts on performance marketing, research findings, travel
              stories, and productivity hacks. Practical insights from the field.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-6">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted"
                size={20}
              />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass rounded-full focus:outline-none focus:ring-2 focus:ring-primary-orange text-white placeholder-text-muted"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? category === 'All Posts'
                        ? 'bg-primary-orange text-white'
                        : categoryColors[category]
                      : 'glass hover:border-primary-orange'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Blog Grid or Empty State */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-2xl p-6 hover:border-primary-orange transition-all group cursor-pointer"
                >
                  {/* Cover Image or Placeholder */}
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full aspect-video rounded-lg mb-4 object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-video rounded-lg mb-4 flex items-center justify-center bg-white/5">
                      <div className="text-6xl font-extrabold text-white/20">
                        {post.title.charAt(0)}
                      </div>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-sm border mb-3 ${
                      categoryColors[post.category] || categoryColors.Marketing
                    }`}
                  >
                    {post.category}
                  </div>

                  {/* Date & Read Time */}
                  <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.publishedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime} min
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary-orange transition-colors">
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-text-muted mb-4 line-clamp-3">
                    {post.summary}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded bg-white/5 text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read Article Link */}
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-primary-orange group-hover:gap-3 transition-all">
                    Read Article
                    <ArrowRight size={16} />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Empty State
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 glass rounded-2xl"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold mb-2">
                {searchTerm || selectedCategory !== 'All Posts'
                  ? 'No posts found'
                  : 'Coming Soon'}
              </h3>
              <p className="text-text-muted">
                {searchTerm || selectedCategory !== 'All Posts'
                  ? 'Try adjusting your search or filters'
                  : 'Blog posts will be added soon. Stay tuned!'}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
