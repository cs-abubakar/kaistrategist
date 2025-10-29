import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { blogAPI } from '../../utils/api';

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Marketing',
    summary: '',
    body: '',
    tags: [''],
    read_time: '',
    featured: false,
    published: true,
    published_date: new Date().toISOString().split('T')[0],
  });
  const [coverImage, setCoverImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEdit) fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const data = await blogAPI.getById(id);
      setFormData({ ...data, tags: data.tags.length > 0 ? data.tags : [''] });
    } catch (error) {
      alert('Failed to fetch post');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Auto-generate slug from title
    if (name === 'title' && !isEdit) {
      setFormData((prev) => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      }));
    }
  };

  const handleArrayChange = (index, value) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData({ ...formData, tags: newTags });
  };

  const addTag = () => {
    setFormData({ ...formData, tags: [...formData.tags, ''] });
  };

  const removeTag = (index) => {
    setFormData({ ...formData, tags: formData.tags.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'tags') {
          data.append(key, JSON.stringify(formData[key].filter((t) => t.trim())));
        } else {
          data.append(key, formData[key]);
        }
      });

      if (coverImage) data.append('cover_image', coverImage);

      if (isEdit) {
        await blogAPI.update(id, data);
        alert('Blog post updated!');
      } else {
        await blogAPI.create(data);
        alert('Blog post created!');
      }

      navigate('/admin/blog');
    } catch (error) {
      alert('Failed to save: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/admin/blog')}
        className="inline-flex items-center gap-2 text-text-muted hover:text-white mb-6"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <h1 className="text-3xl font-extrabold mb-8">{isEdit ? 'Edit' : 'New'} Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Basic Info</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Slug *</label>
              <input
                type="text"
                name="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
                >
                  <option value="Marketing">Marketing</option>
                  <option value="Research">Research</option>
                  <option value="Travel">Travel</option>
                  <option value="Productivity">Productivity</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Read Time (min)</label>
                <input
                  type="number"
                  name="read_time"
                  value={formData.read_time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Published Date</label>
              <input
                type="date"
                name="published_date"
                value={formData.published_date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files[0])}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
              />
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Content</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Summary</label>
              <textarea
                name="summary"
                rows="3"
                value={formData.summary}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Body *</label>
              <textarea
                name="body"
                required
                rows="15"
                value={formData.body}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white resize-none font-mono text-sm"
                placeholder="Write your content here (markdown supported)..."
              />
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Tags</h2>
            <button type="button" onClick={addTag} className="text-primary-orange">
              + Add Tag
            </button>
          </div>
          <div className="space-y-2">
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleArrayChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
                />
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Settings</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span>Featured</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span>Published</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-8 py-4 bg-primary-orange text-white rounded-full font-medium magnetic-btn flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save size={20} />
            {isLoading ? 'Saving...' : isEdit ? 'Update' : 'Create'} Post
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/blog')}
            className="px-8 py-4 glass rounded-full font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
