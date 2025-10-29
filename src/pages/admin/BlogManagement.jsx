import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { blogAPI } from '../../utils/api';

const BlogManagement = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const data = await blogAPI.getAll();
      setBlogPosts(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch blog posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;

    try {
      await blogAPI.delete(id);
      alert('Blog post deleted');
      fetchBlogPosts();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold mb-2">Blog Posts</h1>
          <p className="text-text-muted">Manage your blog content</p>
        </div>
        <Link
          to="/admin/blog/new"
          className="px-6 py-3 bg-primary-orange text-white rounded-full font-medium magnetic-btn inline-flex items-center gap-2"
        >
          <Plus size={20} />
          New Post
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-text-muted">Loading...</div>
      ) : blogPosts.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold mb-2">No blog posts yet</h3>
          <p className="text-text-muted mb-6">Start writing your first post</p>
          <Link
            to="/admin/blog/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-orange text-white rounded-full font-medium"
          >
            <Plus size={20} />
            Create Post
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    <span className="px-2 py-1 bg-primary-blue/20 text-primary-blue text-xs rounded-full">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="px-2 py-1 bg-primary-orange/20 text-primary-orange text-xs rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted mb-3">{post.summary}</p>
                  <div className="flex gap-2 flex-wrap">
                    {post.tags?.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Link
                    to={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10"
                    title="View"
                  >
                    <Eye size={18} />
                  </Link>
                  <Link
                    to={`/admin/blog/edit/${post.id}`}
                    className="p-2 bg-white/5 rounded-lg hover:bg-primary-orange"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 bg-white/5 rounded-lg hover:bg-red-500"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
