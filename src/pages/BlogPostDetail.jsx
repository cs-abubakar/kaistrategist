import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { blogAPI } from '../utils/api';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const data = await blogAPI.getBySlug(slug);
      setPost(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setError('Blog post not found');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-muted">Loading...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary-orange hover:text-white">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const categoryColors = {
    Marketing: 'bg-primary-orange/20 text-primary-orange',
    Research: 'bg-primary-blue/20 text-primary-blue',
    Travel: 'bg-purple-500/20 text-purple-400',
    Productivity: 'bg-green-500/20 text-green-400',
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>
      </div>

      {/* Hero Section */}
      <article className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Category Badge */}
            <div className="mb-6">
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                  categoryColors[post.category] || 'bg-white/10 text-white'
                }`}
              >
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-text-muted mb-8">
              {post.published_date && (
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{format(new Date(post.published_date), 'MMMM d, yyyy')}</span>
                </div>
              )}
              {post.read_time && (
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{post.read_time} min read</span>
                </div>
              )}
            </div>

            {/* Summary */}
            {post.summary && (
              <p className="text-xl text-text-muted mb-8 leading-relaxed">
                {post.summary}
              </p>
            )}

            {/* Cover Image */}
            {post.cover_image && (
              <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 bg-white/5">
                <img
                  src={`http://localhost:5000${post.cover_image}`}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none mb-12"
          >
            <div className="glass rounded-2xl p-8 md:p-12">
              <div className="whitespace-pre-wrap text-lg leading-relaxed text-text-muted">
                {post.body}
              </div>
            </div>
          </motion.div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 mb-12"
            >
              <div className="flex items-center gap-3 mb-3">
                <Tag size={20} />
                <h3 className="text-lg font-bold">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-white/5 text-text-muted rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center glass rounded-2xl p-12"
          >
            <h3 className="text-2xl font-bold mb-4">Let's Work Together</h3>
            <p className="text-text-muted mb-6">
              Interested in performance marketing or growth strategy? Let's connect.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-orange text-white rounded-full font-medium magnetic-btn"
              >
                Get in Touch
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full font-medium hover:border-primary-orange transition-all"
              >
                Read More Posts
              </Link>
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostDetail;
