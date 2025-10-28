import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';

const LatestBlog = () => {
  const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 3);

  // Category color mapping
  const categoryColors = {
    Marketing: 'text-primary-orange border-primary-orange',
    Research: 'text-primary-blue border-primary-blue',
    Travel: 'text-purple-500 border-purple-500',
    Productivity: 'text-green-500 border-green-500',
  };

  // Don't render section if no posts
  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            Latest Insights
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            Thoughts on performance marketing, research, travel, and productivity
          </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-primary-orange transition-all group"
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
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-orange hover:gap-3 transition-all"
              >
                Read Article
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-lg font-medium text-primary-orange hover:gap-3 transition-all"
          >
            View Blog
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestBlog;
